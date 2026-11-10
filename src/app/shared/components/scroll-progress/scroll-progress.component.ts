import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `
    <div class="scroll-progress-track" aria-hidden="true">
      <div class="scroll-progress-bar" [style.width.%]="progress()"></div>
    </div>
  `,
  styles: [`
    .scroll-progress-track {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      z-index: 1200;
      background: transparent;
      pointer-events: none;
    }
    .scroll-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #0BA8EA, #F59E0B);
      transition: width 0.08s linear;
    }
  `]
})
export class ScrollProgressComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly progress = signal(0);

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
  }
}

