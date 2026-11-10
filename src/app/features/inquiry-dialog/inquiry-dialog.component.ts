import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubmissionResult, SubmissionService } from '../../core/services/submission.service';
import { InquiryResultBannerComponent } from '../shared/inquiry-result-banner.component';

export interface InquiryDialogData {
  mode: 'service' | 'product';
  title: string;
}

@Component({
  selector: 'app-inquiry-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule, InquiryResultBannerComponent],
  styleUrl: '../shared/_dialog-shared.scss',
  template: `
    <div class="dialog-shell">
      <div class="dialog-head">
        <div>
          <span class="eyebrow">{{ data.mode === 'product' ? 'Product Solution Inquiry' : 'Service Inquiry' }}</span>
          <h2>{{ data.title }}</h2>
          <p>Request a live demo, architecture consultation, or implementation estimate.</p>
        </div>
        <button type="button" class="dialog-close" mat-dialog-close aria-label="Close dialog">×</button>
      </div>

      <div class="dialog-body">
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field-group">
              <label for="inq-name">Full Name *</label>
              <input id="inq-name" type="text" formControlName="fullName" placeholder="Your name" />
              @if (showErr('fullName')) { <span class="err">Name is required.</span> }
            </div>
            <div class="field-group">
              <label for="inq-company">Company Name</label>
              <input id="inq-company" type="text" formControlName="companyName" placeholder="Organization" />
            </div>
            <div class="field-group">
              <label for="inq-email">Email Address *</label>
              <input id="inq-email" type="email" formControlName="email" placeholder="name@company.com" />
              @if (showErr('email')) { <span class="err">Valid email is required.</span> }
            </div>
            <div class="field-group">
              <label for="inq-phone">Phone Number *</label>
              <input id="inq-phone" type="tel" formControlName="phone" placeholder="+91 ..." />
              @if (showErr('phone')) { <span class="err">Valid phone number required.</span> }
            </div>
            <div class="field-group full-span">
              <label for="inq-msg">Specific Requirements *</label>
              <textarea id="inq-msg" rows="3" formControlName="message" placeholder="Tell us about your team size, current tools, or goals..."></textarea>
              @if (showErr('message')) { <span class="err">Please provide brief details (min 10 chars).</span> }
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
                <span>Submit Inquiry →</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class InquiryDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly submission = inject(SubmissionService);
  readonly data = inject<InquiryDialogData>(MAT_DIALOG_DATA);
  readonly loading = signal(false);
  readonly result = signal<SubmissionResult | null>(null);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    companyName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+\d\s()-]{8,18}$/)]],
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
      type: this.data.mode,
      ...val,
      interest: this.data.title,
      subject: `${this.data.mode === 'product' ? 'Product' : 'Service'} Inquiry: ${this.data.title}`
    }).subscribe((res) => {
      this.loading.set(false);
      this.result.set(res);
    });
  }
}

