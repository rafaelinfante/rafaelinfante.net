import { afterNextRender, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { DEFAULT_LANG, Lang, LANGS } from '../data/site';

const STORAGE_KEY = 'lang';

/**
 * Owns the active language as a signal and keeps Transloco, the `<html lang>`
 * attribute, and localStorage in sync.
 *
 * The signal starts on the default language (English) so the first client render
 * matches the prerendered HTML; the saved or browser-preferred language is then
 * applied after hydration, avoiding a hydration mismatch.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly lang = signal<Lang>(DEFAULT_LANG);

  constructor() {
    // Capture the preference before the effect below writes anything to storage.
    const preferred = this.isBrowser ? this.readPreference() : null;

    effect(() => {
      const value = this.lang();
      this.transloco.setActiveLang(value);
      if (!this.isBrowser) return;
      document.documentElement.lang = value;
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage may be unavailable (private mode) — ignore */
      }
    });

    if (preferred) {
      afterNextRender(() => {
        if (preferred !== this.lang()) this.lang.set(preferred);
      });
    }
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'pt-BR' : 'en'));
  }

  use(lang: Lang): void {
    this.lang.set(lang);
  }

  private readPreference(): Lang | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (LANGS as readonly string[]).includes(stored)) return stored as Lang;
    } catch {
      /* ignore */
    }
    // Default to English when there's no stored preference.
    return null;
  }
}
