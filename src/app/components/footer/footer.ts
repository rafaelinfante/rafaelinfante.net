import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { SocialLinks } from '../../shared/social-links/social-links';
import { NAV_FRAGMENTS, SITE } from '../../data/site';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, SocialLinks],
  template: `
    <footer *transloco="let t" class="border-t border-ink-200/70 py-12 dark:border-ink-800/70">
      <div class="container-content">
        <div class="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div class="text-center sm:text-left">
            <a href="#top" class="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
              {{ name }}<span class="text-accent-600 dark:text-accent-400">.</span>
            </a>
            <p class="mt-2 max-w-xs text-sm text-ink-500 dark:text-ink-400">
              {{ t('hero.title') }}
            </p>
            <a
              [href]="'mailto:' + email"
              class="mt-2 inline-block text-sm font-medium text-ink-500 transition-colors hover:text-accent-600 dark:text-ink-400 dark:hover:text-accent-400"
            >
              {{ email }}
            </a>
          </div>

          <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
            @for (fragment of nav; track fragment) {
              <a
                [href]="'#' + fragment"
                class="text-sm font-medium text-ink-500 transition-colors hover:text-accent-600 dark:text-ink-400 dark:hover:text-accent-400"
              >
                {{ t('nav.' + fragment) }}
              </a>
            }
          </nav>

          <app-social-links size="md" [iconSize]="20" [tooltip]="false" />
        </div>

        <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-200/70 pt-6 text-sm text-ink-400 dark:border-ink-800/70 dark:text-ink-500 sm:flex-row">
          <p>{{ t('footer.rights') }}</p>
          <p>{{ t('footer.builtWith') }}</p>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly name = SITE.name;
  protected readonly email = SITE.email;
  protected readonly nav = NAV_FRAGMENTS;
}
