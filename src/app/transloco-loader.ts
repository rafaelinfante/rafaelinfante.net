import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import en from '../i18n/en.json';
import ptBR from '../i18n/pt-BR.json';

// Translations are bundled at build time so they're available synchronously —
// this is what lets the page prerender with real content and hydrate without a
// flash or mismatch. Edit the copy in src/i18n/{en,pt-BR}.json.
const TRANSLATIONS: Record<string, Translation> = {
  en: en as Translation,
  'pt-BR': ptBR as Translation,
};

@Injectable({ providedIn: 'root' })
export class AppTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return of(TRANSLATIONS[lang] ?? TRANSLATIONS['en']);
  }
}
