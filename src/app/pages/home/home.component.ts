import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ABOUT_CONTENT,
  HERO_STATS,
  INDUSTRIES_DATA,
  PRODUCTS_DATA,
  SERVICES_DATA,
  WHY_CHOOSE_ITEMS
} from '../../core/data/site.data';
import { AnimationService } from '../../core/services/animation.service';
import { DialogLauncherService } from '../../core/services/dialog-launcher.service';
import { SeoService } from '../../core/services/seo.service';
import { ContactSectionComponent } from '../../shared/components/contact-section/contact-section.component';
import { TechIconComponent } from '../../shared/components/tech-icon/tech-icon.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TechIconComponent, ScrollRevealDirective, ContactSectionComponent],
  styleUrl: './home.component.scss',
  template: `
    <!-- 1. HERO SECTION -->
    <section class="hero-section" #heroSection (mousemove)="onHeroMouseMove($event)">
      <!-- Desktop animated hero visual (image copy 2.png) -->
      <div class="hero-bg-desktop" #heroParallaxDesktop aria-hidden="true">
        <img src="assets/images/hero-desktop.png" alt="Enterprise Digital Globe and Cloud Technology" class="hero-img-desktop" />
      </div>

      <!-- Mobile animated hero visual (image copy 3.png) -->
      <div class="hero-bg-mobile" #heroParallaxMobile aria-hidden="true">
        <img src="assets/images/hero-mobile.png" alt="Enterprise Digital Globe Mobile Visual" class="hero-img-mobile" />
      </div>

      <div class="hero-gradient-overlay" aria-hidden="true"></div>

      <!-- Subtle glowing digital globe pulse & floating tech rings -->
      <div class="hero-tech-aura" aria-hidden="true">
        <span class="pulse-ring ring-1"></span>
        <span class="pulse-ring ring-2"></span>
        <span class="float-chip chip-cloud">Cloud ERP</span>
        <span class="float-chip chip-sec">Zero-Trust</span>
        <span class="float-chip chip-ai">Analytics</span>
      </div>

      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span>INNOVATIVE &bull; SCALABLE &bull; RELIABLE</span>
            <span class="eyebrow-bar"></span>
          </div>

          <h1 class="hero-title">
            Enterprise Technology Solutions for a
            <span class="highlight-orange">Smarter Tomorrow</span>
          </h1>

          <p class="hero-desc">
            At Aircom Technologies, we deliver cutting-edge ERP solutions, IT infrastructure, enterprise integrations, and digital services to help businesses grow with innovation and efficiency.
          </p>

          <div class="hero-cta-row">
            <a href="#services-section" class="btn-orange hero-btn">
              <span>Explore Our Services</span>
              <span aria-hidden="true">→</span>
            </a>
            <button type="button" class="btn-outline-navy hero-btn" (click)="dialogs.openContact()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS STRIP BELOW HERO -->
    <section class="stats-strip-section" aria-label="Verified Company Highlights">
      <div class="container">
        <div class="stats-strip-card">
          @for (stat of stats; track stat.label) {
            <div class="stat-pill">
              <div class="stat-icon">
                <app-tech-icon [name]="stat.icon" [size]="26" color="#2457A7" />
              </div>
              <div class="stat-text">
                @if (stat.numericValue) {
                  <strong #counter17>{{ stat.value }}</strong>
                } @else {
                  <strong>{{ stat.value }}</strong>
                }
                <span>{{ stat.label }}</span>
                <small>{{ stat.sublabel }}</small>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 2. SERVICES SECTION (10 CARDS) -->
    <section class="services-section" id="services-section">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <div class="eyebrow-row">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">Our Services</span>
            <span class="eyebrow-line right"></span>
          </div>
          <h2>Comprehensive IT &amp; Business Solutions</h2>
          <p>From ERP to Cloud, we provide end-to-end technology solutions for your business success.</p>
        </div>

        <div class="services-grid" #servicesGrid>
          @for (service of services; track service.slug) {
            <a [routerLink]="['/services', service.slug]" class="service-card">
              <div class="sc-icon-wrap">
                <app-tech-icon [name]="service.icon" [size]="34" color="#2457A7" />
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.shortDesc }}</p>
              <div class="sc-footer">
                <span class="sc-link-label">Explore Solution</span>
                <span class="sc-arrow" aria-hidden="true">→</span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- 3. ABOUT US SPLIT SECTION -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <!-- Left Building Visual -->
          <div class="about-visual-col" appScrollReveal="left">
            <div class="about-image-frame">
              <img [src]="about.image" alt="Modern Aircom Technologies enterprise innovation center visual" loading="lazy" />
              <div class="about-year-badge">
                <strong>2009</strong>
                <span>Est. &bull; 17+ Years</span>
              </div>
            </div>
          </div>

          <!-- Center Narrative -->
          <div class="about-copy-col" appScrollReveal="up">
            <div class="inline-eyebrow">
              <span class="eyebrow-line"></span>
              <span>{{ about.eyebrow }}</span>
              <span class="eyebrow-line right"></span>
            </div>
            <h2>{{ about.heading }}</h2>
            <p class="about-desc">{{ about.description }}</p>

            <div class="about-mini-badges">
              <div class="mini-stat">
                <app-tech-icon name="trophy" [size]="22" color="#2457A7" />
                <div>
                  <strong>17+ Years</strong>
                  <span>Of Excellence</span>
                </div>
              </div>
              <div class="mini-stat">
                <app-tech-icon name="users" [size]="22" color="#2457A7" />
                <div>
                  <strong>Customer</strong>
                  <span>Focused Solutions</span>
                </div>
              </div>
              <div class="mini-stat">
                <app-tech-icon name="shield-check" [size]="22" color="#2457A7" />
                <div>
                  <strong>Quality</strong>
                  <span>Driven Delivery</span>
                </div>
              </div>
              <div class="mini-stat">
                <app-tech-icon name="headphones" [size]="22" color="#2457A7" />
                <div>
                  <strong>Dedicated</strong>
                  <span>Technical Support</span>
                </div>
              </div>
            </div>

            <a routerLink="/about" class="btn-navy">
              <span>Know More</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <!-- Right Vision / Mission / Core Values Card -->
          <div class="about-pillars-card" appScrollReveal="right">
            <div class="pillar-item">
              <div class="pillar-icon"><app-tech-icon name="eye" [size]="22" color="#102A63" /></div>
              <div>
                <h3>Our Vision</h3>
                <p>{{ about.vision }}</p>
              </div>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon"><app-tech-icon name="rocket" [size]="22" color="#2457A7" /></div>
              <div>
                <h3>Our Mission</h3>
                <p>{{ about.mission }}</p>
              </div>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon"><app-tech-icon name="gem" [size]="22" color="#0BA8EA" /></div>
              <div>
                <h3>Our Core Values</h3>
                <div class="core-chips">
                  @for (val of about.coreValues; track val) {
                    <span>{{ val }}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. WHY CHOOSE AIRCOM? -->
    <section class="why-section">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <div class="eyebrow-row">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">Why Choose Aircom?</span>
            <span class="eyebrow-line right"></span>
          </div>
          <h2>Building a Smarter, Stronger &amp; More Connected Business</h2>
          <p>Enterprise reliability backed by deep domain expertise in ERP, integration, and IT infrastructure.</p>
        </div>

        <div class="why-grid" #whyGrid>
          @for (item of whyItems; track item.title; let i = $index) {
            <div class="why-card">
              <div class="why-icon" [style.borderColor]="item.accent">
                <app-tech-icon [name]="item.icon" [size]="30" [color]="item.accent" />
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <span class="why-step">0{{ i + 1 }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 5. PRODUCTS SECTION (5 PRODUCTS + CTA PANEL) -->
    <section class="products-section">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <div class="eyebrow-row">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">Our Products</span>
            <span class="eyebrow-line right"></span>
          </div>
          <h2>Innovative Products for a Smarter Business</h2>
          <p>Explore our enterprise solution categories designed to simplify, automate, and accelerate business growth.</p>
        </div>

        <div class="products-showcase" #productsGrid>
          <div class="products-cards-grid">
            @for (product of products; track product.slug) {
              <a [routerLink]="['/products', product.slug]" class="product-card">
                <div class="pc-thumb">
                  <img [src]="product.image" [alt]="product.title" loading="lazy" />
                  <span class="pc-icon-badge">
                    <app-tech-icon [name]="product.icon" [size]="22" color="#FFFFFF" />
                  </span>
                </div>
                <div class="pc-body">
                  <h3>{{ product.title }}</h3>
                  <p>{{ product.shortDesc }}</p>
                  <span class="pc-explore">Explore Product →</span>
                </div>
              </a>
            }
          </div>

          <aside class="products-cta-banner" appScrollReveal="right">
            <span class="pct-tag">Tailored Deployment</span>
            <h3>Ready to Simplify &amp; Scale Operations?</h3>
            <p>Combine Cloud ERP, Analytics, Security, and Managed IT under one trusted partner.</p>
            <button type="button" class="btn-orange" (click)="dialogs.openQuote('Cloud ERP Solution')">
              Get Started Today →
            </button>
          </aside>
        </div>
      </div>
    </section>

    <!-- 6. INDUSTRIES WE SERVE (HORIZONTAL / SWIPEABLE CAROUSEL) -->
    <section class="industries-section">
      <div class="container">
        <div class="industries-head">
          <div class="section-header" style="margin-bottom:24px;" appScrollReveal="up">
            <div class="eyebrow-row">
              <span class="eyebrow-line"></span>
              <span class="eyebrow-text">Industries We Serve</span>
              <span class="eyebrow-line right"></span>
            </div>
            <h2>Tailored IT Solutions for Diverse Industries</h2>
          </div>

          <div class="carousel-controls" aria-label="Scroll industries">
            <button type="button" class="carousel-arrow" (click)="scrollIndustries(-1)" aria-label="Previous industries">‹</button>
            <button type="button" class="carousel-arrow" (click)="scrollIndustries(1)" aria-label="Next industries">›</button>
          </div>
        </div>

        <div class="industries-track" #industriesTrack>
          @for (ind of industries; track ind.slug) {
            <a [routerLink]="['/industries', ind.slug]" class="industry-card">
              <img [src]="ind.image" [alt]="ind.name + ' IT and ERP solutions'" class="ind-bg" loading="lazy" />
              <div class="ind-overlay"></div>
              <div class="ind-content">
                <div class="ind-icon-circle">
                  <app-tech-icon [name]="ind.icon" [size]="26" color="#FFFFFF" />
                </div>
                <h3>{{ ind.name }}</h3>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- 7. CONTACT AND QUOTE SECTION -->
    <app-contact-section />
  `
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly seo = inject(SeoService);
  private readonly anim = inject(AnimationService);
  readonly dialogs = inject(DialogLauncherService);

  readonly stats = HERO_STATS;
  readonly services = SERVICES_DATA;
  readonly about = ABOUT_CONTENT;
  readonly whyItems = WHY_CHOOSE_ITEMS;
  readonly products = PRODUCTS_DATA;
  readonly industries = INDUSTRIES_DATA;

  @ViewChild('heroSection') heroSection?: ElementRef<HTMLElement>;
  @ViewChild('heroParallaxDesktop') heroParallaxDesktop?: ElementRef<HTMLElement>;
  @ViewChild('heroParallaxMobile') heroParallaxMobile?: ElementRef<HTMLElement>;
  @ViewChild('counter17') counter17?: ElementRef<HTMLElement>;
  @ViewChild('servicesGrid') servicesGrid?: ElementRef<HTMLElement>;
  @ViewChild('whyGrid') whyGrid?: ElementRef<HTMLElement>;
  @ViewChild('productsGrid') productsGrid?: ElementRef<HTMLElement>;
  @ViewChild('industriesTrack') industriesTrack?: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Aircom Technologies | ERPNext, Tally Integration & IT Solutions',
      description:
        'Aircom Technologies delivers ERPNext implementation, TallyPrime integration, HRMS, CRM automation, IT infrastructure, cloud solutions and digital services for growing businesses.',
      path: '/',
      keywords:
        'ERPNext Implementation, ERPNext Customization, TallyPrime Integration, HRMS Software, Biometric Attendance Integration, CRM Integration, IT Infrastructure Services, Cloud Hosting Solutions, Business Automation, Web Development Services'
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.anim.init();

    if (!this.anim.prefersReducedMotion()) {
      this.ctx = gsap.context(() => {
        gsap.from('.hero-eyebrow, .hero-title, .hero-desc, .hero-cta-row', {
          y: 26,
          opacity: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        });

        if (this.heroSection && this.heroParallaxDesktop) {
          gsap.to(this.heroParallaxDesktop.nativeElement, {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: this.heroSection.nativeElement,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });

      if (this.counter17) {
        this.anim.animateCounter(this.counter17.nativeElement, 17, '+');
      }
      if (this.servicesGrid) {
        this.anim.animateStaggerCards(this.servicesGrid.nativeElement, '.service-card');
      }
      if (this.whyGrid) {
        this.anim.animateStaggerCards(this.whyGrid.nativeElement, '.why-card');
      }
      if (this.productsGrid) {
        this.anim.animateStaggerCards(this.productsGrid.nativeElement, '.product-card');
      }
    }
  }

  onHeroMouseMove(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || this.anim.prefersReducedMotion() || window.innerWidth < 992) {
      return;
    }
    const target = this.heroParallaxDesktop?.nativeElement;
    if (!target) {
      return;
    }
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(target, {
      x: xRatio * -16,
      y: yRatio * -10,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  scrollIndustries(direction: number): void {
    const track = this.industriesTrack?.nativeElement;
    if (!track) {
      return;
    }
    const step = Math.max(260, track.clientWidth * 0.65);
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}

