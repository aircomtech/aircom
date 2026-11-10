import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
          <span class="eyebrow">Trusted Since 2009</span>
          <h2>Free ERP & IT Architecture Consultation</h2>
          <p>Modernize ERPNext, TallyPrime, HRMS, or Cloud Infrastructure.</p>
        </div>
        <button type="button" class="dialog-close" mat-dialog-close aria-label="Close welcome dialog">×</button>
      </div>

      <div class="dialog-body">
        <p style="margin:0 0 14px;color:#334155;font-size:0.95rem;">
          Planning an ERPNext rollout, TallyPrime automation, or multi-branch network upgrade? Book a 30-minute discovery session with an Aircom solutions specialist.
        </p>
        <ul style="margin:0 0 18px;padding-left:18px;color:#102A63;font-size:0.9rem;display:grid;gap:6px;">
          <li>Workflow & gap assessment tailored to your industry</li>
          <li>ERPNext + TallyPrime + Biometric integration roadmap</li>
          <li>Transparent implementation & AMC support options</li>
        </ul>

        <div class="dialog-footer-actions">
          <button type="button" class="btn-cancel" mat-dialog-close>Maybe Later</button>
          <button type="button" class="btn-orange" (click)="openQuote()">Book Free Consultation →</button>
        </div>
      </div>
    </div>
  `
})
export class WelcomeDialogComponent {
  private readonly ref = inject(MatDialogRef<WelcomeDialogComponent>);
  private readonly dialog = inject(MatDialog);

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

