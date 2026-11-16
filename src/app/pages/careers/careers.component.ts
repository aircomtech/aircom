import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobPosting } from '../../core/models/site.models';
import { ContentService } from '../../core/services/content.service';
import { SeoService } from '../../core/services/seo.service';
import { SubmissionResult, SubmissionService } from '../../core/services/submission.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { InquiryResultBannerComponent } from '../../features/shared/inquiry-result-banner.component';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BreadcrumbComponent,
    CtaBannerComponent,
    ScrollRevealDirective,
    InquiryResultBannerComponent
  ],
  styleUrl: '../_inner-page.scss',
  template: `
    <!-- Careers Hero -->
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Careers' }]" />
        <span class="hero-badge">Join Our Team &bull; We're Hiring</span>
        <h1>Shape the Future of Enterprise Technology</h1>
        <p>
          At Aircom Technologies, we empower ambitious engineers, ERP consultants, and technology architects to build transformative software and resilient IT systems.
        </p>
      </div>
    </section>

    <!-- Why Work at Aircom (Benefits Strip) -->
    <section class="page-section" style="padding-top:54px;padding-bottom:32px;">
      <div class="container">
        <div class="section-header" style="text-align:center;margin-bottom:36px;" appScrollReveal="up">
          <span style="display:inline-block;padding:4px 14px;border-radius:20px;background:#EBF5FF;color:#2457A7;font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">
            Life at Aircom
          </span>
          <h2 style="font-size:2.2rem;color:#0D1B3E;margin-bottom:12px;">Why Grow Your Career With Us?</h2>
          <p style="color:#64748B;max-width:680px;margin:0 auto;">
            We unite enterprise software craftsmanship, continuous learning, and client trust under an empowering environment.
          </p>
        </div>

        <div class="card-grid-4" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:20px;">
          <div class="feature-box" style="padding:24px;border-radius:16px;background:#FFFFFF;border:1px solid #E2E8F0;box-shadow:0 4px 14px rgba(13,27,62,0.05);" appScrollReveal="up">
            <div style="width:44px;height:44px;border-radius:12px;background:#F0F7FF;color:#0BA8EA;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:14px;">
              🚀
            </div>
            <h3 style="font-size:1.1rem;color:#0D1B3E;margin:0 0 8px;">Modern Tech Stack</h3>
            <p style="font-size:0.88rem;color:#64748B;line-height:1.5;margin:0;">
              Work with ERPNext, Python, Frappe Framework, Cloud DevOps, modern APIs, and hybrid multi-cloud infrastructure.
            </p>
          </div>

          <div class="feature-box" style="padding:24px;border-radius:16px;background:#FFFFFF;border:1px solid #E2E8F0;box-shadow:0 4px 14px rgba(13,27,62,0.05);" appScrollReveal="up">
            <div style="width:44px;height:44px;border-radius:12px;background:#FEF3C7;color:#D97706;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:14px;">
              📈
            </div>
            <h3 style="font-size:1.1rem;color:#0D1B3E;margin:0 0 8px;">Accelerated Growth</h3>
            <p style="font-size:0.88rem;color:#64748B;line-height:1.5;margin:0;">
              Clear performance roadmaps, mentorship from senior architects, and certifications in Frappe and Cloud infrastructure.
            </p>
          </div>

          <div class="feature-box" style="padding:24px;border-radius:16px;background:#FFFFFF;border:1px solid #E2E8F0;box-shadow:0 4px 14px rgba(13,27,62,0.05);" appScrollReveal="up">
            <div style="width:44px;height:44px;border-radius:12px;background:#ECFDF5;color:#059669;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:14px;">
              🏆
            </div>
            <h3 style="font-size:1.1rem;color:#0D1B3E;margin:0 0 8px;">Competitive Benefits</h3>
            <p style="font-size:0.88rem;color:#64748B;line-height:1.5;margin:0;">
              Attractive remuneration, performance bonuses, health insurance, paid annual leaves, and festival celebrations.
            </p>
          </div>

          <div class="feature-box" style="padding:24px;border-radius:16px;background:#FFFFFF;border:1px solid #E2E8F0;box-shadow:0 4px 14px rgba(13,27,62,0.05);" appScrollReveal="up">
            <div style="width:44px;height:44px;border-radius:12px;background:#EEF2FF;color:#4F46E5;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:14px;">
              🤝
            </div>
            <h3 style="font-size:1.1rem;color:#0D1B3E;margin:0 0 8px;">Collaborative Culture</h3>
            <p style="font-size:0.88rem;color:#64748B;line-height:1.5;margin:0;">
              Flat leadership hierarchy, direct exposure to client leadership, open feedback, and respectful team values.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Open Positions Section -->
    <section class="page-section alt-bg" id="open-positions" style="padding-top:48px;padding-bottom:64px;">
      <div class="container">
        <div class="section-header" style="text-align:center;margin-bottom:32px;">
          <h2 style="font-size:2.2rem;color:#0D1B3E;margin-bottom:10px;">Current Open Opportunities</h2>
          <p style="color:#64748B;max-width:640px;margin:0 auto;">
            Explore our open roles below and apply directly. Your application will be delivered straight to our hiring team.
          </p>
        </div>

        <!-- Department Filters -->
        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:32px;">
          @for (dept of departments(); track dept) {
            <button
              type="button"
              (click)="activeDept.set(dept)"
              [style.background]="activeDept() === dept ? '#102A63' : '#FFFFFF'"
              [style.color]="activeDept() === dept ? '#FFFFFF' : '#102A63'"
              style="border:1px solid #CBD5E1;border-radius:999px;padding:8px 18px;font-weight:600;cursor:pointer;font-size:0.86rem;font-family:inherit;transition:all 0.2s;"
            >
              {{ dept }}
            </button>
          }
        </div>

        <!-- Job Cards Grid -->
        <div style="display:grid;grid-template-columns:1fr;gap:20px;max-width:980px;margin:0 auto;">
          @for (job of filteredJobs(); track job.id) {
            <div
              class="job-card"
              style="background:#FFFFFF;border-radius:18px;padding:28px;border:1px solid #E2E8F0;box-shadow:0 4px 18px rgba(13,27,62,0.06);display:flex;flex-direction:column;gap:16px;"
              appScrollReveal="up"
            >
              <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                <div>
                  <span style="display:inline-block;padding:3px 10px;border-radius:8px;background:#EBF5FF;color:#2457A7;font-size:0.75rem;font-weight:700;margin-bottom:6px;">
                    {{ job.department }}
                  </span>
                  <h3 style="font-size:1.35rem;color:#0D1B3E;margin:0 0 6px;">{{ job.title }}</h3>
                  <div style="display:flex;flex-wrap:wrap;gap:14px;color:#64748B;font-size:0.85rem;">
                    <span>📍 {{ job.location }}</span>
                    <span>•</span>
                    <span>💼 {{ job.type }}</span>
                    <span>•</span>
                    <span>⏳ {{ job.experience }}</span>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn-orange"
                  style="padding:10px 22px;font-size:0.9rem;"
                  (click)="openApplyModal(job)"
                >
                  Apply Now →
                </button>
              </div>

              <p style="color:#475569;font-size:0.92rem;line-height:1.6;margin:0;">
                {{ job.overview }}
              </p>

              @if (job.requirements && job.requirements.length > 0) {
                <div style="background:#F8FAFC;border-radius:12px;padding:16px;border:1px solid #F1F5F9;">
                  <strong style="display:block;font-size:0.85rem;color:#0D1B3E;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.04em;">Key Requirements:</strong>
                  <ul style="margin:0;padding-left:18px;color:#475569;font-size:0.88rem;line-height:1.6;">
                    @for (req of job.requirements.slice(0, 3); track req) {
                      <li>{{ req }}</li>
                    }
                  </ul>
                </div>
              }
            </div>
          }

          @if (filteredJobs().length === 0) {
            <div style="text-align:center;padding:48px 20px;background:#FFFFFF;border-radius:16px;border:1px dashed #CBD5E1;">
              <p style="color:#64748B;font-size:1rem;margin:0 0 12px;">No active openings currently listed in this category.</p>
              <button type="button" class="btn-orange" (click)="openGeneralApply()">Send General Application →</button>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Application Modal -->
    @if (modalOpen()) {
      <div
        style="position:fixed;inset:0;background:rgba(13,27,62,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px);"
        (click)="closeModal()"
      >
        <div
          style="background:#FFFFFF;border-radius:22px;max-width:620px;width:100%;max-height:90vh;overflow-y:auto;padding:32px;box-shadow:0 24px 64px rgba(13,27,62,0.3);position:relative;"
          (click)="$event.stopPropagation()"
        >
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px;">
            <div>
              <span style="font-size:0.75rem;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:0.06em;">Application Form</span>
              <h3 style="font-size:1.45rem;color:#0D1B3E;margin:4px 0 0;">
                Apply: {{ selectedJob()?.title || 'General Opportunity' }}
              </h3>
            </div>
            <button
              type="button"
              (click)="closeModal()"
              style="width:36px;height:36px;border-radius:50%;border:none;background:#F1F5F9;color:#64748B;font-size:1.2rem;cursor:pointer;"
            >
              ✕
            </button>
          </div>

          <form [formGroup]="form" (ngSubmit)="submitApplication()" novalidate>
            <div style="display:grid;gap:16px;">
              <div>
                <label style="display:block;font-size:0.85rem;font-weight:600;color:#0D1B3E;margin-bottom:6px;">Full Name *</label>
                <input
                  type="text"
                  formControlName="fullName"
                  placeholder="e.g. Rahul Sharma"
                  style="width:100%;padding:10px 14px;border-radius:10px;border:1px solid #CBD5E1;font-size:0.9rem;"
                />
                @if (showErr('fullName')) {
                  <span style="color:#DC2626;font-size:0.75rem;display:block;margin-top:4px;">Full name is required.</span>
                }
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                <div>
                  <label style="display:block;font-size:0.85rem;font-weight:600;color:#0D1B3E;margin-bottom:6px;">Email Address *</label>
                  <input
                    type="email"
                    formControlName="email"
                    placeholder="you@domain.com"
                    style="width:100%;padding:10px 14px;border-radius:10px;border:1px solid #CBD5E1;font-size:0.9rem;"
                  />
                  @if (showErr('email')) {
                    <span style="color:#DC2626;font-size:0.75rem;display:block;margin-top:4px;">Valid email is required.</span>
                  }
                </div>

                <div>
                  <label style="display:block;font-size:0.85rem;font-weight:600;color:#0D1B3E;margin-bottom:6px;">Phone Number *</label>
                  <input
                    type="tel"
                    formControlName="phone"
                    placeholder="+91 98XXX XXXXX"
                    style="width:100%;padding:10px 14px;border-radius:10px;border:1px solid #CBD5E1;font-size:0.9rem;"
                  />
                  @if (showErr('phone')) {
                    <span style="color:#DC2626;font-size:0.75rem;display:block;margin-top:4px;">Phone number is required.</span>
                  }
                </div>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                <div>
                  <label style="display:block;font-size:0.85rem;font-weight:600;color:#0D1B3E;margin-bottom:6px;">Current Employer / Role *</label>
                  <input
                    type="text"
                    formControlName="currentRole"
                    placeholder="e.g. ERP Consultant at ABC Ltd."
                    style="width:100%;padding:10px 14px;border-radius:10px;border:1px solid #CBD5E1;font-size:0.9rem;"
                  />
                  @if (showErr('currentRole')) {
                    <span style="color:#DC2626;font-size:0.75rem;display:block;margin-top:4px;">Current role is required.</span>
                  }
                </div>

                <div>
                  <label style="display:block;font-size:0.85rem;font-weight:600;color:#0D1B3E;margin-bottom:6px;">Total Experience *</label>
                  <input
                    type="text"
                    formControlName="experience"
                    placeholder="e.g. 4.5 Years"
                    style="width:100%;padding:10px 14px;border-radius:10px;border:1px solid #CBD5E1;font-size:0.9rem;"
                  />
                </div>
              </div>

              <div>
                <label style="display:block;font-size:0.85rem;font-weight:600;color:#0D1B3E;margin-bottom:6px;">Resume Link / LinkedIn Profile *</label>
                <input
                  type="text"
                  formControlName="resumeUrl"
                  placeholder="https://linkedin.com/in/... or Google Drive link"
                  style="width:100%;padding:10px 14px;border-radius:10px;border:1px solid #CBD5E1;font-size:0.9rem;"
                />
                @if (showErr('resumeUrl')) {
                  <span style="color:#DC2626;font-size:0.75rem;display:block;margin-top:4px;">Please share a link to your resume or LinkedIn profile.</span>
                }
              </div>

              <div>
                <label style="display:block;font-size:0.85rem;font-weight:600;color:#0D1B3E;margin-bottom:6px;">Brief Cover Note / Relevant Experience *</label>
                <textarea
                  rows="3"
                  formControlName="message"
                  placeholder="Summarize your key skills, ERP/IT certifications, and earliest availability..."
                  style="width:100%;padding:10px 14px;border-radius:10px;border:1px solid #CBD5E1;font-size:0.9rem;"
                ></textarea>
                @if (showErr('message')) {
                  <span style="color:#DC2626;font-size:0.75rem;display:block;margin-top:4px;">Please enter at least 10 characters.</span>
                }
              </div>
            </div>

            <app-inquiry-result-banner [result]="result()" />

            <div style="margin-top:20px;display:flex;justify-content:flex-end;gap:12px;">
              <button
                type="button"
                style="padding:10px 18px;border-radius:10px;border:1px solid #CBD5E1;background:#FFFFFF;color:#475569;font-weight:600;cursor:pointer;"
                (click)="closeModal()"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-orange"
                [disabled]="loading()"
                style="padding:10px 24px;"
              >
                @if (loading()) {
                  <span>Transmitting...</span>
                } @else {
                  <span>Submit Application →</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <app-cta-banner />
  `
})
export class CareersComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);
  private readonly submission = inject(SubmissionService);
  private readonly fb = inject(FormBuilder);

  jobs = signal<JobPosting[]>([]);
  activeDept = signal<string>('All');
  modalOpen = signal<boolean>(false);
  selectedJob = signal<JobPosting | null>(null);
  loading = signal<boolean>(false);
  result = signal<SubmissionResult | null>(null);

  readonly departments = computed(() => [
    'All',
    ...new Set(this.jobs().map((j) => j.department).filter(Boolean))
  ]);

  readonly filteredJobs = computed(() => {
    const list = this.jobs().filter((j) => j.status !== 'closed');
    const dept = this.activeDept();
    if (dept === 'All') return list;
    return list.filter((j) => j.department === dept);
  });

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+\d\s()-]{8,18}$/)]],
    currentRole: ['', [Validators.required, Validators.minLength(2)]],
    experience: ['2+ Years'],
    resumeUrl: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.jobs.set(this.content.currentCareers);
    this.content.careers$.subscribe((c) => this.jobs.set(c));

    this.seo.updateSeo({
      title: 'Careers & Opportunities | Aircom Technologies',
      description:
        'Explore careers in ERPNext functional consulting, Frappe Python engineering, cloud infrastructure, and enterprise IT sales at Aircom Technologies.',
      path: '/careers'
    });
  }

  showErr(ctrl: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[ctrl];
    return c.invalid && (c.dirty || c.touched);
  }

  openApplyModal(job: JobPosting): void {
    this.selectedJob.set(job);
    this.result.set(null);
    this.modalOpen.set(true);
  }

  openGeneralApply(): void {
    this.selectedJob.set({
      id: 'gen',
      title: 'General Career Application',
      department: 'General',
      location: 'Hyderabad / Bangalore',
      type: 'Full-time',
      experience: 'Any',
      overview: 'General candidate submission',
      requirements: [],
      responsibilities: [],
      status: 'open',
      order: 99
    });
    this.result.set(null);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.form.reset({
      experience: '2+ Years'
    });
    this.result.set(null);
  }

  submitApplication(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const val = this.form.getRawValue();
    const jobTitle = this.selectedJob()?.title || 'General Application';

    const fullMsg = `Aircom Careers Application:
Position: ${jobTitle}
Candidate: ${val.fullName}
Email: ${val.email}
Phone: ${val.phone}
Current Role & Employer: ${val.currentRole}
Total Experience: ${val.experience}
Resume / Profile Link: ${val.resumeUrl}

Candidate Summary & Cover Note:
${val.message}`;

    this.submission
      .submitInquiry({
        type: 'career',
        fullName: val.fullName,
        email: val.email,
        phone: val.phone,
        companyName: val.currentRole,
        interest: jobTitle,
        subject: `[Aircom Job Application] ${jobTitle} - ${val.fullName}`,
        message: fullMsg
      })
      .subscribe((res) => {
        this.loading.set(false);
        this.result.set(res);
      });
  }
}
