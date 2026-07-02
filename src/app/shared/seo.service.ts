import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { OPEN_TO_WORK } from '../data/site';

interface Seo {
  title: string;
  description: string;
  availabilityNote?: string;
}

/**
 * Keeps the document title and meta description / Open Graph / Twitter tags in
 * sync with the active language. Call `init()` once from the root component.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly transloco = inject(TranslocoService);

  init(): void {
    this.transloco.selectTranslateObject<Seo>('seo').subscribe((seo) => {
      if (!seo?.title) return;
      const { title } = seo;
      const description =
        OPEN_TO_WORK && seo.availabilityNote
          ? `${seo.description} ${seo.availabilityNote}`
          : seo.description;
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    });
  }
}
