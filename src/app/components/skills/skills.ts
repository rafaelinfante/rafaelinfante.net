import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { SKILL_ICONS } from '../../data/site';

interface SkillGroup {
  title: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" id="skills" class="border-y border-ink-200 bg-ink-100 py-20 dark:border-ink-800/70 dark:bg-ink-900/40 sm:py-28">
      <div class="container-content">
        <div class="mb-12 max-w-2xl">
          <p class="section-label">{{ t('skills.label') }}</p>
          <h2 class="heading-2 mt-3">{{ t('skills.heading') }}</h2>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (group of groups(); track group.title; let i = $index) {
            <div
              appReveal
              [revealDelay]="i * 70"
              class="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-colors hover:border-accent-400 dark:border-ink-800 dark:bg-ink-900 dark:shadow-none dark:hover:border-accent-500/60"
            >
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                  <app-icon [name]="iconFor(i)" [size]="22" />
                </span>
                <h3 class="font-display text-lg font-bold text-ink-900 dark:text-white">{{ group.title }}</h3>
              </div>
              <ul class="mt-4 flex flex-wrap gap-2">
                @for (skill of group.skills; track skill) {
                  <li class="rounded-lg bg-ink-100 px-3 py-1.5 text-sm font-medium text-ink-700 dark:bg-ink-800 dark:text-ink-200">
                    {{ skill }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  private readonly transloco = inject(TranslocoService);
  private readonly icons = SKILL_ICONS;
  protected readonly groups = toSignal(this.transloco.selectTranslateObject<SkillGroup[]>('skills.groups'), {
    initialValue: [] as SkillGroup[],
  });

  protected iconFor(index: number) {
    return this.icons[index] ?? 'sparkles';
  }
}
