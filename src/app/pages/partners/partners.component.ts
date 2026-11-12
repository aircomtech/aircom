import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PARTNERS_DATA } from '../../core/data/site.data';
import { PartnerItem } from '../../core/models/site.models';
import { ContentService } from '../../core/services/content.service';
import { DialogLauncherService } from '../../core/services/dialog-launcher.service';
import { SeoService } from '../../core/services/seo.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [BreadcrumbComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../_inner-page.scss',
  styles: [`
    .partners-filter-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-bottom: 34px;
    }

    .partner-filter-btn {
      padding: 9px 18px;
      border-radius: 999px;
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
      color: #102A63;
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #2457A7;
        background: #EFF6FF;
      }

      &.active {
        background: linear-gradient(135deg, #102A63 0%, #2457A7 100%);
        color: #FFFFFF;
        border-color: transparent;
        box-shadow: 0 6px 16px rgba(16, 42, 99, 0.22);
      }
    }

    .partner-card {
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid #DCE6F5;
      border-radius: 18px;
      background: #FFFFFF;
      box-shadow: 0 12px 30px rgba(13, 27, 62, 0.06);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 42px rgba(13, 27, 62, 0.12);
      }
    }

    .partner-media {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      background: #0D1B3E;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.35s ease;
      }

      .partner-card:hover & img {
        transform: scale(1.04);
      }
    }

    .partner-tier-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(13, 27, 62, 0.88);
      backdrop-filter: blur(8px);
      color: #FCD34D;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid rgba(252, 211, 77, 0.35);
    }

    .partner-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .partner-category {
      font-size: 0.74rem;
      font-weight: 700;
      color: #0BA8EA;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }

    .partner-title {
      font-size: 1.22rem;
      font-weight: 700;
      color: #102A63;
      margin: 0 0 6px;
    }

    .partner-tagline {
      font-size: 0.86rem;
      font-weight: 600;
      color: #2457A7;
      margin: 0 0 10px;
    }

    .partner-desc {
      font-size: 0.91rem;
      color: #475569;
      line-height: 1.58;
      margin: 0 0 16px;
      flex: 1;
    }

    .partner-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;

      span {
        font-size: 0.75rem;
        font-weight: 600;
        background: #F1F5F9;
        color: #1E293B;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid #E2E8F0;
      }
    }

    .partner-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-top: 14px;
      border-top: 1px solid #EEF3FB;
    }

    .partner-highlights-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 16px;
      margin-bottom: 36px;
    }

    .highlight-pill-box {
      background: #FFFFFF;
      border: 1px solid #DCE6F5;
      border-radius: 14px;
      padding: 18px 20px;
      text-align: center;
      box-shadow: 0 8px 22px rgba(13, 27, 62, 0.05);

      strong {
        display: block;
        font-size: 1.15rem;
        color: #102A63;
        margin-bottom: 4px;
      }

      span {
        font-size: 0.84rem;
        color: #475569;
      }
    }
  `],
  template: `
    <section class="page-hero page-hero--solutions">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Partners & Resellers' }]" />
        <span class="hero-badge">Authorized Ecosystem &amp; Global Alliances</span>
        <h1>Business Partners &amp; Authorized Resellers</h1>
        <p>
          Aircom Technologies collaborates with leading ERP, accounting, cloud, cybersecurity, and biometric hardware brands to deliver genuine licensing, seamless integration, and single-point enterprise support.
        </p>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="partner-highlights-strip" appScrollReveal="up">
          <div class="highlight-pill-box">
            <strong>{{ partners().length }}+ Alliances</strong>
            <span>Software, Cloud &amp; Hardware Partners</span>
          </div>
          <div class="highlight-pill-box">
            <strong>Authorized Reseller</strong>
            <span>Genuine Licensing &amp; Hardware Warranty</span>
          </div>
          <div class="highlight-pill-box">
            <strong>Certified Integration</strong>
            <span>Unified API, TDL &amp; Biometric Connectors</span>
          </div>
          <div class="highlight-pill-box">
            <strong>17+ Years Experience</strong>
            <span>Single-Point Enterprise Accountability</span>
          </div>
        </div>

        <div class="partners-filter-bar" appScrollReveal="up">
          @for (cat of categories(); track cat) {
            <button
              type="button"
              class="partner-filter-btn"
              [class.active]="activeCategory() === cat"
              (click)="activeCategory.set(cat)"
            >
              {{ cat }}
            </button>
          }
        </div>

        <div class="card-grid-3">
          @for (partner of filteredPartners(); track partner.slug) {
            <article class="partner-card" appScrollReveal="up">
              <div class="partner-media">
                <img [src]="partner.image" [alt]="partner.name" />
                <span class="partner-tier-badge">{{ partner.tier }}</span>
              </div>
              <div class="partner-body">
                <span class="partner-category">{{ partner.category }}</span>
                <h2 class="partner-title">{{ partner.name }}</h2>
                <p class="partner-tagline">{{ partner.tagline }}</p>
                <p class="partner-desc">{{ partner.shortDesc }}</p>

                @if (partner.highlights && partner.highlights.length) {
                  <div class="partner-chips">
                    @for (h of partner.highlights; track h) {
                      <span>{{ h }}</span>
                    }
                  </div>
                }

                <div class="partner-footer">
                  <button
                    type="button"
                    (click)="openPartnerPopup(partner)"
                    style="background:none;border:none;padding:0;font-weight:700;color:#102A63;font-size:0.88rem;cursor:pointer;"
                  >
                    Partnership Overview →
                  </button>
                  <button
                    type="button"
                    (click)="dialogs.openQuote(partner.name)"
                    style="background:#FFF7ED;border:1px solid #FDBA74;color:#C2410C;border-radius:999px;padding:6px 14px;font-size:0.78rem;font-weight:700;cursor:pointer;"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-cta-banner
      title="Need Genuine Enterprise Licensing, Hardware or Certified Integration?"
      subtitle="Talk directly with Aircom Technologies—your authorized technology reseller &amp; ERP partner in Hyderabad."
      preselectedService="Enterprise Partner & Reseller Inquiry"
    />
  `
})
export class PartnersComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);
  readonly dialogs = inject(DialogLauncherService);

  partners = signal<PartnerItem[]>(PARTNERS_DATA);
  readonly activeCategory = signal<string>('All');
  readonly categories = computed(() => ['All', ...new Set(this.partners().map((p) => p.category))]);
  readonly filteredPartners = computed(() =>
    this.activeCategory() === 'All'
      ? this.partners()
      : this.partners().filter((p) => p.category === this.activeCategory())
  );

  ngOnInit(): void {
    this.partners.set(this.content.currentPartners);
    this.content.partners$.subscribe((list) => {
      this.partners.set(list);
    });

    this.seo.updateSeo({
      title: 'Business Partners & Authorized Resellers | Aircom Technologies',
      description:
        'Explore Aircom Technologies business partners and authorized reseller alliances including ERPNext, TallyPrime, Zoho, Salesforce, AWS, Microsoft, ZKTeco, eSSL, Hikvision, Fortinet, and Dell.',
      path: '/partners'
    });
  }

  openPartnerPopup(partner: PartnerItem): void {
    this.dialogs.openShowcase({
      badge: `${partner.tier} • ${partner.category}`,
      title: partner.name,
      subtitle: partner.tagline,
      image: partner.image,
      description: partner.overview || partner.shortDesc,
      highlights: partner.highlights || [],
      details: [
        { heading: 'Partnership Standing', text: `${partner.tier} serving multi-branch enterprises across India and global markets.` },
        { heading: 'Authorized Deployment & Support', text: 'End-to-end procurement, certified installation, API integration, and SLA-backed maintenance.' }
      ],
      inquiryTitle: `${partner.name} - Licensing & Implementation`,
      inquiryMode: 'service'
    });
  }
}

