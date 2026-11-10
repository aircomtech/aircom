import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InquiryDialogComponent } from '../inquiry-dialog/inquiry-dialog.component';
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';

export interface ShowcaseDialogData {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  highlights: string[];
  details?: { heading: string; text: string }[];
  primaryRoute?: string;
  primaryRouteLabel?: string;
  inquiryTitle?: string;
  inquiryMode?: 'service' | 'product';
}

@Component({
  selector: 'app-showcase-dialog',
  standalone: true,
  imports: [MatDialogModule],
  styleUrl: '../shared/_dialog-shared.scss',
  styles: [`
    .showcase-hero {
      position: relative;
      height: 220px;
      overflow: hidden;
      background: #0D1B3E;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .showcase-hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(13, 27, 62, 0.25) 0%, rgba(13, 27, 62, 0.88) 100%);
      }

      .showcase-hero-copy {
        position: absolute;
        left: 22px;
        right: 54px;
        bottom: 16px;
        color: #FFFFFF;

        .eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #F59E0B;
          display: block;
          margin-bottom: 4px;
        }
        h2 {
          color: #FFFFFF;
          margin: 0;
          font-size: 1.32rem;
          line-height: 1.25;
        }
        p {
          margin: 4px 0 0;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.85);
        }
      }

      .showcase-close {
        position: absolute;
        top: 14px;
        right: 14px;
        z-index: 3;
      }
    }

    .showcase-highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 14px 0;

      span {
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        color: #102A63;
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .showcase-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 12px;

      @media (max-width: 560px) {
        grid-template-columns: 1fr;
      }
    }

    .sd-box {
      background: #F8FAFC;
      border: 1px solid #DCE6F5;
      border-radius: 12px;
      padding: 11px 13px;

      strong {
        display: block;
        color: #102A63;
        font-size: 0.85rem;
        margin-bottom: 3px;
      }
      p {
        margin: 0;
        color: #526177;
        font-size: 0.81rem;
        line-height: 1.45;
      }
    }
  `],
  template: `
    <div class="dialog-shell">
      <div class="showcase-hero">
        <img [src]="data.image" [alt]="data.title" />
        <div class="showcase-hero-overlay"></div>
        <button type="button" class="dialog-close showcase-close" mat-dialog-close aria-label="Close popup">×</button>
        <div class="showcase-hero-copy">
          <span class="eyebrow">{{ data.badge }}</span>
          <h2>{{ data.title }}</h2>
          <p>{{ data.subtitle }}</p>
        </div>
      </div>

      <div class="dialog-body">
        <p style="margin:0;color:#334155;font-size:0.95rem;line-height:1.6;">
          {{ data.description }}
        </p>

        @if (data.highlights.length) {
          <div class="showcase-highlights">
            @for (h of data.highlights; track h) {
              <span>✓ {{ h }}</span>
            }
          </div>
        }

        @if (data.details?.length) {
          <div class="showcase-details-grid">
            @for (d of data.details; track d.heading) {
              <div class="sd-box">
                <strong>{{ d.heading }}</strong>
                <p>{{ d.text }}</p>
              </div>
            }
          </div>
        }

        <div class="dialog-footer-actions" style="flex-wrap:wrap;margin-top:20px;">
          <button type="button" class="btn-cancel" mat-dialog-close>Close</button>
          <button type="button" class="btn-outline-navy" style="padding:9px 18px;font-size:0.86rem;" (click)="openInquiry()">
            Request Quote / Demo
          </button>
          @if (data.primaryRoute) {
            <button type="button" class="btn-orange" style="padding:10px 20px;font-size:0.86rem;" (click)="goToPage()">
              {{ data.primaryRouteLabel || 'Open Full Page →' }}
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class ShowcaseDialogComponent {
  readonly data = inject<ShowcaseDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<ShowcaseDialogComponent>);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  goToPage(): void {
    const route = this.data.primaryRoute;
    this.ref.close();
    if (route) {
      this.router.navigateByUrl(route);
    }
  }

  openInquiry(): void {
    this.ref.close();
    if (this.data.inquiryMode) {
      this.dialog.open(InquiryDialogComponent, {
        width: '540px',
        maxWidth: '94vw',
        maxHeight: '92vh',
        panelClass: 'aircom-dialog-panel',
        data: { mode: this.data.inquiryMode, title: this.data.inquiryTitle || this.data.title }
      });
    } else {
      this.dialog.open(QuoteDialogComponent, {
        width: '560px',
        maxWidth: '94vw',
        maxHeight: '92vh',
        panelClass: 'aircom-dialog-panel',
        data: { preselectedService: this.data.inquiryTitle || this.data.title }
      });
    }
  }
}
