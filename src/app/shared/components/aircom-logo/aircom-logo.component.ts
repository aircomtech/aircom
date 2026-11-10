import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aircom-logo',
  standalone: true,
  template: `
    <img
      [src]="variant === 'dark' ? 'assets/logo/aircom-logo-dark.png' : 'assets/logo/aircom-logo-light.png'"
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
export class AircomLogoComponent {
  @Input() variant: 'light' | 'dark' = 'light';
  @Input() height = 58;
}
