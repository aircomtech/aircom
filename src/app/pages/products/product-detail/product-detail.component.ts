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
      <section class="page-hero">
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
          </div>
          <div class="card-grid-2">
            @for (cap of p.capabilities; track cap.title) {
              <div class="feature-box" appScrollReveal="up">
                <app-tech-icon [name]="cap.icon" [size]="26" color="#2457A7" />
                <h3>{{ cap.title }}</h3>
                <p>{{ cap.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <h2 style="margin-bottom:20px;">Related Solutions</h2>
          <div class="card-grid-2">
            @for (rel of relatedProducts(); track rel.slug) {
              <a [routerLink]="['/products', rel.slug]" class="feature-box">
                <app-tech-icon [name]="rel.icon" [size]="26" color="#2457A7" />
                <h3>{{ rel.title }}</h3>
                <p>{{ rel.shortDesc }}</p>
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

