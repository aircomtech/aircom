import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CONTACT_INFO } from '../../core/data/site.data';
import { SubmissionResult, SubmissionService } from '../../core/services/submission.service';
import { InquiryResultBannerComponent } from '../shared/inquiry-result-banner.component';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule, InquiryResultBannerComponent],
  styleUrl: '../shared/_dialog-shared.scss',
  template: `
    <div class="dialog-shell">
      <div class="dialog-head">
        <div>
          <span class="eyebrow">Direct Connect</span>
          <h2>Contact Aircom Technologies</h2>
          <p>Call {{ contact.phone }} or send a quick message to our team.</p>
        </div>
        <button type="button" class="dialog-close" mat-dialog-close aria-label="Close dialog">×</button>
      </div>

      <div class="dialog-body">
        <div class="quick-links-row" style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
          <a [href]="contact.phoneHref" class="btn-navy" style="padding:8px 14px;font-size:0.82rem;">Call {{ contact.phone }}</a>
          <a [href]="'mailto:' + contact.salesEmail" class="btn-outline-navy" style="padding:7px 14px;font-size:0.82rem;">{{ contact.salesEmail }}</a>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field-group">
              <label for="c-name">Full Name *</label>
              <input id="c-name" type="text" formControlName="fullName" placeholder="Your name" />
              @if (showErr('fullName')) { <span class="err">Name is required.</span> }
            </div>
            <div class="field-group">
              <label for="c-phone">Phone Number *</label>
              <input id="c-phone" type="tel" formControlName="phone" placeholder="+91 ..." />
              @if (showErr('phone')) { <span class="err">Valid phone number required.</span> }
            </div>
            <div class="field-group full-span">
              <label for="c-email">Email Address *</label>
              <input id="c-email" type="email" formControlName="email" placeholder="you@company.com" />
              @if (showErr('email')) { <span class="err">Valid email required.</span> }
            </div>
            <div class="field-group full-span">
              <label for="c-msg">Message *</label>
              <textarea id="c-msg" rows="3" formControlName="message" placeholder="How can our engineers help you?"></textarea>
              @if (showErr('message')) { <span class="err">Please enter at least 10 characters.</span> }
            </div>
          </div>

          <app-inquiry-result-banner [result]="result()" />

          <div class="dialog-footer-actions">
            <button type="button" class="btn-cancel" mat-dialog-close>Cancel</button>
            <button type="submit" class="btn-orange" [disabled]="loading()">
              @if (loading()) {
                <mat-spinner diameter="18" />
                <span>Preparing...</span>
              } @else {
                <span>Send Message →</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ContactDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly submission = inject(SubmissionService);
  readonly contact = CONTACT_INFO;
  readonly loading = signal(false);
  readonly result = signal<SubmissionResult | null>(null);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[+\d\s()-]{8,18}$/)]],
    email: ['', [Validators.required, Validators.email]],
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
      ...val,
      subject: 'Quick Contact Inquiry'
    }).subscribe((res) => {
      this.loading.set(false);
      this.result.set(res);
    });
  }
}

