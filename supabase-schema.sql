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

-- 9. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    details TEXT,
    user_email TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 11. POLICIES: PUBLIC READ ACCESS FOR PUBLISHED CONTENT
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Industries" ON public.industries FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Media" ON public.media_assets FOR SELECT USING (true);

-- 12. POLICIES: PUBLIC INQUIRIES SUBMISSION
CREATE POLICY "Public Can Submit Inquiries" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- 13. POLICIES: AUTHENTICATED & SERVICE ADMIN FULL ACCESS
CREATE POLICY "Admin Full Access Settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Industries" ON public.industries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Inquiries" ON public.contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Media" ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Activity" ON public.activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- (Optional fallback policy for seamless prototyping with anon key before auth users are created)
CREATE POLICY "Anon Dev Upsert Settings" ON public.site_settings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Services" ON public.services FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Products" ON public.products FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Industries" ON public.industries FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Media" ON public.media_assets FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Upsert Activity" ON public.activity_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon Dev Read Inquiries" ON public.contact_submissions FOR SELECT TO anon USING (true);
CREATE POLICY "Anon Dev Update Inquiries" ON public.contact_submissions FOR UPDATE TO anon USING (true);

-- 14. ENABLE REALTIME REPLICATION
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.industries;
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

-- Seed Sample Services
INSERT INTO public.services (slug, title, short_desc, full_desc, icon, category, is_published, order_index) VALUES
('erpnext', 'ERPNext Implementation & Customization', 'Streamline inventory, accounting, sales, purchasing, and reporting.', 'Aircom Technologies delivers end-to-end ERPNext implementation, custom Frappe app development, and multi-branch rollout.', 'monitor-cog', 'Enterprise ERP', true, 1),
('hrms', 'HRMS & Payroll Management', 'Employee onboarding, attendance tracking, payroll, and leave management.', 'Automate every stage of employee management from recruitment to payroll runs.', 'users', 'Human Capital', true, 2),
('biometric', 'Biometric & Hardware Integration', 'Connect biometric fingerprint and facial attendance with ERP.', 'Seamless two-way integration linking hardware access control directly to payroll.', 'fingerprint', 'Hardware & IoT', true, 3),
('crm', 'CRM & Business Software Integration', 'Lead tracking, customer management, sales automation, and omnichannel support.', 'Empower sales and support teams with unified customer intelligence.', 'user-check', 'Sales & CRM', true, 4),
('tally', 'TallyPrime Integration & Customization', 'Automate voucher sync, custom TDL modules, and GST invoicing.', 'Two-way synchronization between TallyPrime, ERPNext, and third-party portals.', 'file-spreadsheet', 'Accounting', true, 5)
ON CONFLICT (slug) DO NOTHING;
