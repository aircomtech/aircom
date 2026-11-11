import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-aircom-logo',
  standalone: true,
  template: `
    <img
      [src]="logoSrc()"
      alt="Aircom Technologies - Serving beyond boundaries"
      [style.height.px]="height"
      class="aircom-logo-img"
      width="180"
      height="112"
    />
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
    }
    .aircom-logo-img {
      width: auto;
      object-fit: contain;
      display: block;
    }
  `]
})
export class AircomLogoComponent implements OnInit {
  private readonly content = inject(ContentService);

  @Input() variant: 'light' | 'dark' = 'light';
  @Input() height = 58;

  private readonly lightLogo = signal<string>('assets/logo/aircom-logo-light.png');
  private readonly darkLogo = signal<string>('assets/logo/aircom-logo-dark.png');

  logoSrc(): string {
    return this.variant === 'dark' ? this.darkLogo() : this.lightLogo();
  }

  ngOnInit(): void {
    const hdr = this.content.currentSettings.header;
    if (hdr?.logoUrl) this.lightLogo.set(hdr.logoUrl);
    if (hdr?.logoDarkUrl) this.darkLogo.set(hdr.logoDarkUrl);

    this.content.settings$.subscribe((st) => {
      if (st.header?.logoUrl) this.lightLogo.set(st.header.logoUrl);
      if (st.header?.logoDarkUrl) this.darkLogo.set(st.header.logoDarkUrl);
    });
  }
}
