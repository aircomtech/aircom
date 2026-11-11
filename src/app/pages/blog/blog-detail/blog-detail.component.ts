import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BLOG_POSTS } from '../../../core/data/site.data';
import { ContentService } from '../../../core/services/content.service';
import { SeoService } from '../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CtaBannerComponent } from '../../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, CtaBannerComponent],
  styleUrl: '../../_inner-page.scss',
  template: `
    @if (post(); as p) {
      <section class="page-hero">
        <div class="container">
          <app-breadcrumb [items]="[{ label: 'Blog', route: '/blog' }, { label: p.category }]" />
          <span class="hero-badge">{{ p.category }}</span>
          <h1>{{ p.title }}</h1>
          <p>{{ p.author }} &bull; {{ p.date }} &bull; {{ p.readTime }}</p>
        </div>
      </section>

      <section class="page-section">
        <div class="container" style="max-width:860px;">
          <img [src]="p.image" [alt]="p.title" style="width:100%;max-height:380px;object-fit:cover;border-radius:18px;margin-bottom:28px;" />
          <div style="display:grid;gap:18px;font-size:1.05rem;line-height:1.75;color:#202B3C;">
            @for (para of p.content; track para) {
              <p style="margin:0;">{{ para }}</p>
            }
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:28px;padding-top:20px;border-top:1px solid #DCE6F5;">
            @for (tag of p.tags; track tag) {
              <span style="background:#EFF6FF;color:#102A63;padding:5px 14px;border-radius:999px;font-size:0.82rem;font-weight:600;">
                #{{ tag }}
              </span>
            }
          </div>
          <div style="margin-top:24px;">
            <a routerLink="/blog" class="btn-outline-navy">← Back to All Articles</a>
          </div>
        </div>
      </section>

      <app-cta-banner />
    } @else {
      <section class="page-section">
        <div class="container" style="text-align:center;">
          <h1>Article Not Found</h1>
          <a routerLink="/blog" class="btn-orange">Browse Blog</a>
        </div>
      </section>
    }
  `
})
export class BlogDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly content = inject(ContentService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') || '')));
  private readonly blogsList = toSignal(this.content.blogs$, { initialValue: BLOG_POSTS });
  readonly post = computed(() => this.blogsList().find((b) => b.slug === this.slug()));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      const item = this.content.currentBlogs.find((b) => b.slug === slug);
      if (item) {
        this.seo.updateSeo({
          title: `${item.title} | Aircom Technologies`,
          description: item.excerpt,
          path: `/blog/${item.slug}`
        });
      }
    });
  }
}

