import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INDUSTRIES_DATA } from '../../../core/data/site.data';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';
import { TechIconComponent } from '../../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-industries-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TechIconComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Industries' }]" />
        <span class="hero-badge">8 Core Verticals</span>
        <h1>Industries We Serve</h1>
        <p>Tailored ERPNext, TallyPrime, biometric, and IT infrastructure solutions built around sector-specific workflows.</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="card-grid-2">
          @for (ind of industries; track ind.slug) {
            <a [routerLink]="['/industries', ind.slug]" class="feature-box" style="padding:0;overflow:hidden;display:flex;flex-direction:column;" appScrollReveal="up">
              <img [src]="ind.image" [alt]="ind.name" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" />
              <div style="padding:20px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <app-tech-icon [name]="ind.icon" [size]="24" color="#2457A7" />
                  <h3 style="margin:0;">{{ ind.name }}</h3>
                </div>
                <p style="margin-bottom:10px;">{{ ind.shortDesc }}</p>
                <span style="font-size:0.84rem;font-weight:700;color:#F59E0B;">Explore Solutions →</span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <app-cta-banner />
  `
})
export class IndustriesListComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly industries = INDUSTRIES_DATA;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Industries We Serve | Aircom Technologies',
      description:
        'Industry-tailored ERP and IT infrastructure for Retail, Hospitality, Jewellery, Construction, Healthcare, Manufacturing, Finance, and Education.',
      path: '/industries'
    });
  }
}

