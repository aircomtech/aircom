import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aircom-logo',
  standalone: true,
  template: `
    <img
      [src]="variant === 'dark' ? 'assets/logo/aircom-logo-dark.svg' : 'assets/logo/aircom-logo-light.svg'"
      alt="Aircom Technologies - Serving beyond boundaries"
      [style.height.px]="height"
      class="aircom-logo-img"
      width="210"
      height="60"
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
  @Input() height = 50;
}

