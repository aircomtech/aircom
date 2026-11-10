import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationService } from '../../core/services/animation.service';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input('appScrollReveal') direction: 'up' | 'left' | 'right' | 'scale' = 'up';
  @Input() revealDelay = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly anim = inject(AnimationService);
  private trigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.anim.prefersReducedMotion()) {
      return;
    }
    this.anim.init();
    const node = this.el.nativeElement;
    const fromVars: gsap.TweenVars = { opacity: 0 };

    if (this.direction === 'up') {
      fromVars.y = 32;
    } else if (this.direction === 'left') {
      fromVars.x = -36;
    } else if (this.direction === 'right') {
      fromVars.x = 36;
    } else if (this.direction === 'scale') {
      fromVars.scale = 0.94;
    }

    const tween = gsap.fromTo(node, fromVars, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.72,
      delay: this.revealDelay,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: node,
        start: 'top 86%',
        once: true
      }
    });

    this.trigger = tween.scrollTrigger;
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}

