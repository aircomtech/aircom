import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CONTACT_INFO } from '../data/site.data';

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

  submitInquiry(payload: InquiryPayload): Observable<SubmissionResult> {
    const formattedSummary = this.buildFormattedText(payload);
    const subjectLine = encodeURIComponent(
      payload.subject || `[Aircom Website ${payload.type.toUpperCase()}] ${payload.interest || 'Business Inquiry'}`
    );
    const bodyText = encodeURIComponent(formattedSummary);
    const mailtoUrl = `mailto:${CONTACT_INFO.salesEmail}?subject=${subjectLine}&body=${bodyText}`;
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${bodyText}`;

    const endpoint =
      payload.type === 'newsletter' ? environment.newsletterApiUrl : environment.inquiryApiUrl;

    if (!endpoint) {
      // Honest handling when no live backend API endpoint is configured
      return of({
        status: 'handoff',
        message:
          'No live inquiry server is connected in this frontend environment. Your validated details are ready below—send immediately via Email or WhatsApp.',
        mailtoUrl,
        whatsappUrl,
        formattedSummary
      });
    }

    return this.http.post(endpoint, payload).pipe(
      map(() => ({
        status: 'sent' as const,
        message: 'Thank you! Your inquiry has been transmitted to the Aircom Technologies team.',
        mailtoUrl,
        whatsappUrl,
        formattedSummary
      })),
      catchError(() =>
        of({
          status: 'error' as const,
          message:
            'We could not reach the inquiry server right now. Please send your validated request directly via Email or WhatsApp below.',
          mailtoUrl,
          whatsappUrl,
          formattedSummary
        })
      )
    );
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

