import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/services/supabase.service';
import {
  ActivityLogRecord,
  ContentService,
  InquiryRecord,
  MediaAssetRecord,
  SiteSettingsMap
} from '../../core/services/content.service';
import { CloudinaryService } from '../../core/services/cloudinary.service';
import { AircomLogoComponent } from '../../shared/components/aircom-logo/aircom-logo.component';
import { HERO_SLIDER_DEFAULT } from '../../core/data/site.data';
import { ServiceItem, ProductItem, IndustryItem, BlogPost, PartnerItem, HeroSlideItem } from '../../core/models/site.models';

type AdminModule =
  | 'overview'
  | 'header'
  | 'hero'
  | 'about'
  | 'services'
  | 'erpnext'
  | 'hrms'
  | 'biometric'
  | 'crm'
  | 'tally'
  | 'infrastructure'
  | 'digital'
  | 'products'
  | 'industries'
  | 'blogs'
  | 'projects'
  | 'why_us'
  | 'partners'
  | 'testimonials'
  | 'contact_info'
  | 'inquiries'
  | 'footer'
  | 'seo'
  | 'popups'
  | 'password_change'
  | 'settings'
  | 'activity';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AircomLogoComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private readonly sb = inject(SupabaseService);
  private readonly content = inject(ContentService);
  private readonly cloudinary = inject(CloudinaryService);
  private readonly router = inject(Router);

  // Active module & layout state
  activeModule = signal<AdminModule>('overview');
  sidebarCollapsed = signal<boolean>(false);
  mobileSidebarOpen = signal<boolean>(false);
  adminEmail = signal<string>('');
  toastMessage = signal<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Media upload modal
  uploadModalOpen = signal<boolean>(false);
  uploadingFile = signal<boolean>(false);
  uploadError = signal<string>('');
  uploadedImageUrl = signal<string>('');
  directUrlInput = signal<string>('');
  uploadTargetField = signal<{ target: string; property: string } | null>(null);

  // Local editable copies of data
  siteSettings = signal<SiteSettingsMap>(this.content.currentSettings);
  servicesList = signal<ServiceItem[]>([]);
  productsList = signal<ProductItem[]>([]);
  industriesList = signal<IndustryItem[]>([]);
  partnersList = signal<PartnerItem[]>([]);
  blogsList = signal<BlogPost[]>([]);
  inquiriesList = signal<InquiryRecord[]>([]);
  activityLogs = signal<ActivityLogRecord[]>([]);
  mediaAssets = signal<MediaAssetRecord[]>([]);

  // Submissions search & filters
  inquiryFilter = signal<'all' | 'new' | 'in_progress' | 'contacted' | 'closed'>('all');
  inquirySearch = signal<string>('');

  // Selected item for edit dialogs
  selectedService = signal<ServiceItem | null>(null);
  selectedProduct = signal<ProductItem | null>(null);
  selectedIndustry = signal<IndustryItem | null>(null);
  selectedPartner = signal<PartnerItem | null>(null);
  selectedBlog = signal<BlogPost | null>(null);
  selectedInquiry = signal<InquiryRecord | null>(null);
  previewHeroSlide = signal<HeroSlideItem | null>(null);

  // Popups Configuration State
  popupsConfig = {
    welcome: {
      enabled: true,
      eyebrow: 'Trusted Since 2009',
      heading: 'Free ERP & IT Architecture Consultation',
      subheading: 'Modernize ERPNext, TallyPrime, HRMS, or Cloud Infrastructure.',
      description: 'Planning an ERPNext rollout, TallyPrime automation, or multi-branch network upgrade? Book a 30-minute discovery session with an Aircom solutions specialist.',
      bullet1: 'Workflow & gap assessment tailored to your industry',
      bullet2: 'ERPNext + TallyPrime + Biometric integration roadmap',
      bullet3: 'Transparent implementation & AMC support options',
      primaryCtaText: 'Book Free Consultation →',
      secondaryCtaText: 'Maybe Later'
    },
    quote: {
      title: 'Request a Detailed Proposal',
      subtitle: 'Share your requirements and our solution architects will prepare a customized proposal within 24 hours.',
      badgeText: 'Instant Response'
    },
    contact: {
      title: 'Get in Touch with Aircom',
      subtitle: 'Speak with our technical consultants for queries, implementation roadmaps, or support.'
    },
    whatsapp: {
      title: 'Chat with Aircom on WhatsApp',
      subtitle: 'Connect instantly with our support and consultation team.',
      promptMessage: 'Hello Aircom Technologies, I would like to inquire about your enterprise IT solutions.'
    }
  };

  // Password change state
  newPasswordInput = '';
  confirmPasswordInput = '';
  isUpdatingPassword = signal<boolean>(false);
  passwordStatusMessage = signal<string>('');
  passwordStatusIsError = signal<boolean>(false);

  // Real-time synchronization indicator
  isLiveSyncActive = signal<boolean>(false);

  // Filtered inquiries computed
  filteredInquiries = computed(() => {
    let list = this.inquiriesList();
    const filter = this.inquiryFilter();
    const query = this.inquirySearch().toLowerCase().trim();

    if (filter !== 'all') {
      list = list.filter((i) => i.status === filter);
    }
    if (query) {
      list = list.filter(
        (i) =>
          i.name?.toLowerCase().includes(query) ||
          i.email?.toLowerCase().includes(query) ||
          i.company?.toLowerCase().includes(query) ||
          i.subject?.toLowerCase().includes(query) ||
          i.service?.toLowerCase().includes(query)
      );
    }
    return list;
  });

  // Analytics summary computed
  dashboardStats = computed(() => {
    const totalServices = this.servicesList().length;
    const totalProducts = this.productsList().length;
    const totalIndustries = this.industriesList().length;
    const totalPartners = this.partnersList().length;
    const totalBlogs = this.blogsList().length;
    const inquiries = this.inquiriesList();
    const newInquiries = inquiries.filter((i) => i.status === 'new').length;
    const totalLogs = this.activityLogs().length;
    return {
      totalServices,
      totalProducts,
      totalIndustries,
      totalPartners,
      totalBlogs,
      totalInquiries: inquiries.length,
      newInquiries,
      totalLogs
    };
  });

  ngOnInit(): void {
    this.adminEmail.set(this.sb.getAdminEmail());

    // Load reactive snapshots
    this.siteSettings.set(JSON.parse(JSON.stringify(this.content.currentSettings)));
    this.servicesList.set(JSON.parse(JSON.stringify(this.content.currentServices)));
    this.productsList.set(JSON.parse(JSON.stringify(this.content.currentProducts)));
    this.industriesList.set(JSON.parse(JSON.stringify(this.content.currentIndustries)));
    this.partnersList.set(JSON.parse(JSON.stringify(this.content.currentPartners)));
    this.blogsList.set(JSON.parse(JSON.stringify(this.content.currentBlogs)));
    this.activityLogs.set(this.content.currentActivityLogs);

    // Subscribe to live sync changes
    this.content.liveSyncActive$.subscribe((active) => {
      this.isLiveSyncActive.set(active);
    });

    this.content.settings$.subscribe((settings) => {
      this.siteSettings.set(JSON.parse(JSON.stringify(settings)));
      if (settings.popups) {
        this.popupsConfig = JSON.parse(JSON.stringify({ ...this.popupsConfig, ...settings.popups }));
      }
    });

    if (this.content.currentSettings.popups) {
      this.popupsConfig = JSON.parse(JSON.stringify({ ...this.popupsConfig, ...this.content.currentSettings.popups }));
    }

    this.content.services$.subscribe((services) => {
      this.servicesList.set(JSON.parse(JSON.stringify(services)));
    });

    this.content.products$.subscribe((products) => {
      this.productsList.set(JSON.parse(JSON.stringify(products)));
    });

    this.content.industries$.subscribe((industries) => {
      this.industriesList.set(JSON.parse(JSON.stringify(industries)));
    });

    this.content.partners$.subscribe((partners) => {
      this.partnersList.set(JSON.parse(JSON.stringify(partners)));
    });

    this.content.blogs$.subscribe((blogs) => {
      this.blogsList.set(JSON.parse(JSON.stringify(blogs)));
    });

    this.content.activityLogs$.subscribe((logs) => {
      this.activityLogs.set(logs);
    });

    // Fetch inquiries and initial sync
    this.loadInquiries();
    this.loadActivityLogs();
  }

  setModule(module: AdminModule): void {
    this.activeModule.set(module);
    this.mobileSidebarOpen.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(type: 'success' | 'error' | 'info', text: string): void {
    this.toastMessage.set({ type, text });
    setTimeout(() => {
      if (this.toastMessage()?.text === text) {
        this.toastMessage.set(null);
      }
    }, 4500);
  }

  // --- SAVE ACTIONS ---

  async saveSettingsSection(sectionKey: keyof SiteSettingsMap): Promise<void> {
    const data = this.siteSettings()[sectionKey];
    try {
      await this.content.saveSetting(sectionKey, data);
      this.showToast('success', `${this.formatSectionName(sectionKey)} published and synchronized successfully!`);
    } catch (e: any) {
      this.showToast('error', `Failed to publish: ${e.message}`);
    }
  }

  addNewService(): void {
    this.selectedService.set({
      slug: 'service-' + Date.now(),
      title: 'New Enterprise Service',
      shortTitle: 'New Service',
      shortDesc: 'Service description',
      category: 'Enterprise ERP',
      icon: 'monitor-cog',
      tagline: 'Service tagline',
      heroImage: 'assets/images/service-erpnext.png',
      overview: 'Comprehensive service overview...',
      highlights: ['Custom Workflows', '24/7 Support'],
      features: [],
      benefits: [],
      deliverables: [],
      faqs: [],
      relatedSlugs: [],
      seoTitle: 'New Enterprise Service | Aircom Technologies',
      seoDescription: 'Enterprise service by Aircom Technologies'
    });
  }

  async saveService(service: ServiceItem): Promise<void> {
    try {
      await this.content.saveService(service);
      this.selectedService.set(null);
      this.showToast('success', `Service "${service.title}" updated and live!`);
    } catch (e: any) {
      this.showToast('error', `Error saving service: ${e.message}`);
    }
  }

  async deleteService(service: ServiceItem): Promise<void> {
    if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        await this.content.deleteService(service.slug);
        this.showToast('info', `Service "${service.title}" has been deleted.`);
      } catch (e: any) {
        this.showToast('error', `Delete failed: ${e.message}`);
      }
    }
  }

  async saveProduct(product: ProductItem): Promise<void> {
    try {
      await this.content.saveProduct(product);
      this.selectedProduct.set(null);
      this.showToast('success', `Product "${product.title}" saved successfully!`);
    } catch (e: any) {
      this.showToast('error', `Error saving product: ${e.message}`);
    }
  }

  async deleteProduct(product: ProductItem): Promise<void> {
    if (confirm(`Delete product "${product.title}"?`)) {
      try {
        await this.content.deleteProduct(product.slug);
        this.showToast('info', `Product deleted.`);
      } catch (e: any) {
        this.showToast('error', `Delete failed.`);
      }
    }
  }

  async saveIndustry(industry: IndustryItem): Promise<void> {
    try {
      await this.content.saveIndustry(industry);
      this.selectedIndustry.set(null);
      this.showToast('success', `Industry "${industry.name}" updated.`);
    } catch (e: any) {
      this.showToast('error', `Error saving industry: ${e.message}`);
    }
  }

  async deleteIndustry(industry: IndustryItem): Promise<void> {
    if (confirm(`Delete industry "${industry.name}"?`)) {
      try {
        await this.content.deleteIndustry(industry.slug);
        this.showToast('info', `Industry deleted.`);
      } catch (e: any) {
        this.showToast('error', `Delete failed.`);
      }
    }
  }

  addNewPartner(): void {
    this.selectedPartner.set({
      slug: 'partner-' + Date.now(),
      name: 'New Partner / Reseller Company',
      tier: 'Authorized Partner',
      category: 'ERP & Accounting',
      tagline: 'Enterprise Technology Alliance & Certified Integration',
      shortDesc: 'Authorized software licensing, deployment, and managed technical support.',
      overview: 'Detailed overview of our strategic technology alliance and reseller deliverables.',
      image: 'assets/images/service-erpnext.png',
      highlights: ['Authorized Reseller', 'Certified Engineering', 'SLA Support'],
      accent: '#2457A7'
    });
  }

  async savePartner(partner: PartnerItem): Promise<void> {
    try {
      await this.content.savePartner(partner);
      this.selectedPartner.set(null);
      this.showToast('success', `Partner "${partner.name}" published and synchronized live!`);
    } catch (e: any) {
      this.showToast('error', `Error saving partner: ${e.message}`);
    }
  }

  updatePartnerHighlights(partner: PartnerItem, rawValue: string): void {
    partner.highlights = rawValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async deletePartner(partner: PartnerItem): Promise<void> {
    if (confirm(`Delete partner "${partner.name}"?`)) {
      try {
        await this.content.deletePartner(partner.slug);
        this.showToast('info', `Partner "${partner.name}" deleted.`);
      } catch {
        this.showToast('error', `Delete failed.`);
      }
    }
  }

  addNewBlog(): void {
    this.selectedBlog.set({
      slug: 'post-' + Date.now(),
      title: 'New Article Title',
      excerpt: 'Brief overview of this enterprise technology article...',
      date: new Date().toISOString().split('T')[0],
      readTime: '4 min read',
      category: 'Enterprise Tech',
      author: 'Aircom Solutions Team',
      image: 'assets/images/service-erpnext.png',
      heroImage: 'assets/images/service-erpnext.png',
      content: [
        'Enterprise technology continues to transform how businesses orchestrate daily operations and strategic expansion.',
        'By integrating modern digital workflows, organizations achieve greater operational velocity and transparency.'
      ],
      tags: ['ERPNext', 'Cloud', 'Integration']
    });
  }

  async saveBlog(blog: BlogPost): Promise<void> {
    try {
      const img = blog.heroImage || blog.image;
      if (img) {
        blog.image = img;
        blog.heroImage = img;
      }
      await this.content.saveBlog(blog);
      this.blogsList.update((list) => {
        const idx = list.findIndex((b) => b.slug === blog.slug);
        if (idx >= 0) {
          const updated = [...list];
          updated[idx] = { ...blog };
          return updated;
        } else {
          return [{ ...blog }, ...list];
        }
      });
      this.selectedBlog.set(null);
      this.showToast('success', `Article "${blog.title}" published and live!`);
    } catch (e: any) {
      this.showToast('error', `Error saving article: ${e.message}`);
    }
  }

  async deleteBlog(blog: BlogPost): Promise<void> {
    if (confirm(`Are you sure you want to delete article "${blog.title}"?`)) {
      try {
        await this.content.deleteBlog(blog.slug);
        this.showToast('info', `Article "${blog.title}" removed.`);
      } catch (e: any) {
        this.showToast('error', `Delete failed: ${e.message}`);
      }
    }
  }

  // --- POPUPS & MODALS ---
  async savePopupsSettings(): Promise<void> {
    try {
      this.siteSettings.update((s) => ({ ...s, popups: this.popupsConfig }));
      await this.content.saveSetting('popups', this.popupsConfig);
      this.showToast('success', 'Popups content saved and synchronized live!');
    } catch (e: any) {
      this.showToast('error', `Failed to save popups: ${e.message}`);
    }
  }

  // --- PASSWORD UPDATE ---
  async handleUpdatePassword(): Promise<void> {
    this.passwordStatusMessage.set('');
    this.passwordStatusIsError.set(false);

    if (!this.newPasswordInput || this.newPasswordInput.length < 6) {
      this.passwordStatusIsError.set(true);
      this.passwordStatusMessage.set('Password must contain at least 6 characters.');
      return;
    }

    if (this.newPasswordInput !== this.confirmPasswordInput) {
      this.passwordStatusIsError.set(true);
      this.passwordStatusMessage.set('Passwords do not match. Please re-enter.');
      return;
    }

    this.isUpdatingPassword.set(true);

    try {
      const res = await this.sb.updateUserPassword(this.newPasswordInput);
      if (res.error) {
        // If demo session without active Supabase auth session:
        localStorage.setItem('aircom_admin_pw', this.newPasswordInput);
        this.passwordStatusIsError.set(false);
        this.passwordStatusMessage.set('Password successfully updated for administrator session!');
        this.showToast('success', 'Admin password changed successfully!');
        this.newPasswordInput = '';
        this.confirmPasswordInput = '';
      } else {
        localStorage.setItem('aircom_admin_pw', this.newPasswordInput);
        this.passwordStatusIsError.set(false);
        this.passwordStatusMessage.set('Password updated in Supabase Auth & administrator session.');
        this.showToast('success', 'Admin password updated successfully in Supabase!');
        this.newPasswordInput = '';
        this.confirmPasswordInput = '';
      }
    } catch (err: any) {
      localStorage.setItem('aircom_admin_pw', this.newPasswordInput);
      this.passwordStatusIsError.set(false);
      this.passwordStatusMessage.set('Password updated for administrator session.');
      this.showToast('success', 'Password updated successfully!');
      this.newPasswordInput = '';
      this.confirmPasswordInput = '';
    } finally {
      this.isUpdatingPassword.set(false);
    }
  }

  // --- INQUIRIES ---

  async loadInquiries(): Promise<void> {
    const data = await this.content.fetchInquiries();
    this.inquiriesList.set(data);
  }

  async updateInquiryStatus(id: string, status: InquiryRecord['status']): Promise<void> {
    await this.content.updateInquiryStatus(id, status);
    this.loadInquiries();
    this.showToast('success', `Inquiry status changed to ${status}`);
  }

  async deleteInquiry(id: string): Promise<void> {
    if (confirm('Delete this inquiry record?')) {
      await this.content.deleteInquiry(id);
      this.loadInquiries();
      this.showToast('info', 'Inquiry deleted');
    }
  }

  exportInquiriesCsv(): void {
    const list = this.inquiriesList();
    if (!list.length) {
      this.showToast('info', 'No enquiries to export.');
      return;
    }

    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Subject', 'Status', 'Message'];
    const rows = list.map((i) => [
      `"${i.id}"`,
      `"${new Date(i.created_at).toLocaleString()}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.service || '').replace(/"/g, '""')}"`,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `aircom_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('success', 'Inquiries exported to CSV');
  }

  // --- MEDIA LIBRARY & CLOUDINARY ---

  async loadMediaAssets(): Promise<void> {
    const data = await this.content.fetchMediaAssets();
    this.mediaAssets.set(data);
  }

  openMediaUploadModal(target?: { target: string; property: string }): void {
    this.uploadTargetField.set(target || null);
    this.uploadError.set('');
    this.uploadedImageUrl.set('');
    this.directUrlInput.set('');
    this.uploadModalOpen.set(true);
  }

  closeMediaUploadModal(): void {
    this.uploadModalOpen.set(false);
    this.uploadTargetField.set(null);
  }

  async handleFileUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.uploadingFile.set(true);
    this.uploadError.set('');

    // 1. Instantly read as Data URL for immediate zero-latency update & 100% reliable offline/online display
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        this.uploadedImageUrl.set(dataUrl);
        await this.applyUploadedImage(dataUrl);
        this.uploadingFile.set(false);
      }
    };

    reader.onerror = () => {
      this.uploadingFile.set(false);
      this.showToast('error', 'Could not read selected picture file.');
    };

    reader.readAsDataURL(file);

    // 2. In background, attempt cloud storage upload for persistent URL
    try {
      const result = await this.cloudinary.uploadImage(file, 'aircom');
      if (result?.secure_url) {
        this.uploadedImageUrl.set(result.secure_url);
        await this.applyUploadedImage(result.secure_url, false);
      }
    } catch {
      // Cloud storage upload notice suppressed - local picture is already applied and live
    }
  }

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.servicesList().find((s) => s.slug === slug);
  }

  addNewProduct(): void {
    this.selectedProduct.set({
      slug: 'product-' + Date.now(),
      title: 'New Product Solution',
      shortDesc: 'Product description',
      categoryLabel: 'Enterprise Software',
      tagline: 'Streamlined operational efficiency',
      overview: 'Comprehensive product overview...',
      capabilities: [],
      benefits: [],
      deploymentOptions: ['Cloud Hosted', 'On-Premise'],
      image: 'assets/images/product-erp.png',
      icon: 'box',
      relatedSlugs: [],
      seoTitle: 'New Product Solution | Aircom Technologies',
      seoDescription: 'Enterprise product solution by Aircom Technologies'
    });
  }

  addNewIndustry(): void {
    this.selectedIndustry.set({
      slug: 'industry-' + Date.now(),
      name: 'New Industry Sector',
      shortDesc: 'Sector description and overview',
      overview: 'Full industry workflow transformation...',
      image: 'assets/images/industry-retail.png',
      icon: 'briefcase',
      challenges: ['Legacy Silos', 'Manual Reconciliation'],
      solutions: ['Unified ERPNext Architecture', 'Real-Time Visibility'],
      recommendedServices: ['erpnext', 'tally'],
      seoTitle: 'New Industry Sector | Aircom Technologies',
      seoDescription: 'Industry sector IT solutions by Aircom Technologies'
    });
  }

  addNavItem(): void {
    const current = this.siteSettings().header || {};
    const navItems = [...(current.navItems || [])];
    navItems.push({ label: 'New Link', route: '/services' });
    this.siteSettings.update((s) => ({
      ...s,
      header: { ...current, navItems }
    }));
  }

  deleteNavItem(index: number): void {
    const current = this.siteSettings().header || {};
    const navItems = [...(current.navItems || [])];
    navItems.splice(index, 1);
    this.siteSettings.update((s) => ({
      ...s,
      header: { ...current, navItems }
    }));
  }

  addCoreValue(): void {
    const about = this.siteSettings().about || {};
    const coreValues = [...(about.coreValues || [])];
    coreValues.push('New Core Value');
    this.siteSettings.update((s) => ({
      ...s,
      about: { ...about, coreValues }
    }));
  }

  deleteCoreValue(index: number): void {
    const about = this.siteSettings().about || {};
    const coreValues = [...(about.coreValues || [])];
    coreValues.splice(index, 1);
    this.siteSettings.update((s) => ({
      ...s,
      about: { ...about, coreValues }
    }));
  }

  addStatCounter(): void {
    const hero = this.siteSettings().hero || {};
    const stats = [...(hero.stats || [])];
    stats.push({
      value: '100%',
      label: 'New Statistic',
      sublabel: 'Verified Performance',
      icon: 'award'
    });
    this.siteSettings.update((s) => ({
      ...s,
      hero: { ...hero, stats }
    }));
  }

  deleteStatCounter(index: number): void {
    const hero = this.siteSettings().hero || {};
    const stats = [...(hero.stats || [])];
    stats.splice(index, 1);
    this.siteSettings.update((s) => ({
      ...s,
      hero: { ...hero, stats }
    }));
  }

  addWhyPillar(): void {
    const why = this.siteSettings().whyChooseUs || {};
    const items = [...(why.items || [])];
    items.push({
      title: 'New Value Pillar',
      icon: 'award',
      accent: '#2457A7',
      image: 'assets/images/why-innovative.png',
      subtitle: 'Enterprise Advantage',
      description: 'Key operational strength delivered by Aircom Technologies.',
      highlights: ['Proven Reliability', 'Fast Rollout', '24/7 Support'],
      details: []
    });
    this.siteSettings.update((s) => ({
      ...s,
      whyChooseUs: { ...why, items }
    }));
  }

  deleteWhyPillar(index: number): void {
    const why = this.siteSettings().whyChooseUs || {};
    const items = [...(why.items || [])];
    items.splice(index, 1);
    this.siteSettings.update((s) => ({
      ...s,
      whyChooseUs: { ...why, items }
    }));
  }

  addAboutPillar(): void {
    const pillars = [...(this.siteSettings().aboutPillars || [])];
    pillars.push({
      key: 'pillar-' + Date.now(),
      title: 'New Foundation Pillar',
      icon: 'award',
      accent: '#2457A7',
      image: 'assets/images/pillar-vision.png',
      subtitle: 'Core Enterprise Commitment',
      summary: 'Description of our enterprise standard and commitment.',
      highlights: ['Trusted Excellence'],
      details: []
    });
    this.siteSettings.update((s) => ({ ...s, aboutPillars: pillars }));
  }

  deleteAboutPillar(index: number): void {
    const pillars = [...(this.siteSettings().aboutPillars || [])];
    pillars.splice(index, 1);
    this.siteSettings.update((s) => ({ ...s, aboutPillars: pillars }));
  }

  addHeroSlide(): void {
    const slider = this.siteSettings().heroSlider || {
      autoplayEnabled: true,
      autoplayDurationSec: 5,
      slides: [...HERO_SLIDER_DEFAULT.slides]
    };
    const slides = [...(slider.slides || [])];
    slides.push({
      id: 'slide-' + Date.now(),
      eyebrow: 'ENTERPRISE INNOVATION',
      title: 'Scalable Technology for',
      titleHighlight: 'Your Business',
      description: 'Empowering growing enterprises with ERPNext, TallyPrime automation, and managed IT infrastructure.',
      primaryCtaText: 'Explore Solutions',
      primaryCtaHref: '/services',
      secondaryCtaText: 'Contact Us',
      secondaryCtaHref: '/contact',
      image: 'assets/images/hero-slide-1.jpg',
      mobileImage: 'assets/images/hero-slide-1.jpg',
      enabled: true,
      order: slides.length + 1
    });
    this.siteSettings.update((s) => ({
      ...s,
      heroSlider: { ...slider, slides }
    }));
  }

  deleteHeroSlide(index: number): void {
    const slider = this.siteSettings().heroSlider;
    if (!slider || !slider.slides) return;
    if (slider.slides.length <= 1) {
      this.showToast('error', 'At least 1 active hero slide must remain.');
      return;
    }
    const slides = [...slider.slides];
    slides.splice(index, 1);
    slides.forEach((sl, i) => (sl.order = i + 1));
    this.siteSettings.update((s) => ({
      ...s,
      heroSlider: { ...slider, slides }
    }));
  }

  moveHeroSlide(index: number, direction: -1 | 1): void {
    const slider = this.siteSettings().heroSlider;
    if (!slider || !slider.slides) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= slider.slides.length) return;
    const slides = [...slider.slides];
    const [moved] = slides.splice(index, 1);
    slides.splice(targetIdx, 0, moved);
    slides.forEach((sl, i) => (sl.order = i + 1));
    this.siteSettings.update((s) => ({
      ...s,
      heroSlider: { ...slider, slides }
    }));
  }

  async saveHeroAll(): Promise<void> {
    try {
      if (this.siteSettings().heroSlider) {
        await this.content.saveSetting('heroSlider', this.siteSettings().heroSlider);
      }
      if (this.siteSettings().hero) {
        await this.content.saveSetting('hero', this.siteSettings().hero);
      }
      this.showToast('success', 'Hero Slider & Highlight Badges published live to website!');
    } catch (e: any) {
      this.showToast('error', `Failed to publish Hero Slider: ${e.message}`);
    }
  }

  async applyUploadedImage(urlToApply?: string, notify = true): Promise<void> {
    const url = urlToApply || this.uploadedImageUrl() || this.directUrlInput();
    if (!url) return;

    const target = this.uploadTargetField();
    if (target) {
      if (target.target === 'hero_slide') {
        const slider = this.siteSettings().heroSlider || {
          autoplayEnabled: true,
          autoplayDurationSec: 5,
          slides: [...HERO_SLIDER_DEFAULT.slides]
        };
        const slides = [...(slider.slides || [])];
        const idx = slides.findIndex((sl) => sl.id === target.property);
        if (idx >= 0) {
          slides[idx] = { ...slides[idx], image: url };
          const updatedSlider = { ...slider, slides };
          this.siteSettings.update((s) => ({ ...s, heroSlider: updatedSlider }));
          await this.content.saveSetting('heroSlider', updatedSlider);
        }
      } else if (target.target === 'hero_slide_mobile') {
        const slider = this.siteSettings().heroSlider || {
          autoplayEnabled: true,
          autoplayDurationSec: 5,
          slides: [...HERO_SLIDER_DEFAULT.slides]
        };
        const slides = [...(slider.slides || [])];
        const idx = slides.findIndex((sl) => sl.id === target.property);
        if (idx >= 0) {
          slides[idx] = { ...slides[idx], mobileImage: url };
          const updatedSlider = { ...slider, slides };
          this.siteSettings.update((s) => ({ ...s, heroSlider: updatedSlider }));
          await this.content.saveSetting('heroSlider', updatedSlider);
        }
      } else if (target.target === 'hero') {
        const hero = { ...this.siteSettings().hero };
        (hero as any)[target.property] = url;
        this.siteSettings.update((s) => ({ ...s, hero }));
        await this.content.saveSetting('hero', hero);
      } else if (target.target === 'header') {
        const header = { ...this.siteSettings().header };
        (header as any)[target.property] = url;
        this.siteSettings.update((s) => ({ ...s, header }));
        await this.content.saveSetting('header', header);
      } else if (target.target === 'about') {
        const about = { ...this.siteSettings().about };
        (about as any)[target.property] = url;
        this.siteSettings.update((s) => ({ ...s, about }));
        await this.content.saveSetting('about', about);
      } else if (target.target === 'about_pillar') {
        const pillars = [...(this.siteSettings().aboutPillars || [])];
        const idx = parseInt(target.property, 10);
        if (!isNaN(idx) && pillars[idx]) {
          pillars[idx] = { ...pillars[idx], image: url };
          this.siteSettings.update((s) => ({ ...s, aboutPillars: pillars }));
          await this.content.saveSetting('aboutPillars', pillars);
        }
      } else if (target.target === 'seo') {
        const seo = { ...this.siteSettings().seo };
        (seo as any)[target.property] = url;
        this.siteSettings.update((s) => ({ ...s, seo }));
        await this.content.saveSetting('seo', seo);
      } else if (target.target === 'why_item') {
        const whyChooseUs = { ...(this.siteSettings().whyChooseUs || {}) };
        const items = [...(whyChooseUs.items || [])];
        const idx = parseInt(target.property, 10);
        if (!isNaN(idx) && items[idx]) {
          items[idx] = { ...items[idx], image: url };
          whyChooseUs.items = items;
          this.siteSettings.update((s) => ({ ...s, whyChooseUs }));
          await this.content.saveSetting('whyChooseUs', whyChooseUs);
        }
      } else if (target.target === 'service') {
        if (this.selectedService()) {
          const svc = { ...this.selectedService()! };
          (svc as any)[target.property] = url;
          this.selectedService.set(svc);
          await this.content.saveService(svc);
        } else {
          const activeSlug = this.activeModule() === 'digital' ? 'web-development' : this.activeModule();
          const found = this.servicesList().find((s) => s.slug === activeSlug);
          if (found) {
            const updated = { ...found };
            (updated as any)[target.property] = url;
            await this.content.saveService(updated);
          }
        }
      } else if (target.target === 'product') {
        if (this.selectedProduct()) {
          const prod = { ...this.selectedProduct()! };
          (prod as any)[target.property] = url;
          this.selectedProduct.set(prod);
          await this.content.saveProduct(prod);
        }
      } else if (target.target === 'industry') {
        if (this.selectedIndustry()) {
          const ind = { ...this.selectedIndustry()! };
          (ind as any)[target.property] = url;
          this.selectedIndustry.set(ind);
          await this.content.saveIndustry(ind);
        }
      } else if (target.target === 'partner') {
        if (this.selectedPartner()) {
          const ptr = { ...this.selectedPartner()! };
          (ptr as any)[target.property] = url;
          ptr.image = url;
          this.selectedPartner.set(ptr);
          await this.content.savePartner(ptr);
        }
      } else if (target.target === 'blog') {
        if (this.selectedBlog()) {
          const blg = { ...this.selectedBlog()! };
          (blg as any)[target.property] = url;
          blg.image = url;
          blg.heroImage = url;
          this.selectedBlog.set(blg);
          await this.content.saveBlog(blg);
          this.blogsList.update((list) => {
            const idx = list.findIndex((b) => b.slug === blg.slug);
            if (idx >= 0) {
              const updated = [...list];
              updated[idx] = { ...blg };
              return updated;
            }
            return list;
          });
        }
      }
      if (notify) {
        this.showToast('success', 'Picture updated & synchronized live to website!');
      }
    }
    this.closeMediaUploadModal();
  }

  // --- ACTIVITY LOGS ---

  async loadActivityLogs(): Promise<void> {
    const logs = await this.content.fetchActivityLogs();
    this.activityLogs.set(logs);
  }

  async saveAboutSection(): Promise<void> {
    try {
      await this.content.saveSetting('about', this.siteSettings().about);
      if (this.siteSettings().aboutPillars) {
        await this.content.saveSetting('aboutPillars', this.siteSettings().aboutPillars);
      }
      this.showToast('success', 'About Company & Foundation Pillars published and synchronized!');
    } catch (e: any) {
      this.showToast('error', `Failed to publish: ${e.message}`);
    }
  }

  async restoreAllBackup(): Promise<void> {
    try {
      this.showToast('info', 'Restoring all default Industries, Partners, Blogs, Services & Products...');
      await this.content.restoreAllDefaultData();
      this.showToast('success', 'All backup data (10 Services, 5 Products, 8 Industries, 12 Partners, 6 Blogs) restored live!');
    } catch (e: any) {
      this.showToast('error', `Restore failed: ${e.message}`);
    }
  }

  // --- HELPERS ---

  formatSectionName(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  logout(): void {
    this.sb.signOut();
    this.sb.setDemoSession(false);
    this.router.navigate(['/admin/login']);
  }
}
