import { Component, inject, OnInit } from '@angular/core';
import { CONTACT_INFO } from '../../../core/data/site.data';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [BreadcrumbComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Terms & Conditions' }]" />
        <h1>Terms &amp; Conditions</h1>
        <p>Website usage terms for Aircom Technologies.</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container" style="max-width:860px;display:grid;gap:18px;">
        <h2>1. Scope of Website Information</h2>
        <p>Content on this website provides an overview of Aircom Technologies' ERP implementation, software integration, cloud, and IT infrastructure services. Formal project deliverables, timelines, and service-level agreements (SLAs) are governed by signed Statements of Work (SOW) or Annual Maintenance Contracts (AMC).</p>
        <h2>2. Third-Party Trademarks</h2>
        <p>Product names such as ERPNext, TallyPrime, Zoho, Salesforce, AWS, and Microsoft Azure belong to their respective owners and are referenced to describe Aircom Technologies' implementation and integration capabilities.</p>
        <h2>3. Contact</h2>
        <p>Questions regarding these terms may be sent to <a [href]="'mailto:' + contact.infoEmail" style="color:#2457A7;font-weight:600;">{{ contact.infoEmail }}</a>.</p>
      </div>
    </section>
  `
})
export class TermsComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly contact = CONTACT_INFO;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Terms & Conditions | Aircom Technologies',
      description: 'Website terms and conditions for Aircom Technologies.',
      path: '/terms'
    });
  }
}

