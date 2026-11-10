import { Component, inject, OnInit } from '@angular/core';
import { CONTACT_INFO } from '../../core/data/site.data';
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
        <span class="hero-badge">Secunderabad Headquarters</span>
        <h1>Contact Aircom Technologies</h1>
        <p>{{ contact.workingHours }} &bull; {{ contact.address }}</p>
      </div>
    </section>

    <app-contact-section />
  `
})
export class ContactComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly contact = CONTACT_INFO;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Contact Us | Aircom Technologies',
      description:
        'Contact Aircom Technologies in Secunderabad, Telangana at +91 77998 99429 or sales@aircomtech.com for ERPNext, TallyPrime, and IT infrastructure inquiries.',
      path: '/contact'
    });
  }
}

