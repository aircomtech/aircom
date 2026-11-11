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
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

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
  'contactInfo',
  '{
    "companyName": "Aircom Technologies",
    "tagline": "Serving beyond boundaries...",
    "foundedYear": 2009,
    "phone": "+91 77998 99429",
    "phoneHref": "tel:+917799899429",
    "whatsappNumber": "917799899429",
    "salesEmail": "sales@aircomtech.com",
    "infoEmail": "info@aircomtech.com",
    "address": "Plot No.12, Simhadri Nagar Colony, Near PBDAV School, Hyderabad, Telangana, India",
    "workingHours": "Monday – Saturday: 9:30 AM – 6:30 PM IST"
  }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

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

-- Seed Blogs (All 6 Live Articles)
INSERT INTO public.blogs (slug, title, excerpt, author, date, read_time, category, hero_image, content, tags, is_published) VALUES
(
  'erpnext-vs-legacy-erp-growing-enterprises',
  'Why Growing Enterprises Are Switching to ERPNext & Open-Source ERP Architecture',
  'Discover how modular open-source ERP eliminates per-seat licensing bottlenecks while giving finance, inventory, and operations a unified real-time platform.',
  'Aircom ERP Engineering Team',
  'October 18, 2026',
  '7 min read',
  'ERP & Automation',
  'assets/images/service-erpnext.png',
  '["Growing organizations frequently outgrow spreadsheets and standalone accounting software long before they are ready for rigid, high-cost legacy ERP suites. Per-user licensing fees often discourage companies from onboarding warehouse staff, site engineers, and sales executives—creating the exact data silos ERP was meant to eliminate.", "Legacy proprietary platforms also impose steep annual maintenance renewals, expensive customization retainers, and closed-source database constraints that slow down operational agility.", "ERPNext, built on the extensible Frappe framework, flips this model completely. Organizations receive unified, production-grade modules for multi-company accounting, batch-tracked inventory, procurement, manufacturing BOMs, CRM, and HRMS without punitive seat taxes.", "From automated GST e-invoicing and multi-warehouse stock transfers to mobile field approvals and barcode picking, teams operate in real time across locations.", "Migration does not have to disrupt daily operations. A structured phased rollout—starting with chart-of-accounts mapping, opening stock validation, master data cleansing, and parallel runs—ensures zero downtime during cutover.", "At Aircom Technologies, our 17+ years of enterprise IT experience helps clients go far beyond default setups: we tailor custom DocTypes, automate approvals, integrate TallyPrime and Zoho CRM, and host workloads on hardened cloud infrastructure with daily encrypted backups."]'::jsonb,
  '["ERPNext Implementation", "Digital Transformation", "Open Source ERP"]'::jsonb,
  true
),
(
  'automating-tallyprime-with-erp-and-pos',
  'Bridging Operations & Finance: Automating TallyPrime Voucher Sync Without Manual Re-Entry',
  'Learn how automated XML/API voucher synchronization and custom TDL extensions eliminate reconciliation errors between operational apps and TallyPrime.',
  'Aircom Integration Practice',
  'October 04, 2026',
  '6 min read',
  'Accounting Integration',
  'assets/images/service-tally.png',
  '["In thousands of Indian and international enterprises, operations run on specialized ERP, POS, or e-commerce systems while chartered accountants and finance controllers rely on TallyPrime for statutory books and GST reporting.", "When teams export Excel sheets and manually re-key hundreds of invoices each week, delays and clerical errors become inevitable.", "Manual reconciliation at month-end wastes dozens of skilled accounting hours hunting down mismatched tax ledgers or duplicate supplier names.", "Our TallyPrime integration architecture solves this using bidirectional XML/HTTP API connectors and tailored Tally Definition Language (TDL) extensions.", "Before posting any voucher to TallyPrime, our middleware verifies customer masters, GSTIN numbers, HSN/SAC codes, cost centers, and voucher numbering rules—eliminating broken imports.", "With scheduled or instant push-sync triggers, comprehensive sync audit logs, and automated retry queues, both operational teams and finance auditors remain 100% aligned."]'::jsonb,
  '["TallyPrime Integration", "TDL Development", "GST Automation"]'::jsonb,
  true
),
(
  'biometric-attendance-sync-multi-branch-hrms',
  'Real-Time Biometric & Facial Attendance Integration for Multi-Branch Payroll Accuracy',
  'How push-protocol biometric synchronization eliminates USB log exports, stops proxy attendance, and streamlines monthly payroll runs across branches.',
  'Aircom Systems & IoT Team',
  'September 21, 2026',
  '6 min read',
  'HRMS & Hardware',
  'assets/images/service-biometric.png',
  '["Managing shift attendance across multiple warehouses, retail outlets, or construction sites often degrades into manual spreadsheet collection at month-end—delaying salary runs and causing disputes over overtime or late marks.", "Traditional polling utilities installed on a single local PC fail whenever the local computer is turned off or loses VPN connectivity.", "By connecting ZKTeco, eSSL, or Hikvision fingerprint and AI facial recognition terminals over secure push protocols directly into HRMS and ERPNext, punch logs appear in central shift dashboards within seconds.", "Automated attendance rules immediately classify first-in/last-out punches, rotational night shifts, grace periods, half-day deductions, and overtime slabs.", "Even when a remote site experiences temporary internet loss, modern terminals buffer attendance punches locally and backfill automatically once connectivity returns.", "The result is a transparent, tamper-proof HR pipeline where leave balances, mobile check-ins, and biometric terminal logs feed directly into one-click payroll compliance."]'::jsonb,
  '["Biometric Integration", "HRMS Software", "Payroll Automation"]'::jsonb,
  true
),
(
  'hardening-enterprise-networks-and-cloud-backups',
  'Enterprise IT Resilience Checklist: Firewalls, Branch VPNs, and Ransomware-Proof Backups',
  'Practical infrastructure safeguards every multi-branch organization needs—from VLAN segmentation and dual-ISP failover to automated off-site cloud snapshots.',
  'Aircom Cloud & Network Architects',
  'September 08, 2026',
  '7 min read',
  'Infrastructure & Cloud',
  'assets/images/service-infrastructure.png',
  '["Enterprise software is only as reliable as the network and server infrastructure beneath it. An unsegmented office LAN, single ISP dependency, or unverified local backup can halt billing and operations across an entire organization.", "Many growing companies discover backup failures only after an unexpected hardware crash or ransomware incident.", "We recommend a four-layer resilience model starting at the perimeter: next-generation UTM firewalls configured with dual-WAN automatic ISP failover so branch billing and cloud ERP connections never drop.", "Inside the office network, strict VLAN segmentation isolates guest Wi-Fi, CCTV/IoT cameras, VoIP phones, and corporate ERP workstations.", "Encrypted site-to-site VPN tunnels connect head offices and branches seamlessly, while the 3-2-1 backup strategy ensures daily snapshots are replicated to immutable off-site cloud storage.", "Through Aircom Managed IT AMC services, organizations gain continuous uptime monitoring, timely patching, and rapid L1–L3 escalation support."]'::jsonb,
  '["IT Infrastructure", "Cloud Hosting", "Cybersecurity"]'::jsonb,
  true
),
(
  'crm-erp-integration-sales-pipeline-automation',
  'Connecting Sales & Delivery: Why CRM-to-ERP Integration Eliminates Revenue Leakage',
  'Unifying Salesforce, Zoho CRM, and WhatsApp lead capture with ERPNext inventory and billing ensures zero lost leads and faster order fulfillment.',
  'Aircom CRM & Automation Team',
  'August 24, 2026',
  '6 min read',
  'CRM & Sales Ops',
  'assets/images/service-crm.png',
  '["When sales executives track leads in spreadsheets or a disconnected CRM while operations teams manage stock inside an ERP, vital customer commitments frequently fall through the cracks.", "Sales representatives often quote items without checking live warehouse availability or pending customer credit limits.", "By integrating Zoho CRM, Salesforce, or Frappe CRM directly with ERPNext and TallyPrime, every won deal converts automatically into a validated Sales Order.", "Lead capture pipelines from website forms, WhatsApp Business APIs, and inbound calls are routed instantaneously to regional managers with automated SLA alerts.", "Inside the CRM view, account managers inspect live ERP stock levels, dispatch tracking numbers, and overdue invoice balances before contacting a client.", "Aircom Technologies builds fault-tolerant REST webhook integrations unifying pipeline forecasting and billing into a seamless revenue engine."]'::jsonb,
  '["CRM Integration", "Sales Automation", "WhatsApp API"]'::jsonb,
  true
),
(
  'enterprise-web-portals-customer-self-service',
  'Modern B2B Client & Vendor Portals: Automating Orders, Tickets & Invoices Online',
  'Empower distributors, dealers, and enterprise clients with 24/7 self-service portals connected directly to live ERP pricing, inventory, and statements.',
  'Aircom Digital & Web Practice',
  'August 10, 2026',
  '6 min read',
  'Web & Portals',
  'assets/images/service-web.png',
  '["High-growth B2B distributors and manufacturers spend enormous support bandwidth answering routine phone calls asking for ledger statements, invoice PDFs, and dispatch statuses.", "Replacing repetitive manual requests with a mobile-responsive B2B Customer & Vendor Self-Service Portal lowers administrative overhead while boosting partner satisfaction.", "Built on modern Angular and cloud APIs synchronized with ERPNext or TallyPrime, authenticated dealers browse contract pricing, check real-time stock, and place bulk orders 24/7.", "Vendors gain dedicated portal views to submit RFQs, upload GST invoices, track goods receipt notes (GRNs), and monitor upcoming payment schedules.", "Integrated support ticketing, WhatsApp order notifications, and digital payment gateway links shorten invoice collection cycles automatically.", "Whether you need a corporate website, a distributor portal, or a custom web application, Aircom Technologies engineers fast, SEO-ready platforms built to scale."]'::jsonb,
  '["Web Portals", "B2B E-Commerce", "Angular Development"]'::jsonb,
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

-- Seed Initial Activity Logs
INSERT INTO public.activity_logs (action, module, details, user_email, created_at) VALUES
('Realtime Engine', 'Supabase Realtime Sync', 'Bidirectional replication channel subscribed across site_settings, services, products, industries, blogs & activity', 'system', now() - interval '2 minutes'),
('Live Verify', 'Services & ERPNext', 'Verified ERPNext, HRMS, Biometric, CRM & TallyPrime solutions with pictures', 'admin@aircomtech.com', now() - interval '14 minutes'),
('Database Audit', 'Products & Industries', '5 Cloud products and 8 industry sectors synchronized with live asset previews', 'admin@aircomtech.com', now() - interval '32 minutes'),
('Blog Engine', 'Knowledge Base', '4 technical articles pre-loaded and live with responsive image rendering', 'admin@aircomtech.com', now() - interval '55 minutes'),
('Auth Session', 'Security & Access', 'Admin user session authorized and active', 'admin@aircomtech.com', now() - interval '85 minutes'),
('Core Schema', 'Aircom CMS', 'Initial system bootstrap and RLS security policies established', 'system', now() - interval '120 minutes');


