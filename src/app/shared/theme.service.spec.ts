import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('defaults to dark mode when there is no stored preference', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('restores a stored preference over the default', () => {
    localStorage.setItem('theme', 'light');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('toggle() flips between dark and light', () => {
    const theme = TestBed.inject(ThemeService);
    expect(theme.theme()).toBe('dark');
    theme.toggle();
    expect(theme.theme()).toBe('light');
    theme.toggle();
    expect(theme.theme()).toBe('dark');
  });
});
