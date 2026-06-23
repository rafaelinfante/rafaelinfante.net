import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

interface Project {
  name: string;
  role: string;
  url?: string;
  description: string;
  tech: string[];
}

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" id="projects" class="py-20 sm:py-28">
      <div class="container-content">
        <div class="mb-12 max-w-2xl">
          <p class="section-label">{{ t('projects.label') }}</p>
          <h2 class="heading-2 mt-3">{{ t('projects.heading') }}</h2>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          @for (project of projects(); track project.name; let i = $index) {
            <article
              appReveal
              [revealDelay]="i * 80"
              class="group flex flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-colors hover:border-accent-400 dark:border-ink-800 dark:bg-ink-900 dark:shadow-none dark:hover:border-accent-500/60"
            >
              <div class="flex items-baseline justify-between gap-3">
                @if (project.url) {
                  <a
                    [href]="project.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 font-display text-xl font-bold text-ink-900 transition-colors hover:text-accent-600 dark:text-white dark:hover:text-accent-400"
                    [attr.aria-label]="t('a11y.visit', { name: project.name })"
                  >
                    {{ project.name }}
                    <app-icon name="arrow-up-right" [size]="18" />
                  </a>
                } @else {
                  <h3 class="font-display text-xl font-bold text-ink-900 dark:text-white">{{ project.name }}</h3>
                }
                <span class="shrink-0 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700 dark:bg-accent-500/10 dark:text-accent-300">
                  {{ project.role }}
                </span>
              </div>

              <p class="mt-3 flex-1 leading-relaxed text-ink-600 dark:text-ink-300">{{ project.description }}</p>

              <div class="mt-5 flex flex-wrap items-center gap-2">
                @for (tag of project.tech; track tag) {
                  <span class="rounded-md bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                    {{ tag }}
                  </span>
                }
                @if (project.url) {
                  <a
                    [href]="project.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-600 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
                  >
                    {{ t('projects.visit') }}
                    <app-icon name="arrow-up-right" [size]="14" />
                  </a>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Projects {
  private readonly transloco = inject(TranslocoService);
  protected readonly projects = toSignal(this.transloco.selectTranslateObject<Project[]>('projects.items'), {
    initialValue: [] as Project[],
  });
}
