import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private registered = false;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.registered) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    this.registered = true;
  }

  prefersReducedMotion(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  animateStaggerCards(container: HTMLElement, selector: string): void {
    if (!isPlatformBrowser(this.platformId) || this.prefersReducedMotion()) {
      return;
    }
    this.init();
    const targets = container.querySelectorAll(selector);
    if (!targets.length) {
      return;
    }
    gsap.fromTo(
      targets,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: 'top 84%',
          once: true
        }
      }
    );
  }

  animateCounter(el: HTMLElement, endValue: number, suffix = ''): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.prefersReducedMotion()) {
      el.textContent = `${endValue}${suffix}`;
      return;
    }
    this.init();
    const state = { val: 0 };
    gsap.to(state, {
      val: endValue,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true
      },
      onUpdate: () => {
        el.textContent = `${Math.round(state.val)}${suffix}`;
      }
    });
  }

  refresh(): void {
    if (isPlatformBrowser(this.platformId) && this.registered) {
      ScrollTrigger.refresh();
    }
  }
}

