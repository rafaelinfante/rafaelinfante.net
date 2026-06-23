import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { SocialLinks } from '../../shared/social-links/social-links';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, MatRippleModule, TranslocoDirective, SocialLinks],
  template: `
    <section *transloco="let t" id="contact" class="border-y border-ink-200 bg-ink-100 py-20 dark:border-ink-800/70 dark:bg-ink-900/40 sm:py-28">
      <div class="container-content">
        <div
          appReveal
          class="relative overflow-hidden rounded-3xl border border-ink-200 bg-white px-6 py-14 text-center shadow-sm dark:border-ink-800 dark:bg-ink-900 dark:shadow-none sm:px-12"
        >
          <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
            <div class="absolute -bottom-24 left-1/2 h-72 w-[32rem] -translate-x-1/2 rounded-full bg-accent-400/15 blur-3xl dark:bg-accent-500/10"></div>
          </div>

          <p class="section-label">{{ t('contact.label') }}</p>
          <h2 class="heading-2 mx-auto mt-3 max-w-xl">{{ t('contact.heading') }}</h2>
          <p class="mx-auto mt-4 max-w-xl text-lg text-ink-600 dark:text-ink-300">{{ t('contact.body') }}</p>

          <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              [href]="'mailto:' + email"
              matRipple
              class="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
            >
              <app-icon name="mail" [size]="18" />
              {{ email }}
            </a>

            <a
              [href]="cvUrl"
              download
              matRipple
              class="inline-flex items-center gap-2 rounded-xl border border-ink-300 px-6 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-ink-200 dark:hover:border-accent-400 dark:hover:text-accent-400"
            >
              <app-icon name="download" [size]="18" />
              {{ t('contact.downloadCv') }}
            </a>
          </div>

          <app-social-links variant="bordered" class="mt-8 justify-center" />
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly email = SITE.email;
  protected readonly cvUrl = SITE.cvUrl;
}
