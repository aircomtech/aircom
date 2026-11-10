import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CONTACT_INFO, SERVICES_DATA } from '../../core/data/site.data';

@Component({
  selector: 'app-whatsapp-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  styleUrl: '../shared/_dialog-shared.scss',
  template: `
    <div class="dialog-shell">
      <div class="dialog-head" style="background:linear-gradient(135deg,#064E3B,#15803D);">
        <div>
          <span class="eyebrow" style="color:#FDE047;">Instant WhatsApp Support</span>
          <h2>Chat with Aircom on WhatsApp</h2>
          <p>Start a direct WhatsApp conversation with +91 77998 99429.</p>
        </div>
        <button type="button" class="dialog-close" mat-dialog-close aria-label="Close dialog">×</button>
      </div>

      <div class="dialog-body">
        <form [formGroup]="form" (ngSubmit)="launchWhatsApp()" novalidate>
          <div class="form-grid">
            <div class="field-group full-span">
              <label for="wa-name">Your Name *</label>
              <input id="wa-name" type="text" formControlName="name" placeholder="Enter your name" />
              @if (form.controls.name.invalid && form.controls.name.touched) {
                <span class="err">Please enter your name.</span>
              }
            </div>
            <div class="field-group full-span">
              <label for="wa-topic">Topic</label>
              <select id="wa-topic" formControlName="topic">
                @for (s of services; track s.slug) {
                  <option [value]="s.title">{{ s.title }}</option>
                }
                <option value="General IT / Quote Inquiry">General IT / Quote Inquiry</option>
              </select>
            </div>
            <div class="field-group full-span">
              <label for="wa-note">Message *</label>
              <textarea id="wa-note" rows="3" formControlName="note" placeholder="Hi Aircom team, I would like to discuss..."></textarea>
            </div>
          </div>

          <div class="dialog-footer-actions">
            <button type="button" class="btn-cancel" mat-dialog-close>Cancel</button>
            <button type="submit" class="btn-orange" style="background:linear-gradient(135deg,#16A34A,#15803D);box-shadow:0 8px 20px rgba(22,163,74,0.3);">
              Open WhatsApp Chat →
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class WhatsappDialogComponent {
  private readonly fb = inject(FormBuilder);
  readonly data = inject<{ topic?: string } | null>(MAT_DIALOG_DATA, { optional: true });
  readonly services = SERVICES_DATA;

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    topic: [this.data?.topic || 'General IT / Quote Inquiry'],
    note: ['Hello Aircom Technologies, I would like to discuss an ERP / IT solution for my business.', Validators.required]
  });

  launchWhatsApp(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, topic, note } = this.form.getRawValue();
    const text = encodeURIComponent(`Hello Aircom Technologies,\nName: ${name}\nTopic: ${topic}\nMessage: ${note}`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  }
}

