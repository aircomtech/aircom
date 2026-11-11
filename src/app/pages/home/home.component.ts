import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ABOUT_CONTENT,
  ABOUT_PILLARS,
  HERO_STATS,
  INDUSTRIES_DATA,
  PRODUCTS_DATA,
  SERVICES_DATA,
  WHY_CHOOSE_ITEMS
} from '../../core/data/site.data';
import { ProductItem, ServiceItem } from '../../core/models/site.models';
import { AnimationService } from '../../core/services/animation.service';
import { ContentService } from '../../core/services/content.service';
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
        <img [src]="hero.desktopBgImage || 'assets/images/hero-desktop.png'" alt="Enterprise Digital Globe and Cloud Technology" class="hero-img-desktop" />
      </div>

      <!-- Mobile animated hero visual (image copy 3.png) -->
      <div class="hero-bg-mobile" #heroParallaxMobile aria-hidden="true">
        <img [src]="hero.mobileBgImage || 'assets/images/hero-mobile.png'" alt="Enterprise Digital Globe Mobile Visual" class="hero-img-mobile" />
      </div>

      <div class="hero-gradient-overlay" aria-hidden="true"></div>

      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span>{{ hero.eyebrow || 'INNOVATIVE • SCALABLE • RELIABLE' }}</span>
            <span class="eyebrow-bar"></span>
          </div>

          <h1 class="hero-title">
            {{ hero.title || 'Enterprise Technology Solutions for a' }}
            <span class="highlight-orange">{{ hero.titleHighlight || 'Smarter Tomorrow' }}</span>
          </h1>

          <p class="hero-desc">
            {{ hero.description || 'At Aircom Technologies, we deliver cutting-edge ERP solutions, IT infrastructure, enterprise integrations, and digital services to help businesses grow with innovation and efficiency.' }}
          </p>

          <div class="hero-cta-row">
            <a [href]="hero.primaryCtaHref || '#services-section'" class="btn-orange hero-btn">
              <span>{{ hero.primaryCtaText || 'Explore Our Services' }}</span>
              <span aria-hidden="true">→</span>
            </a>
            <button type="button" class="btn-outline-navy hero-btn" (click)="dialogs.openContact()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{{ hero.secondaryCtaText || 'Contact Us' }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS STRIP BELOW HERO (GRAND SIZE + TYPING MODE) -->
    <section class="stats-strip-section" aria-label="Verified Company Highlights" #statsSection>
      <div class="container">
        <div class="stats-strip-card">
          @for (stat of stats; track stat.label; let i = $index) {
            <div class="stat-pill">
              <div class="stat-icon">
                <app-tech-icon [name]="stat.icon" [size]="28" color="#2457A7" />
              </div>
              <div class="stat-text">
                <strong class="typed-stat-val">
                  {{ typedValues()[i] }}@if (typingActive()[i]) {<span class="typing-caret" aria-hidden="true">|</span>}
                </strong>
                <span>{{ stat.label }}</span>
                <small>{{ stat.sublabel }}</small>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 2. SERVICES SECTION (10 GRAND PICTORIAL CARDS + POPUPS) -->
    <section class="services-section" id="services-section">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <div class="eyebrow-row">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">Our Services</span>
            <span class="eyebrow-line right"></span>
          </div>
          <h2>Comprehensive IT &amp; Business Solutions</h2>
          <p>From ERP to Cloud, click any solution to inspect its visual blueprint or open its dedicated page.</p>
        </div>

        <div class="services-grid" #servicesGrid>
          @for (service of services; track service.slug) {
            <article class="service-card" (click)="openServicePopup(service)">
              <div class="sc-thumb">
                <img [src]="service.heroImage" [alt]="service.title" />
              </div>

              <div class="sc-body">
                <div class="sc-meta-row">
                  <span class="sc-icon-chip">
                    <app-tech-icon [name]="service.icon" [size]="18" color="#2457A7" />
                  </span>
                  <span class="sc-cat-text">{{ service.category }}</span>
                </div>
                <h3>{{ service.title }}</h3>
                <p>{{ service.shortDesc }}</p>
              </div>

              <div class="sc-footer">
                <span class="sc-popup-hint">Quick Preview</span>
                <a
                  [routerLink]="['/services', service.slug]"
                  class="sc-arrow"
                  (click)="$event.stopPropagation()"
                  [attr.aria-label]="'Open ' + service.title + ' page'"
                  title="Open full page"
                >→</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- 3. ABOUT US SPLIT SECTION + GRAND VISION / MISSION / CORE VALUES -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <!-- Left Full Building Visual (image copy 8.png — zero side crop) -->
          <div class="about-visual-col" appScrollReveal="left">
            <div class="about-image-frame grand-frame">
              <img [src]="about.image" alt="Aircom Technologies corporate glass building" />
              <div class="about-year-badge">
                <strong>2009</strong>
                <span>Est. &bull; 17+ Years</span>
              </div>
            </div>
          </div>

          <!-- Right Narrative + Interactive Popups on 4 Verified Highlights -->
          <div class="about-copy-col" appScrollReveal="up">
            <div class="inline-eyebrow">
              <span class="eyebrow-line"></span>
              <span>{{ about.eyebrow }}</span>
              <span class="eyebrow-line right"></span>
            </div>
            <h2>{{ about.heading }}</h2>
            <p class="about-desc">{{ about.description }}</p>

            <div class="about-mini-badges">
              <button type="button" class="mini-stat mini-stat-btn" (click)="openWhyPopup(whyItems[1])">
                <app-tech-icon name="trophy" [size]="22" color="#2457A7" />
                <div>
                  <strong>17+ Years</strong>
                  <span>Of Excellence</span>
                </div>
                <span class="mini-arrow" aria-hidden="true">→</span>
              </button>
              <button type="button" class="mini-stat mini-stat-btn" (click)="openWhyPopup(whyItems[0])">
                <app-tech-icon name="users" [size]="22" color="#2457A7" />
                <div>
                  <strong>Customer</strong>
                  <span>Focused Solutions</span>
                </div>
                <span class="mini-arrow" aria-hidden="true">→</span>
              </button>
              <button type="button" class="mini-stat mini-stat-btn" (click)="openWhyPopup(whyItems[3])">
                <app-tech-icon name="shield-check" [size]="22" color="#2457A7" />
                <div>
                  <strong>Quality</strong>
                  <span>Driven Delivery</span>
                </div>
                <span class="mini-arrow" aria-hidden="true">→</span>
              </button>
              <button type="button" class="mini-stat mini-stat-btn" (click)="openWhyPopup(whyItems[2])">
                <app-tech-icon name="headphones" [size]="22" color="#2457A7" />
                <div>
                  <strong>Dedicated</strong>
                  <span>Technical Support</span>
                </div>
                <span class="mini-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <a routerLink="/about" class="btn-navy">
              <span>Know More</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <!-- Grand 3-Card Vision / Mission / Core Values Pictorial Showcase -->
        <div class="about-pillars-grid" appScrollReveal="up">
          @for (pillar of pillars; track pillar.key) {
            <button type="button" class="pillar-card" (click)="openPillarPopup(pillar)">
              <div class="pillar-thumb">
                <img [src]="pillar.image" [alt]="pillar.title" />
              </div>
              <div class="pillar-body">
                <div class="pillar-title-row">
                  <div class="pillar-head-left">
                    <span class="pillar-icon">
                      <app-tech-icon [name]="pillar.icon" [size]="20" [color]="pillar.accent" />
                    </span>
                    <h3>{{ pillar.title }}</h3>
                  </div>
                  <span class="pillar-open">View Details →</span>
                </div>
                @if (pillar.key === 'values') {
                  <div class="core-chips">
                    @for (val of about.coreValues; track val) {
                      <span>{{ val }}</span>
                    }
                  </div>
                } @else {
                  <p>{{ pillar.summary }}</p>
                }
              </div>
            </button>
          }
        </div>
      </div>
    </section>

    <!-- 4. WHY CHOOSE AIRCOM? (4 GRAND PICTORIAL CARDS + POPUPS) -->
    <section class="why-section">
      <div class="container">
        <div class="section-header" appScrollReveal="up">
          <div class="eyebrow-row">
            <span class="eyebrow-line"></span>
            <span class="eyebrow-text">Why Choose Aircom?</span>
            <span class="eyebrow-line right"></span>
          </div>
          <h2>Building a Smarter, Stronger &amp; More Connected Business</h2>
          <p>Click any pillar below to explore its visual architecture and enterprise impact.</p>
        </div>

        <div class="why-grid" #whyGrid>
          @for (item of whyItems; track item.title; let i = $index) {
            <button type="button" class="why-card" (click)="openWhyPopup(item)">
              <div class="why-thumb">
                <img [src]="item.image" [alt]="item.title" />
              </div>
              <div class="why-body">
                <div class="why-title-row">
                  <span class="why-icon-inline" [style.borderColor]="item.accent">
                    <app-tech-icon [name]="item.icon" [size]="20" [color]="item.accent" />
                  </span>
                  <h3>{{ item.title }}</h3>
                </div>
                <p>{{ item.description }}</p>
                <span class="why-more">Explore Advantage →</span>
              </div>
            </button>
          }
        </div>
      </div>
    </section>

    <!-- 5. PRODUCTS SECTION (UNIFIED 6-CARD 3x2 GRID: 5 PRODUCTS + TAILORED DEPLOYMENT) -->
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

        <div class="products-cards-grid" #productsGrid>
          @for (product of products; track product.slug) {
            <article class="product-card" (click)="openProductPopup(product)">
              <div class="pc-thumb">
                <img [src]="product.image" [alt]="product.title" />
              </div>
              <div class="pc-body">
                <div class="pc-title-row">
                  <span class="pc-icon-inline">
                    <app-tech-icon [name]="product.icon" [size]="18" color="#2457A7" />
                  </span>
                  <h3>{{ product.title }}</h3>
                </div>
                <p>{{ product.shortDesc }}</p>
                <div class="pc-actions">
                  <span class="pc-preview">Quick View</span>
                  <a
                    [routerLink]="['/products', product.slug]"
                    class="pc-explore"
                    (click)="$event.stopPropagation()"
                  >Explore Product →</a>
                </div>
              </div>
            </article>
          }

          <!-- Slot 6: Tailored Deployment aligned identically beside IT Support Services -->
          <aside class="product-card products-cta-card">
            <div class="pc-thumb">
              <img src="assets/images/tailored-deployment.png" alt="Tailored Deployment Solutions" />
            </div>
            <div class="pct-body">
              <span class="pct-tag">Tailored Deployment</span>
              <h3>Ready to Simplify &amp; Scale Operations?</h3>
              <p>Combine Cloud ERP, Analytics, Security, and Managed IT under one trusted partner.</p>
              <button type="button" class="btn-orange" (click)="dialogs.openQuote('Cloud ERP Solution')">
                Get Started Today →
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- 6. INDUSTRIES WE SERVE (VISIBLE PICS + AUTO-SCROLLING CAROUSEL) -->
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

        <div
          class="industries-track"
          #industriesTrack
          (mouseenter)="pauseAutoScroll(true)"
          (mouseleave)="pauseAutoScroll(false)"
          (touchstart)="pauseAutoScroll(true)"
          (touchend)="resumeAutoScrollDelayed()"
        >
          @for (ind of industries; track ind.slug) {
            <a [routerLink]="['/industries', ind.slug]" class="industry-card">
              <div class="ind-thumb">
                <img [src]="ind.image" [alt]="ind.name + ' IT and ERP solutions'" class="ind-bg" />
              </div>
              <div class="ind-footer">
                <span class="ind-icon-circle">
                  <app-tech-icon [name]="ind.icon" [size]="18" color="#FFFFFF" />
                </span>
                <h3>{{ ind.name }}</h3>
                <span class="ind-go" aria-hidden="true">→</span>
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

  private readonly content = inject(ContentService);

  stats = HERO_STATS;
  services: ServiceItem[] = SERVICES_DATA;
  about: any = ABOUT_CONTENT;
  pillars = ABOUT_PILLARS;
  whyItems = WHY_CHOOSE_ITEMS;
  products = PRODUCTS_DATA;
  industries = INDUSTRIES_DATA;
  hero = this.content.currentSettings.hero || {
    eyebrow: 'INNOVATIVE • SCALABLE • RELIABLE',
    title: 'Enterprise Technology Solutions for a',
    titleHighlight: 'Smarter Tomorrow',
    description: 'At Aircom Technologies, we deliver cutting-edge ERP solutions, IT infrastructure, enterprise integrations, and digital services to help businesses grow with innovation and efficiency.',
    primaryCtaText: 'Explore Our Services',
    primaryCtaHref: '#services-section',
    secondaryCtaText: 'Contact Us',
    secondaryCtaHref: '/contact',
    desktopBgImage: 'assets/images/hero-desktop.png',
    mobileBgImage: 'assets/images/hero-mobile.png'
  };

  readonly typedValues = signal<string[]>(HERO_STATS.map((s) => s.value));
  readonly typingActive = signal<boolean[]>(HERO_STATS.map(() => false));

  @ViewChild('heroSection') heroSection?: ElementRef<HTMLElement>;
  @ViewChild('heroParallaxDesktop') heroParallaxDesktop?: ElementRef<HTMLElement>;
  @ViewChild('heroParallaxMobile') heroParallaxMobile?: ElementRef<HTMLElement>;
  @ViewChild('statsSection') statsSection?: ElementRef<HTMLElement>;
  @ViewChild('servicesGrid') servicesGrid?: ElementRef<HTMLElement>;
  @ViewChild('whyGrid') whyGrid?: ElementRef<HTMLElement>;
  @ViewChild('productsGrid') productsGrid?: ElementRef<HTMLElement>;
  @ViewChild('industriesTrack') industriesTrack?: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;
  private typingTimers: ReturnType<typeof setInterval>[] = [];
  private autoScrollTimer?: ReturnType<typeof setInterval>;
  private resumeTimer?: ReturnType<typeof setTimeout>;
  private autoScrollPaused = false;

  ngOnInit(): void {
    // Dynamic content subscription for live sync
    this.services = this.content.currentServices;
    this.products = this.content.currentProducts;
    this.industries = this.content.currentIndustries;
    if (this.content.currentSettings.hero) {
      this.hero = { ...this.hero, ...this.content.currentSettings.hero };
    }
    if (this.content.currentSettings.about) {
      this.about = { ...this.about, ...this.content.currentSettings.about };
    }

    this.content.services$.subscribe((s) => (this.services = s));
    this.content.products$.subscribe((p) => (this.products = p));
    this.content.industries$.subscribe((i) => (this.industries = i));
    this.content.settings$.subscribe((st) => {
      if (st.hero) this.hero = { ...this.hero, ...st.hero };
      if (st.about) this.about = { ...this.about, ...st.about };
    });

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

      this.startTypingStats();
      this.startIndustriesAutoScroll();

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

  private startIndustriesAutoScroll(): void {
    this.autoScrollTimer = setInterval(() => {
      if (this.autoScrollPaused) {
        return;
      }
      const track = this.industriesTrack?.nativeElement;
      if (!track || track.scrollWidth <= track.clientWidth + 8) {
        return;
      }
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 12) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = track.querySelector('.industry-card')?.clientWidth || 280;
        track.scrollBy({ left: cardWidth + 14, behavior: 'smooth' });
      }
    }, 2800);
  }

  pauseAutoScroll(paused: boolean): void {
    this.autoScrollPaused = paused;
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
    }
  }

  resumeAutoScrollDelayed(): void {
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
    }
    this.resumeTimer = setTimeout(() => {
      this.autoScrollPaused = false;
    }, 3500);
  }

  private startTypingStats(): void {
    const targets = HERO_STATS.map((s) => s.value);
    this.typedValues.set(targets.map(() => ''));
    this.typingActive.set(targets.map(() => true));

    targets.forEach((fullText, idx) => {
      let charPos = 0;
      const delayMs = idx * 140;
      setTimeout(() => {
        const timer = setInterval(() => {
          charPos++;
          this.typedValues.update((arr) => {
            const next = [...arr];
            next[idx] = fullText.slice(0, charPos);
            return next;
          });
          if (charPos >= fullText.length) {
            clearInterval(timer);
            this.typingActive.update((flags) => {
              const next = [...flags];
              next[idx] = false;
              return next;
            });
          }
        }, 55);
        this.typingTimers.push(timer);
      }, delayMs);
    });
  }

  openServicePopup(service: ServiceItem): void {
    this.dialogs.openShowcase({
      badge: service.category,
      title: service.title,
      subtitle: service.tagline,
      image: service.heroImage,
      description: service.overview,
      highlights: service.highlights,
      details: service.features.map((f) => ({ heading: f.title, text: f.description })),
      primaryRoute: `/services/${service.slug}`,
      primaryRouteLabel: 'Open Full Service Page →',
      inquiryTitle: service.title,
      inquiryMode: 'service'
    });
  }

  openProductPopup(product: ProductItem): void {
    this.dialogs.openShowcase({
      badge: product.categoryLabel,
      title: product.title,
      subtitle: product.tagline,
      image: product.image,
      description: product.overview,
      highlights: product.deploymentOptions,
      details: product.capabilities.map((c) => ({ heading: c.title, text: c.description })),
      primaryRoute: `/products/${product.slug}`,
      primaryRouteLabel: 'Open Full Product Page →',
      inquiryTitle: product.title,
      inquiryMode: 'product'
    });
  }

  openWhyPopup(item: (typeof WHY_CHOOSE_ITEMS)[number]): void {
    this.dialogs.openShowcase({
      badge: 'Why Choose Aircom',
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      description: item.description,
      highlights: item.highlights,
      details: item.details,
      primaryRoute: '/about',
      primaryRouteLabel: 'Explore About Aircom →',
      inquiryTitle: `${item.title} Consultation`
    });
  }

  openPillarPopup(pillar: (typeof ABOUT_PILLARS)[number]): void {
    this.dialogs.openShowcase({
      badge: 'Aircom Technologies Foundation',
      title: pillar.title,
      subtitle: pillar.subtitle,
      image: pillar.image,
      description: pillar.summary,
      highlights: pillar.highlights,
      details: pillar.details,
      primaryRoute: '/about',
      primaryRouteLabel: 'Read Full Company Profile →',
      inquiryTitle: 'Enterprise IT & ERP Consultation'
    });
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
    this.pauseAutoScroll(true);
    this.resumeAutoScrollDelayed();
    const step = Math.max(260, track.clientWidth * 0.72);
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.typingTimers.forEach((t) => clearInterval(t));
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
    }
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
    }
    this.ctx?.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
