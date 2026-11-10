import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    @if (visible()) {
      <button
        type="button"
        class="back-to-top-btn"
        (click)="scrollToTop()"
        aria-label="Scroll back to top"
        title="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    }
  `,
  styles: [`
    .back-to-top-btn {
      position: fixed;
      right: 22px;
      bottom: 24px;
      z-index: 950;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.25);
      background: linear-gradient(135deg, #F59E0B, #EA8A00);
      color: #FFFFFF;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 10px 26px rgba(13, 27, 62, 0.28);
      transition: transform 0.22s ease, box-shadow 0.22s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 32px rgba(245, 158, 11, 0.42);
      }

      @media (max-width: 767px) {
        bottom: 72px;
        right: 16px;
        width: 42px;
        height: 42px;
      }
    }
  `]
})
export class BackToTopComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.visible.set(window.scrollY > 360);
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

