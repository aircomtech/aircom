import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { SupabaseService } from './supabase.service';
import {
  ABOUT_CONTENT,
  ABOUT_PILLARS,
  CONTACT_INFO,
  HERO_STATS,
  INDUSTRIES_DATA,
  MAIN_NAV_ITEMS,
  PRODUCTS_DATA,
  SERVICES_DATA,
  WHY_CHOOSE_ITEMS
} from '../data/site.data';
import { IndustryItem, NavItem, ProductItem, ServiceItem } from '../models/site.models';

export interface SiteSettingsMap {
  header?: {
    logoUrl?: string;
    logoDarkUrl?: string;
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

  // Reactive state subjects preloaded with static defaults
  private settingsSubject = new BehaviorSubject<SiteSettingsMap>({
    header: {
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
  private liveSyncActiveSubject = new BehaviorSubject<boolean>(false);

  // Public Observables
  public readonly settings$ = this.settingsSubject.asObservable();
  public readonly services$ = this.servicesSubject.asObservable();
  public readonly products$ = this.productsSubject.asObservable();
  public readonly industries$ = this.industriesSubject.asObservable();
  public readonly liveSyncActive$ = this.liveSyncActiveSubject.asObservable();

  constructor() {
    this.initDynamicData();
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
          (merged as any)[row.key] = row.data;
        }
        this.settingsSubject.next(merged);
        this.liveSyncActiveSubject.next(true);
      }

      // 2. Fetch services
      const { data: servicesRows, error: servicesError } = await client
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!servicesError && servicesRows && servicesRows.length > 0) {
        this.servicesSubject.next(servicesRows as any);
        this.liveSyncActiveSubject.next(true);
      }

      // 3. Fetch products
      const { data: productsRows, error: productsError } = await client
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!productsError && productsRows && productsRows.length > 0) {
        this.productsSubject.next(productsRows as any);
        this.liveSyncActiveSubject.next(true);
      }

      // 4. Fetch industries
      const { data: industriesRows, error: industriesError } = await client
        .from('industries')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!industriesError && industriesRows && industriesRows.length > 0) {
        this.industriesSubject.next(industriesRows as any);
        this.liveSyncActiveSubject.next(true);
      }

      // 5. Setup Supabase Realtime channel
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
              (current as any)[payload.new.key] = payload.new.data;
              this.settingsSubject.next(current);
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
            if (data) this.servicesSubject.next(data as any);
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
            if (data) this.productsSubject.next(data as any);
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
            if (data) this.industriesSubject.next(data as any);
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

    // 2. Persist to Supabase
    const client = this.sb.getClient();
    if (client) {
      try {
        const { error } = await client.from('site_settings').upsert({
          key,
          data,
          updated_at: new Date().toISOString(),
          updated_by: this.sb.getAdminEmail()
        });

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
        await client.from('products').upsert({
          slug: product.slug,
          title: product.title,
          category: product.categoryLabel,
          description: product.overview || product.shortDesc,
          image: product.image,
          features: product.capabilities,
          benefits: product.benefits,
          is_published: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });
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
        await client.from('industries').upsert({
          slug: industry.slug,
          title: industry.name,
          headline: industry.shortDesc,
          description: industry.overview,
          image: industry.image,
          solutions: industry.solutions,
          impact: industry.challenges,
          is_published: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });
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
      details,
      user_email: this.sb.getAdminEmail(),
      created_at: new Date().toISOString()
    };

    const client = this.sb.getClient();
    if (client) {
      try {
        await client.from('activity_logs').insert(record);
      } catch {
        // Fallback to local storage
        this.saveLocalActivity(record);
      }
    } else {
      this.saveLocalActivity(record);
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
          .limit(50);
        if (!error && data) return data;
      } catch {}
    }
    const raw = localStorage.getItem('aircom_local_activity_logs');
    return raw ? JSON.parse(raw) : [];
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
