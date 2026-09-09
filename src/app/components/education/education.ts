import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { COURSE_CERTIFICATE_URLS } from '../../data/site';

/** A formal qualification: bold title over a muted "institution · place" subline. */
interface Credential {
  title: string;
  subline: string;
}

interface Course {
  /** Provider shown as a muted prefix inside the chip ("Udemy", "Globalcode"). */
  source: string;
  name: string;
  /** Public certificate link, or '' when there is none — then the chip is a plain pill. */
  url: string;
}

const CARD =
  'flex h-full items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm dark:border-ink-800 dark:bg-ink-900 dark:shadow-none';
const ICON_BADGE =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400';
// Inline (not flex) so a long name wraps as one run of text with its muted source
// prefix, instead of the prefix being vertically centred against a two-line name.
const CHIP = 'inline-block rounded-lg px-3 py-1.5 text-sm font-medium';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" id="education" class="py-20 sm:py-28">
      <div class="container-content">
        <div class="mb-12 max-w-2xl">
          <p class="section-label">{{ t('education.label') }}</p>
          <h2 class="heading-2 mt-3">{{ t('education.heading') }}</h2>
        </div>

        <ul class="grid gap-4 md:grid-cols-2">
          @for (credential of credentials(); track credential.title; let i = $index) {
            <li appReveal [revealDelay]="i * 70" [class]="card">
              <span [class]="iconBadge"><app-icon name="graduation-cap" [size]="20" /></span>
              <span class="min-w-0">
                <span class="block font-display font-bold leading-snug text-ink-900 dark:text-white">
                  {{ credential.title }}
                </span>
                <span class="mt-1 block text-sm text-ink-500 dark:text-ink-400">{{ credential.subline }}</span>
              </span>
            </li>
          }
        </ul>

        <div appReveal [revealDelay]="140" [class]="card + ' mt-4 !items-start'">
          <span [class]="iconBadge"><app-icon name="graduation-cap" [size]="20" /></span>
          <div class="min-w-0">
            <h3 class="font-display font-bold leading-snug text-ink-900 dark:text-white">
              {{ t('education.coursesTitle') }}
            </h3>
            <ul class="mt-3 flex flex-wrap gap-2">
              @for (course of courses(); track course.source + course.name) {
                <li>
                  @if (course.url) {
                    <a
                      [href]="course.url"
                      target="_blank"
                      rel="noopener"
                      [attr.aria-label]="t('a11y.visit', { name: course.source + ' · ' + course.name })"
                      [class]="chip + ' bg-ink-100 text-accent-600 transition-colors hover:bg-accent-50 dark:bg-ink-800 dark:text-accent-400 dark:hover:bg-accent-500/15'"
                    >
                      <span class="text-ink-500 dark:text-ink-400">{{ course.source }}&nbsp;·&nbsp;</span>
                      {{ course.name }}<app-icon name="arrow-up-right" [size]="14" class="ml-1 inline-block translate-y-[0.15em]" />
                    </a>
                  } @else {
                    <span [class]="chip + ' bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200'">
                      <span class="text-ink-500 dark:text-ink-400">{{ course.source }}&nbsp;·&nbsp;</span>
                      {{ course.name }}
                    </span>
                  }
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Education {
  private readonly transloco = inject(TranslocoService);

  protected readonly card = CARD;
  protected readonly iconBadge = ICON_BADGE;
  protected readonly chip = CHIP;

  // Typed as `unknown`: Transloco's generic is an unchecked assertion, and a missing key
  // resolves to the key *string* rather than to undefined — so validate the shape here.
  private readonly rawCredentials = toSignal(this.transloco.selectTranslateObject<unknown>('education.credentials'), {
    initialValue: [] as unknown,
  });
  private readonly rawCourses = toSignal(this.transloco.selectTranslateObject<unknown>('education.courses'), {
    initialValue: [] as unknown,
  });

  protected readonly credentials = computed<Credential[]>(() => {
    const raw = this.rawCredentials();
    if (!Array.isArray(raw)) return [];
    return raw.map((entry) => ({ title: str(entry?.title), subline: str(entry?.subline) }));
  });

  protected readonly courses = computed<Course[]>(() => {
    const raw = this.rawCourses();
    if (!Array.isArray(raw)) return [];
    return raw.map((entry, i) => ({
      source: str(entry?.source),
      name: str(entry?.name),
      url: COURSE_CERTIFICATE_URLS[i] ?? '',
    }));
  });
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}
