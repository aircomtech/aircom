import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { PRODUCTS_DATA } from '../../../core/data/site.data';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';
import { TechIconComponent } from '../../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TechIconComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    @if (product(); as p) {
      <section class="page-hero page-hero--solutions">
        <div class="container">
          <div class="detail-hero-grid">
            <div>
              <app-breadcrumb [items]="[{ label: 'Products', route: '/products' }, { label: p.title }]" />
              <span class="hero-badge">{{ p.categoryLabel }}</span>
              <h1>{{ p.title }}</h1>
              <p>{{ p.tagline }}</p>
              <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:22px;">
                <button type="button" class="btn-orange" (click)="dialogs.openInquiry({ mode: 'product', title: p.title })">
                  Request Solution Demo →
                </button>
                <button type="button" class="btn-outline-navy" (click)="dialogs.openQuote(p.title)">
                  Get Pricing Estimate
                </button>
              </div>
            </div>
            <div class="detail-visual-box">
              <img [src]="p.image" [alt]="p.title" />
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="card-grid-2" style="align-items:start;">
            <div appScrollReveal="left">
              <h2>Overview</h2>
              <p style="color:#334155;font-size:1rem;">{{ p.overview }}</p>
              <h3 style="margin-top:24px;">Deployment Options</h3>
              <ul class="check-list">
                @for (opt of p.deploymentOptions; track opt) {
                  <li>{{ opt }}</li>
                }
              </ul>
            </div>
            <div appScrollReveal="right">
              <h2>Key Business Outcomes</h2>
              <ul class="check-list">
                @for (b of p.benefits; track b) {
                  <li>{{ b }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section alt-bg">
        <div class="container">
          <div class="section-header" appScrollReveal="up">
            <h2>Core Capabilities</h2>
            <p>Click any capability below to view its visual deployment architecture and enterprise benefits.</p>
          </div>
          <div class="card-grid-2">
            @for (cap of p.capabilities; track cap.title; let i = $index) {
              <button
                type="button"
                class="feature-box"
                style="text-align:left;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;gap:8px;"
                appScrollReveal="up"
                (click)="openCapabilityPopup(p, cap)"
              >
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <app-tech-icon [name]="cap.icon" [size]="26" color="#2457A7" />
                  <span style="font-size:0.72rem;font-weight:700;color:#2457A7;background:#EFF6FF;padding:3px 10px;border-radius:999px;">
                    Capability 0{{ i + 1 }}
                  </span>
                </div>
                <h3 style="margin:4px 0 0;">{{ cap.title }}</h3>
                <p style="line-height:1.55;">{{ cap.description }} Configured with automated monitoring, granular role permissions, multi-branch reporting, and managed backup policies.</p>
                <span style="font-size:0.8rem;font-weight:700;color:#F59E0B;margin-top:4px;">View Pictorial Overview →</span>
              </button>
            }
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <h2 style="margin-bottom:20px;">Related Solutions</h2>
          <div class="card-grid-2">
            @for (rel of relatedProducts(); track rel.slug) {
              <a [routerLink]="['/products', rel.slug]" class="feature-box" style="padding:0;overflow:hidden;display:flex;flex-direction:column;" appScrollReveal="up">
                <img [src]="rel.image" [alt]="rel.title" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" />
                <div style="padding:18px;">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                    <app-tech-icon [name]="rel.icon" [size]="22" color="#2457A7" />
                    <h3 style="margin:0;">{{ rel.title }}</h3>
                  </div>
                  <p>{{ rel.shortDesc }}</p>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <app-cta-banner [title]="'Deploy ' + p.title + ' for Your Enterprise'" [preselectedService]="p.title" />
    } @else {
      <section class="page-section">
        <div class="container" style="text-align:center;">
          <h1>Product Solution Not Found</h1>
          <a routerLink="/products" class="btn-orange">View All Products</a>
        </div>
      </section>
    }
  `
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly dialogs = inject(DialogLauncherService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') || '')));
  readonly product = computed(() => PRODUCTS_DATA.find((item) => item.slug === this.slug()));
  readonly relatedProducts = computed(() => {
    const curr = this.product();
    return curr ? PRODUCTS_DATA.filter((item) => curr.relatedSlugs.includes(item.slug)) : [];
  });

  openCapabilityPopup(p: (typeof PRODUCTS_DATA)[number], cap: (typeof PRODUCTS_DATA)[number]['capabilities'][number]): void {
    this.dialogs.openShowcase({
      badge: p.title,
      title: cap.title,
      subtitle: p.tagline,
      image: p.image,
      description: `${cap.description} Configured and supported by Aircom Technologies with high-availability cloud or hybrid deployment options.`,
      highlights: p.deploymentOptions,
      details: p.benefits.map((b, idx) => ({ heading: `Business Outcome 0${idx + 1}`, text: b })),
      inquiryTitle: `${p.title} — ${cap.title}`,
      inquiryMode: 'product'
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const item = PRODUCTS_DATA.find((p) => p.slug === params.get('slug'));
      if (item) {
        this.seo.updateSeo({
          title: item.seoTitle,
          description: item.seoDescription,
          path: `/products/${item.slug}`
        });
      }
    });
  }
}

