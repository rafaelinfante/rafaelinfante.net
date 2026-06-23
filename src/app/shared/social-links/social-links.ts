import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Icon } from '../icon/icon';
import { SOCIALS } from '../../data/site';

/**
 * Row of social icon links (LinkedIn / GitHub / email). Shared by the hero,
 * contact, and footer, which differ only in a few style inputs.
 */
@Component({
  selector: 'app-social-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, MatTooltipModule],
  host: { class: 'flex items-center gap-1' },
  template: `
    @for (social of socials; track social.key) {
      <a
        [href]="social.href"
        [matTooltip]="social.label"
        [matTooltipDisabled]="!tooltip()"
        [attr.target]="social.key === 'email' ? null : '_blank'"
        rel="noopener noreferrer"
        [class]="linkClass()"
        [attr.aria-label]="social.label"
      >
        <app-icon [name]="social.icon" [size]="iconSize()" />
      </a>
    }
  `,
})
export class SocialLinks {
  readonly variant = input<'ghost' | 'bordered'>('ghost');
  readonly size = input<'md' | 'lg'>('lg');
  readonly iconSize = input(22);
  readonly tooltip = input(true);

  protected readonly socials = SOCIALS;

  protected readonly linkClass = computed(() => {
    const base = 'flex items-center justify-center text-ink-500 transition-colors dark:text-ink-400';
    const shape = this.size() === 'lg' ? 'h-11 w-11 rounded-xl' : 'h-10 w-10 rounded-lg';
    const variant =
      this.variant() === 'bordered'
        ? 'border border-ink-200 hover:border-accent-400 hover:text-accent-600 dark:border-ink-800 dark:hover:border-accent-500/60 dark:hover:text-accent-400'
        : 'hover:bg-ink-100 hover:text-accent-600 dark:hover:bg-ink-800 dark:hover:text-accent-400';
    return `${base} ${shape} ${variant}`;
  });
}
