import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { RevealDirective } from '../../shared/reveal.directive';

interface Stat {
  value: string;
  label: string;
}

/**
 * Slim band between the project cards and the skills grid: the engineering
 * platform the products above are delivered on. Same stat styling as the
 * per-project stat bands, so the numbers read as one family.
 */
@Component({
  selector: 'app-platform',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" [attr.aria-label]="t('platform.heading')" class="pb-20 sm:pb-28">
      <div class="container-content">
        <div
          appReveal
          class="rounded-2xl border border-ink-200 bg-ink-50 p-6 dark:border-ink-800 dark:bg-ink-900/50 sm:p-8"
        >
          <h2 class="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-2xl">
            {{ t('platform.heading') }}
          </h2>
          <p class="mt-2 max-w-3xl leading-relaxed text-ink-600 dark:text-ink-300">{{ t('platform.lead') }}</p>

          <dl class="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            @for (stat of stats(); track stat.label) {
              <div>
                <dt class="font-display text-2xl font-extrabold leading-none tracking-tight text-accent-600 dark:text-accent-400">
                  {{ stat.value }}
                </dt>
                <dd class="mt-1.5 text-sm leading-snug text-ink-600 dark:text-ink-300">{{ stat.label }}</dd>
              </div>
            }
          </dl>

          <p class="mt-7 border-t border-ink-200 pt-5 text-sm leading-relaxed text-ink-500 dark:border-ink-800 dark:text-ink-400">
            {{ t('platform.footnote') }}
          </p>
        </div>
      </div>
    </section>
  `,
})
export class Platform {
  private readonly transloco = inject(TranslocoService);
  protected readonly stats = toSignal(this.transloco.selectTranslateObject<Stat[]>('platform.stats'), {
    initialValue: [] as Stat[],
  });
}
