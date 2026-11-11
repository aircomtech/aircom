import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
  schemas?: Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  updateSeo(config: SeoConfig): void {
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    const canonicalUrl = `${environment.siteUrl}${config.path ?? '/'}`;
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({
      property: 'og:image',
      content: config.image ?? `${environment.siteUrl}/assets/images/hero-desktop.png`
    });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    this.setCanonical(canonicalUrl);
    this.setSchemas(config.schemas ?? []);
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setSchemas(schemas: Record<string, unknown>[]): void {
    this.doc.querySelectorAll('script[data-aircom-schema="true"]').forEach((el) => el.remove());

    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Aircom Technologies',
      url: environment.siteUrl,
      foundingDate: '2009',
      email: 'sales@aircomtech.com',
      telephone: '+91-77998-99429',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No.12, Simhadri Nagar Colony, Near PBDAV School',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN'
      }
    };

    [organizationSchema, ...schemas].forEach((schema) => {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-aircom-schema', 'true');
      script.textContent = JSON.stringify(schema);
      this.doc.head.appendChild(script);
    });
  }
}

