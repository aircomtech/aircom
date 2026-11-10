import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent)
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/services/services-list/services-list.component').then((m) => m.ServicesListComponent)
      },
      {
        path: 'services/:slug',
        loadComponent: () =>
          import('./pages/services/service-detail/service-detail.component').then((m) => m.ServiceDetailComponent)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products-list/products-list.component').then((m) => m.ProductsListComponent)
      },
      {
        path: 'products/:slug',
        loadComponent: () =>
          import('./pages/products/product-detail/product-detail.component').then((m) => m.ProductDetailComponent)
      },
      {
        path: 'industries',
        loadComponent: () =>
          import('./pages/industries/industries-list/industries-list.component').then(
            (m) => m.IndustriesListComponent
          )
      },
      {
        path: 'industries/:slug',
        loadComponent: () =>
          import('./pages/industries/industry-detail/industry-detail.component').then(
            (m) => m.IndustryDetailComponent
          )
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog-list/blog-list.component').then((m) => m.BlogListComponent)
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./pages/blog/blog-detail/blog-detail.component').then((m) => m.BlogDetailComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent)
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/legal/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent)
      },
      {
        path: 'terms',
        loadComponent: () => import('./pages/legal/terms/terms.component').then((m) => m.TermsComponent)
      },
      {
        path: 'sitemap',
        loadComponent: () =>
          import('./pages/legal/sitemap-page/sitemap-page.component').then((m) => m.SitemapPageComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
