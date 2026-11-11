-- ====================================================================
-- AIRCOM TECHNOLOGIES - SUPABASE DATABASE SCHEMA & MIGRATION SCRIPT
-- Project: https://kzrwkagjsgmufupepghp.supabase.co
-- Generated for full dynamic live sync between Admin Panel and Website
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SITE SETTINGS TABLE (Header, Hero, About, Why Choose Us, Stats, Partners, Footer, SEO)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by TEXT
);

-- 3. SERVICES TABLE (All 10 Services)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    icon TEXT DEFAULT 'monitor-cog',
    category TEXT,
    tagline TEXT,
    hero_image TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PRODUCTS TABLE (All 5 Products)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT NOT NULL,
    image TEXT,
    hero_image TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    highlights JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. INDUSTRIES TABLE (All 8 Industries)
CREATE TABLE IF NOT EXISTS public.industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    headline TEXT,
    description TEXT NOT NULL,
    image TEXT,
    hero_image TEXT,
    solutions JSONB DEFAULT '[]'::jsonb,
    impact JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PROJECTS / CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT,
    description TEXT NOT NULL,
    client TEXT,
    completion_date TEXT,
    technologies JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    project_url TEXT,
    featured BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. CONTACT ENQUIRIES / SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new', -- 'new', 'in_progress', 'contacted', 'closed'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. MEDIA ASSETS TABLE (Cloudinary Library Sync)
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    secure_url TEXT NOT NULL,
    public_id TEXT,
    folder TEXT DEFAULT 'general',
    width INT,
    height INT,
    format TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. BLOGS TABLE (Articles & Insights)
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content JSONB DEFAULT '[]'::jsonb,
    author TEXT DEFAULT 'Aircom Solutions Team',
    date TEXT,
    read_time TEXT DEFAULT '5 min read',
    category TEXT DEFAULT 'Enterprise Tech',
    hero_image TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    details TEXT,
    user_email TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 12. POLICIES: PUBLIC READ ACCESS FOR PUBLISHED CONTENT
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Industries" ON public.industries FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Blogs" ON public.blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Media" ON public.media_assets FOR SELECT USING (true);

-- 13. POLICIES: PUBLIC INQUIRIES SUBMISSION
CREATE POLICY "Public Can Submit Inquiries" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- 14. POLICIES: AUTHENTICATED & SERVICE ADMIN FULL ACCESS
CREATE POLICY "Admin Full Access Settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Industries" ON public.industries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Blogs" ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Inquiries" ON public.contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Media" ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Activity" ON public.activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- (Optional fallback policy for seamless prototyping with anon key before auth users are created)
CREATE POLICY "Anon Dev Upsert Settings" ON public.site_settings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Services" ON public.services FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Products" ON public.products FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Industries" ON public.industries FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Blogs" ON public.blogs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Media" ON public.media_assets FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Activity" ON public.activity_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Read Inquiries" ON public.contact_submissions FOR SELECT TO anon USING (true);
CREATE POLICY "Anon Dev Update Inquiries" ON public.contact_submissions FOR UPDATE TO anon USING (true);

-- 15. ENABLE REALTIME REPLICATION
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.industries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blogs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_submissions;

-- ====================================================================
-- SEED INITIAL DATA
-- ====================================================================

-- Seed Hero Section
INSERT INTO public.site_settings (key, data) VALUES (
  'hero',
  '{
    "eyebrow": "INNOVATIVE • SCALABLE • RELIABLE",
    "title": "Enterprise Technology Solutions for a",
    "titleHighlight": "Smarter Tomorrow",
    "description": "At Aircom Technologies, we deliver cutting-edge ERP solutions, IT infrastructure, enterprise integrations, and digital services to help businesses grow with innovation and efficiency.",
    "primaryCtaText": "Explore Our Services",
    "primaryCtaHref": "/services",
    "secondaryCtaText": "Contact Us",
    "secondaryCtaHref": "/contact",
    "desktopBgImage": "assets/images/hero-desktop.png",
    "mobileBgImage": "assets/images/hero-mobile.png"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- Seed Contact Information
INSERT INTO public.site_settings (key, data) VALUES (
  'contact_info',
  '{
    "companyName": "Aircom Technologies",
    "tagline": "Serving beyond boundaries...",
    "foundedYear": 2009,
    "phone": "+91 77998 99429",
    "whatsappNumber": "917799899429",
    "salesEmail": "sales@aircomtech.com",
    "infoEmail": "info@aircomtech.com",
    "address": "#462, Block C, Fourth Floor, CTC, Near ParkLane Hotel, Secunderabad, Telangana – 500003, India.",
    "workingHours": "Monday – Saturday: 9:30 AM – 6:30 PM IST"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- Seed About Section
INSERT INTO public.site_settings (key, data) VALUES (
  'about',
  '{
    "eyebrow": "About Aircom Technologies",
    "heading": "Your Trusted Technology Partner Since 2009",
    "description": "Founded in 2009, Aircom Technologies delivers innovative and reliable IT solutions to help businesses improve efficiency, automate operations, and achieve sustainable growth.",
    "vision": "To become a trusted global technology partner through innovative IT infrastructure, enterprise software, and digital transformation.",
    "mission": "To provide cost-effective, reliable, scalable, and customized technology solutions.",
    "image": "assets/images/about-hq.png"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- Seed Header Section
INSERT INTO public.site_settings (key, data) VALUES (
  'header',
  '{
    "tagline": "Serving beyond boundaries...",
    "ctaText": "Get a Quote",
    "ctaHref": "/contact",
    "logoUrl": "assets/logo/aircom-logo-light.png",
    "logoDarkUrl": "assets/logo/aircom-logo-dark.png",
    "navItems": [
      {"label": "Home", "route": "/"},
      {"label": "About Us", "route": "/about"},
      {"label": "Services", "route": "/services"},
      {"label": "Products", "route": "/products"},
      {"label": "Industries", "route": "/industries"},
      {"label": "Blog", "route": "/blog"},
      {"label": "Contact", "route": "/contact"}
    ]
  }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- Seed Sample Services
INSERT INTO public.services (slug, title, tagline, short_desc, full_desc, hero_image, icon, category, is_published, order_index) VALUES
('erpnext', 'ERPNext Implementation & Customization', 'Complete ERP Solution for Growing Enterprises', 'Streamline inventory, accounting, sales, purchasing, and reporting.', 'Aircom Technologies delivers end-to-end ERPNext implementation, custom Frappe app development, and multi-branch rollout.', 'assets/images/service-erpnext.png', 'monitor-cog', 'Enterprise ERP', true, 1),
('hrms', 'HRMS & Payroll Management', 'Automated Workforce & Salary Processing', 'Employee onboarding, attendance tracking, payroll, and leave management.', 'Automate every stage of employee management from recruitment to payroll runs.', 'assets/images/service-hrms.png', 'users', 'Human Capital', true, 2),
('biometric', 'Biometric & Hardware Integration', 'Automated Time & Attendance Synchronization', 'Connect biometric fingerprint and facial attendance with ERP.', 'Seamless two-way integration linking hardware access control directly to payroll.', 'assets/images/service-biometric.png', 'fingerprint', 'Hardware & IoT', true, 3),
('crm', 'CRM & Business Software Integration', 'Unified Omnichannel Customer Intelligence', 'Lead tracking, customer management, sales automation, and omnichannel support.', 'Empower sales and support teams with unified customer intelligence.', 'assets/images/service-crm.png', 'user-check', 'Sales & CRM', true, 4),
('tally', 'TallyPrime Integration & Customization', 'Bridging TallyPrime with Modern ERP Systems', 'Automate voucher sync, custom TDL modules, and GST invoicing.', 'Two-way synchronization between TallyPrime, ERPNext, and third-party portals.', 'assets/images/service-tally.png', 'file-spreadsheet', 'Accounting', true, 5)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  short_desc = EXCLUDED.short_desc,
  full_desc = EXCLUDED.full_desc,
  hero_image = EXCLUDED.hero_image;

-- Seed Products
INSERT INTO public.products (slug, title, category, description, image, hero_image, is_published, order_index) VALUES
('cloud-erp', 'Aircom Cloud ERP Suite', 'Enterprise Software', 'Comprehensive cloud-hosted ERP system designed for manufacturing, trading, and distribution businesses.', 'assets/images/product-cloud-erp.png', 'assets/images/product-cloud-erp.png', true, 1),
('hrms-portal', 'Aircom Smart HRMS Portal', 'Human Resources', 'Unified attendance, self-service employee portal, automated payroll, and leave management system.', 'assets/images/product-hrms.png', 'assets/images/product-hrms.png', true, 2),
('pos-retail', 'Aircom Smart POS Retail', 'Retail & POS', 'High-speed point of sale solution with barcode scanning, batch tracking, offline billing, and GST compliance.', 'assets/images/product-pos.png', 'assets/images/product-pos.png', true, 3),
('warehouse-wms', 'Aircom Inventory & WMS', 'Supply Chain', 'Real-time multi-warehouse inventory tracking, serial number control, and automated reorder triggers.', 'assets/images/product-inventory.png', 'assets/images/product-inventory.png', true, 4),
('analytics-bi', 'Aircom Enterprise Analytics BI', 'Business Intelligence', 'Executive dashboards, financial health metrics, and automated KPI visualization for leadership teams.', 'assets/images/product-analytics.png', 'assets/images/product-analytics.png', true, 5)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  hero_image = EXCLUDED.hero_image;

-- Seed Industries
INSERT INTO public.industries (slug, name, short_desc, overview, image, is_published, order_index) VALUES
('retail', 'Retail & Supermarkets', 'End-to-end POS, inventory control, and multi-store retail sync.', 'Aircom equips retailers with point-of-sale efficiency, multi-location inventory synchronization, and omnichannel loyalty programs.', 'assets/images/industry-retail.png', true, 1),
('hospitality', 'Hospitality & Restaurants', 'Kitchen order tickets, table management, and real-time recipe costing.', 'Streamline dining operations with automated kitchen displays, table reservations, and seamless inventory tracking.', 'assets/images/industry-hospitality.png', true, 2),
('jewellery', 'Jewellery & Luxury Goods', 'Hallmark tracking, precious metal rates, and Karat purity management.', 'Specialized ERP architecture managing metal wastage, stone certificates, daily rate updates, and customized CAD orders.', 'assets/images/industry-jewellery.png', true, 3),
('construction', 'Construction & Real Estate', 'Project site budgeting, material requisitions, and contractor billing.', 'Maintain strict fiscal discipline across construction phases, equipment tracking, and sub-contractor reconciliation.', 'assets/images/industry-construction.png', true, 4),
('healthcare', 'Healthcare & Clinics', 'Patient appointment management, clinic billing, and pharmacy stock.', 'Unified clinic operations linking consultations, pharmacy POS, and lab reports into a compliant digital medical record.', 'assets/images/industry-healthcare.png', true, 5),
('manufacturing', 'Manufacturing & Assembly', 'BOM explosion, batch traceability, production work orders, and QA audits.', 'End-to-end manufacturing execution from raw material procurement to finished good inspection and dispatch.', 'assets/images/industry-manufacturing.png', true, 6),
('finance', 'Financial Services & NBFCs', 'Automated loan books, ledger reconciliation, and regulatory compliance.', 'Robust accounting infrastructure with multi-currency handling, audit logs, and automated reconciliations.', 'assets/images/industry-finance.png', true, 7),
('education', 'Education & Academic Institutes', 'Student admissions, fee schedules, automated attendance, and LMS.', 'Complete institutional governance software automating student lifecycles, examination schedules, and fee receipts.', 'assets/images/industry-education.png', true, 8)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_desc = EXCLUDED.short_desc,
  overview = EXCLUDED.overview,
  image = EXCLUDED.image;

-- Seed Blogs (All 4 Live Articles)
INSERT INTO public.blogs (slug, title, excerpt, author, date, read_time, category, hero_image, content, tags, is_published) VALUES
(
  'erpnext-vs-sap-smb-guide',
  'ERPNext vs SAP Business One: Comprehensive SMB Guide for 2025',
  'A rigorous comparison of total cost of ownership, flexibility, implementation timelines, and customizability for growing enterprises.',
  'Aircom Solutions Team',
  '2025-01-15',
  '6 min read',
  'Enterprise ERP',
  'assets/images/service-erpnext.png',
  '["Selecting the right Enterprise Resource Planning (ERP) platform is among the most consequential operational decisions an enterprise leadership team can make.", "While legacy platforms like SAP Business One offer brand recognition, modern open-source solutions like ERPNext have matured dramatically, offering unmatched agility, lower total cost of ownership, and 100% customizability without restrictive per-user licensing.", "For mid-market manufacturing, trading, and service organizations, ERPNext provides transparent workflows, rapid deployment cycles, and complete control over enterprise data."]'::jsonb,
  '["ERPNext", "SAP", "Comparison", "TCO"]'::jsonb,
  true
),
(
  'biometric-attendance-payroll-integration',
  'Eliminating Attendance Leakage: Biometric-to-Payroll Automation',
  'How integrating biometric hardware directly with ERP payroll stops buddy punching, saves HR hours, and ensures 100% payroll accuracy.',
  'Aircom Technical Team',
  '2025-01-08',
  '5 min read',
  'Hardware & IoT',
  'assets/images/service-biometric.png',
  '["Manual attendance registers and disconnected biometric punch machines cause recurring payroll leakage, delayed processing, and administrative overhead.", "By establishing direct IoT and API synchronization between biometric fingerprint or facial recognition hardware and ERPNext HRMS, attendance data is recorded in real time.", "Overtime computations, shift rosters, and statutory leave deductions are calculated automatically, eliminating human calculation errors and saving hundreds of HR administrative hours every month."]'::jsonb,
  '["Biometric", "HRMS", "Payroll", "Automation"]'::jsonb,
  true
),
(
  'tallyprime-erpnext-two-way-sync',
  'Two-Way TallyPrime & ERPNext Sync: Best of Both Worlds',
  'Why modern businesses keep TallyPrime for local chartered accountants while powering daily operations with ERPNext.',
  'Aircom Integration Team',
  '2024-12-22',
  '4 min read',
  'Integration',
  'assets/images/service-tally.png',
  '["Many Indian businesses face a common dilemma: their operations demand modern ERP workflows, but their accounting teams and external auditors strongly prefer TallyPrime.", "Aircom Technologies resolves this by building robust automated two-way synchronization between ERPNext and TallyPrime.", "Sales invoices, purchase vouchers, and journal entries created in ERPNext flow automatically into TallyPrime, while bank reconciliations and ledger updates sync back instantaneously without duplicate data entry."]'::jsonb,
  '["TallyPrime", "ERPNext", "TDL", "Accounting"]'::jsonb,
  true
),
(
  'cloud-migration-security-checklist',
  'Enterprise IT Infrastructure: On-Premises to Cloud Migration Checklist',
  'Key security, backup, and high-availability considerations when migrating business-critical databases and ERP servers to the cloud.',
  'Aircom Infrastructure Team',
  '2024-12-10',
  '7 min read',
  'IT Infrastructure',
  'assets/images/service-crm.png',
  '["Migrating enterprise servers and core business databases to the cloud requires rigorous planning to prevent downtime, data loss, or security vulnerabilities.", "This checklist outlines key architecture standards, automated snapshot schedules, failover redundancy, and encryption-at-rest protocols necessary for an airtight enterprise deployment.", "Aircom Technologies provides managed cloud AMC, monitoring server health 24/7 to guarantee 99.9% uptime."]'::jsonb,
  '["Cloud Hosting", "Cybersecurity", "AMC", "DevOps"]'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  author = EXCLUDED.author,
  date = EXCLUDED.date,
  read_time = EXCLUDED.read_time,
  category = EXCLUDED.category,
  hero_image = EXCLUDED.hero_image,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags;

