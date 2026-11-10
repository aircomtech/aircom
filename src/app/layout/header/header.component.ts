import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONTACT_INFO, MAIN_NAV_ITEMS } from '../../core/data/site.data';
import { DialogLauncherService } from '../../core/services/dialog-launcher.service';
import { AircomLogoComponent } from '../../shared/components/aircom-logo/aircom-logo.component';
import { TechIconComponent } from '../../shared/components/tech-icon/tech-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatMenuModule, AircomLogoComponent, TechIconComponent],
  styleUrl: './header.component.scss',
  template: `
    <header class="site-header" [class.is-scrolled]="scrolled()">
      <!-- Top Contact Bar -->
      <div class="top-bar">
        <div class="container top-bar-inner">
          <div class="top-left">
            <a [href]="'mailto:' + contact.salesEmail" class="top-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>{{ contact.salesEmail }}</span>
            </a>
            <span class="divider">|</span>
            <a [href]="'mailto:' + contact.infoEmail" class="top-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>{{ contact.infoEmail }}</span>
            </a>
          </div>

          <div class="top-right">
            <a [href]="contact.phoneHref" class="top-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{{ contact.phone }}</span>
            </a>
            <span class="divider hide-xs">|</span>
            <button type="button" class="wa-top-btn" (click)="dialogs.openWhatsapp()">
              <span class="wa-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.43"/>
                </svg>
              </span>
              <span class="wa-label">Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <div class="main-nav-wrap">
        <div class="container main-nav-inner">
          <a routerLink="/" class="brand-link" aria-label="Aircom Technologies Home">
            <app-aircom-logo variant="light" [height]="50" />
          </a>

          <nav class="desktop-nav" aria-label="Primary Navigation">
            @for (item of navItems; track item.label) {
              @if (!item.children) {
                <a
                  [routerLink]="item.route"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  class="nav-link"
                >
                  {{ item.label }}
                </a>
              } @else {
                <button
                  type="button"
                  class="nav-link nav-dropdown-trigger"
                  [matMenuTriggerFor]="dropdownMenu"
                  routerLinkActive="active"
                >
                  <span>{{ item.label }}</span>
                  <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <mat-menu #dropdownMenu="matMenu" class="aircom-nav-menu">
                  <div class="dropdown-panel">
                    <a [routerLink]="item.route" class="dropdown-all-link">
                      View All {{ item.label }} →
                    </a>
                    <div class="dropdown-list">
                      @for (child of item.children; track child.route) {
                        <a [routerLink]="child.route" class="dropdown-item" mat-menu-item>
                          <span class="dd-icon">
                            <app-tech-icon [name]="child.icon || 'check'" [size]="18" color="#2457A7" />
                          </span>
                          <span class="dd-text">
                            <strong>{{ child.label }}</strong>
                          </span>
                        </a>
                      }
                    </div>
                  </div>
                </mat-menu>
              }
            }
          </nav>

          <div class="header-actions">
            <button type="button" class="btn-orange quote-cta" (click)="dialogs.openQuote()">
              Get a Quote
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              class="hamburger-btn"
              [class.is-open]="mobileOpen()"
              (click)="toggleMobile()"
              [attr.aria-expanded]="mobileOpen()"
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (mobileOpen()) {
        <div class="mobile-backdrop" (click)="closeMobile()"></div>
        <aside class="mobile-drawer" aria-label="Mobile Navigation">
          <div class="mobile-drawer-head">
            <app-aircom-logo variant="light" [height]="44" />
            <button type="button" class="drawer-close" (click)="closeMobile()" aria-label="Close menu">×</button>
          </div>

          <nav class="mobile-nav-list">
            @for (item of navItems; track item.label) {
              @if (!item.children) {
                <a
                  [routerLink]="item.route"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  class="mobile-nav-link"
                  (click)="closeMobile()"
                >
                  {{ item.label }}
                </a>
              } @else {
                <div class="mobile-accordion">
                  <button
                    type="button"
                    class="mobile-acc-btn"
                    (click)="toggleAccordion(item.label)"
                    [attr.aria-expanded]="expandedGroup() === item.label"
                  >
                    <span>{{ item.label }}</span>
                    <span class="acc-plus">{{ expandedGroup() === item.label ? '−' : '+' }}</span>
                  </button>
                  @if (expandedGroup() === item.label) {
                    <div class="mobile-acc-body">
                      <a [routerLink]="item.route" class="mobile-sub-link all-link" (click)="closeMobile()">
                        All {{ item.label }} →
                      </a>
                      @for (child of item.children; track child.route) {
                        <a [routerLink]="child.route" class="mobile-sub-link" (click)="closeMobile()">
                          {{ child.label }}
                        </a>
                      }
                    </div>
                  }
                </div>
              }
            }
          </nav>

          <div class="mobile-drawer-footer">
            <button type="button" class="btn-orange" style="width:100%;" (click)="closeMobile(); dialogs.openQuote()">
              Get a Quote →
            </button>
            <div class="drawer-contacts">
              <a [href]="contact.phoneHref">{{ contact.phone }}</a>
              <a [href]="'mailto:' + contact.salesEmail">{{ contact.salesEmail }}</a>
            </div>
          </div>
        </aside>
      }
    </header>
  `
})
export class HeaderComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly dialogs = inject(DialogLauncherService);
  readonly contact = CONTACT_INFO;
  readonly navItems = MAIN_NAV_ITEMS;

  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);
  readonly expandedGroup = signal<string | null>('Services');

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 24);
    }
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleAccordion(label: string): void {
    this.expandedGroup.update((curr) => (curr === label ? null : label));
  }
}

