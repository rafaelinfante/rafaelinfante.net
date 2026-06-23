import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { RevealDirective } from '../../shared/reveal.directive';

interface Highlight {
  value: string;
  label: string;
  context?: string;
}

@Component({
  selector: 'app-highlights',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TranslocoDirective],
  template: `
    <section
      *transloco="let t"
      [attr.aria-label]="t('highlights.heading')"
      class="border-y border-ink-200 bg-ink-100 py-14 dark:border-ink-800/70 dark:bg-ink-900/40"
    >
      <div class="container-content">
        <!-- Even grid: stacks on phones, 2 cols on small screens, 3 cols from large up.
             Numbers never wrap and share one size so they form a clean baseline row. -->
        <dl class="grid grid-cols-1 items-start gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          @for (stat of stats(); track $index; let i = $index) {
            <div appReveal [revealDelay]="i * 70" class="text-center sm:text-left">
              <dt class="font-display text-3xl font-extrabold leading-none tracking-tight text-accent-600 dark:text-accent-400 whitespace-nowrap">
                {{ stat.value }}
              </dt>
              <dd class="mt-3 text-sm font-medium leading-snug text-ink-600 dark:text-ink-300">
                {{ stat.label }}
                @if (stat.context) {
                  <span class="mt-0.5 block text-xs font-normal text-ink-400 dark:text-ink-500">{{ stat.context }}</span>
                }
              </dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
})
export class Highlights {
  private readonly transloco = inject(TranslocoService);
  protected readonly stats = toSignal(this.transloco.selectTranslateObject<Highlight[]>('highlights.items'), {
    initialValue: [] as Highlight[],
  });
}
