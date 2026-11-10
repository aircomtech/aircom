import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { SERVICES_DATA } from '../../../core/data/site.data';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';
import { TechIconComponent } from '../../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TechIconComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    @if (service(); as s) {
      <section class="page-hero">
        <div class="container">
          <div class="detail-hero-grid">
            <div>
              <app-breadcrumb [items]="[{ label: 'Services', route: '/services' }, { label: s.shortTitle }]" />
              <span class="hero-badge">{{ s.category }}</span>
              <h1>{{ s.title }}</h1>
              <p>{{ s.tagline }}</p>
              <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:22px;">
                <button type="button" class="btn-orange" (click)="dialogs.openInquiry({ mode: 'service', title: s.title })">
                  Request Service Proposal →
                </button>
                <button type="button" class="btn-outline-navy" (click)="dialogs.openWhatsapp(s.title)">
                  Discuss on WhatsApp
                </button>
              </div>
            </div>
            <div class="detail-visual-box">
              <img [src]="s.heroImage" [alt]="s.title" />
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="card-grid-2" style="align-items:start;">
            <div appScrollReveal="left">
              <h2 style="font-size:1.75rem;margin-bottom:12px;">Solution Overview</h2>
              <p style="color:#334155;font-size:1rem;margin-bottom:18px;">{{ s.overview }}</p>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                @for (h of s.highlights; track h) {
                  <span style="background:#EFF6FF;border:1px solid #BFDBFE;color:#102A63;padding:6px 14px;border-radius:999px;font-size:0.84rem;font-weight:600;">
                    {{ h }}
                  </span>
                }
              </div>
            </div>
            <div appScrollReveal="right">
              <h3 style="margin-bottom:12px;">Key Deliverables</h3>
              <ul class="check-list">
                @for (d of s.deliverables; track d) {
                  <li>{{ d }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section alt-bg">
        <div class="container">
          <div class="section-header" appScrollReveal="up">
            <h2>Core Capabilities &amp; Features</h2>
          </div>
          <div class="card-grid-2">
            @for (f of s.features; track f.title) {
              <div class="feature-box" appScrollReveal="up">
                <app-tech-icon [name]="f.icon" [size]="26" color="#2457A7" />
                <h3>{{ f.title }}</h3>
                <p>{{ f.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="card-grid-2">
            <div appScrollReveal="left">
              <h2>Business Benefits</h2>
              <ul class="check-list">
                @for (b of s.benefits; track b) {
                  <li>{{ b }}</li>
                }
              </ul>
            </div>
            <div appScrollReveal="right">
              <h2>Frequently Asked Questions</h2>
              <div style="display:grid;gap:12px;">
                @for (faq of s.faqs; track faq.question) {
                  <div class="feature-box">
                    <h3 style="margin-top:0;font-size:1rem;color:#102A63;">{{ faq.question }}</h3>
                    <p>{{ faq.answer }}</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section alt-bg">
        <div class="container">
          <h2 style="margin-bottom:20px;">Related Services</h2>
          <div class="card-grid-3">
            @for (rel of relatedServices(); track rel.slug) {
              <a [routerLink]="['/services', rel.slug]" class="feature-box">
                <app-tech-icon [name]="rel.icon" [size]="26" color="#2457A7" />
                <h3>{{ rel.title }}</h3>
                <p>{{ rel.shortDesc }}</p>
              </a>
            }
          </div>
        </div>
      </section>

      <app-cta-banner
        [title]="'Start Your ' + s.shortTitle + ' Project'"
        [preselectedService]="s.title"
      />
    } @else {
      <section class="page-section">
        <div class="container" style="text-align:center;">
          <h1>Service Not Found</h1>
          <p>The requested service could not be found.</p>
          <a routerLink="/services" class="btn-orange">Browse All Services</a>
        </div>
      </section>
    }
  `
})
export class ServiceDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly dialogs = inject(DialogLauncherService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') || '')));
  readonly service = computed(() => SERVICES_DATA.find((item) => item.slug === this.slug()));
  readonly relatedServices = computed(() => {
    const curr = this.service();
    if (!curr) {
      return [];
    }
    return SERVICES_DATA.filter((item) => curr.relatedSlugs.includes(item.slug));
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const item = SERVICES_DATA.find((s) => s.slug === params.get('slug'));
      if (item) {
        this.seo.updateSeo({
          title: item.seoTitle,
          description: item.seoDescription,
          path: `/services/${item.slug}`,
          schemas: [
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: item.title,
              provider: { '@type': 'Organization', name: 'Aircom Technologies' },
              description: item.overview
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: item.faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer }
              }))
            }
          ]
        });
      }
    });
  }
}

