import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { INDUSTRIES_DATA, SERVICES_DATA } from '../../../core/data/site.data';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';
import { TechIconComponent } from '../../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-industry-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TechIconComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    @if (industry(); as ind) {
      <section class="page-hero">
        <div class="container">
          <div class="detail-hero-grid">
            <div>
              <app-breadcrumb [items]="[{ label: 'Industries', route: '/industries' }, { label: ind.name }]" />
              <span class="hero-badge">Industry Solutions</span>
              <h1>{{ ind.name }} Technology Solutions</h1>
              <p>{{ ind.overview }}</p>
              <div style="margin-top:22px;display:flex;gap:12px;flex-wrap:wrap;">
                <button type="button" class="btn-orange" (click)="dialogs.openQuote(ind.name + ' IT / ERP Solution')">
                  Consult an Industry Specialist →
                </button>
              </div>
            </div>
            <div class="detail-visual-box">
              <img [src]="ind.image" [alt]="ind.name" />
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="card-grid-2">
            <div appScrollReveal="left">
              <h2>Common Industry Challenges</h2>
              <ul class="check-list">
                @for (c of ind.challenges; track c) {
                  <li>{{ c }}</li>
                }
              </ul>
            </div>
            <div appScrollReveal="right">
              <h2>How Aircom Solves Them</h2>
              <ul class="check-list">
                @for (sol of ind.solutions; track sol) {
                  <li>{{ sol }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section alt-bg">
        <div class="container">
          <h2 style="margin-bottom:20px;">Recommended Services for {{ ind.name }}</h2>
          <div class="card-grid-3">
            @for (srv of recommendedServices(); track srv.slug) {
              <a [routerLink]="['/services', srv.slug]" class="feature-box">
                <app-tech-icon [name]="srv.icon" [size]="26" color="#2457A7" />
                <h3>{{ srv.title }}</h3>
                <p>{{ srv.shortDesc }}</p>
              </a>
            }
          </div>
        </div>
      </section>

      <app-cta-banner [title]="'Modernize Your ' + ind.name + ' Operations'" />
    } @else {
      <section class="page-section">
        <div class="container" style="text-align:center;">
          <h1>Industry Not Found</h1>
          <a routerLink="/industries" class="btn-orange">View All Industries</a>
        </div>
      </section>
    }
  `
})
export class IndustryDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly dialogs = inject(DialogLauncherService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') || '')));
  readonly industry = computed(() => INDUSTRIES_DATA.find((i) => i.slug === this.slug()));
  readonly recommendedServices = computed(() => {
    const curr = this.industry();
    return curr ? SERVICES_DATA.filter((s) => curr.recommendedServices.includes(s.slug)) : [];
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const item = INDUSTRIES_DATA.find((i) => i.slug === params.get('slug'));
      if (item) {
        this.seo.updateSeo({
          title: item.seoTitle,
          description: item.seoDescription,
          path: `/industries/${item.slug}`
        });
      }
    });
  }
}

