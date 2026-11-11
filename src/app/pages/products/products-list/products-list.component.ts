import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS_DATA } from '../../../core/data/site.data';
import { ProductItem } from '../../../core/models/site.models';
import { ContentService } from '../../../core/services/content.service';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';
import { TechIconComponent } from '../../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TechIconComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    <section class="page-hero page-hero--solutions">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Products' }]" />
        <span class="hero-badge">Enterprise Solution Categories</span>
        <h1>Innovative Products for a Smarter Business</h1>
        <p>Configured enterprise solution suites integrating Cloud ERP, Business Analytics, Security, Workflow Automation, and Managed IT Support.</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="card-grid-3">
          @for (p of products; track p.slug) {
            <div class="feature-box" style="padding:0;overflow:hidden;display:flex;flex-direction:column;" appScrollReveal="up">
              <img [src]="p.image" [alt]="p.title" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" />
              <div style="padding:20px;display:flex;flex-direction:column;flex:1;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                  <app-tech-icon [name]="p.icon" [size]="22" color="#2457A7" />
                  <span style="font-size:0.74rem;font-weight:700;color:#F59E0B;text-transform:uppercase;">{{ p.categoryLabel }}</span>
                </div>
                <h3 style="margin-top:0;">{{ p.title }}</h3>
                <p style="flex:1;margin-bottom:16px;">{{ p.shortDesc }}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
                  <a [routerLink]="['/products', p.slug]" class="btn-navy" style="padding:8px 16px;font-size:0.84rem;">
                    Explore Product →
                  </a>
                  <button
                    type="button"
                    (click)="dialogs.openInquiry({ mode: 'product', title: p.title })"
                    style="background:transparent;border:1.5px solid #F59E0B;color:#B45309;border-radius:999px;padding:7px 14px;font-size:0.8rem;font-weight:600;cursor:pointer;"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <app-cta-banner />
  `
})
export class ProductsListComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);
  readonly dialogs = inject(DialogLauncherService);
  products: ProductItem[] = PRODUCTS_DATA;

  ngOnInit(): void {
    this.products = this.content.currentProducts;
    this.content.products$.subscribe((p) => (this.products = p));

    this.seo.updateSeo({
      title: 'Enterprise Product Solutions | Aircom Technologies',
      description:
        'Explore Aircom Technologies solution categories: Cloud ERP Solution, Business Analytics Platform, Security Solutions, Automation Tools, and IT Support Services.',
      path: '/products'
    });
  }
}

