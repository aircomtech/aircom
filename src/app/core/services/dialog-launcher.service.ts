import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactDialogComponent } from '../../features/contact-dialog/contact-dialog.component';
import { InquiryDialogComponent, InquiryDialogData } from '../../features/inquiry-dialog/inquiry-dialog.component';
import { NewsletterDialogComponent } from '../../features/newsletter-dialog/newsletter-dialog.component';
import { QuoteDialogComponent } from '../../features/quote-dialog/quote-dialog.component';
import { WelcomeDialogComponent } from '../../features/welcome-dialog/welcome-dialog.component';
import { WhatsappDialogComponent } from '../../features/whatsapp-dialog/whatsapp-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogLauncherService {
  private readonly dialog = inject(MatDialog);

  openQuote(preselectedService?: string): MatDialogRef<QuoteDialogComponent> {
    return this.dialog.open(QuoteDialogComponent, {
      width: '560px',
      maxWidth: '94vw',
      maxHeight: '92vh',
      panelClass: 'aircom-dialog-panel',
      data: { preselectedService }
    });
  }

  openContact(): MatDialogRef<ContactDialogComponent> {
    return this.dialog.open(ContactDialogComponent, {
      width: '540px',
      maxWidth: '94vw',
      maxHeight: '92vh',
      panelClass: 'aircom-dialog-panel'
    });
  }

  openInquiry(data: InquiryDialogData): MatDialogRef<InquiryDialogComponent> {
    return this.dialog.open(InquiryDialogComponent, {
      width: '540px',
      maxWidth: '94vw',
      maxHeight: '92vh',
      panelClass: 'aircom-dialog-panel',
      data
    });
  }

  openWhatsapp(topic?: string): MatDialogRef<WhatsappDialogComponent> {
    return this.dialog.open(WhatsappDialogComponent, {
      width: '460px',
      maxWidth: '94vw',
      maxHeight: '92vh',
      panelClass: 'aircom-dialog-panel',
      data: { topic }
    });
  }

  openNewsletter(): MatDialogRef<NewsletterDialogComponent> {
    return this.dialog.open(NewsletterDialogComponent, {
      width: '460px',
      maxWidth: '94vw',
      maxHeight: '92vh',
      panelClass: 'aircom-dialog-panel'
    });
  }

  openWelcomeOnce(): void {
    try {
      if (sessionStorage.getItem('aircom_welcome_seen')) {
        return;
      }
      sessionStorage.setItem('aircom_welcome_seen', '1');
      this.dialog.open(WelcomeDialogComponent, {
        width: '500px',
        maxWidth: '92vw',
        panelClass: 'aircom-dialog-panel'
      });
    } catch {
      // Ignore storage restrictions
    }
  }
}

