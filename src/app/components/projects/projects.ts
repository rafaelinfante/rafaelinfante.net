import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { CASE_STUDY_ICONS } from '../../data/site';

/** One labelled block of a case-study project. */
interface CaseStudyBlock {
  label: string;
  text: string;
}

/** Relative, project-scoped figures. Deliberately kept out of the global stats band. */
interface CaseStudyMetrics {
  caption: string;
  items: { value: string; label: string }[];
}

interface Project {
  name: string;
  role: string;
  url?: string;
  description: string;
  tech: string[];
  /** Present only on featured projects, which render full-width as a case study. */
  blocks?: CaseStudyBlock[];
  metrics?: CaseStudyMetrics;
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
              [class]="isCaseStudy(project) ? 'sm:col-span-2 sm:p-8' : ''"
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

              <!-- The case-study lead gets a fixed three-line box from the sm breakpoint up, so the
                   featured cards keep the same collapsed height in either language. -->
              <p
                class="mt-3 flex-1 leading-relaxed text-ink-600 dark:text-ink-300"
                [class]="isCaseStudy(project) ? 'max-w-3xl sm:min-h-[5.25rem] sm:text-lg' : ''"
              >
                {{ project.description }}
              </p>

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

              <!-- The stats band stays outside the disclosure: on phones it reads above
                   the "More details" toggle rather than being hidden behind it. -->
              @if (project.metrics; as metrics) {
                <div class="mt-6 rounded-xl border border-ink-200/80 bg-ink-50 p-4 dark:border-ink-800 dark:bg-ink-950/40 sm:p-5">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">
                    {{ metrics.caption }}
                  </p>
                  <dl class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    @for (stat of metrics.items; track stat.label) {
                      <div>
                        <dt class="font-display text-2xl font-extrabold leading-none tracking-tight text-accent-600 dark:text-accent-400">
                          {{ stat.value }}
                        </dt>
                        <dd class="mt-1.5 text-sm leading-snug text-ink-600 dark:text-ink-300">{{ stat.label }}</dd>
                      </div>
                    }
                  </dl>
                </div>
              }

              <!-- Featured cards show their detail outright from md up. On phones each
                   case study would run roughly two screens, so there they collapse
                   behind a "More details" toggle. The state is pure CSS — a hidden
                   checkbox below md, always-open from md up — so no breakpoint can leave
                   the detail hidden with no way back, and every word stays in the DOM. -->
              @if (project.blocks; as blocks) {
                <div class="mt-6 border-t border-ink-200 pt-5 dark:border-ink-800">
                  <input type="checkbox" class="disclosure-toggle peer sr-only" [id]="'project-detail-' + i" />
                  <label
                    [attr.for]="'project-detail-' + i"
                    class="inline-flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-accent-600 transition-colors hover:text-accent-700 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-500 peer-focus-visible:ring-offset-2 dark:text-accent-400 dark:hover:text-accent-300 dark:peer-focus-visible:ring-offset-ink-900 md:hidden"
                  >
                    {{ t('projects.moreDetails') }}
                    <app-icon name="chevron-down" [size]="16" class="details-chevron" />
                  </label>

                  <div class="hidden peer-checked:block md:block">
                    <div class="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 md:mt-0">
                      @for (block of blocks; track block.label; let b = $index) {
                        <div>
                          <div class="flex items-center gap-2.5">
                            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                              <app-icon [name]="blockIcon(i, b)" [size]="18" />
                            </span>
                            <h4 class="font-display text-base font-bold text-ink-900 dark:text-white">{{ block.label }}</h4>
                          </div>
                          <p class="mt-2.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{{ block.text }}</p>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              }
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Projects {
  private readonly transloco = inject(TranslocoService);
  private readonly icons = CASE_STUDY_ICONS;

  protected readonly projects = toSignal(this.transloco.selectTranslateObject<Project[]>('projects.items'), {
    initialValue: [] as Project[],
  });

  protected isCaseStudy(project: Project): boolean {
    return !!project.blocks?.length;
  }

  protected blockIcon(projectIndex: number, blockIndex: number) {
    return this.icons[projectIndex]?.[blockIndex] ?? 'sparkles';
  }
}
