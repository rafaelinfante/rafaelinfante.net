import { ChangeDetectionStrategy, Component, computed, HostListener, inject, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { ThemeService } from '../../shared/theme.service';
import { LanguageService } from '../../shared/language.service';
import { Lang, NAV_FRAGMENTS, SITE } from '../../data/site';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, MatTooltipModule, MatRippleModule, TranslocoDirective],
  template: `
    <header *transloco="let t" [class]="headerClass()">
      <nav class="container-content flex h-16 items-center justify-between sm:h-20" aria-label="Primary">
        <a href="#top" class="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
          {{ name }}<span class="text-accent-600 dark:text-accent-400">.</span>
        </a>

        <div class="hidden items-center gap-1 md:flex">
          @for (fragment of nav; track fragment) {
            <a
              [href]="'#' + fragment"
              class="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-accent-600 dark:text-ink-300 dark:hover:text-accent-400"
            >
              {{ t('nav.' + fragment) }}
            </a>
          }
        </div>

        <div class="flex items-center gap-1.5">
          <!-- Language toggle -->
          <div
            class="flex items-center rounded-lg border border-ink-200 p-0.5 text-xs font-bold dark:border-ink-800"
            role="group"
            [attr.aria-label]="t('a11y.language')"
          >
            <button type="button" (click)="language.use('en')" [class]="langBtnClass('en')" [attr.aria-pressed]="language.lang() === 'en'">
              EN
            </button>
            <button type="button" (click)="language.use('pt-BR')" [class]="langBtnClass('pt-BR')" [attr.aria-pressed]="language.lang() === 'pt-BR'">
              PT
            </button>
          </div>

          <button
            type="button"
            matRipple
            [matTooltip]="theme.theme() === 'dark' ? t('a11y.switchToLight') : t('a11y.switchToDark')"
            (click)="theme.toggle()"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            [attr.aria-label]="theme.theme() === 'dark' ? t('a11y.switchToLight') : t('a11y.switchToDark')"
          >
            <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" />
          </button>

          <a
            [href]="cvUrl"
            download
            matRipple
            class="ml-1 hidden items-center gap-2 rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700 md:inline-flex"
          >
            <app-icon name="download" [size]="16" />
            {{ t('nav.downloadCv') }}
          </a>

          <button
            type="button"
            (click)="menuOpen.set(!menuOpen())"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 md:hidden"
            [attr.aria-expanded]="menuOpen()"
            [attr.aria-label]="t('a11y.toggleMenu')"
          >
            <app-icon [name]="menuOpen() ? 'x' : 'menu'" />
          </button>
        </div>
      </nav>

      @if (menuOpen()) {
        <div class="border-t border-ink-200/70 bg-white/95 backdrop-blur-md dark:border-ink-800/70 dark:bg-ink-950/95 md:hidden">
          <div class="container-content flex flex-col py-3">
            @for (fragment of nav; track fragment) {
              <a
                [href]="'#' + fragment"
                (click)="menuOpen.set(false)"
                class="rounded-lg px-3 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-accent-600 dark:text-ink-200 dark:hover:bg-ink-800 dark:hover:text-accent-400"
              >
                {{ t('nav.' + fragment) }}
              </a>
            }
            <a
              [href]="cvUrl"
              download
              (click)="menuOpen.set(false)"
              class="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-accent-600 px-3 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-700"
            >
              <app-icon name="download" [size]="18" />
              {{ t('nav.downloadCv') }}
            </a>
          </div>
        </div>
      }
    </header>
  `,
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly language = inject(LanguageService);
  protected readonly nav = NAV_FRAGMENTS;
  protected readonly name = SITE.name;
  protected readonly cvUrl = SITE.cvUrl;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly headerClass = computed(() => {
    const base = 'fixed inset-x-0 top-0 z-50 transition-colors duration-300';
    const onScroll =
      'bg-white/80 dark:bg-ink-950/80 backdrop-blur-md border-b border-ink-200/70 dark:border-ink-800/70';
    return this.scrolled() ? `${base} ${onScroll}` : base;
  });

  protected langBtnClass(lang: Lang): string {
    const base = 'rounded-md px-2 py-1 transition-colors';
    const active = 'bg-accent-600 text-white';
    const inactive = 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white';
    return `${base} ${this.language.lang() === lang ? active : inactive}`;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }
}
