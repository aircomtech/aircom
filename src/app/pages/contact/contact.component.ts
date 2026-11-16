import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CONTACT_INFO } from '../../core/data/site.data';
import { BranchLocation } from '../../core/models/site.models';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ContactSectionComponent } from '../../shared/components/contact-section/contact-section.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbComponent, ContactSectionComponent],
  styleUrl: '../_inner-page.scss',
  template: `
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Contact Us' }]" />
        <span class="hero-badge">Multi-Branch Presence</span>
        <h1>Contact Aircom Technologies</h1>
        <p>Headquartered in Hyderabad with strategic regional offices in Bangalore and Mumbai, serving clients across India and globally.</p>
      </div>
    </section>

    <!-- Branch Offices Section -->
    <section class="page-section" style="padding-top:48px;padding-bottom:32px;">
      <div class="container">
        <div class="section-header" style="text-align:center;margin-bottom:36px;">
          <span style="display:inline-block;padding:4px 14px;border-radius:20px;background:#EBF5FF;color:#2457A7;font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">
            Our Locations
          </span>
          <h2 style="font-size:2.2rem;color:#0D1B3E;margin-bottom:12px;">Our Branch Offices &amp; Facilities</h2>
          <p style="color:#64748B;max-width:680px;margin:0 auto;">
            Visit our corporate headquarters or regional branch offices. Click any location card to view its interactive Google Map and directions.
          </p>
        </div>

        <div class="card-grid-3">
          @for (loc of branches; track loc.id) {
            <div
              class="feature-box"
              [style.borderColor]="selectedBranch?.id === loc.id ? '#0BA8EA' : '#E2E8F0'"
              [style.boxShadow]="selectedBranch?.id === loc.id ? '0 12px 30px rgba(11,168,234,0.18)' : '0 4px 12px rgba(13,27,62,0.06)'"
              style="padding:28px 24px;border-radius:18px;border-width:2px;border-style:solid;background:#FFFFFF;transition:all 0.25s ease;display:flex;flex-direction:column;cursor:pointer;"
              (click)="selectBranch(loc)"
            >
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:14px;">
                <div style="width:44px;height:44px;border-radius:12px;background:#F0F7FF;color:#2457A7;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">
                  🏢
                </div>
                @if (loc.isHeadquarters) {
                  <span style="background:linear-gradient(135deg, #F59E0B, #D97706);color:#FFFFFF;padding:4px 10px;border-radius:12px;font-size:0.72rem;font-weight:700;letter-spacing:0.04em;">
                    HEADQUARTERS
                  </span>
                } @else {
                  <span style="background:#EBF5FF;color:#2457A7;padding:4px 10px;border-radius:12px;font-size:0.72rem;font-weight:700;">
                    REGIONAL BRANCH
                  </span>
                }
              </div>

              <h3 style="font-size:1.25rem;color:#0D1B3E;margin-bottom:8px;">{{ loc.name }}</h3>
              
              <div style="margin-bottom:12px;display:flex;gap:8px;color:#475569;font-size:0.9rem;line-height:1.5;">
                <span style="font-size:1.1rem;flex-shrink:0;">📍</span>
                <span>{{ loc.address }}</span>
              </div>

              <div style="margin-top:auto;padding-top:14px;border-top:1px solid #F1F5F9;display:flex;flex-direction:column;gap:8px;font-size:0.88rem;">
                <a [href]="'tel:' + loc.phone" style="display:inline-flex;align-items:center;gap:8px;color:#2457A7;text-decoration:none;font-weight:600;" (click)="$event.stopPropagation()">
                  <span>📞</span>
                  <span>{{ loc.phone }}</span>
                </a>
                <a [href]="'mailto:' + loc.email" style="display:inline-flex;align-items:center;gap:8px;color:#64748B;text-decoration:none;" (click)="$event.stopPropagation()">
                  <span>✉️</span>
                  <span>{{ loc.email }}</span>
                </a>
                <div style="display:inline-flex;align-items:center;gap:8px;color:#64748B;font-size:0.82rem;">
                  <span>⏰</span>
                  <span>{{ loc.workingHours }}</span>
                </div>
              </div>

              <button
                type="button"
                style="margin-top:16px;width:100%;padding:8px 0;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all 0.2s;"
                [style.background]="selectedBranch?.id === loc.id ? '#0BA8EA' : '#F1F5F9'"
                [style.color]="selectedBranch?.id === loc.id ? '#FFFFFF' : '#334155'"
              >
                {{ selectedBranch?.id === loc.id ? '✓ Currently Viewing on Map' : 'Select & View Map →' }}
              </button>
            </div>
          }
        </div>

        <!-- Interactive Google Map Frame for Selected Branch -->
        <div style="margin-top:36px;border-radius:20px;overflow:hidden;border:1px solid #CBD5E1;box-shadow:0 12px 36px rgba(13,27,62,0.08);background:#FFFFFF;">
          <div style="padding:14px 20px;background:#0D1B3E;color:#FFFFFF;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:1.2rem;">📍</span>
              <strong>{{ selectedBranch?.name || 'Aircom Technologies Location' }}</strong>
              <span style="color:rgba(255,255,255,0.7);font-size:0.85rem;">— {{ selectedBranch?.city }}, {{ selectedBranch?.state }}</span>
            </div>
            @if (directMapLink) {
              <a
                [href]="directMapLink"
                target="_blank"
                rel="noopener noreferrer"
                style="display:inline-flex;align-items:center;gap:6px;background:#F59E0B;color:#0D1B3E;padding:6px 14px;border-radius:8px;font-size:0.82rem;font-weight:700;text-decoration:none;"
              >
                Open in Google Maps ↗
              </a>
            }
          </div>
          <iframe
            [src]="safeMapUrl"
            width="100%"
            height="380"
            style="border:0;display:block;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            [title]="'Aircom Technologies Map - ' + (selectedBranch?.name || 'Location')"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- Main Inquiry & Contact Form -->
    <app-contact-section />
  `
})
export class ContactComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);
  private readonly sanitizer = inject(DomSanitizer);

  contact = { ...CONTACT_INFO };
  branches: BranchLocation[] = [];
  selectedBranch: BranchLocation | null = null;
  safeMapUrl!: SafeResourceUrl;
  directMapLink = '';

  ngOnInit(): void {
    if (this.content.currentSettings.contactInfo) {
      this.contact = { ...this.contact, ...this.content.currentSettings.contactInfo };
    }
    this.branches = this.content.currentLocations.filter((b) => b.enabled !== false);
    if (this.branches.length > 0) {
      this.selectBranch(this.branches[0]);
    } else {
      this.updateFallbackMap();
    }

    this.content.locations$.subscribe((locs) => {
      this.branches = locs.filter((b) => b.enabled !== false);
      if (!this.selectedBranch && this.branches.length > 0) {
        this.selectBranch(this.branches[0]);
      }
    });

    this.content.settings$.subscribe((st) => {
      if (st.contactInfo) {
        this.contact = { ...this.contact, ...st.contactInfo };
      }
    });

    this.seo.updateSeo({
      title: 'Contact Us | Aircom Technologies Hyderabad, Bangalore & Mumbai',
      description:
        'Contact Aircom Technologies headquarters in Hyderabad or our regional branch offices in Bangalore and Mumbai. Phone: +91 77998 99429 | Email: sales@aircomtech.com',
      path: '/contact'
    });
  }

  selectBranch(branch: BranchLocation): void {
    this.selectedBranch = branch;
    const embed = branch.mapEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embed);
    this.directMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;
  }

  private updateFallbackMap(): void {
    const query = encodeURIComponent(`Aircom Technologies, ${this.contact.address}`);
    const embedUrl = `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    this.directMapLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }
}

