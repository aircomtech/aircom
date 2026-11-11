import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogLauncherService } from '../../../core/services/dialog-launcher.service';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="cta-banner">
      <div class="container">
        <div class="cta-box">
          <div class="cta-copy">
            <span class="cta-tag">Ready to Modernize Your Business?</span>
            <h2>{{ title }}</h2>
            <p>{{ subtitle }}</p>
          </div>
          <div class="cta-actions">
            <button type="button" class="btn-orange" (click)="dialogs.openQuote(preselectedService)">
              Get a Quote
              <span aria-hidden="true">→</span>
            </button>
            <a routerLink="/contact" class="btn-ghost-white">Contact Our Team</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-banner {
      padding: 48px 0 64px;
    }
    .cta-box {
      background-color: #07163B;
      background-image:
        linear-gradient(95deg, rgba(8, 19, 52, 0.90) 0%, rgba(13, 27, 62, 0.65) 48%, rgba(13, 27, 62, 0.08) 100%),
        url('/assets/images/cta-banner-bg.png');
      background-size: cover;
      background-position: right center;
      background-repeat: no-repeat;
      border-radius: 22px;
      padding: 44px 36px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      color: #FFFFFF;
      box-shadow: 0 22px 48px rgba(13, 27, 62, 0.24);
      position: relative;
      overflow: hidden;

      @media (max-width: 767px) {
        background-image:
          linear-gradient(180deg, #07163B 0%, rgba(7, 22, 59, 0.92) 52%, rgba(7, 22, 59, 0.16) 74%, rgba(7, 22, 59, 0) 100%),
          url('/assets/images/cta-banner-bg.png');
        background-size: 100% auto;
        background-position: center bottom;
        padding: 28px 20px 145px;
      }
    }
    .cta-tag {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #F59E0B;
      margin-bottom: 8px;
    }
    .cta-copy h2 {
      color: #FFFFFF;
      font-size: clamp(1.4rem, 2.5vw, 2rem);
      margin-bottom: 8px;
    }
    .cta-copy p {
      color: rgba(255, 255, 255, 0.84);
      margin: 0;
      max-width: 600px;
    }
    .cta-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .btn-ghost-white {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 11px 22px;
      border-radius: 999px;
      border: 1.5px solid rgba(255, 255, 255, 0.55);
      color: #FFFFFF;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.22s ease;
      &:hover {
        background: #FFFFFF;
        color: #102A63;
      }
    }
  `]
})
export class CtaBannerComponent {
  @Input() title = 'Let’s Architect Your Next ERP or Infrastructure Upgrade';
  @Input() subtitle = 'Speak directly with our solutions architects in Hyderabad for a tailored rollout roadmap.';
  @Input() preselectedService?: string;
  readonly dialogs = inject(DialogLauncherService);
}

