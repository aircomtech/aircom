import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SERVICES_DATA } from '../../core/data/site.data';
import { SubmissionResult, SubmissionService } from '../../core/services/submission.service';
import { InquiryResultBannerComponent } from '../shared/inquiry-result-banner.component';

@Component({
  selector: 'app-quote-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule, InquiryResultBannerComponent],
  styleUrl: '../shared/_dialog-shared.scss',
  template: `
    <div class="dialog-shell">
      <div class="dialog-head">
        <div>
          <span class="eyebrow">Request Proposal</span>
          <h2>Get a Customized Quote</h2>
          <p>Share your requirements and our solutions team will prepare a tailored scope.</p>
        </div>
        <button type="button" class="dialog-close" mat-dialog-close aria-label="Close dialog">×</button>
      </div>

      <div class="dialog-body">
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field-group">
              <label for="q-name">Full Name *</label>
              <input id="q-name" type="text" formControlName="fullName" placeholder="Your full name" />
              @if (showErr('fullName')) { <span class="err">Please enter your full name.</span> }
            </div>

            <div class="field-group">
              <label for="q-company">Company Name *</label>
              <input id="q-company" type="text" formControlName="companyName" placeholder="Company or organization" />
              @if (showErr('companyName')) { <span class="err">Company name is required.</span> }
            </div>

            <div class="field-group">
              <label for="q-email">Work Email *</label>
              <input id="q-email" type="email" formControlName="email" placeholder="name@company.com" />
              @if (showErr('email')) { <span class="err">Enter a valid email address.</span> }
            </div>

            <div class="field-group">
              <label for="q-phone">Phone / WhatsApp *</label>
              <input id="q-phone" type="tel" formControlName="phone" placeholder="+91 98XXX XXXXX" />
              @if (showErr('phone')) { <span class="err">Enter a valid phone number (8–16 digits).</span> }
            </div>

            <div class="field-group full-span">
              <label for="q-service">Solution / Service Needed *</label>
              <select id="q-service" formControlName="interest">
                @for (s of services; track s.slug) {
                  <option [value]="s.title">{{ s.title }}</option>
                }
                <option value="Multiple / Custom Enterprise Suite">Multiple / Custom Enterprise Suite</option>
              </select>
            </div>

            <div class="field-group full-span">
              <label for="q-msg">Project Details & Timeline *</label>
              <textarea id="q-msg" rows="3" formControlName="message" placeholder="Number of users, branches, integrations (e.g. TallyPrime, Biometric), or timeline..."></textarea>
              @if (showErr('message')) { <span class="err">Please share brief project requirements (min 10 chars).</span> }
            </div>
          </div>

          <app-inquiry-result-banner [result]="result()" />

          <div class="dialog-footer-actions">
            <button type="button" class="btn-cancel" mat-dialog-close>Close</button>
            <button type="submit" class="btn-orange" [disabled]="loading()">
              @if (loading()) {
                <mat-spinner diameter="18" />
                <span>Preparing...</span>
              } @else {
                <span>Request Quote →</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class QuoteDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly submission = inject(SubmissionService);
  readonly dialogRef = inject(MatDialogRef<QuoteDialogComponent>);
  readonly data = inject<{ preselectedService?: string } | null>(MAT_DIALOG_DATA, { optional: true });

  readonly services = SERVICES_DATA;
  readonly loading = signal(false);
  readonly result = signal<SubmissionResult | null>(null);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+\d\s()-]{8,18}$/)]],
    interest: [this.data?.preselectedService || this.services[0].title, [Validators.required]],
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
      type: 'quote',
      fullName: val.fullName,
      companyName: val.companyName,
      email: val.email,
      phone: val.phone,
      interest: val.interest,
      subject: `Quote Request: ${val.interest}`,
      message: val.message
    }).subscribe((res) => {
      this.loading.set(false);
      this.result.set(res);
    });
  }
}

