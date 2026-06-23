import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICON_PATHS, IconName } from './icon-defs';

/**
 * Renders a registered inline SVG icon, coloured via `currentColor`.
 * Usage: <app-icon name="github" [size]="20" />
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="inline-flex shrink-0" [style.width.px]="size()" [style.height.px]="size()" [innerHTML]="svg()"></span>`,
})
export class Icon {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<IconName>();
  readonly size = input(20);

  protected readonly svg = computed<SafeHtml>(() => {
    const body = ICON_PATHS[this.name()] ?? '';
    const px = this.size();
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
    // Icon markup is fully static and developer-controlled, so trusting it is safe.
    return this.sanitizer.bypassSecurityTrustHtml(markup);
  });
}
