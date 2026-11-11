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
import { ServiceItem, ProductItem, IndustryItem } from '../../core/models/site.models';

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
  | 'projects'
  | 'why_us'
  | 'statistics'
  | 'partners'
  | 'testimonials'
  | 'media'
  | 'contact_info'
  | 'inquiries'
  | 'footer'
  | 'seo'
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
  siteSettings = signal<SiteSettingsMap>({});
  servicesList = signal<ServiceItem[]>([]);
  productsList = signal<ProductItem[]>([]);
  industriesList = signal<IndustryItem[]>([]);
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
  selectedInquiry = signal<InquiryRecord | null>(null);

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
    const inquiries = this.inquiriesList();
    const newInquiries = inquiries.filter((i) => i.status === 'new').length;
    const totalMedia = this.mediaAssets().length;
    return {
      totalServices,
      totalProducts,
      totalIndustries,
      totalInquiries: inquiries.length,
      newInquiries,
      totalMedia
    };
  });

  ngOnInit(): void {
    this.adminEmail.set(this.sb.getAdminEmail());

    // Load reactive snapshots
    this.siteSettings.set(JSON.parse(JSON.stringify(this.content.currentSettings)));
    this.servicesList.set(JSON.parse(JSON.stringify(this.content.currentServices)));
    this.productsList.set(JSON.parse(JSON.stringify(this.content.currentProducts)));
    this.industriesList.set(JSON.parse(JSON.stringify(this.content.currentIndustries)));

    // Subscribe to live sync changes
    this.content.liveSyncActive$.subscribe((active) => {
      this.isLiveSyncActive.set(active);
    });

    this.content.settings$.subscribe((settings) => {
      this.siteSettings.set(JSON.parse(JSON.stringify(settings)));
    });

    this.content.services$.subscribe((services) => {
      this.servicesList.set(JSON.parse(JSON.stringify(services)));
    });

    this.content.products$.subscribe((products) => {
      this.productsList.set(JSON.parse(JSON.stringify(products)));
    });

    this.content.industries$.subscribe((industries) => {
      this.industriesList.set(JSON.parse(JSON.stringify(industries)));
    });

    // Fetch inquiries, logs, media
    this.loadInquiries();
    this.loadActivityLogs();
    this.loadMediaAssets();
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

    try {
      const result = await this.cloudinary.uploadImage(file, 'aircom');
      this.uploadedImageUrl.set(result.secure_url);

      const record: MediaAssetRecord = {
        name: file.name,
        secure_url: result.secure_url,
        public_id: result.public_id,
        folder: 'aircom',
        format: result.format,
        width: result.width,
        height: result.height,
        created_at: new Date().toISOString()
      };

      await this.content.saveMediaAsset(record);
      await this.loadMediaAssets();
      this.showToast('success', 'Image uploaded to Cloudinary & recorded!');
    } catch (err: any) {
      this.uploadError.set(err.message || 'Image upload failed.');
    } finally {
      this.uploadingFile.set(false);
    }
  }

  applyUploadedImage(urlToApply?: string): void {
    const url = urlToApply || this.uploadedImageUrl() || this.directUrlInput();
    if (!url) return;

    const target = this.uploadTargetField();
    if (target) {
      if (target.target === 'hero') {
        const hero = { ...this.siteSettings().hero };
        (hero as any)[target.property] = url;
        this.siteSettings.update((s) => ({ ...s, hero }));
      } else if (target.target === 'about') {
        const about = { ...this.siteSettings().about };
        (about as any)[target.property] = url;
        this.siteSettings.update((s) => ({ ...s, about }));
      } else if (target.target === 'service' && this.selectedService()) {
        const svc = { ...this.selectedService()! };
        (svc as any)[target.property] = url;
        this.selectedService.set(svc);
      } else if (target.target === 'product' && this.selectedProduct()) {
        const prod = { ...this.selectedProduct()! };
        (prod as any)[target.property] = url;
        this.selectedProduct.set(prod);
      } else if (target.target === 'industry' && this.selectedIndustry()) {
        const ind = { ...this.selectedIndustry()! };
        (ind as any)[target.property] = url;
        this.selectedIndustry.set(ind);
      }
      this.showToast('success', 'Image assigned to target field!');
    }
    this.closeMediaUploadModal();
  }

  async deleteMedia(asset: MediaAssetRecord): Promise<void> {
    if (asset.id && confirm(`Delete "${asset.name}" from library?`)) {
      await this.content.deleteMediaAsset(asset.id);
      await this.loadMediaAssets();
      this.showToast('info', 'Media asset removed.');
    }
  }

  // --- ACTIVITY LOGS ---

  async loadActivityLogs(): Promise<void> {
    const logs = await this.content.fetchActivityLogs();
    this.activityLogs.set(logs);
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
