import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * An `education.items` entry is either a plain line ("B.Sc. in Computer Science — …")
 * or a heading with its own course list ("Udemy" + the individual courses), which
 * renders as a bulleted list instead of one long run-on line.
 */
interface EducationItem {
  title: string;
  courses: string[];
}

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
            <li appReveal [revealDelay]="i * 60" [class]="cardClass(item)">
              <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                <app-icon name="graduation-cap" [size]="18" />
              </span>
              <div class="min-w-0">
                <span [class]="titleClass(item)">{{ item.title }}</span>
                @if (item.courses.length) {
                  <ul class="mt-2 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                    @for (course of item.courses; track course) {
                      <li class="flex items-start gap-2.5 leading-relaxed text-ink-600 dark:text-ink-300">
                        <span class="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent-500 dark:bg-accent-400" aria-hidden="true"></span>
                        <span>{{ course }}</span>
                      </li>
                    }
                  </ul>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Education {
  private readonly transloco = inject(TranslocoService);

  // Typed as `unknown`: Transloco's generic is an unchecked assertion, and a missing key
  // resolves to the key *string* rather than to undefined — so validate the shape here.
  private readonly raw = toSignal(this.transloco.selectTranslateObject<unknown>('education.items'), {
    initialValue: [] as unknown,
  });

  protected readonly items = computed<EducationItem[]>(() => {
    const raw = this.raw();
    if (!Array.isArray(raw)) return [];
    return raw.map((entry) => {
      if (typeof entry === 'string') return { title: entry, courses: [] };
      const title = typeof entry?.title === 'string' ? entry.title : '';
      const courses = Array.isArray(entry?.courses) ? entry.courses.filter((c: unknown) => typeof c === 'string') : [];
      return { title, courses };
    });
  });

  /** An entry heading a course list reads as a label for it, not as another plain entry. */
  protected titleClass(item: EducationItem): string {
    const base = 'block leading-relaxed';
    return item.courses.length
      ? `${base} font-medium text-ink-900 dark:text-white`
      : `${base} text-ink-700 dark:text-ink-200`;
  }

  /** The course list needs the full row; single-line entries stay in the two-column grid. */
  protected cardClass(item: EducationItem): string {
    const base =
      'flex items-start gap-3 rounded-xl border border-ink-200 bg-white p-4 shadow-sm dark:border-ink-800 dark:bg-ink-900 dark:shadow-none';
    return item.courses.length ? `${base} sm:col-span-2` : base;
  }
}
