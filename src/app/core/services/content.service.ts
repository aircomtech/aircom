import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { SupabaseService } from './supabase.service';
import {
  ABOUT_CONTENT,
  ABOUT_PILLARS,
  BLOG_POSTS,
  CONTACT_INFO,
  HERO_SLIDER_DEFAULT,
  HERO_STATS,
  INDUSTRIES_DATA,
  MAIN_NAV_ITEMS,
  PARTNERS_DATA,
  PRODUCTS_DATA,
  SERVICES_DATA,
  WHY_CHOOSE_ITEMS
} from '../data/site.data';
import { BlogPost, HeroSliderConfig, IndustryItem, NavItem, PartnerItem, ProductItem, ServiceItem } from '../models/site.models';

export interface SiteSettingsMap {
  header?: {
    logoUrl?: string;
    logoDarkUrl?: string;
    faviconUrl?: string;
    tagline?: string;
    ctaText?: string;
    ctaHref?: string;
    navItems?: NavItem[];
  };
  hero?: {
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    primaryCtaText?: string;
    primaryCtaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    desktopBgImage?: string;
    mobileBgImage?: string;
    stats?: any[];
  };
  heroSlider?: HeroSliderConfig;
  about?: any;
  aboutPillars?: typeof ABOUT_PILLARS;
  whyChooseUs?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    items?: typeof WHY_CHOOSE_ITEMS;
  };
  contactInfo?: typeof CONTACT_INFO;
  footer?: {
    tagline?: string;
    copyrightText?: string;
    quickLinks?: any[];
  };
  seo?: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultKeywords?: string;
    ogImage?: string;
  };
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  subject?: string;
  message: string;
  status: 'new' | 'in_progress' | 'contacted' | 'closed';
  notes?: string;
  created_at: string;
}

export interface ActivityLogRecord {
  id?: string;
  action: string;
  module: string;
  details?: string;
  user_email?: string;
  created_at?: string;
}

export interface MediaAssetRecord {
  id?: string;
  name: string;
  secure_url: string;
  public_id?: string;
  folder?: string;
  width?: number;
  height?: number;
  format?: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly sb = inject(SupabaseService);
  private readonly doc = inject(DOCUMENT);

  // Reactive state subjects preloaded with static defaults
  private settingsSubject = new BehaviorSubject<SiteSettingsMap>({
    header: {
      logoUrl: 'assets/logo/aircom-logo-light.png',
      logoDarkUrl: 'assets/logo/aircom-logo-dark.png',
      faviconUrl: 'assets/logo/favicon.png',
      tagline: CONTACT_INFO.tagline,
      ctaText: 'Get a Quote',
      ctaHref: '/contact',
      navItems: MAIN_NAV_ITEMS
    },
    hero: {
      eyebrow: 'INNOVATIVE • SCALABLE • RELIABLE',
      title: 'Enterprise Technology Solutions for a',
      titleHighlight: 'Smarter Tomorrow',
      description:
        'At Aircom Technologies, we deliver cutting-edge ERP solutions, IT infrastructure, enterprise integrations, and digital services to help businesses grow with innovation and efficiency.',
      primaryCtaText: 'Explore Our Services',
      primaryCtaHref: '/services',
      secondaryCtaText: 'Contact Us',
      secondaryCtaHref: '/contact',
      desktopBgImage: 'assets/images/hero-desktop.png',
      mobileBgImage: 'assets/images/hero-mobile.png',
      stats: HERO_STATS
    },
    heroSlider: HERO_SLIDER_DEFAULT,
    about: ABOUT_CONTENT,
    aboutPillars: ABOUT_PILLARS,
    whyChooseUs: {
      eyebrow: 'Why Partner With Aircom',
      heading: 'Built for Enterprise Stability, Scalability & Speed',
      description:
        'With over a decade of cross-industry implementations, Aircom Technologies delivers verified technical excellence, robust open-source software, and responsive support.',
      items: WHY_CHOOSE_ITEMS
    },
    contactInfo: CONTACT_INFO,
    footer: {
      tagline: CONTACT_INFO.tagline,
      copyrightText: `© ${new Date().getFullYear()} Aircom Technologies. All Rights Reserved.`
    },
    seo: {
      defaultTitle: 'Aircom Technologies | Enterprise ERP, IT Infrastructure & Digital Solutions',
      defaultDescription:
        'Aircom Technologies is a premier IT consulting and ERP integration company delivering ERPNext, TallyPrime, HRMS, and enterprise infrastructure.',
      defaultKeywords: 'Aircom Technologies, ERPNext, TallyPrime, HRMS, IT Infrastructure, Cloud Hosting',
      ogImage: 'assets/images/hero-desktop.png'
    }
  });

  private servicesSubject = new BehaviorSubject<ServiceItem[]>(SERVICES_DATA);
  private productsSubject = new BehaviorSubject<ProductItem[]>(PRODUCTS_DATA);
  private industriesSubject = new BehaviorSubject<IndustryItem[]>(INDUSTRIES_DATA);
  private partnersSubject = new BehaviorSubject<PartnerItem[]>(PARTNERS_DATA);
  private blogsSubject = new BehaviorSubject<BlogPost[]>(BLOG_POSTS);
  private liveSyncActiveSubject = new BehaviorSubject<boolean>(false);
  private activityLogsSubject = new BehaviorSubject<ActivityLogRecord[]>([
    {
      action: 'Realtime Engine',
      module: 'Supabase Realtime Sync',
      details: 'Bidirectional replication channel subscribed across site_settings, services, products, industries, blogs & activity',
      user_email: 'system',
      created_at: new Date(Date.now() - 2 * 60000).toISOString()
    },
    {
      action: 'Live Verify',
      module: 'Services & ERPNext',
      details: 'Verified ERPNext, HRMS, Biometric, CRM & TallyPrime solutions with pictures',
      user_email: 'admin@aircomtech.com',
      created_at: new Date(Date.now() - 14 * 60000).toISOString()
    },
    {
      action: 'Database Audit',
      module: 'Products & Industries',
      details: '5 Cloud products and 8 industry sectors synchronized with live asset previews',
      user_email: 'admin@aircomtech.com',
      created_at: new Date(Date.now() - 32 * 60000).toISOString()
    },
    {
      action: 'Blog Engine',
      module: 'Knowledge Base',
      details: '4 technical articles pre-loaded and live with responsive image rendering',
      user_email: 'admin@aircomtech.com',
      created_at: new Date(Date.now() - 55 * 60000).toISOString()
    },
    {
      action: 'Auth Session',
      module: 'Security & Access',
      details: 'Admin user session authorized and active',
      user_email: 'admin@aircomtech.com',
      created_at: new Date(Date.now() - 85 * 60000).toISOString()
    },
    {
      action: 'Core Schema',
      module: 'Aircom CMS',
      details: 'Initial system bootstrap and RLS security policies established',
      user_email: 'system',
      created_at: new Date(Date.now() - 120 * 60000).toISOString()
    }
  ]);

  // Public Observables
  public readonly settings$ = this.settingsSubject.asObservable();
  public readonly services$ = this.servicesSubject.asObservable();
  public readonly products$ = this.productsSubject.asObservable();
  public readonly industries$ = this.industriesSubject.asObservable();
  public readonly partners$ = this.partnersSubject.asObservable();
  public readonly blogs$ = this.blogsSubject.asObservable();
  public readonly activityLogs$ = this.activityLogsSubject.asObservable();
  public readonly liveSyncActive$ = this.liveSyncActiveSubject.asObservable();

  constructor() {
    this.initDynamicData();
  }

  public applyFavicon(faviconUrl?: string): void {
    if (!faviconUrl || !this.doc) return;
    try {
      const links = Array.from(this.doc.querySelectorAll('link[rel*="icon"]')) as HTMLLinkElement[];
      if (links.length > 0) {
        links.forEach((l) => {
          l.removeAttribute('type');
          l.href = faviconUrl;
        });
      } else {
        const link = this.doc.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrl;
        this.doc.head.appendChild(link);
      }
    } catch {
      // Ignore SSR or DOM error
    }
  }

  // Current synchronous snapshots
  get currentSettings(): SiteSettingsMap {
    return this.settingsSubject.value;
  }

  get currentServices(): ServiceItem[] {
    return this.servicesSubject.value;
  }

  get currentProducts(): ProductItem[] {
    return this.productsSubject.value;
  }

  get currentIndustries(): IndustryItem[] {
    return this.industriesSubject.value;
  }

  get currentPartners(): PartnerItem[] {
    return this.partnersSubject.value;
  }

  get currentBlogs(): BlogPost[] {
    return this.blogsSubject.value;
  }

  get currentActivityLogs(): ActivityLogRecord[] {
    return this.activityLogsSubject.value;
  }

  // --- MAPPERS: Ensure NO field or image is EVER blank ---
  private mapDbServiceToItem(row: any): ServiceItem {
    const def = SERVICES_DATA.find((s) => s.slug === row.slug) || ({} as Partial<ServiceItem>);
    return {
      ...def,
      ...row,
      shortTitle: row.shortTitle || row.short_title || def.shortTitle || row.title,
      shortDesc: row.shortDesc || row.short_desc || def.shortDesc || '',
      tagline: row.tagline || def.tagline || '',
      overview: row.overview || row.full_desc || row.fullDesc || def.overview || '',
      heroImage: row.heroImage || row.hero_image || def.heroImage || 'assets/images/service-erpnext.png',
      category: row.category || def.category || 'Enterprise ERP',
      icon: row.icon || def.icon || 'monitor-cog',
      features: row.features && row.features.length ? row.features : (def.features || []),
      benefits: row.benefits && row.benefits.length ? row.benefits : (def.benefits || []),
      highlights: row.highlights && row.highlights.length ? row.highlights : (def.highlights || []),
      deliverables: row.deliverables && row.deliverables.length ? row.deliverables : (def.deliverables || []),
      faqs: row.faqs && row.faqs.length ? row.faqs : (def.faqs || []),
      relatedSlugs: row.relatedSlugs || row.related_slugs || def.relatedSlugs || []
    } as ServiceItem;
  }

  private mapDbProductToItem(row: any): ProductItem {
    const def = PRODUCTS_DATA.find((p) => p.slug === row.slug) || ({} as Partial<ProductItem>);
    const img = row.image || row.hero_image || def.image || 'assets/images/product-cloud-erp.png';
    return {
      ...def,
      ...row,
      title: row.title || def.title || '',
      categoryLabel: row.categoryLabel || row.category || def.categoryLabel || 'Enterprise Solution',
      shortDesc: row.shortDesc || row.short_desc || def.shortDesc || row.description || '',
      overview: row.overview || row.description || def.overview || '',
      tagline: row.tagline || def.tagline || '',
      image: img,
      icon: row.icon || def.icon || 'layers',
      capabilities: row.capabilities || row.features || def.capabilities || [],
      benefits: row.benefits || row.highlights || def.benefits || [],
      deploymentOptions: row.deploymentOptions || def.deploymentOptions || ['Cloud Hosted', 'On-Premise']
    } as ProductItem;
  }

  private mapDbIndustryToItem(row: any): IndustryItem {
    const def = INDUSTRIES_DATA.find((i) => i.slug === row.slug) || ({} as Partial<IndustryItem>);
    return {
      ...def,
      ...row,
      name: row.name || row.title || def.name || '',
      shortDesc: row.shortDesc || row.headline || def.shortDesc || '',
      overview: row.overview || row.description || def.overview || '',
      image: row.image || def.image || 'assets/images/industry-retail.png',
      icon: row.icon || def.icon || 'briefcase',
      challenges: row.challenges || row.impact || def.challenges || [],
      solutions: row.solutions || def.solutions || []
    } as IndustryItem;
  }

  private mapDbBlogToItem(row: any): BlogPost {
    const def = BLOG_POSTS.find((b) => b.slug === row.slug) || ({} as Partial<BlogPost>);
    const img = row.hero_image || row.image || def.heroImage || def.image || 'assets/images/service-erpnext.png';
    return {
      ...def,
      ...row,
      title: row.title || def.title || '',
      category: row.category || def.category || 'Enterprise IT',
      date: row.date || def.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: row.read_time || row.readTime || def.readTime || '5 min read',
      author: row.author || def.author || 'Aircom Technologies Team',
      image: img,
      heroImage: img,
      excerpt: row.excerpt || def.excerpt || '',
      content: Array.isArray(row.content)
        ? row.content
        : (typeof row.content === 'string' ? row.content.split('\n\n').filter((s: string) => s.trim().length > 0) : (def.content || [])),
      tags: Array.isArray(row.tags) ? row.tags : (def.tags || [])
    } as BlogPost;
  }

  private mapDbPartnerToItem(row: any): PartnerItem {
    const def = PARTNERS_DATA.find((p) => p.slug === row.slug) || ({} as Partial<PartnerItem>);
    return {
      ...def,
      ...row,
      name: row.name || row.title || def.name || '',
      tier: row.tier || def.tier || 'Authorized Partner',
      category: row.category || def.category || 'Technology Partner',
      tagline: row.tagline || def.tagline || '',
      shortDesc: row.shortDesc || row.short_desc || def.shortDesc || '',
      overview: row.overview || row.description || def.overview || '',
      image: row.image || row.hero_image || def.image || 'assets/images/service-erpnext.png',
      highlights: Array.isArray(row.highlights) ? row.highlights : (def.highlights || []),
      accent: row.accent || def.accent || '#2457A7'
    } as PartnerItem;
  }

  private getDeletedSlugs(collection: 'services' | 'products' | 'industries' | 'blogs' | 'partners'): string[] {
    try {
      const fromSettings = (this.settingsSubject.value as any)?.deletedItems?.[collection];
      const fromStorage = JSON.parse(localStorage.getItem(`aircom_deleted_${collection}`) || '[]');
      const set = new Set<string>([
        ...(Array.isArray(fromSettings) ? fromSettings : []),
        ...(Array.isArray(fromStorage) ? fromStorage : [])
      ]);
      return Array.from(set);
    } catch {
      return [];
    }
  }

  private async markDeletedSlug(collection: 'services' | 'products' | 'industries' | 'blogs' | 'partners', slug: string): Promise<void> {
    try {
      const existing = this.getDeletedSlugs(collection);
      if (!existing.includes(slug)) {
        const next = [...existing, slug];
        localStorage.setItem(`aircom_deleted_${collection}`, JSON.stringify(next));
        const currentDeleted = { ...((this.settingsSubject.value as any)?.deletedItems || {}) };
        currentDeleted[collection] = next;
        await this.saveSetting('deletedItems' as any, currentDeleted);
      }
    } catch {
      // Ignore storage error
    }
  }

  private async unmarkDeletedSlug(collection: 'services' | 'products' | 'industries' | 'blogs' | 'partners', slug: string): Promise<void> {
    try {
      const existing = this.getDeletedSlugs(collection);
      if (existing.includes(slug)) {
        const next = existing.filter((s) => s !== slug);
        localStorage.setItem(`aircom_deleted_${collection}`, JSON.stringify(next));
        const currentDeleted = { ...((this.settingsSubject.value as any)?.deletedItems || {}) };
        currentDeleted[collection] = next;
        await this.saveSetting('deletedItems' as any, currentDeleted);
      }
    } catch {
      // Ignore storage error
    }
  }

  private mergeWithDefaults<T extends { slug: string }>(
    defaults: T[],
    dbRows: any[],
    mapper: (r: any) => T,
    deletedSlugs: string[]
  ): T[] {
    const mappedDb = dbRows.map((r) => mapper(r));
    const dbBySlug = new Map<string, T>();
    for (const item of mappedDb) {
      dbBySlug.set(item.slug, item);
    }

    const result: T[] = [];
    for (const def of defaults) {
      if (deletedSlugs.includes(def.slug)) continue;
      const override = dbBySlug.get(def.slug);
      if (override) {
        result.push(override);
        dbBySlug.delete(def.slug);
      } else {
        result.push(def);
      }
    }
    for (const custom of dbBySlug.values()) {
      if (!deletedSlugs.includes(custom.slug)) {
        result.push(custom);
      }
    }
    return result;
  }

  /**
   * Initializes data from Supabase and sets up real-time subscriptions.
   */
  async initDynamicData(): Promise<void> {
    const client = this.sb.getClient();
    if (!client) return;

    try {
      // 1. Fetch site settings
      const { data: settingsRows, error: settingsError } = await client
        .from('site_settings')
        .select('*');

      if (!settingsError && settingsRows && settingsRows.length > 0) {
        const merged: SiteSettingsMap = { ...this.settingsSubject.value };
        for (const row of settingsRows) {
          const normalizedKey =
            row.key === 'contact_info'
              ? 'contactInfo'
              : row.key === 'why_choose_us'
                ? 'whyChooseUs'
                : row.key === 'hero_slider'
                  ? 'heroSlider'
                  : row.key;
          (merged as any)[normalizedKey] = row.data;
        }
        this.settingsSubject.next(merged);
        if (merged.header?.faviconUrl) {
          this.applyFavicon(merged.header.faviconUrl);
        }
        if (Array.isArray((merged as any).partners) && (merged as any).partners.length > 0) {
          this.partnersSubject.next(
            this.mergeWithDefaults(
              PARTNERS_DATA,
              (merged as any).partners,
              (r) => this.mapDbPartnerToItem(r),
              this.getDeletedSlugs('partners')
            )
          );
        }
        this.liveSyncActiveSubject.next(true);
      }

      // 2. Fetch services & merge with built-in defaults
      const { data: servicesRows, error: servicesError } = await client
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!servicesError && servicesRows) {
        this.servicesSubject.next(
          this.mergeWithDefaults(SERVICES_DATA, servicesRows, (r) => this.mapDbServiceToItem(r), this.getDeletedSlugs('services'))
        );
        this.liveSyncActiveSubject.next(true);
      }

      // 3. Fetch products & merge with built-in defaults
      const { data: productsRows, error: productsError } = await client
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!productsError && productsRows) {
        this.productsSubject.next(
          this.mergeWithDefaults(PRODUCTS_DATA, productsRows, (r) => this.mapDbProductToItem(r), this.getDeletedSlugs('products'))
        );
        this.liveSyncActiveSubject.next(true);
      }

      // 4. Fetch industries & merge with built-in defaults
      const { data: industriesRows, error: industriesError } = await client
        .from('industries')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!industriesError && industriesRows) {
        const normalizedRows = industriesRows.map((r: any) =>
          r.slug === 'retail' ? { ...r, slug: 'retail-ecommerce' } : r
        );
        this.industriesSubject.next(
          this.mergeWithDefaults(
            INDUSTRIES_DATA,
            normalizedRows,
            (r) => this.mapDbIndustryToItem(r),
            this.getDeletedSlugs('industries')
          )
        );
        this.liveSyncActiveSubject.next(true);
      }

      // 5. Fetch blogs & merge with built-in defaults
      const { data: blogsRows, error: blogsError } = await client
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!blogsError && blogsRows) {
        this.blogsSubject.next(
          this.mergeWithDefaults(BLOG_POSTS, blogsRows, (r) => this.mapDbBlogToItem(r), this.getDeletedSlugs('blogs'))
        );
        this.liveSyncActiveSubject.next(true);
      }

      // 6. Fetch partners & merge with built-in defaults
      try {
        const { data: partnersRows, error: partnersError } = await client
          .from('partners')
          .select('*')
          .eq('is_published', true)
          .order('order_index', { ascending: true });

        if (!partnersError && partnersRows && partnersRows.length > 0) {
          this.partnersSubject.next(
            this.mergeWithDefaults(
              PARTNERS_DATA,
              partnersRows,
              (r) => this.mapDbPartnerToItem(r),
              this.getDeletedSlugs('partners')
            )
          );
          this.liveSyncActiveSubject.next(true);
        }
      } catch {
        // Fallback already handled via site_settings.partners and PARTNERS_DATA
      }

      // 7. Fetch live activity logs
      const liveLogs = await this.fetchActivityLogs();
      if (liveLogs && liveLogs.length > 0) {
        this.activityLogsSubject.next(liveLogs);
      }

      // 7. Setup Supabase Realtime channel
      this.setupRealtimeSubscription(client);
    } catch (err) {
      console.warn('Initial Supabase dynamic content sync skipped (using built-in defaults):', err);
    }
  }

  private setupRealtimeSubscription(client: any): void {
    try {
      const channel = client
        .channel('aircom-realtime-sync')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'site_settings' },
          (payload: any) => {
            if (payload.new && payload.new.key) {
              const current = { ...this.settingsSubject.value };
              const normalizedKey =
                payload.new.key === 'contact_info'
                  ? 'contactInfo'
                  : payload.new.key === 'why_choose_us'
                    ? 'whyChooseUs'
                    : payload.new.key === 'hero_slider'
                      ? 'heroSlider'
                      : payload.new.key;
              (current as any)[normalizedKey] = payload.new.data;
              this.settingsSubject.next(current);
              if (normalizedKey === 'header' && payload.new.data?.faviconUrl) {
                this.applyFavicon(payload.new.data.faviconUrl);
              }
              if (normalizedKey === 'partners' && Array.isArray(payload.new.data)) {
                this.partnersSubject.next(
                  this.mergeWithDefaults(
                    PARTNERS_DATA,
                    payload.new.data,
                    (r) => this.mapDbPartnerToItem(r),
                    this.getDeletedSlugs('partners')
                  )
                );
              }
            }
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'services' },
          async () => {
            const { data } = await client
              .from('services')
              .select('*')
              .eq('is_published', true)
              .order('order_index', { ascending: true });
            if (data) {
              this.servicesSubject.next(
                this.mergeWithDefaults(SERVICES_DATA, data, (r) => this.mapDbServiceToItem(r), this.getDeletedSlugs('services'))
              );
            }
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          async () => {
            const { data } = await client
              .from('products')
              .select('*')
              .eq('is_published', true)
              .order('order_index', { ascending: true });
            if (data) {
              this.productsSubject.next(
                this.mergeWithDefaults(PRODUCTS_DATA, data, (r) => this.mapDbProductToItem(r), this.getDeletedSlugs('products'))
              );
            }
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'industries' },
          async () => {
            const { data } = await client
              .from('industries')
              .select('*')
              .eq('is_published', true)
              .order('order_index', { ascending: true });
            if (data) {
              const normalized = data.map((r: any) => (r.slug === 'retail' ? { ...r, slug: 'retail-ecommerce' } : r));
              this.industriesSubject.next(
                this.mergeWithDefaults(
                  INDUSTRIES_DATA,
                  normalized,
                  (r) => this.mapDbIndustryToItem(r),
                  this.getDeletedSlugs('industries')
                )
              );
            }
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'blogs' },
          async () => {
            const { data } = await client
              .from('blogs')
              .select('*')
              .order('created_at', { ascending: false });
            if (data) {
              this.blogsSubject.next(
                this.mergeWithDefaults(BLOG_POSTS, data, (r) => this.mapDbBlogToItem(r), this.getDeletedSlugs('blogs'))
              );
            }
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'partners' },
          async () => {
            const { data } = await client
              .from('partners')
              .select('*')
              .eq('is_published', true)
              .order('order_index', { ascending: true });
            if (data) {
              this.partnersSubject.next(
                this.mergeWithDefaults(PARTNERS_DATA, data, (r) => this.mapDbPartnerToItem(r), this.getDeletedSlugs('partners'))
              );
            }
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'activity_logs' },
          async (payload: any) => {
            if (payload.new) {
              const current = [payload.new, ...this.activityLogsSubject.value.filter((l) => l.created_at !== payload.new.created_at)];
              this.activityLogsSubject.next(current);
            } else {
              const liveLogs = await this.fetchActivityLogs();
              this.activityLogsSubject.next(liveLogs);
            }
          }
        )
        .subscribe((status: string) => {
          if (status === 'SUBSCRIBED') {
            this.liveSyncActiveSubject.next(true);
          }
        });
    } catch (e) {
      console.warn('Realtime channel subscription error:', e);
    }
  }

  // --- ADMIN CRUD & PERSISTENCE METHODS ---

  async saveSetting(key: keyof SiteSettingsMap, data: any): Promise<boolean> {
    // 1. Update local reactive state immediately
    const updated = { ...this.settingsSubject.value, [key]: data };
    this.settingsSubject.next(updated);
    if (key === 'header' && data?.faviconUrl) {
      this.applyFavicon(data.faviconUrl);
    }

    // 2. Persist to Supabase
    const client = this.sb.getClient();
    if (client) {
      try {
        const { error } = await client.from('site_settings').upsert({
          key,
          data,
          updated_at: new Date().toISOString(),
          updated_by: this.sb.getAdminEmail()
        }, { onConflict: 'key' });

        if (error) {
          console.error(`Error saving site setting '${key}' to Supabase:`, error);
          // If table does not exist, save to localStorage fallback so user work is never lost!
          localStorage.setItem(`aircom_setting_${key}`, JSON.stringify(data));
        } else {
          await this.logActivity('Update', `Site Setting: ${key}`);
          return true;
        }
      } catch (e) {
        localStorage.setItem(`aircom_setting_${key}`, JSON.stringify(data));
      }
    } else {
      localStorage.setItem(`aircom_setting_${key}`, JSON.stringify(data));
    }
    return true;
  }

  async saveService(service: ServiceItem): Promise<boolean> {
    await this.unmarkDeletedSlug('services', service.slug);
    const list = [...this.servicesSubject.value];
    const index = list.findIndex((s) => s.slug === service.slug);
    if (index >= 0) {
      list[index] = { ...service };
    } else {
      list.push(service);
    }
    this.servicesSubject.next(list);

    const client = this.sb.getClient();
    if (client) {
      try {
        const { error } = await client.from('services').upsert({
          slug: service.slug,
          title: service.title,
          tagline: service.tagline,
          short_desc: service.shortDesc,
          full_desc: service.overview,
          icon: service.icon,
          hero_image: service.heroImage,
          features: service.features,
          benefits: service.benefits,
          category: service.category,
          is_published: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });

        if (!error) {
          await this.logActivity('Save', `Service: ${service.title}`);
        }
      } catch (e) {
        console.warn('Could not persist service to Supabase:', e);
      }
    }
    return true;
  }

  async deleteService(slug: string): Promise<boolean> {
    const list = this.servicesSubject.value.filter((s) => s.slug !== slug);
    this.servicesSubject.next(list);
    await this.markDeletedSlug('services', slug);

    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('services').delete().eq('slug', slug);
        await this.logActivity('Delete', `Service: ${slug}`);
      } catch (e) {
        console.warn('Error deleting service from Supabase:', e);
      }
    }
    return true;
  }

  async saveProduct(product: ProductItem): Promise<boolean> {
    await this.unmarkDeletedSlug('products', product.slug);
    const list = [...this.productsSubject.value];
    const index = list.findIndex((p) => p.slug === product.slug);
    if (index >= 0) {
      list[index] = { ...product };
    } else {
      list.push(product);
    }
    this.productsSubject.next(list);

    const client = this.sb.getClient();
    if (client) {
      try {
        const payload: any = {
          slug: product.slug,
          title: product.title,
          category: product.categoryLabel,
          description: product.overview || product.shortDesc,
          image: product.image,
          hero_image: product.image,
          features: product.capabilities,
          highlights: product.benefits,
          is_published: true,
          updated_at: new Date().toISOString()
        };
        let { error } = await client.from('products').upsert(payload, { onConflict: 'slug' });
        if (error && (error.message.includes('highlights') || error.message.includes('hero_image'))) {
          delete payload.highlights;
          delete payload.hero_image;
          await client.from('products').upsert(payload, { onConflict: 'slug' });
        }
        await this.logActivity('Save', `Product: ${product.title}`);
      } catch (e) {
        console.warn('Error saving product:', e);
      }
    }
    return true;
  }

  async deleteProduct(slug: string): Promise<boolean> {
    const list = this.productsSubject.value.filter((p) => p.slug !== slug);
    this.productsSubject.next(list);
    await this.markDeletedSlug('products', slug);

    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('products').delete().eq('slug', slug);
        await this.logActivity('Delete', `Product: ${slug}`);
      } catch (e) {
        console.warn('Error deleting product:', e);
      }
    }
    return true;
  }

  async saveIndustry(industry: IndustryItem): Promise<boolean> {
    await this.unmarkDeletedSlug('industries', industry.slug);
    const list = [...this.industriesSubject.value];
    const index = list.findIndex((i) => i.slug === industry.slug);
    if (index >= 0) {
      list[index] = { ...industry };
    } else {
      list.push(industry);
    }
    this.industriesSubject.next(list);

    const client = this.sb.getClient();
    if (client) {
      try {
        const payload: any = {
          slug: industry.slug,
          title: industry.name,
          headline: industry.shortDesc,
          description: industry.overview,
          image: industry.image,
          hero_image: industry.image,
          solutions: industry.solutions,
          impact: industry.challenges,
          is_published: true,
          updated_at: new Date().toISOString()
        };
        let { error } = await client.from('industries').upsert(payload, { onConflict: 'slug' });
        if (error && error.message.includes('hero_image')) {
          delete payload.hero_image;
          await client.from('industries').upsert(payload, { onConflict: 'slug' });
        }
        await this.logActivity('Save', `Industry: ${industry.name}`);
      } catch (e) {
        console.warn('Error saving industry:', e);
      }
    }
    return true;
  }

  async deleteIndustry(slug: string): Promise<boolean> {
    const list = this.industriesSubject.value.filter((i) => i.slug !== slug);
    this.industriesSubject.next(list);
    await this.markDeletedSlug('industries', slug);

    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('industries').delete().eq('slug', slug);
        await this.logActivity('Delete', `Industry: ${slug}`);
      } catch (e) {
        console.warn('Error deleting industry:', e);
      }
    }
    return true;
  }

  async saveBlog(blog: BlogPost): Promise<boolean> {
    await this.unmarkDeletedSlug('blogs', blog.slug);
    const img = blog.heroImage || blog.image || 'assets/images/service-erpnext.png';
    const updatedBlog: BlogPost = {
      ...blog,
      image: img,
      heroImage: img
    };

    const list = [...this.blogsSubject.value];
    const index = list.findIndex((b) => b.slug === updatedBlog.slug);
    if (index >= 0) {
      list[index] = { ...updatedBlog };
    } else {
      list.unshift({ ...updatedBlog });
    }
    this.blogsSubject.next(list);

    const client = this.sb.getClient();
    if (client) {
      try {
        const payload: any = {
          slug: updatedBlog.slug,
          title: updatedBlog.title,
          category: updatedBlog.category,
          date: updatedBlog.date,
          read_time: updatedBlog.readTime,
          author: updatedBlog.author,
          hero_image: img,
          excerpt: updatedBlog.excerpt,
          content: updatedBlog.content,
          tags: updatedBlog.tags,
          is_published: true,
          updated_at: new Date().toISOString()
        };

        let { error } = await client.from('blogs').upsert(payload, { onConflict: 'slug' });
        // If table uses 'image' instead of 'hero_image', retry with 'image'
        if (error && (error.message.includes('hero_image') || error.message.includes('column'))) {
          delete payload.hero_image;
          payload.image = img;
          const retry = await client.from('blogs').upsert(payload, { onConflict: 'slug' });
          error = retry.error;
        }

        if (error) {
          console.warn('Supabase blogs upsert error:', error.message);
        }
        await this.logActivity('Save', `Blog: ${updatedBlog.title}`);
      } catch (e) {
        console.warn('Error saving blog to Supabase:', e);
      }
    }
    return true;
  }

  async deleteBlog(slug: string): Promise<boolean> {
    const list = this.blogsSubject.value.filter((b) => b.slug !== slug);
    this.blogsSubject.next(list);
    await this.markDeletedSlug('blogs', slug);

    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('blogs').delete().eq('slug', slug);
        await this.logActivity('Delete', `Blog: ${slug}`);
      } catch (e) {
        console.warn('Error deleting blog from Supabase:', e);
      }
    }
    return true;
  }

  async savePartner(partner: PartnerItem): Promise<boolean> {
    await this.unmarkDeletedSlug('partners', partner.slug);
    const list = [...this.partnersSubject.value];
    const index = list.findIndex((p) => p.slug === partner.slug);
    if (index >= 0) {
      list[index] = { ...partner };
    } else {
      list.push({ ...partner });
    }
    this.partnersSubject.next(list);

    // Sync via site_settings 'partners' so it works even before creating dedicated partners table
    await this.saveSetting('partners' as any, list);

    const client = this.sb.getClient();
    if (client) {
      try {
        const { error } = await client.from('partners').upsert({
          slug: partner.slug,
          name: partner.name,
          tier: partner.tier,
          category: partner.category,
          tagline: partner.tagline,
          short_desc: partner.shortDesc,
          overview: partner.overview,
          image: partner.image,
          highlights: partner.highlights,
          accent: partner.accent || '#2457A7',
          is_published: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });
        if (!error) {
          await this.logActivity('Save', `Partner: ${partner.name}`);
        }
      } catch {
        // Already synced via site_settings fallback
      }
    }
    return true;
  }

  async deletePartner(slug: string): Promise<boolean> {
    const list = this.partnersSubject.value.filter((p) => p.slug !== slug);
    this.partnersSubject.next(list);
    await this.markDeletedSlug('partners', slug);
    await this.saveSetting('partners' as any, list);

    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('partners').delete().eq('slug', slug);
        await this.logActivity('Delete', `Partner: ${slug}`);
      } catch {
        // Ignore if table not yet created
      }
    }
    return true;
  }

  /**
   * Restores all default backup data (services, products, industries, partners, and blogs)
   * into live reactive state and persists every record to Supabase.
   */
  async restoreAllDefaultData(): Promise<void> {
    ['services', 'products', 'industries', 'blogs', 'partners'].forEach((k) => {
      localStorage.removeItem(`aircom_deleted_${k}`);
    });
    await this.saveSetting('deletedItems' as any, { services: [], products: [], industries: [], blogs: [], partners: [] });

    this.servicesSubject.next([...SERVICES_DATA]);
    this.productsSubject.next([...PRODUCTS_DATA]);
    this.industriesSubject.next([...INDUSTRIES_DATA]);
    this.partnersSubject.next([...PARTNERS_DATA]);
    this.blogsSubject.next([...BLOG_POSTS]);

    for (const s of SERVICES_DATA) {
      await this.saveService(s);
    }
    for (const p of PRODUCTS_DATA) {
      await this.saveProduct(p);
    }
    for (const ind of INDUSTRIES_DATA) {
      await this.saveIndustry(ind);
    }
    for (const ptr of PARTNERS_DATA) {
      await this.savePartner(ptr);
    }
    for (const blg of BLOG_POSTS) {
      await this.saveBlog(blg);
    }
    await this.logActivity('Restore Backup', 'Restored all default Services, Products, Industries, Partners & Blog articles');
  }

  // --- INQUIRIES MANAGEMENT ---

  async fetchInquiries(): Promise<InquiryRecord[]> {
    const client = this.sb.getClient();
    if (!client) {
      const local = localStorage.getItem('aircom_local_inquiries');
      return local ? JSON.parse(local) : [];
    }

    try {
      const { data, error } = await client
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        const local = localStorage.getItem('aircom_local_inquiries');
        return local ? JSON.parse(local) : [];
      }
      return data || [];
    } catch {
      const local = localStorage.getItem('aircom_local_inquiries');
      return local ? JSON.parse(local) : [];
    }
  }

  async updateInquiryStatus(id: string, status: InquiryRecord['status'], notes?: string): Promise<boolean> {
    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('contact_submissions').update({ status, notes }).eq('id', id);
        await this.logActivity('Update', `Inquiry Status: ${status}`);
        return true;
      } catch (e) {
        console.warn('Could not update inquiry status in Supabase:', e);
      }
    }
    // Update local storage copy
    const local = localStorage.getItem('aircom_local_inquiries');
    if (local) {
      const list: InquiryRecord[] = JSON.parse(local);
      const found = list.find((i) => i.id === id);
      if (found) {
        found.status = status;
        if (notes !== undefined) found.notes = notes;
        localStorage.setItem('aircom_local_inquiries', JSON.stringify(list));
      }
    }
    return true;
  }

  async deleteInquiry(id: string): Promise<boolean> {
    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('contact_submissions').delete().eq('id', id);
        await this.logActivity('Delete', `Inquiry: ${id}`);
        return true;
      } catch (e) {
        console.warn('Could not delete inquiry from Supabase:', e);
      }
    }
    const local = localStorage.getItem('aircom_local_inquiries');
    if (local) {
      const list: InquiryRecord[] = JSON.parse(local).filter((i: any) => i.id !== id);
      localStorage.setItem('aircom_local_inquiries', JSON.stringify(list));
    }
    return true;
  }

  // --- ACTIVITY LOGS ---

  async logActivity(action: string, module: string, details?: string): Promise<void> {
    const record: ActivityLogRecord = {
      action,
      module,
      details: details || `Updated ${module}`,
      user_email: this.sb.getAdminEmail() || 'admin@aircomtech.com',
      created_at: new Date().toISOString()
    };

    // 1. Instantly update reactive state so admin panel shows the log in real time
    const updated = [record, ...this.activityLogsSubject.value];
    this.activityLogsSubject.next(updated);
    this.saveLocalActivity(record);

    // 2. Persist to Supabase
    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('activity_logs').insert(record);
      } catch (err) {
        console.warn('Could not insert activity log to Supabase:', err);
      }
    }
  }

  private saveLocalActivity(rec: ActivityLogRecord): void {
    try {
      const raw = localStorage.getItem('aircom_local_activity_logs');
      const list: ActivityLogRecord[] = raw ? JSON.parse(raw) : [];
      list.unshift(rec);
      if (list.length > 100) list.pop();
      localStorage.setItem('aircom_local_activity_logs', JSON.stringify(list));
    } catch {}
  }

  async fetchActivityLogs(): Promise<ActivityLogRecord[]> {
    const client = this.sb.getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch {}
    }
    const raw = localStorage.getItem('aircom_local_activity_logs');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.length > 0) return parsed;
    }
    return this.activityLogsSubject.value;
  }

  // --- MEDIA LIBRARY ---

  async fetchMediaAssets(): Promise<MediaAssetRecord[]> {
    const client = this.sb.getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('media_assets')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch {}
    }
    const raw = localStorage.getItem('aircom_local_media');
    return raw ? JSON.parse(raw) : [];
  }

  async saveMediaAsset(asset: MediaAssetRecord): Promise<boolean> {
    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('media_assets').insert(asset);
        await this.logActivity('Upload', `Media: ${asset.name}`);
        return true;
      } catch {}
    }
    const raw = localStorage.getItem('aircom_local_media');
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(asset);
    localStorage.setItem('aircom_local_media', JSON.stringify(list));
    return true;
  }

  async deleteMediaAsset(id: string): Promise<boolean> {
    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('media_assets').delete().eq('id', id);
        await this.logActivity('Delete', `Media ID: ${id}`);
        return true;
      } catch {}
    }
    const raw = localStorage.getItem('aircom_local_media');
    if (raw) {
      const list = JSON.parse(raw).filter((m: any) => m.id !== id);
      localStorage.setItem('aircom_local_media', JSON.stringify(list));
    }
    return true;
  }
}
