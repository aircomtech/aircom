export interface NavDropdownItem {
  label: string;
  route: string;
  description?: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  route?: string;
  children?: NavDropdownItem[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  shortDesc: string;
  icon: string;
  category: string;
  tagline: string;
  heroImage: string;
  overview: string;
  highlights: string[];
  features: { title: string; description: string; icon: string }[];
  benefits: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface ProductItem {
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  image: string;
  categoryLabel: string;
  tagline: string;
  overview: string;
  capabilities: { title: string; description: string; icon: string }[];
  benefits: string[];
  deploymentOptions: string[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface IndustryItem {
  slug: string;
  name: string;
  icon: string;
  image: string;
  shortDesc: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  recommendedServices: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  heroImage?: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface PartnerItem {
  slug: string;
  name: string;
  tier: string;
  category: string;
  tagline: string;
  shortDesc: string;
  overview: string;
  image: string;
  website?: string;
  highlights: string[];
  accent?: string;
}

export interface ContactInfo {
  companyName: string;
  tagline: string;
  foundedYear: number;
  phone: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  salesEmail: string;
  infoEmail: string;
  address: string;
  workingHours: string;
  socials: { name: string; url: string; icon: string }[];
}

