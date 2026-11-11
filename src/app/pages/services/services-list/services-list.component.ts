import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES_DATA } from '../../../core/data/site.data';
import { ServiceItem } from '../../../core/models/site.models';
import { ContentService } from '../../../core/services/content.service';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';
import { TechIconComponent } from '../../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TechIconComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    <section class="page-hero page-hero--solutions">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Services' }]" />
        <span class="hero-badge">10 Specialized Practices</span>
        <h1>Comprehensive IT &amp; Business Solutions</h1>
        <p>From ERPNext implementation and TallyPrime automation to biometric hardware, cloud DevOps, and web platforms.</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="card-grid-3">
          @for (service of services; track service.slug) {
            <div class="feature-box" style="padding:0;overflow:hidden;display:flex;flex-direction:column;" appScrollReveal="up">
              <img [src]="service.heroImage" [alt]="service.title" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" />
              <div style="padding:20px;display:flex;flex-direction:column;flex:1;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <span style="width:44px;height:44px;border-radius:12px;background:#EFF6FF;display:inline-flex;align-items:center;justify-content:center;">
                    <app-tech-icon [name]="service.icon" [size]="22" color="#2457A7" />
                  </span>
                  <span style="font-size:0.74rem;font-weight:700;color:#F59E0B;text-transform:uppercase;">{{ service.category }}</span>
                </div>
                <h3>{{ service.title }}</h3>
                <p style="flex:1;margin-bottom:16px;">{{ service.shortDesc }}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:12px;border-top:1px solid #EEF3FB;">
                  <a [routerLink]="['/services', service.slug]" style="font-weight:700;color:#102A63;font-size:0.88rem;">
                    View Details →
                  </a>
                  <button
                    type="button"
                    (click)="openServicePopup(service)"
                    style="background:#FFF7ED;border:1px solid #FDBA74;color:#C2410C;border-radius:999px;padding:5px 12px;font-size:0.78rem;font-weight:600;cursor:pointer;"
                  >
                    Quick Visual
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
export class ServicesListComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);
  readonly dialogs = inject(DialogLauncherService);
  services: ServiceItem[] = SERVICES_DATA;

  ngOnInit(): void {
    this.services = this.content.currentServices;
    this.content.services$.subscribe((s) => (this.services = s));

    this.seo.updateSeo({
      title: 'IT & ERP Services | Aircom Technologies',
      description:
        'Explore ERPNext implementation, HRMS & payroll, biometric integration, CRM & TallyPrime sync, IT infrastructure, cloud hosting, and web development services.',
      path: '/services'
    });
  }

  openServicePopup(service: ServiceItem): void {
    this.dialogs.openShowcase({
      badge: service.category,
      title: service.title,
      subtitle: service.tagline,
      image: service.heroImage,
      description: service.overview,
      highlights: service.highlights,
      details: service.features.map((f) => ({ heading: f.title, text: f.description })),
      primaryRoute: `/services/${service.slug}`,
      primaryRouteLabel: 'Open Full Service Page →',
      inquiryTitle: service.title,
      inquiryMode: 'service'
    });
  }
}
