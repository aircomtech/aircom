import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABOUT_CONTENT, ABOUT_PILLARS, HERO_STATS, WHY_CHOOSE_ITEMS } from '../../core/data/site.data';
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
            <div style="border-radius:22px;overflow:hidden;border:4px solid #FFFFFF;outline:1px solid #BFDBFE;box-shadow:0 24px 54px rgba(13,27,62,0.2);">
              <img [src]="about.image" alt="Aircom Technologies corporate glass building" style="width:100%;display:block;" />
            </div>
          </div>
          <div appScrollReveal="right">
            <h2 style="font-size:1.85rem;margin-bottom:14px;">Bridging Enterprise Software &amp; Resilient Infrastructure</h2>
            <p style="color:#334155;margin-bottom:18px;">
              Headquartered in Secunderabad, Telangana, Aircom Technologies has spent over 17 years helping growing enterprises across India and global markets modernize operations. Unlike single-discipline vendors, our engineers unite ERPNext, TallyPrime accounting sync, HRMS &amp; biometric hardware, CRM workflows, and cloud/on-premise IT infrastructure under one accountable roof.
            </p>
            <div class="card-grid-2">
              @for (stat of stats; track stat.label; let idx = $index) {
                <button
                  type="button"
                  class="feature-box"
                  style="padding:16px;text-align:left;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:space-between;gap:10px;"
                  (click)="openWhy(whyItems[idx] || whyItems[0])"
                >
                  <div>
                    <strong style="display:block;font-size:1.15rem;color:#102A63;">{{ stat.value }}</strong>
                    <span style="font-size:0.85rem;color:#2457A7;font-weight:600;">{{ stat.label }}</span>
                  </div>
                  <span style="color:#F59E0B;font-weight:700;" aria-hidden="true">→</span>
                </button>
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

    <!-- Vision, Mission & Core Values with Animations + Popups -->
    <section class="page-section alt-bg">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <div class="eyebrow-row">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">Our Foundation</span>
            <span class="eyebrow-line right"></span>
          </div>
          <h2>Vision, Mission &amp; Core Values</h2>
          <p>Click any foundation card below to open its visual overview and commitment breakdown.</p>
        </div>

        <div class="card-grid-3">
          @for (pillar of pillars; track pillar.key) {
            <button
              type="button"
              class="feature-box"
              style="padding:0;overflow:hidden;text-align:left;cursor:pointer;display:flex;flex-direction:column;font-family:inherit;"
              appScrollReveal="up"
              (click)="openPillar(pillar)"
            >
              <img [src]="pillar.image" [alt]="pillar.title" style="width:100%;height:155px;object-fit:cover;" />
              <div style="padding:20px;display:flex;flex-direction:column;flex:1;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <app-tech-icon [name]="pillar.icon" [size]="24" [color]="pillar.accent" />
                  <h3 style="margin:0;">{{ pillar.title }}</h3>
                </div>
                <p style="flex:1;margin-bottom:14px;">{{ pillar.summary }}</p>
                <span style="font-size:0.82rem;font-weight:700;color:#F59E0B;">View Visual Details →</span>
              </div>
            </button>
          }
        </div>
      </div>
    </section>

    <!-- Why Businesses Partner With Aircom (Separate Pics + Pictorial Popups) -->
    <section class="page-section">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <h2>Why Businesses Partner With Aircom</h2>
          <p>Touch or click any partnership pillar to inspect its detailed visual blueprint and deliverables.</p>
        </div>
        <div class="card-grid-2">
          @for (item of whyItems; track item.title) {
            <button
              type="button"
              class="feature-box"
              style="padding:0;overflow:hidden;text-align:left;cursor:pointer;display:flex;flex-direction:column;font-family:inherit;"
              appScrollReveal="up"
              (click)="openWhy(item)"
            >
              <img [src]="item.image" [alt]="item.title" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" />
              <div style="padding:20px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <app-tech-icon [name]="item.icon" [size]="24" [color]="item.accent" />
                  <h3 style="margin:0;">{{ item.title }}</h3>
                </div>
                <p style="margin-bottom:10px;">{{ item.description }}</p>
                <span style="font-size:0.82rem;font-weight:700;color:#2457A7;">Open Visual Popup →</span>
              </div>
            </button>
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
  readonly pillars = ABOUT_PILLARS;
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

  openPillar(pillar: (typeof ABOUT_PILLARS)[number]): void {
    this.dialogs.openShowcase({
      badge: 'Aircom Foundation',
      title: pillar.title,
      subtitle: pillar.subtitle,
      image: pillar.image,
      description: pillar.summary,
      highlights: pillar.highlights,
      details: pillar.details,
      inquiryTitle: `${pillar.title} - Aircom Partnership`
    });
  }

  openWhy(item: (typeof WHY_CHOOSE_ITEMS)[number]): void {
    this.dialogs.openShowcase({
      badge: 'Why Partner With Aircom',
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      description: item.description,
      highlights: item.highlights,
      details: item.details,
      inquiryTitle: `${item.title} Inquiry`
    });
  }
}
