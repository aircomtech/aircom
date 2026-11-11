import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CONTACT_INFO, SERVICES_DATA } from '../../../core/data/site.data';
import { ContentService } from '../../../core/services/content.service';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';
import { SubmissionResult, SubmissionService } from '../../../core/services/submission.service';
import { InquiryResultBannerComponent } from '../../../features/shared/inquiry-result-banner.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    InquiryResultBannerComponent,
    ScrollRevealDirective
  ],
  styleUrl: './contact-section.component.scss',
  template: `
    <section class="contact-section" id="contact-quote">
      <div class="container">
        <div class="contact-grid">
          <!-- Left Info Column -->
          <div class="contact-info-panel" appScrollReveal="left">
            <span class="info-eyebrow">Connect With Experts</span>
            <h2>Let's Build Something Great Together</h2>
            <p class="info-lead">
              Looking for reliable ERP, IT infrastructure, or digital transformation solutions? Talk to our experts today.
            </p>

            <div class="info-cards">
              <a [href]="contact.phoneHref" class="info-card">
                <div class="ic-badge">📞</div>
                <div>
                  <span class="ic-label">Call Us Directly</span>
                  <strong>{{ contact.phone }}</strong>
                </div>
              </a>

              <button type="button" class="info-card btn-card" (click)="dialogs.openWhatsapp()">
                <div class="ic-badge wa">💬</div>
                <div>
                  <span class="ic-label">WhatsApp Consultation</span>
                  <strong>{{ contact.phone }} (Chat Now)</strong>
                </div>
              </button>

              <a [href]="'mailto:' + contact.salesEmail" class="info-card">
                <div class="ic-badge">✉️</div>
                <div>
                  <span class="ic-label">Sales &amp; Proposals</span>
                  <strong>{{ contact.salesEmail }}</strong>
                </div>
              </a>

              <a [href]="'mailto:' + contact.infoEmail" class="info-card">
                <div class="ic-badge">📩</div>
                <div>
                  <span class="ic-label">General Inquiries</span>
                  <strong>{{ contact.infoEmail }}</strong>
                </div>
              </a>

              <div class="info-card">
                <div class="ic-badge">📍</div>
                <div>
                  <span class="ic-label">Corporate Office</span>
                  <strong>{{ contact.address }}</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Form Column -->
          <div class="contact-form-card" appScrollReveal="right">
            <h3>Send Us a Project Inquiry</h3>
            <p class="form-sub">Fill in your details and select the solution area you are interested in.</p>

            <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
              <div class="cf-grid">
                <div class="cf-field">
                  <label for="cf-name">Full Name *</label>
                  <input id="cf-name" type="text" formControlName="fullName" placeholder="e.g. Rajesh Sharma" />
                  @if (showErr('fullName')) { <span class="cf-err">Full name is required (min 2 chars).</span> }
                </div>

                <div class="cf-field">
                  <label for="cf-company">Company Name *</label>
                  <input id="cf-company" type="text" formControlName="companyName" placeholder="Your organization" />
                  @if (showErr('companyName')) { <span class="cf-err">Company name is required.</span> }
                </div>

                <div class="cf-field">
                  <label for="cf-email">Email Address *</label>
                  <input id="cf-email" type="email" formControlName="email" placeholder="you@company.com" />
                  @if (showErr('email')) { <span class="cf-err">Please enter a valid email address.</span> }
                </div>

                <div class="cf-field">
                  <label for="cf-phone">Phone Number *</label>
                  <input id="cf-phone" type="tel" formControlName="phone" placeholder="+91 98XXX XXXXX" />
                  @if (showErr('phone')) { <span class="cf-err">Enter a valid phone number.</span> }
                </div>

                <div class="cf-field">
                  <label for="cf-service">Service Interested In *</label>
                  <select id="cf-service" formControlName="service">
                    @for (s of services; track s.slug) {
                      <option [value]="s.title">{{ s.title }}</option>
                    }
                    <option value="Cloud ERP / Analytics / Security">Cloud ERP / Analytics / Security</option>
                    <option value="General IT Consultation">General IT Consultation</option>
                  </select>
                </div>

                <div class="cf-field">
                  <label for="cf-subject">Subject *</label>
                  <input id="cf-subject" type="text" formControlName="subject" placeholder="Brief inquiry subject" />
                  @if (showErr('subject')) { <span class="cf-err">Please enter a subject.</span> }
                </div>

                <div class="cf-field full">
                  <label for="cf-msg">Message *</label>
                  <textarea id="cf-msg" rows="4" formControlName="message" placeholder="Tell us about your requirements, number of users, or timeline..."></textarea>
                  @if (showErr('message')) { <span class="cf-err">Please enter at least 10 characters.</span> }
                </div>
              </div>

              <app-inquiry-result-banner [result]="result()" />

              <div class="cf-actions">
                <button type="submit" class="btn-orange" [disabled]="loading()">
                  @if (loading()) {
                    <mat-spinner diameter="18" />
                    <span>Validating &amp; Preparing...</span>
                  } @else {
                    <span>Submit Inquiry →</span>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactSectionComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly submission = inject(SubmissionService);
  private readonly content = inject(ContentService);
  readonly dialogs = inject(DialogLauncherService);
  contact = { ...CONTACT_INFO };
  services = SERVICES_DATA;

  readonly loading = signal(false);
  readonly result = signal<SubmissionResult | null>(null);

  ngOnInit(): void {
    if (this.content.currentSettings.contactInfo) {
      this.contact = { ...this.contact, ...this.content.currentSettings.contactInfo };
    }
    this.services = this.content.currentServices;
    this.content.settings$.subscribe((st) => {
      if (st.contactInfo) {
        this.contact = { ...this.contact, ...st.contactInfo };
      }
    });
    this.content.services$.subscribe((svcs) => {
      this.services = svcs;
    });
  }

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+\d\s()-]{8,18}$/)]],
    service: [SERVICES_DATA[0].title, [Validators.required]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  showErr(ctrl: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[ctrl];
    return c.invalid && (c.dirty || c.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const val = this.form.getRawValue();
    this.submission.submitInquiry({
      type: 'contact',
      fullName: val.fullName,
      companyName: val.companyName,
      email: val.email,
      phone: val.phone,
      interest: val.service,
      subject: val.subject,
      message: val.message
    }).subscribe((res) => {
      this.loading.set(false);
      this.result.set(res);
    });
  }
}

