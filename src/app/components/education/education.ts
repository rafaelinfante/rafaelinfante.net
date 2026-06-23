import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" id="education" class="py-20 sm:py-28">
      <div class="container-content">
        <div class="mb-12 max-w-2xl">
          <p class="section-label">{{ t('education.label') }}</p>
          <h2 class="heading-2 mt-3">{{ t('education.heading') }}</h2>
        </div>

        <ul class="grid gap-3 sm:grid-cols-2">
          @for (item of items(); track $index; let i = $index) {
            <li
              appReveal
              [revealDelay]="i * 60"
              class="flex items-start gap-3 rounded-xl border border-ink-200 bg-white p-4 shadow-sm dark:border-ink-800 dark:bg-ink-900 dark:shadow-none"
            >
              <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                <app-icon name="graduation-cap" [size]="18" />
              </span>
              <span class="leading-relaxed text-ink-700 dark:text-ink-200">{{ item }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Education {
  private readonly transloco = inject(TranslocoService);
  protected readonly items = toSignal(this.transloco.selectTranslateObject<string[]>('education.items'), {
    initialValue: [] as string[],
  });
}
