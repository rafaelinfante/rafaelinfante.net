import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

/**
 * Manages the light/dark theme. Toggling adds/removes the `dark` class on
 * <html>, which drives both Tailwind's `dark:` variants and Material's
 * `color-scheme`. The choice is persisted to localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly theme = signal<Theme>(this.readInitial());

  constructor() {
    effect(() => {
      const value = this.theme();
      if (!this.isBrowser) return;
      document.documentElement.classList.toggle('dark', value === 'dark');
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage may be unavailable (private mode) — ignore */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private readInitial(): Theme {
    if (this.isBrowser) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        /* ignore */
      }
    }
    // Default to dark mode when there's no stored preference.
    return 'dark';
  }
}
