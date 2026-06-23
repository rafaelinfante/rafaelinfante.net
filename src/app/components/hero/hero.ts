import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { SocialLinks } from '../../shared/social-links/social-links';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, MatRippleModule, TranslocoDirective, SocialLinks],
  template: `
    <section *transloco="let t" id="top" class="relative overflow-hidden pt-32 sm:pt-40">
      <!-- soft decorative accent glow -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute -top-24 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent-400/15 blur-3xl dark:bg-accent-500/10"
        ></div>
      </div>

      <div class="container-content pb-20 sm:pb-28">
        <div class="max-w-3xl">
          <p
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/60 px-3 py-1 text-sm text-ink-600 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-300"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-accent-500"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-accent-500"></span>
            </span>
            {{ t('hero.badge') }}
          </p>

          <h1 class="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 dark:text-white sm:text-6xl">
            {{ name }}
          </h1>

          <p class="mt-4 text-xl font-medium text-ink-700 dark:text-ink-200 sm:text-2xl">
            {{ t('hero.title') }}
          </p>

          <p class="mt-2 text-base font-medium text-accent-600 dark:text-accent-400">
            {{ t('hero.tagline') }}
          </p>

          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {{ t('hero.valueProp') }}
          </p>

          <div class="mt-6 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
            <app-icon name="map-pin" [size]="18" />
            <span>{{ t('hero.location') }} · {{ t('hero.availability') }}</span>
          </div>

          <div class="mt-2 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
            <app-icon name="mail" [size]="18" />
            <a [href]="'mailto:' + email" class="transition-colors hover:text-accent-600 dark:hover:text-accent-400">{{ email }}</a>
          </div>

          <div class="mt-9 flex flex-wrap items-center gap-3">
            <a
              [href]="cvUrl"
              download
              matRipple
              class="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
            >
              <app-icon name="download" [size]="18" />
              {{ t('nav.downloadCv') }}
            </a>

            <a
              href="#contact"
              matRipple
              class="inline-flex items-center gap-2 rounded-xl border border-ink-300 px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-600 dark:border-ink-700 dark:text-ink-200 dark:hover:border-accent-400 dark:hover:text-accent-400"
            >
              {{ t('hero.getInTouch') }}
            </a>

            <app-social-links class="ml-1" />
          </div>
        </div>
      </div>

      <a
        href="#about"
        class="mx-auto mb-10 hidden w-fit animate-bounce text-ink-400 transition-colors hover:text-accent-600 dark:hover:text-accent-400 sm:flex"
        [attr.aria-label]="t('a11y.scrollToAbout')"
      >
        <app-icon name="chevron-down" [size]="26" />
      </a>
    </section>
  `,
})
export class Hero {
  protected readonly name = SITE.name;
  protected readonly email = SITE.email;
  protected readonly cvUrl = SITE.cvUrl;
}
