import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_POSTS } from '../../../core/data/site.data';
import { BlogPost } from '../../../core/models/site.models';
import { ContentService } from '../../../core/services/content.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, ScrollRevealDirective, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    <section class="page-hero">
      <div class="container">
        <app-breadcrumb [items]="[{ label: 'Blog' }]" />
        <span class="hero-badge">Knowledge &amp; Insights</span>
        <h1>Enterprise IT, ERP &amp; Integration Insights</h1>
        <p>Practical guides on ERPNext, TallyPrime synchronization, biometric HRMS automation, and resilient cloud networks.</p>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;">
          @for (cat of categories(); track cat) {
            <button
              type="button"
              (click)="activeCategory.set(cat)"
              [style.background]="activeCategory() === cat ? '#102A63' : '#F4F7FC'"
              [style.color]="activeCategory() === cat ? '#FFFFFF' : '#102A63'"
              style="border:1px solid #DCE6F5;border-radius:999px;padding:8px 18px;font-weight:600;cursor:pointer;font-size:0.86rem;"
            >
              {{ cat }}
            </button>
          }
        </div>

        <div class="card-grid-2">
          @for (post of filteredPosts(); track post.slug) {
            <article class="feature-box" style="padding:0;overflow:hidden;display:flex;flex-direction:column;" appScrollReveal="up">
              <img [src]="post.heroImage || post.image" [alt]="post.title" style="width:100%;height:210px;object-fit:cover;" />
              <div style="padding:22px;display:flex;flex-direction:column;flex:1;">
                <div style="display:flex;gap:12px;font-size:0.78rem;color:#64748B;margin-bottom:8px;">
                  <span style="color:#F59E0B;font-weight:700;">{{ post.category }}</span>
                  <span>&bull;</span>
                  <span>{{ post.date }}</span>
                  <span>&bull;</span>
                  <span>{{ post.readTime }}</span>
                </div>
                <h2 style="font-size:1.2rem;margin:0 0 10px;">
                  <a [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
                </h2>
                <p style="flex:1;margin-bottom:16px;">{{ post.excerpt }}</p>
                <a [routerLink]="['/blog', post.slug]" style="font-weight:700;color:#2457A7;font-size:0.9rem;">
                  Read Full Article →
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-cta-banner />
  `
})
export class BlogListComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);

  posts = signal<BlogPost[]>(BLOG_POSTS);
  readonly categories = computed(() => ['All', ...new Set(this.posts().map((p) => p.category))]);
  readonly activeCategory = signal('All');

  readonly filteredPosts = computed(() =>
    this.activeCategory() === 'All'
      ? this.posts()
      : this.posts().filter((p) => p.category === this.activeCategory())
  );

  ngOnInit(): void {
    this.posts.set(this.content.currentBlogs);

    this.content.blogs$.subscribe((blogs) => {
      this.posts.set(blogs);
    });

    this.seo.updateSeo({
      title: 'Blog & Insights | Aircom Technologies',
      description: 'Read articles on ERPNext implementation, TallyPrime integration, biometric HRMS, and enterprise IT security.',
      path: '/blog'
    });
  }
}

