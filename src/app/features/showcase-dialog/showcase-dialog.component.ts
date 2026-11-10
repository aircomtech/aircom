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
    .showcase-shell {
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      background: #FFFFFF;
    }

    .showcase-media-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #0D1B3E;
      flex-shrink: 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .showcase-close {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 4;
        background: rgba(13, 27, 62, 0.78);
        border: 1.5px solid rgba(255, 255, 255, 0.45);
      }
    }

    .showcase-scroll-body {
      padding: 22px 26px 24px;
      overflow-y: auto;

      @media (max-width: 560px) {
        padding: 18px 18px 22px;
      }
    }

    .showcase-title-block {
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid #E2EAF6;

      .sc-badge {
        display: inline-block;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #D97706;
        background: #FFFBEB;
        border: 1px solid #FDE68A;
        padding: 3px 10px;
        border-radius: 999px;
        margin-bottom: 8px;
      }

      h2 {
        margin: 0;
        font-size: clamp(1.2rem, 2.5vw, 1.48rem);
        color: #102A63;
        line-height: 1.25;
      }

      .sc-sub {
        margin: 4px 0 0;
        font-size: 0.88rem;
        font-weight: 600;
        color: #2457A7;
      }
    }

    .showcase-desc {
      margin: 0;
      color: #334155;
      font-size: 0.94rem;
      line-height: 1.62;
    }

    .showcase-highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 16px 0;

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
      gap: 12px;
      margin-top: 14px;

      @media (max-width: 560px) {
        grid-template-columns: 1fr;
      }
    }

    .sd-box {
      background: #F8FAFE;
      border: 1px solid #DCE6F5;
      border-radius: 14px;
      padding: 13px 15px;

      strong {
        display: block;
        color: #102A63;
        font-size: 0.86rem;
        margin-bottom: 4px;
      }
      p {
        margin: 0;
        color: #526177;
        font-size: 0.82rem;
        line-height: 1.5;
      }
    }

    .showcase-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #E2EAF6;

      @media (max-width: 480px) {
        flex-direction: column-reverse;
        align-items: stretch;
        button {
          width: 100%;
          justify-content: center;
        }
      }
    }
  `],
  template: `
    <div class="showcase-shell">
      <div class="showcase-media-wrap">
        <img [src]="data.image" [alt]="data.title" />
        <button type="button" class="dialog-close showcase-close" mat-dialog-close aria-label="Close popup">×</button>
      </div>

      <div class="showcase-scroll-body">
        <div class="showcase-title-block">
          <span class="sc-badge">{{ data.badge }}</span>
          <h2>{{ data.title }}</h2>
          <p class="sc-sub">{{ data.subtitle }}</p>
        </div>

        <p class="showcase-desc">{{ data.description }}</p>

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

        <div class="showcase-actions">
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
