import { AfterViewInit, Directive, ElementRef, inject, input, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Gently reveals an element when it scrolls into view.
 * Adds the `reveal` class immediately and `is-visible` once intersecting.
 * Falls back to immediately visible when IntersectionObserver is unavailable
 * or when the user prefers reduced motion (handled in CSS).
 *
 * Usage: <div appReveal [revealDelay]="120"> ... </div>  (number = delay in ms)
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly delay = input(0, { alias: 'revealDelay' });

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.host.nativeElement;
    node.classList.add('reveal');

    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const ms = this.delay();
          if (ms) node.style.animationDelay = `${ms}ms`;
          node.classList.add('is-visible');
          this.observer?.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
