import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { EXPERIENCE_ICONS } from '../../data/site';

interface AccomplishmentGroup {
  title: string;
  bullets: string[];
}

interface Telclic {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  summary: string;
  groups: AccomplishmentGroup[];
}

interface EarlierRole {
  company: string;
  url?: string;
  role: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, TranslocoDirective],
  template: `
    <section *transloco="let t" id="experience" class="border-y border-ink-200 bg-ink-100 py-20 dark:border-ink-800/70 dark:bg-ink-900/40 sm:py-28">
      <div class="container-content">
        <div class="mb-12 max-w-2xl">
          <p class="section-label">{{ t('experience.label') }}</p>
          <h2 class="heading-2 mt-3">{{ t('experience.heading') }}</h2>
        </div>

        @if (telclic(); as tel) {
          <article
            appReveal
            class="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900 dark:shadow-none sm:p-8"
          >
            <header class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="font-display text-xl font-bold text-ink-900 dark:text-white sm:text-2xl">
                {{ tel.role }}
                @if (tel.companyUrl) {
                  <a
                    [href]="tel.companyUrl"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    class="text-accent-600 underline-offset-4 hover:underline dark:text-accent-400"
                  >· {{ tel.company }}</a>
                } @else {
                  <span class="text-accent-600 dark:text-accent-400">· {{ tel.company }}</span>
                }
              </h3>
              <span class="text-sm font-medium text-ink-500 dark:text-ink-400">{{ tel.period }}</span>
            </header>
            <p class="mt-0.5 text-sm text-ink-400 dark:text-ink-500">{{ tel.location }}</p>
            <p class="mt-4 max-w-3xl leading-relaxed text-ink-600 dark:text-ink-300">{{ tel.summary }}</p>

            <div class="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              @for (group of tel.groups; track group.title; let i = $index) {
                <div appReveal [revealDelay]="i * 70">
                  <div class="flex items-center gap-2.5">
                    <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                      <app-icon [name]="iconFor(i)" [size]="18" />
                    </span>
                    <h4 class="font-display text-base font-bold text-ink-900 dark:text-white">{{ group.title }}</h4>
                  </div>
                  <ul class="mt-3 space-y-2">
                    @for (bullet of group.bullets; track $index) {
                      <li class="flex gap-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                        <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"></span>
                        <span>{{ bullet }}</span>
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>
          </article>
        }

        <h3 class="mb-6 mt-12 font-display text-lg font-bold text-ink-900 dark:text-white">
          {{ t('experience.earlierHeading') }}
        </h3>
        <ol class="relative border-l border-ink-200 dark:border-ink-800">
          @for (role of earlier(); track role.company; let i = $index) {
            <li class="relative ml-6 pb-8 last:pb-0" appReveal [revealDelay]="i * 60">
              <span
                class="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-ink-300 dark:border-ink-900 dark:bg-ink-600"
              ></span>
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <h4 class="font-semibold text-ink-900 dark:text-white">
                  {{ role.role }}
                  @if (role.url) {
                    <a
                      [href]="role.url"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      class="font-normal text-accent-600 underline-offset-4 hover:underline dark:text-accent-400"
                    >· {{ role.company }}</a>
                  } @else {
                    <span class="font-normal text-accent-600 dark:text-accent-400">· {{ role.company }}</span>
                  }
                </h4>
                <span class="text-sm text-ink-500 dark:text-ink-400">{{ role.period }}</span>
              </div>
              <p class="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{{ role.description }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Experience {
  private readonly transloco = inject(TranslocoService);
  private readonly icons = EXPERIENCE_ICONS;

  protected readonly telclic = toSignal(this.transloco.selectTranslateObject<Telclic | null>('experience.telclic'), {
    initialValue: null,
  });
  protected readonly earlier = toSignal(this.transloco.selectTranslateObject<EarlierRole[]>('experience.earlier'), {
    initialValue: [] as EarlierRole[],
  });

  protected iconFor(index: number) {
    return this.icons[index] ?? 'briefcase';
  }
}
