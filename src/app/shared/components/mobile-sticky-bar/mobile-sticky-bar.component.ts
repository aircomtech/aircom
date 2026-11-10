import { Component, inject } from '@angular/core';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';

@Component({
  selector: 'app-mobile-sticky-bar',
  standalone: true,
  template: `
    <aside class="side-quick-dock" role="region" aria-label="Quick Contact Side Popups">
      <button
        type="button"
        class="side-fab call-fab"
        (click)="dialogs.openContact()"
        aria-label="Open Call & Contact Popup"
        title="Call / Contact Us"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span class="fab-tooltip">Call Us</span>
      </button>

      <button
        type="button"
        class="side-fab wa-fab"
        (click)="dialogs.openWhatsapp()"
        aria-label="Open WhatsApp Chat Popup"
        title="Chat on WhatsApp"
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.43"/>
        </svg>
        <span class="fab-tooltip">WhatsApp</span>
      </button>
    </aside>
  `,
  styles: [`
    .side-quick-dock {
      position: fixed;
      right: 14px;
      top: 56%;
      transform: translateY(-50%);
      z-index: 960;
      display: flex;
      flex-direction: column;
      gap: 10px;

      @media (max-width: 767px) {
        right: 10px;
        top: auto;
        bottom: 84px;
        transform: none;
      }
    }

    .side-fab {
      position: relative;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.72);
      color: #FFFFFF;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 10px 26px rgba(13, 27, 62, 0.28);
      transition: transform 0.22s ease, box-shadow 0.22s ease;

      &:hover {
        transform: scale(1.08);
        .fab-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }

    .call-fab {
      background: linear-gradient(135deg, #102A63, #2457A7);
    }

    .wa-fab {
      background: linear-gradient(135deg, #22C55E, #15803D);
    }

    .fab-tooltip {
      position: absolute;
      right: 54px;
      white-space: nowrap;
      background: #0D1B3E;
      color: #FFFFFF;
      font-family: 'Poppins', sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 8px;
      opacity: 0;
      transform: translateX(6px);
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);

      @media (max-width: 767px) {
        display: none;
      }
    }
  `]
})
export class MobileStickyBarComponent {
  readonly dialogs = inject(DialogLauncherService);
}
