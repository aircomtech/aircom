import { Component, Input } from '@angular/core';
import { SubmissionResult } from '../../core/services/submission.service';

@Component({
  selector: 'app-inquiry-result-banner',
  standalone: true,
  template: `
    @if (result) {
      <div
        class="result-banner"
        [class.is-sent]="result.status === 'sent'"
        [class.is-handoff]="result.status === 'handoff'"
        [class.is-error]="result.status === 'error'"
        role="status"
        aria-live="polite"
      >
        <p class="result-msg">{{ result.message }}</p>
        <div class="result-actions">
          <a [href]="result.mailtoUrl" class="handoff-btn email">Send via Email App</a>
          <a [href]="result.whatsappUrl" target="_blank" rel="noopener noreferrer" class="handoff-btn wa">
            Send via WhatsApp
          </a>
        </div>
      </div>
    }
  `,
  styles: [`
    .result-banner {
      border-radius: 12px;
      padding: 14px 16px;
      margin-top: 14px;
      border: 1px solid #BFDBFE;
      background: #EFF6FF;
      color: #1E3A8A;
      font-size: 0.9rem;

      &.is-sent {
        background: #ECFDF5;
        border-color: #A7F3D0;
        color: #065F46;
      }
      &.is-error {
        background: #FEF2F2;
        border-color: #FECACA;
        color: #991B1B;
      }
    }
    .result-msg {
      margin: 0 0 10px;
      font-weight: 500;
    }
    .result-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .handoff-btn {
      display: inline-flex;
      align-items: center;
      padding: 7px 14px;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
      color: #FFFFFF;
      text-decoration: none;
      &.email {
        background: #102A63;
      }
      &.wa {
        background: #16A34A;
      }
    }
  `]
})
export class InquiryResultBannerComponent {
  @Input() result: SubmissionResult | null = null;
}

