import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { CERTIFICATIONS } from '../../data/site';

/** Per-badge copy from `certifications.items`, matched to CERTIFICATIONS by position. */
interface CertificationCopy {
  name: string;
  issuer: string;
  alt: string;
  /** Link text, naming the verification site ("Verify on Credly"). */
  verify: string;
}

const EMPTY_COPY: CertificationCopy = { name: '', issuer: '', alt: '', verify: '' };

/**
 * Certification strip: the credential badges as static images (deliberately not
 * the issuers' iframe/JS embeds — those cost a third-party script and track
 * visitors), each linking out to its public verification page.
 *
 * Layout: one card per row on small screens with the badge beside the text;
 * from `md` the three cards sit side by side, which only leaves room for the
 * 110px badge if it moves above the text — so the card stacks and centres.
 */
@Component({
  selector: 'app-certifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" id="certifications" class="py-16 sm:py-20">
      <div class="container-content">
        <div class="mb-8 max-w-2xl">
          <p class="section-label">{{ t('certifications.label') }}</p>
          <h2 class="heading-2 mt-3">{{ t('certifications.heading') }}</h2>
        </div>

        <ul class="grid gap-4 md:grid-cols-3">
          @for (cert of items(); track cert.key; let i = $index) {
            <li appReveal [revealDelay]="i * 70">
              <a
                [attr.href]="cert.verifyUrl || null"
                [attr.target]="cert.verifyUrl ? '_blank' : null"
                [attr.rel]="cert.verifyUrl ? 'noopener noreferrer' : null"
                [attr.aria-label]="cert.verifyUrl ? t('a11y.visit', { name: cert.name + ' — ' + cert.issuer }) : null"
                class="flex h-full items-center gap-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-colors hover:border-accent-400 dark:border-ink-800 dark:bg-ink-900 dark:shadow-none dark:hover:border-accent-500/60 md:flex-col md:justify-start md:gap-4 md:p-6 md:text-center"
              >
                <img
                  [src]="cert.image"
                  [alt]="cert.alt || cert.name"
                  width="110"
                  height="110"
                  loading="lazy"
                  decoding="async"
                  class="h-[110px] w-[110px] shrink-0 object-contain"
                />
                <span class="min-w-0">
                  <span class="block font-display font-bold leading-snug text-ink-900 dark:text-white">
                    {{ cert.name }}
                  </span>
                  <span class="mt-1 block text-sm text-ink-500 dark:text-ink-400">{{ cert.issuer }}</span>
                  @if (cert.verifyUrl) {
                    <span class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-600 dark:text-accent-400">
                      {{ cert.verify }}
                      <app-icon name="arrow-up-right" [size]="14" />
                    </span>
                  }
                </span>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Certifications {
  private readonly transloco = inject(TranslocoService);

  // Typed as `unknown` on purpose: Transloco's generic is an unchecked assertion, and a
  // missing/renamed key resolves to the key *string*, not to undefined — indexing that would
  // yield a character and quietly leave every field undefined. So validate the shape here.
  private readonly copy = toSignal(this.transloco.selectTranslateObject<unknown>('certifications.items'), {
    initialValue: [] as unknown,
  });

  protected readonly items = computed(() => {
    const raw = this.copy();
    const copy = Array.isArray(raw) ? (raw as CertificationCopy[]) : [];
    return CERTIFICATIONS.map((cert, i) => ({ ...cert, ...(copy[i] ?? EMPTY_COPY) }));
  });
}
