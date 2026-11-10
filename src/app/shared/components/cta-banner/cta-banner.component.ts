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
      background-color: #091638;
      background-image:
        linear-gradient(95deg, rgba(8, 19, 52, 0.92) 0%, rgba(13, 27, 62, 0.76) 52%, rgba(13, 27, 62, 0.22) 100%),
        url('/assets/images/cta-banner-bg.png');
      background-size: cover;
      background-position: right center;
      background-repeat: no-repeat;
      border-radius: 22px;
      padding: 40px 34px;
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
          linear-gradient(180deg, rgba(8, 19, 52, 0.88) 0%, rgba(13, 27, 62, 0.74) 58%, rgba(13, 27, 62, 0.55) 100%),
          url('/assets/images/cta-banner-bg.png');
        background-position: 78% bottom;
        padding: 28px 22px;
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
  @Input() subtitle = 'Speak directly with our solutions architects in Secunderabad for a tailored rollout roadmap.';
  @Input() preselectedService?: string;
  readonly dialogs = inject(DialogLauncherService);
}

