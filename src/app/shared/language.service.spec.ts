import { TestBed } from '@angular/core/testing';
import { TranslocoTestingModule, Translation } from '@jsverse/transloco';
import { LanguageService } from './language.service';

const EMPTY: Translation = {};

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule.forRoot({
          langs: { en: EMPTY, 'pt-BR': EMPTY },
          translocoConfig: { availableLangs: ['en', 'pt-BR'], defaultLang: 'en' },
        }),
      ],
    });
  });

  it('defaults to English when there is no stored preference', () => {
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });

  it('toggle() switches between en and pt-BR', () => {
    const language = TestBed.inject(LanguageService);
    expect(language.lang()).toBe('en');
    language.toggle();
    expect(language.lang()).toBe('pt-BR');
    language.toggle();
    expect(language.lang()).toBe('en');
  });

  it('use() sets a specific language', () => {
    const language = TestBed.inject(LanguageService);
    language.use('pt-BR');
    expect(language.lang()).toBe('pt-BR');
  });
});
