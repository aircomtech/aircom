import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_POSTS, INDUSTRIES_DATA, PRODUCTS_DATA, SERVICES_DATA } from '../../../core/data/site.data';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-sitemap-page',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Sitemap' }]" />
        <h1>Website Sitemap</h1>
        <p>Quick navigation directory across all pages of Aircom Technologies.</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="card-grid-3">
          <div class="feature-box">
            <h3>Core Pages</h3>
            <ul style="display:grid;gap:8px;padding-left:18px;">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/services">All Services</a></li>
              <li><a routerLink="/products">All Products</a></li>
              <li><a routerLink="/industries">Industries We Serve</a></li>
              <li><a routerLink="/blog">Blog &amp; Insights</a></li>
              <li><a routerLink="/contact">Contact Us</a></li>
              <li><a routerLink="/privacy-policy">Privacy Policy</a></li>
              <li><a routerLink="/terms">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <div class="feature-box">
            <h3>Services</h3>
            <ul style="display:grid;gap:8px;padding-left:18px;">
              @for (s of services; track s.slug) {
                <li><a [routerLink]="['/services', s.slug]">{{ s.title }}</a></li>
              }
            </ul>
          </div>

          <div class="feature-box">
            <h3>Products, Industries &amp; Blog</h3>
            <ul style="display:grid;gap:8px;padding-left:18px;">
              @for (p of products; track p.slug) {
                <li><a [routerLink]="['/products', p.slug]">{{ p.title }}</a></li>
              }
              @for (i of industries; track i.slug) {
                <li><a [routerLink]="['/industries', i.slug]">{{ i.name }}</a></li>
              }
              @for (b of posts; track b.slug) {
                <li><a [routerLink]="['/blog', b.slug]">{{ b.title }}</a></li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SitemapPageComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly services = SERVICES_DATA;
  readonly products = PRODUCTS_DATA;
  readonly industries = INDUSTRIES_DATA;
  readonly posts = BLOG_POSTS;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Sitemap | Aircom Technologies',
      description: 'Complete directory of pages, services, product solutions, and industries at Aircom Technologies.',
      path: '/sitemap'
    });
  }
}

