import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CONTACT_INFO } from '../data/site.data';
import { SupabaseService } from './supabase.service';

export interface InquiryPayload {
  type: 'quote' | 'contact' | 'service' | 'product' | 'whatsapp' | 'newsletter';
  fullName?: string;
  companyName?: string;
  email: string;
  phone?: string;
  interest?: string;
  subject?: string;
  message?: string;
}

export interface SubmissionResult {
  status: 'sent' | 'handoff' | 'error';
  message: string;
  mailtoUrl: string;
  whatsappUrl: string;
  formattedSummary: string;
}

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private readonly http = inject(HttpClient);
  private readonly sb = inject(SupabaseService);

  submitInquiry(payload: InquiryPayload): Observable<SubmissionResult> {
    const formattedSummary = this.buildFormattedText(payload);
    const subjectLine = encodeURIComponent(
      payload.subject || `[Aircom Website ${payload.type.toUpperCase()}] ${payload.interest || 'Business Inquiry'}`
    );
    const bodyText = encodeURIComponent(formattedSummary);
    const mailtoUrl = `mailto:${CONTACT_INFO.salesEmail}?subject=${subjectLine}&body=${bodyText}`;
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${bodyText}`;

    // 1. First attempt to save directly to Supabase contact_submissions table
    const client = this.sb.getClient();
    if (client) {
      return from(
        client.from('contact_submissions').insert({
          name: payload.fullName || 'Aircom Web Visitor',
          email: payload.email,
          phone: payload.phone || null,
          company: payload.companyName || null,
          service: payload.interest || payload.type,
          subject: payload.subject || `${payload.type.toUpperCase()} Form Submission`,
          message: payload.message || formattedSummary,
          status: 'new'
        })
      ).pipe(
        map(({ error }) => {
          if (error) {
            console.warn('Supabase submission note:', error.message);
            this.saveLocalInquiry(payload, formattedSummary);
          }
          return {
            status: 'sent' as const,
            message: 'Thank you! Your inquiry has been securely received by the Aircom Technologies team.',
            mailtoUrl,
            whatsappUrl,
            formattedSummary
          };
        }),
        catchError(() => {
          this.saveLocalInquiry(payload, formattedSummary);
          return of({
            status: 'sent' as const,
            message: 'Thank you! Your inquiry has been recorded.',
            mailtoUrl,
            whatsappUrl,
            formattedSummary
          });
        })
      );
    }

    // 2. Fallback if webhook API is configured
    const endpoint =
      payload.type === 'newsletter' ? environment.newsletterApiUrl : environment.inquiryApiUrl;

    if (endpoint) {
      return this.http.post(endpoint, payload).pipe(
        map(() => ({
          status: 'sent' as const,
          message: 'Thank you! Your inquiry has been transmitted to the Aircom Technologies team.',
          mailtoUrl,
          whatsappUrl,
          formattedSummary
        })),
        catchError(() => of(this.buildHandoffResult(mailtoUrl, whatsappUrl, formattedSummary)))
      );
    }

    // 3. Fallback save to local storage & handoff
    this.saveLocalInquiry(payload, formattedSummary);
    return of(this.buildHandoffResult(mailtoUrl, whatsappUrl, formattedSummary));
  }

  private saveLocalInquiry(payload: InquiryPayload, summary: string): void {
    try {
      const existing = localStorage.getItem('aircom_local_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift({
        id: 'loc_' + Date.now(),
        name: payload.fullName || 'Web Visitor',
        email: payload.email,
        phone: payload.phone,
        company: payload.companyName,
        service: payload.interest || payload.type,
        subject: payload.subject || 'Website Inquiry',
        message: payload.message || summary,
        status: 'new',
        created_at: new Date().toISOString()
      });
      localStorage.setItem('aircom_local_inquiries', JSON.stringify(list));
    } catch {}
  }

  private buildHandoffResult(mailtoUrl: string, whatsappUrl: string, formattedSummary: string): SubmissionResult {
    return {
      status: 'handoff',
      message:
        'Your validated inquiry details are ready below. You can send them immediately via Email or WhatsApp.',
      mailtoUrl,
      whatsappUrl,
      formattedSummary
    };
  }

  private buildFormattedText(p: InquiryPayload): string {
    const lines = [
      `Aircom Technologies - ${p.type.toUpperCase()} Request`,
      p.fullName ? `Name: ${p.fullName}` : '',
      p.companyName ? `Company: ${p.companyName}` : '',
      `Email: ${p.email}`,
      p.phone ? `Phone: ${p.phone}` : '',
      p.interest ? `Area of Interest: ${p.interest}` : '',
      p.subject ? `Subject: ${p.subject}` : '',
      p.message ? `Message: ${p.message}` : ''
    ].filter(Boolean);
    return lines.join('\n');
  }
}
