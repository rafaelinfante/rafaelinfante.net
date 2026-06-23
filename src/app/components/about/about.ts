import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" id="about" class="py-20 sm:py-28">
      <div class="container-content">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-4" appReveal>
            <p class="section-label">{{ t('about.label') }}</p>
            <h2 class="heading-2 mt-3">{{ t('about.heading') }}</h2>
          </div>
          <div class="space-y-5 lg:col-span-8 lg:pt-1" appReveal [revealDelay]="100">
            @for (para of body(); track $index) {
              <p class="text-lg leading-relaxed text-ink-600 dark:text-ink-300">{{ para }}</p>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  private readonly transloco = inject(TranslocoService);
  protected readonly body = toSignal(this.transloco.selectTranslateObject<string[]>('about.body'), {
    initialValue: [] as string[],
  });
}
