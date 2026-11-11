import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_INFO, SERVICES_DATA } from '../../core/data/site.data';
import { ContentService } from '../../core/services/content.service';
import { DialogLauncherService } from '../../core/services/dialog-launcher.service';
import { AircomLogoComponent } from '../../shared/components/aircom-logo/aircom-logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, AircomLogoComponent],
  styleUrl: './footer.component.scss',
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Column 1: Logo & Tagline -->
          <div class="footer-col brand-col">
            <a routerLink="/" aria-label="Aircom Technologies Home">
              <app-aircom-logo variant="dark" [height]="76" />
            </a>
            <p class="footer-about">
              Enterprise ERP, TallyPrime integration, HRMS automation, IT infrastructure, and cloud solutions trusted since 2009.
            </p>
            <button type="button" class="newsletter-trigger" (click)="dialogs.openNewsletter()">
              Subscribe to Updates →
            </button>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/services">Services</a></li>
              <li><a routerLink="/products">Products</a></li>
              <li><a routerLink="/industries">Industries</a></li>
              <li><a routerLink="/blog">Blog</a></li>
              <li><a routerLink="/contact">Contact Us</a></li>
            </ul>
          </div>

          <!-- Column 3: Our Services -->
          <div class="footer-col">
            <h3>Our Services</h3>
            <ul>
              @for (s of featuredServices; track s.slug) {
                <li><a [routerLink]="['/services', s.slug]">{{ s.shortTitle }}</a></li>
              }
            </ul>
          </div>

          <!-- Column 4: Contact Details -->
          <div class="footer-col">
            <h3>Contact Us</h3>
            <ul class="contact-list">
              <li>
                <span class="c-icon">📞</span>
                <a [href]="contact.phoneHref">{{ contact.phone }}</a>
              </li>
              <li>
                <span class="c-icon">✉️</span>
                <a [href]="'mailto:' + contact.salesEmail">{{ contact.salesEmail }}</a>
              </li>
              <li>
                <span class="c-icon">✉️</span>
                <a [href]="'mailto:' + contact.infoEmail">{{ contact.infoEmail }}</a>
              </li>
              <li>
                <span class="c-icon">📍</span>
                <span>{{ contact.address }}</span>
              </li>
            </ul>
          </div>

          <!-- Column 5: Social Media -->
          <div class="footer-col">
            <h3>Follow Us</h3>
            <div class="social-row">
              <a [href]="contact.socials[0].url" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="soc-btn li">in</a>
              <a [href]="contact.socials[1].url" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="soc-btn yt">▶</a>
              <a [href]="contact.socials[2].url" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="soc-btn fb">f</a>
              <a [href]="contact.socials[3].url" target="_blank" rel="noopener noreferrer" aria-label="X" class="soc-btn x">𝕏</a>
              <a [href]="contact.socials[4].url" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="soc-btn ig">◎</a>
            </div>
            <button type="button" class="wa-footer-pill" (click)="dialogs.openWhatsapp()">
              Chat on WhatsApp
            </button>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 Aircom Technologies. All Rights Reserved.</p>
          <div class="legal-links">
            <a routerLink="/privacy-policy">Privacy Policy</a>
            <span>|</span>
            <a routerLink="/terms">Terms &amp; Conditions</a>
            <span>|</span>
            <a routerLink="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {
  private readonly content = inject(ContentService);
  readonly dialogs = inject(DialogLauncherService);

  contact = CONTACT_INFO;
  featuredServices = SERVICES_DATA.slice(0, 6);
  copyrightText = `© ${new Date().getFullYear()} Aircom Technologies. All Rights Reserved.`;

  ngOnInit(): void {
    if (this.content.currentSettings.contactInfo) {
      this.contact = { ...this.contact, ...this.content.currentSettings.contactInfo };
    }
    if (this.content.currentSettings.footer?.copyrightText) {
      this.copyrightText = this.content.currentSettings.footer.copyrightText;
    }
    this.featuredServices = this.content.currentServices.slice(0, 6);

    this.content.settings$.subscribe((st) => {
      if (st.contactInfo) this.contact = { ...this.contact, ...st.contactInfo };
      if (st.footer?.copyrightText) this.copyrightText = st.footer.copyrightText;
    });

    this.content.services$.subscribe((svcs) => {
      this.featuredServices = svcs.slice(0, 6);
    });
  }
}

