import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ContentService } from '../../core/services/content.service';
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';

@Component({
  selector: 'app-welcome-dialog',
  standalone: true,
  imports: [MatDialogModule],
  styleUrl: '../shared/_dialog-shared.scss',
  template: `
    <div class="dialog-shell">
      <div class="dialog-head">
        <div>
          <span class="eyebrow">{{ cfg().eyebrow || 'Trusted Since 2009' }}</span>
          <h2>{{ cfg().heading || 'Free ERP & IT Architecture Consultation' }}</h2>
          <p>{{ cfg().subheading || 'Modernize ERPNext, TallyPrime, HRMS, or Cloud Infrastructure.' }}</p>
        </div>
        <button type="button" class="dialog-close" mat-dialog-close aria-label="Close welcome dialog">×</button>
      </div>

      <div class="dialog-body">
        <p style="margin:0 0 14px;color:#334155;font-size:0.95rem;">
          {{ cfg().description || 'Planning an ERPNext rollout, TallyPrime automation, or multi-branch network upgrade? Book a 30-minute discovery session with an Aircom solutions specialist.' }}
        </p>
        <ul style="margin:0 0 18px;padding-left:18px;color:#102A63;font-size:0.9rem;display:grid;gap:6px;">
          @if (cfg().bullet1) {
            <li>{{ cfg().bullet1 }}</li>
          }
          @if (cfg().bullet2) {
            <li>{{ cfg().bullet2 }}</li>
          }
          @if (cfg().bullet3) {
            <li>{{ cfg().bullet3 }}</li>
          }
        </ul>

        <div class="dialog-footer-actions">
          <button type="button" class="btn-cancel" mat-dialog-close>{{ cfg().secondaryCtaText || 'Maybe Later' }}</button>
          <button type="button" class="btn-orange" (click)="openQuote()">{{ cfg().primaryCtaText || 'Book Free Consultation →' }}</button>
        </div>
      </div>
    </div>
  `
})
export class WelcomeDialogComponent {
  private readonly ref = inject(MatDialogRef<WelcomeDialogComponent>);
  private readonly dialog = inject(MatDialog);
  private readonly content = inject(ContentService);

  cfg() {
    return this.content.currentSettings?.popups?.welcome || {
      eyebrow: 'Trusted Since 2009',
      heading: 'Free ERP & IT Architecture Consultation',
      subheading: 'Modernize ERPNext, TallyPrime, HRMS, or Cloud Infrastructure.',
      description: 'Planning an ERPNext rollout, TallyPrime automation, or multi-branch network upgrade? Book a 30-minute discovery session with an Aircom solutions specialist.',
      bullet1: 'Workflow & gap assessment tailored to your industry',
      bullet2: 'ERPNext + TallyPrime + Biometric integration roadmap',
      bullet3: 'Transparent implementation & AMC support options',
      primaryCtaText: 'Book Free Consultation →',
      secondaryCtaText: 'Maybe Later'
    };
  }

  openQuote(): void {
    this.ref.close();
    this.dialog.open(QuoteDialogComponent, {
      width: '560px',
      maxWidth: '94vw',
      maxHeight: '92vh',
      panelClass: 'aircom-dialog-panel'
    });
  }
}

