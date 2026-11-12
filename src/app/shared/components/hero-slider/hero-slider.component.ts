import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { HERO_SLIDER_DEFAULT } from '../../../core/data/site.data';
import { HeroSlideItem, HeroSliderConfig } from '../../../core/models/site.models';
import { ContentService } from '../../../core/services/content.service';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [],
  styleUrl: './hero-slider.component.scss',
  template: `
    <section
      class="hero-slider"
      aria-label="Featured Solutions Showcase"
      (mouseenter)="pauseAutoplay()"
      (mouseleave)="resumeAutoplay()"
      (touchstart)="onTouchStart($event)"
      (touchend)="onTouchEnd($event)"
    >
      <!-- Background Image Layers -->
      <div class="slides-stage" aria-hidden="true">
        @for (slide of activeSlides(); track slide.id; let i = $index) {
          <div class="slide-layer" [class.is-active]="i === currentIndex()">
            <img
              [src]="slide.image || 'assets/images/hero-slide-1.jpg'"
              [alt]="slide.title + ' ' + slide.titleHighlight"
              class="slide-bg-img"
              [attr.loading]="i === 0 ? 'eager' : 'lazy'"
              (error)="onImgError($event)"
            />
          </div>
        }
        <div class="slide-overlay"></div>
      </div>

      <!-- Foreground Slide Content -->
      <div class="container slider-content-wrap">
        @if (currentSlide(); as slide) {
          @for (s of [slide]; track s.id) {
            <div class="slide-copy">
              <div class="hero-eyebrow">
                <span>{{ s.eyebrow }}</span>
                <span class="eyebrow-bar"></span>
              </div>

              <h1 class="hero-title">
                {{ s.title }}
                <span class="highlight-orange">{{ s.titleHighlight }}</span>
              </h1>

              <p class="hero-desc">{{ s.description }}</p>

              <div class="hero-cta-row">
                <button
                  type="button"
                  class="hero-btn btn-primary-orange"
                  (click)="navigateCta(s.primaryCtaHref)"
                >
                  <span>{{ s.primaryCtaText }}</span>
                  <span aria-hidden="true">→</span>
                </button>

                @if (s.secondaryCtaText) {
                  <button
                    type="button"
                    class="hero-btn btn-secondary-glass"
                    (click)="navigateCta(s.secondaryCtaHref || '/contact', true)"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{{ s.secondaryCtaText }}</span>
                  </button>
                }
              </div>
            </div>
          }
        }
      </div>

      <!-- Navigation Arrows -->
      @if (activeSlides().length > 1) {
        <button
          type="button"
          class="slider-arrow prev"
          (click)="prevSlide()"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          type="button"
          class="slider-arrow next"
          (click)="nextSlide()"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- Bottom Pagination Dots -->
        <div class="slider-controls-bottom" role="tablist" aria-label="Slide pagination">
          @for (slide of activeSlides(); track slide.id; let i = $index) {
            <button
              type="button"
              class="dot-btn"
              [class.is-active]="i === currentIndex()"
              (click)="goToSlide(i)"
              [attr.aria-label]="'Go to slide ' + (i + 1)"
              [attr.aria-selected]="i === currentIndex()"
            ></button>
          }
        </div>

        <!-- Slide Progress Bar -->
        @if (sliderConfig().autoplayEnabled) {
          <div class="slider-progress-track" aria-hidden="true">
            @for (k of [progressKey()]; track k) {
              <div
                class="slider-progress-fill"
                [class.is-paused]="isPaused()"
                [style.animation-duration.s]="sliderConfig().autoplayDurationSec || 5"
              ></div>
            }
          </div>
        }
      }
    </section>
  `
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly content = inject(ContentService);
  private readonly router = inject(Router);
  readonly dialogs = inject(DialogLauncherService);

  readonly sliderConfig = signal<HeroSliderConfig>(HERO_SLIDER_DEFAULT);
  readonly currentIndex = signal<number>(0);
  readonly isPaused = signal<boolean>(false);
  readonly progressKey = signal<number>(0);

  readonly activeSlides = computed<HeroSlideItem[]>(() => {
    const cfg = this.sliderConfig();
    const list = (cfg.slides || [])
      .filter((s) => s.enabled !== false)
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return list.length > 0 ? list : HERO_SLIDER_DEFAULT.slides;
  });

  readonly currentSlide = computed<HeroSlideItem | undefined>(() => {
    const slides = this.activeSlides();
    const idx = this.currentIndex();
    return slides[idx] || slides[0];
  });

  private autoplayTimer?: ReturnType<typeof setInterval>;
  private touchStartX = 0;

  ngOnInit(): void {
    const initial = this.content.currentSettings.heroSlider;
    if (initial && Array.isArray(initial.slides) && initial.slides.length > 0) {
      this.sliderConfig.set(initial);
    }

    this.content.settings$.subscribe((st) => {
      if (st.heroSlider && Array.isArray(st.heroSlider.slides) && st.heroSlider.slides.length > 0) {
        this.sliderConfig.set(st.heroSlider);
        if (this.currentIndex() >= this.activeSlides().length) {
          this.currentIndex.set(0);
        }
        this.restartAutoplay();
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
      this.preloadNextSlide();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  nextSlide(): void {
    const total = this.activeSlides().length;
    if (total <= 1) return;
    this.currentIndex.update((i) => (i + 1) % total);
    this.progressKey.update((k) => k + 1);
    this.preloadNextSlide();
    this.restartAutoplay();
  }

  prevSlide(): void {
    const total = this.activeSlides().length;
    if (total <= 1) return;
    this.currentIndex.update((i) => (i - 1 + total) % total);
    this.progressKey.update((k) => k + 1);
    this.preloadNextSlide();
    this.restartAutoplay();
  }

  goToSlide(index: number): void {
    const total = this.activeSlides().length;
    if (index < 0 || index >= total) return;
    this.currentIndex.set(index);
    this.progressKey.update((k) => k + 1);
    this.preloadNextSlide();
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.isPaused.set(true);
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.isPaused.set(false);
    this.startAutoplay();
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.touchStartX = event.touches[0].clientX;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (event.changedTouches.length === 0) return;
    const diff = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && !img.src.endsWith('hero-desktop.png')) {
      img.src = 'assets/images/hero-desktop.png';
    }
  }

  navigateCta(href?: string, isSecondary = false): void {
    if (!href) {
      if (isSecondary) {
        this.dialogs.openContact();
      }
      return;
    }
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (href.startsWith('http://') || href.startsWith('https://')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    this.router.navigateByUrl(href);
  }

  private startAutoplay(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.stopAutoplay();
    const cfg = this.sliderConfig();
    if (!cfg.autoplayEnabled || this.activeSlides().length <= 1 || this.isPaused()) return;
    const ms = Math.max(2, cfg.autoplayDurationSec || 5) * 1000;
    this.autoplayTimer = setInterval(() => {
      const total = this.activeSlides().length;
      if (total > 1) {
        this.currentIndex.update((i) => (i + 1) % total);
        this.progressKey.update((k) => k + 1);
        this.preloadNextSlide();
      }
    }, ms);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  private restartAutoplay(): void {
    if (!this.isPaused()) {
      this.startAutoplay();
    }
  }

  private preloadNextSlide(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const slides = this.activeSlides();
    if (slides.length <= 1) return;
    const nextIdx = (this.currentIndex() + 1) % slides.length;
    const nextImg = slides[nextIdx]?.image;
    if (nextImg) {
      const img = new Image();
      img.src = nextImg;
    }
  }
}

