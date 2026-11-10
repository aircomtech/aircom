import { Component, inject, OnInit } from '@angular/core';
import { CONTACT_INFO } from '../../../core/data/site.data';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [BreadcrumbComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Privacy Policy' }]" />
        <h1>Privacy Policy</h1>
        <p>How Aircom Technologies handles inquiry information and website privacy.</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container" style="max-width:860px;display:grid;gap:18px;">
        <h2>1. Information We Collect</h2>
        <p>When you submit an inquiry, quote request, or support message through our website, we collect the contact details you voluntarily provide (such as name, company name, email address, phone number, and project requirements) solely to respond to your request.</p>
        <h2>2. How We Use Information</h2>
        <p>We use inquiry details to prepare proposals, coordinate technical consultations, and provide requested ERP, software integration, or IT infrastructure services. Aircom Technologies does not sell or rent client contact data to third parties.</p>
        <h2>3. Security &amp; Retention</h2>
        <p>We apply industry-standard access controls and retain business communications only as long as required for client service and statutory obligations.</p>
        <h2>4. Contact for Privacy Questions</h2>
        <p>For privacy inquiries, contact <a [href]="'mailto:' + contact.infoEmail" style="color:#2457A7;font-weight:600;">{{ contact.infoEmail }}</a> or write to {{ contact.address }}</p>
      </div>
    </section>
  `
})
export class PrivacyPolicyComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly contact = CONTACT_INFO;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Privacy Policy | Aircom Technologies',
      description: 'Privacy Policy for Aircom Technologies website and client inquiry communications.',
      path: '/privacy-policy'
    });
  }
}

