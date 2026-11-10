import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogLauncherService } from '../core/services/dialog-launcher.service';
import { BackToTopComponent } from '../shared/components/back-to-top/back-to-top.component';
import { MobileStickyBarComponent } from '../shared/components/mobile-sticky-bar/mobile-sticky-bar.component';
import { ScrollProgressComponent } from '../shared/components/scroll-progress/scroll-progress.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ScrollProgressComponent,
    BackToTopComponent,
    MobileStickyBarComponent
  ],
  template: `
    <app-scroll-progress />
    <app-header />
    <main id="main-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-back-to-top />
    <app-mobile-sticky-bar />
  `
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dialogs = inject(DialogLauncherService);
  private welcomeTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.welcomeTimer = setTimeout(() => {
        this.dialogs.openWelcomeOnce();
      }, 9000);
    }
  }

  ngOnDestroy(): void {
    if (this.welcomeTimer) {
      clearTimeout(this.welcomeTimer);
    }
  }
}

