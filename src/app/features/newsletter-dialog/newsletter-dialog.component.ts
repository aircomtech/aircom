import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubmissionResult, SubmissionService } from '../../core/services/submission.service';
import { InquiryResultBannerComponent } from '../shared/inquiry-result-banner.component';

@Component({
  selector: 'app-newsletter-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule, InquiryResultBannerComponent],
  styleUrl: '../shared/_dialog-shared.scss',
  template: `
    <div class="dialog-shell">
      <div class="dialog-head">
        <div>
          <span class="eyebrow">Stay Informed</span>
          <h2>Subscribe to Tech Updates</h2>
          <p>ERPNext tips, TallyPrime integration guides, and IT infrastructure insights.</p>
        </div>
        <button type="button" class="dialog-close" mat-dialog-close aria-label="Close dialog">×</button>
      </div>

      <div class="dialog-body">
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field-group full-span">
              <label for="nl-name">Your Name</label>
              <input id="nl-name" type="text" formControlName="fullName" placeholder="Optional" />
            </div>
            <div class="field-group full-span">
              <label for="nl-email">Work Email *</label>
              <input id="nl-email" type="email" formControlName="email" placeholder="you@company.com" />
              @if (form.controls.email.invalid && form.controls.email.touched) {
                <span class="err">Please enter a valid email address.</span>
              }
            </div>
          </div>

          <app-inquiry-result-banner [result]="result()" />

          <div class="dialog-footer-actions">
            <button type="button" class="btn-cancel" mat-dialog-close>Close</button>
            <button type="submit" class="btn-orange" [disabled]="loading()">
              @if (loading()) {
                <mat-spinner diameter="18" />
                <span>Processing...</span>
              } @else {
                <span>Subscribe →</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class NewsletterDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly submission = inject(SubmissionService);
  readonly loading = signal(false);
  readonly result = signal<SubmissionResult | null>(null);

  readonly form = this.fb.nonNullable.group({
    fullName: [''],
    email: ['', [Validators.required, Validators.email]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { fullName, email } = this.form.getRawValue();
    this.submission.submitInquiry({
      type: 'newsletter',
      fullName,
      email,
      subject: 'Newsletter Subscription Request',
      message: 'Please add me to Aircom Technologies product and ERP updates.'
    }).subscribe((res) => {
      this.loading.set(false);
      this.result.set(res);
    });
  }
}

