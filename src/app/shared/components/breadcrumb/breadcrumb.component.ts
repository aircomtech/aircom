import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol>
        <li><a routerLink="/">Home</a></li>
        @for (item of items; track item.label; let last = $last) {
          <li class="sep" aria-hidden="true">/</li>
          <li>
            @if (item.route && !last) {
              <a [routerLink]="item.route">{{ item.label }}</a>
            } @else {
              <span aria-current="page">{{ item.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav ol {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 0.875rem;
    }
    .breadcrumb-nav a {
      color: rgba(255, 255, 255, 0.82);
      transition: color 0.2s;
      &:hover {
        color: #F59E0B;
      }
    }
    .breadcrumb-nav .sep {
      color: rgba(255, 255, 255, 0.45);
    }
    .breadcrumb-nav span {
      color: #F59E0B;
      font-weight: 600;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}

