import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABOUT_CONTENT, HERO_STATS, WHY_CHOOSE_ITEMS } from '../../core/data/site.data';
import { DialogLauncherService } from '../../core/services/dialog-launcher.service';
import { SeoService } from '../../core/services/seo.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { TechIconComponent } from '../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TechIconComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../_inner-page.scss',
  template: `
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'About Us' }]" />
        <span class="hero-badge">Established 2009</span>
        <h1>{{ about.heading }}</h1>
        <p>{{ about.description }}</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="detail-hero-grid">
          <div appScrollReveal="left">
            <img [src]="about.image" alt="Aircom Technologies enterprise building visual" style="border-radius:20px;box-shadow:0 20px 44px rgba(16,42,99,0.14);width:100%;" />
          </div>
          <div appScrollReveal="right">
            <h2 style="font-size:1.8rem;margin-bottom:14px;">Bridging Enterprise Software &amp; Resilient Infrastructure</h2>
            <p style="color:#334155;margin-bottom:18px;">
              Headquartered in Secunderabad, Telangana, Aircom Technologies has spent over 17 years helping growing enterprises across India and global markets modernize operations. Unlike single-discipline vendors, our engineers unite ERPNext, TallyPrime accounting sync, HRMS &amp; biometric hardware, CRM workflows, and cloud/on-premise IT infrastructure under one accountable roof.
            </p>
            <div class="card-grid-2">
              @for (stat of stats; track stat.label) {
                <div class="feature-box" style="padding:16px;">
                  <strong style="display:block;font-size:1.15rem;color:#102A63;">{{ stat.value }}</strong>
                  <span style="font-size:0.85rem;color:#2457A7;font-weight:600;">{{ stat.label }}</span>
                </div>
              }
            </div>
            <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;">
              <a routerLink="/services" class="btn-orange">Explore Services →</a>
              <button type="button" class="btn-outline-navy" (click)="dialogs.openContact()">Talk to Our Team</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section alt-bg">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <div class="eyebrow-row">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">Our Foundation</span>
            <span class="eyebrow-line right"></span>
          </div>
          <h2>Vision, Mission &amp; Core Values</h2>
        </div>

        <div class="card-grid-2" style="margin-bottom:24px;">
          <div class="feature-box" appScrollReveal="left">
            <app-tech-icon name="eye" [size]="28" color="#102A63" />
            <h3>Our Vision</h3>
            <p>{{ about.vision }}</p>
          </div>
          <div class="feature-box" appScrollReveal="right">
            <app-tech-icon name="rocket" [size]="28" color="#F59E0B" />
            <h3>Our Mission</h3>
            <p>{{ about.mission }}</p>
          </div>
        </div>

        <div class="feature-box" appScrollReveal="up">
          <h3 style="margin-top:0;">Our 8 Core Values</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin-top:14px;">
            @for (val of about.coreValues; track val) {
              <div style="background:#F4F7FC;border:1px solid #DCE6F5;padding:12px 14px;border-radius:12px;font-weight:600;color:#102A63;font-size:0.9rem;">
                ★ {{ val }}
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <h2>Why Businesses Partner With Aircom</h2>
        </div>
        <div class="card-grid-2">
          @for (item of whyItems; track item.title) {
            <div class="feature-box" appScrollReveal="up">
              <app-tech-icon [name]="item.icon" [size]="28" [color]="item.accent" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <app-cta-banner />
  `
})
export class AboutComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly dialogs = inject(DialogLauncherService);
  readonly about = ABOUT_CONTENT;
  readonly stats = HERO_STATS;
  readonly whyItems = WHY_CHOOSE_ITEMS;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'About Aircom Technologies | Trusted IT & ERP Partner Since 2009',
      description:
        'Founded in 2009, Aircom Technologies delivers ERPNext, TallyPrime integration, HRMS, cloud hosting, and enterprise IT infrastructure solutions.',
      path: '/about'
    });
  }
}

