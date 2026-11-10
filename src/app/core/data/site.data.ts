import {
  BlogPost,
  ContactInfo,
  IndustryItem,
  NavItem,
  ProductItem,
  ServiceItem
} from '../models/site.models';

export const CONTACT_INFO: ContactInfo = {
  companyName: 'Aircom Technologies',
  tagline: 'Serving beyond boundaries...',
  foundedYear: 2009,
  phone: '+91 77998 99429',
  phoneHref: 'tel:+917799899429',
  whatsappNumber: '917799899429',
  whatsappHref: 'https://wa.me/917799899429?text=Hello%20Aircom%20Technologies%2C%20I%20would%20like%20to%20discuss%20an%20IT%20%2F%20ERP%20solution.',
  salesEmail: 'sales@aircomtech.com',
  infoEmail: 'info@aircomtech.com',
  address: '#462, Block C, Fourth Floor, CTC, Near ParkLane Hotel, Secunderabad, Telangana – 500003, India.',
  workingHours: 'Monday – Saturday: 9:30 AM – 6:30 PM IST',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/aircom-technologies', icon: 'linkedin' },
    { name: 'YouTube', url: 'https://www.youtube.com/@aircomtechnologies', icon: 'youtube' },
    { name: 'Facebook', url: 'https://www.facebook.com/aircomtechnologies', icon: 'facebook' },
    { name: 'X (Twitter)', url: 'https://x.com/aircomtech', icon: 'twitter' },
    { name: 'Instagram', url: 'https://www.instagram.com/aircomtechnologies', icon: 'instagram' }
  ]
};

export const HERO_STATS = [
  {
    value: '17+',
    numericValue: 17,
    suffix: '+',
    label: 'Years of Excellence',
    sublabel: 'Established in 2009',
    icon: 'trophy'
  },
  {
    value: 'Customer-Focused',
    label: 'Customer-Focused Solutions',
    sublabel: 'Tailored to Business Workflows',
    icon: 'users'
  },
  {
    value: 'Quality',
    label: 'Quality Driven',
    sublabel: 'Enterprise Delivery Standards',
    icon: 'shield-check'
  },
  {
    value: 'Dedicated',
    label: 'Dedicated Support',
    sublabel: 'Proactive AMC & SLA Care',
    icon: 'headphones'
  }
];

export const ABOUT_CONTENT = {
  eyebrow: 'About Aircom Technologies',
  heading: 'Your Trusted Technology Partner Since 2009',
  description:
    'Founded in 2009, Aircom Technologies delivers innovative and reliable IT solutions to help businesses improve efficiency, automate operations, and achieve sustainable growth. From ERPNext and TallyPrime integrations to enterprise IT infrastructure and cloud hosting, we bridge operational software with resilient infrastructure.',
  vision:
    'To become a trusted global technology partner through innovative IT infrastructure, enterprise software, and digital transformation.',
  mission:
    'To provide cost-effective, reliable, scalable, and customized technology solutions.',
  coreValues: [
    'Customer Satisfaction',
    'Innovation',
    'Quality',
    'Integrity',
    'Technical Excellence',
    'Teamwork',
    'Continuous Improvement',
    'On-Time Delivery'
  ],
  image: 'assets/images/about-hq.svg'
};

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Innovative Solutions',
    description: 'Stay ahead with cutting-edge ERP, cloud, automation, and AI-ready enterprise technology stacks.',
    icon: 'cpu',
    accent: '#0BA8EA'
  },
  {
    title: 'Trusted Partner',
    description: 'Over 17 years of proven integrity, transparent delivery, and long-term client relationships since 2009.',
    icon: 'handshake',
    accent: '#2457A7'
  },
  {
    title: 'Expert Support',
    description: 'Dedicated technical engineering and managed AMC support whenever your operations need assistance.',
    icon: 'headphones',
    accent: '#F59E0B'
  },
  {
    title: 'Business Growth',
    description: 'Achieve measurable efficiency and scale seamlessly across locations with future-proof architecture.',
    icon: 'trending-up',
    accent: '#102A63'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'erpnext',
    title: 'ERPNext Implementation & Customization',
    shortTitle: 'ERPNext Solutions',
    shortDesc: 'Streamline inventory, accounting, sales, purchasing, reporting, and workflows with tailored ERPNext.',
    icon: 'monitor-cog',
    category: 'Enterprise ERP',
    tagline: 'Unified Open-Source ERP Engineered for Operational Clarity',
    heroImage: 'assets/images/service-erpnext.svg',
    overview:
      'Aircom Technologies delivers end-to-end ERPNext implementation, custom Frappe app development, data migration, and multi-branch rollout. We configure inventory, procurement, accounting, manufacturing, and management dashboards around your exact business rules.',
    highlights: ['Custom Frappe Apps', 'Multi-Company Setup', 'GST & Tax Compliance', 'Role-Based Security'],
    features: [
      { title: 'Process Mapping & Gap Analysis', description: 'Detailed discovery workshops aligning ERPNext modules to your existing SOPs.', icon: 'git-branch' },
      { title: 'Custom DocTypes & Workflows', description: 'Tailored approval matrices, custom print formats, and automated alerts.', icon: 'sliders' },
      { title: 'Clean Legacy Data Migration', description: 'Validated opening balances, item masters, BOMs, and customer ledgers.', icon: 'database' },
      { title: 'User Training & Go-Live Care', description: 'Role-specific workshops and dedicated hypercare support after launch.', icon: 'graduation-cap' }
    ],
    benefits: [
      'Real-time visibility across inventory, finance, sales, and procurement',
      'Eliminate spreadsheet silos and manual reconciliation errors',
      'Zero proprietary per-user license lock-in with scalable cloud or on-prem hosting',
      'Faster month-end closing with automated ledger postings'
    ],
    deliverables: [
      'Solution Blueprint & Configuration Matrix',
      'Custom Modules, Print Formats & Executive Reports',
      'Validated Production Environment & Automated Backups',
      'Admin & End-User Training Documentation'
    ],
    faqs: [
      { question: 'How long does a standard ERPNext rollout take?', answer: 'Core finance, inventory, and sales implementations typically go live in 4 to 8 weeks, while multi-site custom manufacturing rollouts take 8 to 14 weeks.' },
      { question: 'Can ERPNext integrate with TallyPrime and biometric devices?', answer: 'Yes. We specialize in two-way TallyPrime voucher synchronization and real-time biometric attendance integration directly into ERPNext.' }
    ],
    relatedSlugs: ['tally', 'hrms', 'cloud'],
    seoTitle: 'ERPNext Implementation & Customization Services | Aircom Technologies',
    seoDescription: 'End-to-end ERPNext implementation, custom Frappe development, data migration, and support by Aircom Technologies.'
  },
  {
    slug: 'hrms',
    title: 'HRMS & Payroll Management',
    shortTitle: 'HRMS & Payroll',
    shortDesc: 'Employee onboarding, attendance tracking, payroll processing, leave management, and workforce automation.',
    icon: 'users',
    category: 'Human Capital',
    tagline: 'Complete Hire-to-Retire Workforce Automation',
    heroImage: 'assets/images/service-hrms.svg',
    overview:
      'Automate every stage of employee management from recruitment and onboarding to shift scheduling, biometric attendance capture, statutory payroll runs, and Employee Self-Service (ESS) portals.',
    highlights: ['Automated Payslips', 'Shift & Roster Engine', 'Leave & Expense Workflows', 'ESS Mobile Access'],
    features: [
      { title: 'Digital Onboarding & Profiles', description: 'Centralized employee records, documents, asset allocation, and lifecycle tracking.', icon: 'user-check' },
      { title: 'Shift, Leave & Attendance Rules', description: 'Flexible shift calendars, late-coming penalties, overtime rules, and holiday lists.', icon: 'calendar-clock' },
      { title: 'Statutory Payroll Processing', description: 'Configurable salary structures, PF, ESI, PT, TDS deductions, and bulk bank transfer sheets.', icon: 'wallet' },
      { title: 'Employee Self-Service Portal', description: 'Employees download payslips, apply for leaves, and submit expense claims online.', icon: 'smartphone' }
    ],
    benefits: [
      'Cut monthly payroll processing time from days to hours',
      'Eliminate manual attendance register errors and proxy punching',
      'Maintain transparent compliance audit trails for statutory filings',
      'Empower HR teams and managers with real-time headcount analytics'
    ],
    deliverables: [
      'Configured HRMS Portal & Salary Structures',
      'Biometric Attendance Sync Connector',
      'Custom Payslip & Tax Declaration Templates',
      'HR Team Training & Payroll Dry-Run Verification'
    ],
    faqs: [
      { question: 'Does the HRMS handle multi-branch shifts and overtime?', answer: 'Yes, it supports multiple locations, rotational shifts, geo-fenced check-ins, and automated overtime calculation.' },
      { question: 'Can employees access payslips from mobile devices?', answer: 'Yes, the responsive Employee Self-Service portal lets staff view attendance, request leave, and download PDF payslips anytime.' }
    ],
    relatedSlugs: ['biometric', 'erpnext', 'crm'],
    seoTitle: 'HRMS & Payroll Management Software Solutions | Aircom Technologies',
    seoDescription: 'Automate employee onboarding, attendance, leave management, and statutory payroll with Aircom Technologies HRMS solutions.'
  },
  {
    slug: 'biometric',
    title: 'Biometric & Hardware Integration',
    shortTitle: 'Biometric Integration',
    shortDesc: 'Fingerprint scanners, facial recognition, RFID devices, and real-time attendance synchronization.',
    icon: 'fingerprint',
    category: 'Hardware & IoT',
    tagline: 'Zero-Delay Hardware-to-Software Attendance & Access Sync',
    heroImage: 'assets/images/service-biometric.svg',
    overview:
      'Bridge physical security and attendance hardware directly with your ERPNext, HRMS, or payroll platform. We deploy and integrate fingerprint terminals, AI facial recognition devices, and RFID access controllers across single or distributed branches.',
    highlights: ['ZKTeco, eSSL & Hikvision', 'Multi-Branch Push Sync', 'Facial & RFID Support', 'Zero Proxy Punching'],
    features: [
      { title: 'Real-Time Device Synchronization', description: 'Automatic push-protocol log ingestion without manual USB exports.', icon: 'refresh-cw' },
      { title: 'Multi-Location Central Aggregation', description: 'Consolidate punches from factories, retail outlets, and branch offices into one server.', icon: 'network' },
      { title: 'Device Health & Offline Buffering', description: 'Heartbeat monitoring with automatic backfill if branch internet drops.', icon: 'activity' },
      { title: 'Door Access & Visitor Integration', description: 'Coordinate access control gates and shift eligibility rules.', icon: 'shield-alert' }
    ],
    benefits: [
      'Eliminate manual CSV imports and time-theft across branches',
      'Instant visibility of late arrivals, absences, and shift coverage',
      'Works seamlessly with leading enterprise biometric hardware brands',
      'Direct feed into monthly payroll processing'
    ],
    deliverables: [
      'Hardware Compatibility Audit & Deployment',
      'Real-Time Attendance Sync Middleware',
      'Multi-Site Network & Port Configuration',
      'Admin Monitoring Console & Documentation'
    ],
    faqs: [
      { question: 'Which biometric device brands do you support?', answer: 'We integrate with major enterprise hardware including ZKTeco, eSSL, Hikvision, Matrix, and standard push-protocol terminals.' },
      { question: 'What happens if internet connectivity goes down at a site?', answer: 'Devices store punch logs locally in internal memory and automatically synchronize missed records once connectivity resumes.' }
    ],
    relatedSlugs: ['hrms', 'infrastructure', 'erpnext'],
    seoTitle: 'Biometric & Attendance Hardware Integration | Aircom Technologies',
    seoDescription: 'Integrate fingerprint, facial recognition, and RFID biometric hardware in real time with HRMS and ERPNext.'
  },
  {
    slug: 'crm',
    title: 'CRM & Business Software Integration',
    shortTitle: 'CRM Integration',
    shortDesc: 'Integrations with Zoho CRM, Zoho Books, Zoho Desk, and Salesforce for automated business operations.',
    icon: 'handshake',
    category: 'Software Integration',
    tagline: 'Connected Revenue, Support, and Accounting Pipelines',
    heroImage: 'assets/images/service-crm.svg',
    overview:
      'Stop copying leads, quotes, invoices, and support tickets between disconnected apps. Aircom Technologies engineers reliable REST APIs and webhook connectors linking Zoho CRM, Zoho Books, Zoho Desk, Salesforce, and ERPNext.',
    highlights: ['Zoho Suite Integration', 'Salesforce Connectors', 'Two-Way Webhooks', 'Automated Lead-to-Cash'],
    features: [
      { title: 'Lead-to-Order Automation', description: 'Convert won CRM deals into ERP sales orders and invoices automatically.', icon: 'workflow' },
      { title: 'Bi-Directional Master Sync', description: 'Keep customer profiles, credit limits, and item pricing consistent everywhere.', icon: 'repeat' },
      { title: 'Support Ticket Visibility', description: 'Surface Zoho Desk or helpdesk ticket history inside account dashboards.', icon: 'life-buoy' },
      { title: 'Error Queues & Retry Logging', description: 'Fault-tolerant sync architecture with clear admin reconciliation alerts.', icon: 'file-check' }
    ],
    benefits: [
      'Zero duplicate data entry between sales, support, and finance teams',
      'Faster quote turnaround with live inventory and pricing inside CRM',
      'Complete 360-degree view of customer interactions and payment status',
      'Reliable API governance and version-safe middleware'
    ],
    deliverables: [
      'API Architecture & Field Mapping Specification',
      'Production Two-Way Sync Connectors & Webhooks',
      'Sync Audit Dashboard & Retry Handler',
      'Post-Deployment Monitoring & Support'
    ],
    faqs: [
      { question: 'Can you connect Zoho CRM and Zoho Books with ERPNext?', answer: 'Yes, we build bi-directional connectors syncing contacts, quotations, invoices, and stock status between Zoho apps and ERPNext.' },
      { question: 'Do you support custom Salesforce API workflows?', answer: 'Yes, our engineering team builds custom Apex/REST API bridges for Salesforce, HubSpot, and industry-specific portals.' }
    ],
    relatedSlugs: ['erpnext', 'tally', 'web-development'],
    seoTitle: 'CRM & Business Software Integration (Zoho, Salesforce) | Aircom Technologies',
    seoDescription: 'Seamless Zoho CRM, Zoho Books, Zoho Desk, and Salesforce integration services by Aircom Technologies.'
  },
  {
    slug: 'tally',
    title: 'TallyPrime Integration & Customization',
    shortTitle: 'TallyPrime Integration',
    shortDesc: 'TallyPrime integration, TDL development, GST reporting, voucher automation, and accounting sync.',
    icon: 'calculator',
    category: 'Accounting & Tax',
    tagline: 'Bridge Operational Software with TallyPrime Accounting',
    heroImage: 'assets/images/service-tally.svg',
    overview:
      'Keep your finance team productive in TallyPrime while running operations in ERPNext, e-commerce, or POS systems. We deliver custom TDL extensions, automated XML/JSON voucher posting, and GST-ready reconciliation workflows.',
    highlights: ['Custom TDL Development', 'Automated Voucher Sync', 'GST & E-Invoice Ready', 'Dual-Ledger Control'],
    features: [
      { title: 'Automated Voucher Posting', description: 'Push sales, purchase, receipt, payment, and journal vouchers directly into TallyPrime.', icon: 'file-spreadsheet' },
      { title: 'Custom TDL Customization', description: 'Bespoke invoice formats, approval controls, and management MIS reports inside Tally.', icon: 'code' },
      { title: 'GST & E-Way Bill Alignment', description: 'Ensure HSN codes, tax ledgers, and GSTR summaries stay synchronized across systems.', icon: 'badge-check' },
      { title: 'Scheduled & Real-Time Sync', description: 'Configure instant webhook sync or scheduled batch accounting imports.', icon: 'clock' }
    ],
    benefits: [
      'Eliminate manual re-keying of hundreds of daily operational vouchers',
      'Preserve chartered accountant workflows inside familiar TallyPrime ledgers',
      'Reduce GST filing mismatches and reconciliation bottlenecks',
      'Full audit log tracking every synced transaction'
    ],
    deliverables: [
      'TallyPrime Sync Bridge (XML / API)',
      'Custom TDL Files & Invoice Templates',
      'Tax Ledger & Master Mapping Setup',
      'Accountant Training & Reconciliation Guide'
    ],
    faqs: [
      { question: 'Will syncing overwrite existing TallyPrime ledgers?', answer: 'No. Our connector validates master names, GSTINs, and voucher numbers before posting to prevent duplicates or overwrites.' },
      { question: 'Can you customize TallyPrime reports using TDL?', answer: 'Yes, we develop custom TDL modules for branch profitability, credit-limit alerts, and custom voucher printouts.' }
    ],
    relatedSlugs: ['erpnext', 'crm', 'jewellery'],
    seoTitle: 'TallyPrime Integration & TDL Customization | Aircom Technologies',
    seoDescription: 'Automate voucher posting, GST reporting, and custom TDL development for TallyPrime with Aircom Technologies.'
  },
  {
    slug: 'restaurant',
    title: 'Restaurant & Hospitality ERP Solutions',
    shortTitle: 'Restaurant & Hospitality',
    shortDesc: 'POS billing, kitchen order tracking, inventory, recipes, online orders, and restaurant management.',
    icon: 'utensils',
    category: 'Industry ERP',
    tagline: 'Fast POS, Smart Kitchens & Tight Food-Cost Control',
    heroImage: 'assets/images/industry-hospitality.svg',
    overview:
      'Designed for restaurants, cloud kitchens, cafes, QSR chains, and boutique hotels. Unify table billing, KOT routing, recipe-level BOM consumption, central commissary inventory, and multi-outlet accounting in one connected suite.',
    highlights: ['Touchscreen POS & KOT', 'Recipe & Wastage Control', 'Multi-Outlet Commissary', 'Delivery Aggregator Sync'],
    features: [
      { title: 'High-Speed Touch POS & KOT', description: 'Split bills, table transfers, modifier notes, and instant kitchen display/printer routing.', icon: 'tablet' },
      { title: 'Recipe BOM & Portion Costing', description: 'Auto-deduct raw ingredients per dish sold and track food-cost percentages daily.', icon: 'layers' },
      { title: 'Central Kitchen & Indents', description: 'Manage outlet stock requisitions, batch production, and vendor procurement.', icon: 'truck' },
      { title: 'Consolidated Outlet Accounting', description: 'Compare branch-wise margins, tax summaries, and shift cash reconciliations.', icon: 'bar-chart-3' }
    ],
    benefits: [
      'Speed up table turnover and eliminate missed kitchen orders',
      'Control pilferage and food wastage with real-time ingredient variance alerts',
      'Scale from a single outlet to a multi-city franchise effortlessly',
      'Direct integration with accounting and payroll'
    ],
    deliverables: [
      'Configured POS & Kitchen Display/Printer Setup',
      'Menu Engineering & Recipe BOM Import',
      'Central Inventory & Vendor Workflow',
      'Cashier & Manager Training'
    ],
    faqs: [
      { question: 'Can it run multiple outlets from one central dashboard?', answer: 'Yes, headquarters can monitor live sales, inventory stock levels, and food costs across every outlet in real time.' },
      { question: 'Does it support offline POS billing?', answer: 'Yes, local POS terminals continue billing uninterrupted during temporary internet outages and sync automatically when online.' }
    ],
    relatedSlugs: ['erpnext', 'tally', 'infrastructure'],
    seoTitle: 'Restaurant & Hospitality ERP & POS Solutions | Aircom Technologies',
    seoDescription: 'Complete restaurant POS, KOT, recipe inventory, and multi-outlet ERP software by Aircom Technologies.'
  },
  {
    slug: 'jewellery',
    title: 'Jewellery & Construction ERP Solutions',
    shortTitle: 'Jewellery & Construction ERP',
    shortDesc: 'Jewellery inventory, metal rate management, project costing, BOQ, subcontractor management, and workflows.',
    icon: 'gem',
    category: 'Specialized Verticals',
    tagline: 'Precision Vertical ERP for High-Value & Project-Driven Businesses',
    heroImage: 'assets/images/industry-jewellery.svg',
    overview:
      'Two specialized enterprise suites built for complex valuation and execution: Jewellery ERP (purity/karat tracking, daily gold/silver rate boards, karigar job-work, stone weight, RFID/barcode tagging) and Construction ERP (BOQ, project costing, RA bills, subcontractor retention, site procurement).',
    highlights: ['Purity & Metal Rate Sync', 'Karigar & Tag Inventory', 'BOQ & Project Costing', 'Subcontractor Billing'],
    features: [
      { title: 'Jewellery Valuation & Tagging', description: 'Track gross/net/stone weights, wastage, making charges, and HUID/hallmark compliance.', icon: 'tag' },
      { title: 'Karigar Job-Work & Gold Ledger', description: 'Monitor metal issued, loss allowances, and finished ornament receipts.', icon: 'scale' },
      { title: 'Construction BOQ & Budgets', description: 'Compare estimated vs. actual material, labor, and equipment costs per site.', icon: 'building-2' },
      { title: 'RA Billing & Retention Tracking', description: 'Manage subcontractor measurement books, advances, and retention releases.', icon: 'clipboard-check' }
    ],
    benefits: [
      'Pinpoint inventory accountability down to milligram metal weights or site material batches',
      'Prevent project cost overruns with early BOQ variance alerts',
      'Automate complex making-charge pricing and GST calculation',
      'Real-time profitability by showroom or construction project'
    ],
    deliverables: [
      'Vertical-Configured ERP Modules',
      'Barcode / RFID Label & Invoice Print Formats',
      'Site / Showroom Rollout & Data Migration',
      'Dedicated Domain Specialist Support'
    ],
    faqs: [
      { question: 'Does the Jewellery module support daily gold rate updates?', answer: 'Yes, administrators can update 24K/22K/18K/silver rates once daily and auto-recalculate tag estimates across showrooms.' },
      { question: 'How does the Construction module handle site material indents?', answer: 'Site engineers raise material requests on mobile, triggering approval workflows and purchase orders directly against project BOQ budgets.' }
    ],
    relatedSlugs: ['erpnext', 'tally', 'biometric'],
    seoTitle: 'Jewellery & Construction ERP Solutions | Aircom Technologies',
    seoDescription: 'Specialized Jewellery ERP and Construction BOQ & project costing ERP solutions by Aircom Technologies.'
  },
  {
    slug: 'infrastructure',
    title: 'IT Infrastructure & Networking',
    shortTitle: 'IT Infrastructure',
    shortDesc: 'Server installation, LAN networking, Wi-Fi, firewalls, hardware deployment, and rack infrastructure.',
    icon: 'network',
    category: 'Infrastructure',
    tagline: 'Resilient On-Premise & Hybrid Enterprise Backbone',
    heroImage: 'assets/images/service-infrastructure.svg',
    overview:
      'Build a rock-solid physical and network foundation for your offices, warehouses, hospitals, and campuses. Aircom Technologies designs, supplies, installs, and maintains enterprise servers, structured Cat6/fiber cabling, enterprise Wi-Fi mesh, UTM firewalls, and clean server racks.',
    highlights: ['Structured LAN & Fiber', 'Firewall & VPN Security', 'Enterprise Wi-Fi Mesh', 'Server & Rack Setup'],
    features: [
      { title: 'Server & Storage Deployment', description: 'Rack/tower servers, virtualization clusters, NAS/SAN storage, and UPS power redundancy.', icon: 'server' },
      { title: 'Structured Cabling & Switching', description: 'Certified Cat6/Cat6A, fiber uplinks, VLAN segmentation, and neat patch-panel dressing.', icon: 'cable' },
      { title: 'Next-Gen Firewalls & VPNs', description: 'Multi-WAN failover, Sophos/Fortinet/pfSense firewall hardening, and site-to-site VPNs.', icon: 'shield' },
      { title: 'High-Density Enterprise Wi-Fi', description: 'Seamless roaming access points with guest captive portals and bandwidth shaping.', icon: 'wifi' }
    ],
    benefits: [
      'Eliminate network bottlenecks, dead zones, and unplanned hardware downtime',
      'Protect branch networks with segmented VLANs and perimeter firewall policies',
      'Clean, documented rack layouts engineered for easy maintenance',
      'Single accountable partner for hardware supply, cabling, and ongoing AMC'
    ],
    deliverables: [
      'Site Survey & Network Topology Blueprint',
      'Rack Dressing, Labeling & Cable Testing Report',
      'Hardened Firewall & Failover Configuration',
      'As-Built Documentation & AMC Handover'
    ],
    faqs: [
      { question: 'Do you handle end-to-end office IT setup for new branches?', answer: 'Yes, from structured cabling and firewall setup to server racks, workstations, CCTV, and biometric hardware.' },
      { question: 'Can you connect multiple branch offices over secure VPN?', answer: 'Yes, we configure encrypted site-to-site IPSec/WireGuard VPN tunnels with dual-ISP automatic failover.' }
    ],
    relatedSlugs: ['cloud', 'biometric', 'erpnext'],
    seoTitle: 'IT Infrastructure & Networking Services | Aircom Technologies',
    seoDescription: 'Enterprise server installation, structured LAN networking, Wi-Fi mesh, and firewall deployment by Aircom Technologies.'
  },
  {
    slug: 'cloud',
    title: 'Cloud Hosting, DevOps & Managed IT Support',
    shortTitle: 'Cloud & DevOps',
    shortDesc: 'AWS, Azure, private cloud, automated backups, server monitoring, maintenance, and AMC support.',
    icon: 'cloud-cog',
    category: 'Cloud & Managed IT',
    tagline: 'High-Availability Cloud Architecture & Proactive 24/7 Care',
    heroImage: 'assets/images/product-cloud-erp.svg',
    overview:
      'Run mission-critical ERPNext, web applications, and corporate workloads on hardened AWS, Azure, or private cloud infrastructure. We handle architecture design, CI/CD pipelines, automated off-site encrypted backups, uptime monitoring, and Annual Maintenance Contracts (AMC).',
    highlights: ['AWS & Azure Architecture', 'Automated Off-Site Backups', '24/7 Uptime Monitoring', 'Managed IT AMC'],
    features: [
      { title: 'Cloud Migration & Provisioning', description: 'Right-sized compute, managed databases, load balancers, and SSL hardening.', icon: 'cloud-upload' },
      { title: 'Automated Backup & DR Drills', description: 'Scheduled daily snapshots with cross-region retention and verified restore tests.', icon: 'hard-drive-download' },
      { title: 'DevOps & Zero-Downtime Updates', description: 'Containerized deployments, staging environments, and automated health checks.', icon: 'terminal' },
      { title: 'Dedicated SLA & AMC Support', description: 'Proactive patching, antivirus management, and rapid L1–L3 helpdesk response.', icon: 'headphones' }
    ],
    benefits: [
      'Maximize application uptime and predictable cloud cost control',
      'Protect business continuity against ransomware or hardware failures',
      'Free your internal staff from server patching and emergency firefighting',
      'Clear SLA response times backed by experienced systems engineers'
    ],
    deliverables: [
      'Cloud Architecture & Security Hardening Checklist',
      'Automated Backup & Alerting Pipeline',
      'Monthly Health, Uptime & Cost Optimization Reports',
      'Dedicated Support Desk & Escalation Matrix'
    ],
    faqs: [
      { question: 'Do you manage both AWS/Azure and on-premise private servers?', answer: 'Yes. We manage hybrid, public cloud (AWS, Azure, DigitalOcean), and on-premise Linux/Windows server environments.' },
      { question: 'What is included in a Managed IT AMC?', answer: 'AMCs cover preventive maintenance, OS/security patching, backup audits, network monitoring, and priority remote/onsite support.' }
    ],
    relatedSlugs: ['infrastructure', 'erpnext', 'web-development'],
    seoTitle: 'Cloud Hosting, DevOps & Managed IT Support | Aircom Technologies',
    seoDescription: 'Managed AWS, Azure, private cloud hosting, automated backups, DevOps, and IT AMC support by Aircom Technologies.'
  },
  {
    slug: 'web-development',
    title: 'Digital Services & Web Development',
    shortTitle: 'Web Development',
    shortDesc: 'Corporate websites, web applications, CMS, eCommerce platforms, business portals, and SEO.',
    icon: 'code-2',
    category: 'Digital Engineering',
    tagline: 'High-Performance Web Platforms Built for Speed & Conversion',
    heroImage: 'assets/images/service-web.svg',
    overview:
      'Elevate your digital presence with fast, responsive, SEO-engineered corporate websites, customer/vendor portals, and custom e-commerce storefronts built on modern frameworks and directly integrated with your ERP or CRM.',
    highlights: ['Angular & Modern Web Apps', 'ERP-Connected Portals', 'E-Commerce Platforms', 'Technical SEO & Speed'],
    features: [
      { title: 'Custom Corporate & Brand Sites', description: 'Mobile-first UI/UX engineered for Core Web Vitals and lead conversion.', icon: 'layout' },
      { title: 'B2B Customer & Vendor Portals', description: 'Self-service order tracking, invoice downloads, and RFQ submission linked to ERP.', icon: 'globe' },
      { title: 'E-Commerce Storefronts', description: 'Real-time catalog, inventory sync, payment gateways, and automated order dispatch.', icon: 'shopping-bag' },
      { title: 'Technical SEO & Analytics', description: 'Structured schema markup, semantic HTML, sitemaps, and conversion tracking.', icon: 'search' }
    ],
    benefits: [
      'Convert more enterprise visitors with credible, fast-loading digital experiences',
      'Connect web orders and inquiries directly into CRM and ERP without manual entry',
      'Rank higher on search engines with clean semantic architecture',
      'Accessible, WCAG-conscious interfaces across desktop, tablet, and mobile'
    ],
    deliverables: [
      'Responsive UI/UX Design & Production Web Codebase',
      'CMS / ERP / Payment Gateway Integrations',
      'Technical SEO, Schema & Analytics Setup',
      'Hosting Deployment & Maintenance Handover'
    ],
    faqs: [
      { question: 'Can our website sync orders and leads directly into ERPNext or CRM?', answer: 'Yes. We build native API bridges so web inquiries, customer registrations, and e-commerce orders flow straight into your ERP or CRM.' },
      { question: 'Do you optimize for mobile responsiveness and Google Core Web Vitals?', answer: 'Every web project is engineered mobile-first with optimized assets, clean markup, and Lighthouse performance verification.' }
    ],
    relatedSlugs: ['crm', 'cloud', 'erpnext'],
    seoTitle: 'Digital Services & Web Development | Aircom Technologies',
    seoDescription: 'Custom corporate websites, B2B web portals, e-commerce platforms, and technical SEO by Aircom Technologies.'
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    slug: 'cloud-erp',
    title: 'Cloud ERP Solution',
    shortDesc: 'Manage finance, inventory, sales, and multi-branch operations through cloud-ready enterprise ERP.',
    icon: 'cloud',
    image: 'assets/images/product-cloud-erp.svg',
    categoryLabel: 'Enterprise Solution Category',
    tagline: 'Configured Cloud ERP Environments Built on Proven Open-Source Foundations',
    overview:
      'Our Cloud ERP Solution category brings together configured ERPNext deployments, secure cloud infrastructure, and industry workflows so growing enterprises can run finance, inventory, procurement, and operations from anywhere.',
    capabilities: [
      { title: 'Unified Multi-Branch Ledger', description: 'Consolidate branch accounting, inventory valuation, and tax compliance in real time.', icon: 'building' },
      { title: 'Automated Supply Chain', description: 'Reorder triggers, vendor RFQs, GRNs, and batch/serial number traceability.', icon: 'package-check' },
      { title: 'Cloud High Availability', description: 'Hosted on hardened AWS, Azure, or private cloud nodes with SSL and automated backups.', icon: 'cloud-lightning' },
      { title: 'Role-Based Governance', description: 'Granular permissions, approval hierarchies, and full document audit trails.', icon: 'lock' }
    ],
    benefits: [
      'Accessible securely from headquarters, factories, and remote teams',
      'Scales smoothly as user count, branches, and transaction volume grow',
      'Tailored configuration instead of rigid one-size-fits-all templates'
    ],
    deploymentOptions: ['Managed AWS / Azure Cloud', 'Dedicated Private Cloud', 'Hybrid On-Premise + Cloud Sync'],
    relatedSlugs: ['analytics', 'automation'],
    seoTitle: 'Cloud ERP Solution | Aircom Technologies',
    seoDescription: 'Manage business operations through configured cloud-based ERP solutions implemented and supported by Aircom Technologies.'
  },
  {
    slug: 'analytics',
    title: 'Business Analytics Platform',
    shortDesc: 'Transform operational and financial data into meaningful dashboards and informed executive decisions.',
    icon: 'bar-chart-2',
    image: 'assets/images/product-analytics.svg',
    categoryLabel: 'Enterprise Solution Category',
    tagline: 'Turn Disconnected Spreadsheets into Real-Time Executive Clarity',
    overview:
      'Our Business Analytics solution category connects data from ERPNext, TallyPrime, CRM, and POS systems into unified KPI dashboards, cash-flow forecasts, inventory aging views, and branch performance scorecards.',
    capabilities: [
      { title: 'Executive KPI Scorecards', description: 'Live margin, revenue, receivables, and working capital metrics at a glance.', icon: 'pie-chart' },
      { title: 'Cross-System Data Consolidation', description: 'Blend accounting, sales pipeline, and operations data into one reporting layer.', icon: 'database' },
      { title: 'Automated Scheduled Reports', description: 'Deliver daily or weekly PDF/Excel summaries straight to leadership inboxes.', icon: 'mail-check' },
      { title: 'Drill-Down Anomaly Alerts', description: 'Spot slow-moving stock, overdue receivables, or cost overruns early.', icon: 'trending-up' }
    ],
    benefits: [
      'Replace hours of manual Excel consolidation with live visual insights',
      'Empower department heads with role-filtered self-service reporting',
      'Make faster pricing, purchasing, and expansion decisions backed by verified numbers'
    ],
    deploymentOptions: ['Embedded ERP Dashboards', 'Dedicated BI Reporting Portal', 'Automated Email Digest Suite'],
    relatedSlugs: ['cloud-erp', 'automation'],
    seoTitle: 'Business Analytics Platform Solutions | Aircom Technologies',
    seoDescription: 'Transform enterprise data into executive dashboards and actionable insights with Aircom Technologies.'
  },
  {
    slug: 'security',
    title: 'Security Solutions',
    shortDesc: 'Protect business systems, networks, endpoints, and sensitive enterprise data end-to-end.',
    icon: 'shield-check',
    image: 'assets/images/product-security.svg',
    categoryLabel: 'Enterprise Solution Category',
    tagline: 'Layered Perimeter, Endpoint, and Access Protection for Modern Enterprises',
    overview:
      'Our Security Solutions category encompasses next-generation firewall deployment, encrypted site-to-site VPNs, endpoint protection, biometric access control, and automated immutable backup architectures.',
    capabilities: [
      { title: 'Perimeter Firewall & UTM', description: 'Intrusion prevention, web filtering, and multi-ISP failover routing.', icon: 'shield-alert' },
      { title: 'Zero-Trust Remote VPN', description: 'Encrypted remote access for distributed staff and branch connectivity.', icon: 'key-round' },
      { title: 'Immutable Backup Vaults', description: 'Automated off-site snapshots designed to recover rapidly from ransomware.', icon: 'archive-restore' },
      { title: 'Physical & Biometric Access', description: 'Integrate door access controllers and CCTV monitoring with staff directories.', icon: 'scan-face' }
    ],
    benefits: [
      'Reduce exposure to phishing, malware, and unauthorized network access',
      'Meet corporate client and regulatory data protection expectations',
      'Ensure business continuity with verified disaster recovery playbooks'
    ],
    deploymentOptions: ['On-Premise Firewall Appliances', 'Cloud Security Hardening', 'Hybrid Branch VPN Mesh'],
    relatedSlugs: ['it-support', 'cloud-erp'],
    seoTitle: 'Enterprise Security Solutions | Aircom Technologies',
    seoDescription: 'Protect enterprise networks, cloud servers, endpoints, and data with Aircom Technologies security solutions.'
  },
  {
    slug: 'automation',
    title: 'Automation Tools',
    shortDesc: 'Automate repetitive workflows, cross-app syncing, approvals, and notifications to boost productivity.',
    icon: 'settings-2',
    image: 'assets/images/product-automation.svg',
    categoryLabel: 'Enterprise Solution Category',
    tagline: 'Eliminate Manual Repetitive Work Across Finance, HR, and Sales',
    overview:
      'Our Automation Tools category combines custom API bridges, TallyPrime voucher sync connectors, WhatsApp/email alert triggers, and scheduled background jobs that keep your business running smoothly around the clock.',
    capabilities: [
      { title: 'API & Webhook Orchestration', description: 'Sync orders, leads, and invoices reliably across CRM, web portals, and ERP.', icon: 'webhook' },
      { title: 'Automated Approval Chains', description: 'Route POs, leave requests, and discounts dynamically by value or department.', icon: 'git-merge' },
      { title: 'Smart Customer Alerts', description: 'Trigger automated invoice PDFs, payment reminders, and dispatch updates.', icon: 'bell-ring' },
      { title: 'Scheduled Reconciliation', description: 'Run nightly ledger checks, stock alerts, and attendance log syncing.', icon: 'clock-4' }
    ],
    benefits: [
      'Save hundreds of staff hours monthly on repetitive copy-paste tasks',
      'Cut human transcription errors in billing, GST, and payroll',
      'Deliver faster, more consistent communication to customers and vendors'
    ],
    deploymentOptions: ['ERP Workflow Engine', 'Custom Integration Middleware', 'Tally & Biometric Connectors'],
    relatedSlugs: ['cloud-erp', 'analytics'],
    seoTitle: 'Business Automation Tools & Connectors | Aircom Technologies',
    seoDescription: 'Automate repetitive enterprise workflows, Tally syncing, and CRM pipelines with Aircom Technologies.'
  },
  {
    slug: 'it-support',
    title: 'IT Support Services',
    shortDesc: 'Professional technical assistance, proactive server monitoring, and managed IT AMC support.',
    icon: 'headphones',
    image: 'assets/images/product-it-support.svg',
    categoryLabel: 'Enterprise Solution Category',
    tagline: 'Dedicated Engineers Keeping Your Infrastructure & Software Performing',
    overview:
      'Our IT Support Services category provides structured Annual Maintenance Contracts (AMC), remote and onsite technical helpdesks, proactive server monitoring, and lifecycle hardware maintenance for growing organizations.',
    capabilities: [
      { title: 'Proactive 24/7 Monitoring', description: 'Track CPU, disk, memory, service health, and SSL expiry before outages happen.', icon: 'activity' },
      { title: 'L1–L3 Escalation Desk', description: 'Direct access to ERP, networking, and Linux/Windows systems specialists.', icon: 'life-buoy' },
      { title: 'Preventive Maintenance Visits', description: 'Scheduled health audits, rack cleanups, firmware updates, and backup checks.', icon: 'wrench' },
      { title: 'Multi-Site SLA Coverage', description: 'Consistent support governance across headquarters and regional branches.', icon: 'map-pin' }
    ],
    benefits: [
      'Predictable annual IT support budgeting without surprise emergency fees',
      'Faster incident resolution with engineers who know your environment',
      'Higher employee productivity with reliable workstations, Wi-Fi, and ERP uptime'
    ],
    deploymentOptions: ['Comprehensive Annual Maintenance (AMC)', 'Cloud & ERP Managed Care', 'On-Demand Technical Retainer'],
    relatedSlugs: ['security', 'cloud-erp'],
    seoTitle: 'Managed IT Support Services & AMC | Aircom Technologies',
    seoDescription: 'Reliable managed IT support, server monitoring, and Annual Maintenance Contracts by Aircom Technologies.'
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    icon: 'shopping-cart',
    image: 'assets/images/industry-retail.svg',
    shortDesc: 'Omnichannel POS, centralized inventory, loyalty, GST billing, and web storefront sync.',
    overview: 'Empower retail chains and online brands with real-time stock synchronization across storefronts, warehouses, and marketplaces—paired with fast POS billing and automated TallyPrime accounting.',
    challenges: [
      'Stock mismatches between physical stores and online storefronts',
      'Slow manual billing and fragmented multi-branch reporting',
      'Difficulty tracking supplier margins, schemes, and seasonal dead stock'
    ],
    solutions: [
      'Barcode-enabled multi-store POS with central warehouse replenishment',
      'Real-time catalog and inventory sync with e-commerce portals',
      'Automated daily sales & GST voucher posting to accounting'
    ],
    recommendedServices: ['erpnext', 'tally', 'web-development'],
    seoTitle: 'Retail & E-commerce IT & ERP Solutions | Aircom Technologies',
    seoDescription: 'Omnichannel retail POS, inventory management, and e-commerce ERP integrations by Aircom Technologies.'
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    icon: 'utensils',
    image: 'assets/images/industry-hospitality.svg',
    shortDesc: 'Restaurant POS, kitchen order tickets, recipe costing, and multi-outlet control.',
    overview: 'Deliver memorable guest experiences while keeping kitchen margins tight. Our hospitality solutions unify front-of-house billing, KOT workflows, recipe consumption, and central commissary inventory.',
    challenges: [
      'Kitchen bottlenecks and order errors during peak dining hours',
      'Uncontrolled ingredient wastage and inaccurate dish costing',
      'Disconnected outlet cash reconciliation and supplier invoices'
    ],
    solutions: [
      'Touchscreen POS with table management and instant KOT printing',
      'Recipe-level BOM stock deduction and wastage variance alerts',
      'Consolidated multi-outlet P&L and vendor payment tracking'
    ],
    recommendedServices: ['restaurant', 'erpnext', 'infrastructure'],
    seoTitle: 'Hospitality & Restaurant ERP Solutions | Aircom Technologies',
    seoDescription: 'Streamline POS billing, KOT routing, and food-cost inventory for restaurants and hotels.'
  },
  {
    slug: 'jewellery',
    name: 'Jewellery',
    icon: 'gem',
    image: 'assets/images/industry-jewellery.svg',
    shortDesc: 'Karat/purity tracking, daily metal rate sync, karigar ledgers, and barcode tagging.',
    overview: 'Built for jewellery retailers, wholesalers, and manufacturers requiring milligram-level metal accounting, stone valuation, HUID compliance, and karigar job-work traceability.',
    challenges: [
      'Complex pricing tied to fluctuating daily gold, silver, and stone rates',
      'Tracking raw metal issued to karigars vs. finished piece receipts',
      'High-value stock audits across multiple showroom counters'
    ],
    solutions: [
      'Central daily rate boards automatically updating showroom estimates',
      'Karigar issue/receipt ledgers with wastage and making-charge rules',
      'Barcode/RFID-assisted stock verification and GST-compliant invoicing'
    ],
    recommendedServices: ['jewellery', 'tally', 'biometric'],
    seoTitle: 'Jewellery ERP & Inventory Solutions | Aircom Technologies',
    seoDescription: 'Specialized jewellery ERP with purity tracking, daily metal rates, and karigar management.'
  },
  {
    slug: 'construction',
    name: 'Construction',
    icon: 'hard-hat',
    image: 'assets/images/industry-construction.svg',
    shortDesc: 'Project costing, BOQ budgets, site indents, RA billing, and subcontractor tracking.',
    overview: 'Keep complex infrastructure and real estate projects on schedule and under budget by connecting site engineers, procurement teams, subcontractors, and project finance in one platform.',
    challenges: [
      'Cost overruns caused by unmonitored site material purchases',
      'Delayed subcontractor RA bill verification and retention tracking',
      'Lack of real-time visibility into project-wise profitability'
    ],
    solutions: [
      'BOQ-linked material requisition and purchase budget controls',
      'Measurement book, RA billing, advance, and retention workflows',
      'Mobile biometric attendance and site-wise labor cost allocation'
    ],
    recommendedServices: ['jewellery', 'hrms', 'biometric'],
    seoTitle: 'Construction ERP & Project Costing Solutions | Aircom Technologies',
    seoDescription: 'BOQ management, site procurement, RA billing, and construction ERP solutions by Aircom Technologies.'
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: 'heart-pulse',
    image: 'assets/images/industry-healthcare.svg',
    shortDesc: 'Clinic & pharmacy inventory, biometric staff rosters, and reliable Wi-Fi/server uptime.',
    overview: 'Support clinics, diagnostic centers, and hospitals with resilient IT networks, compliant pharmacy/consumable batch expiry tracking, and shift-based biometric workforce attendance.',
    challenges: [
      'Expiry and batch control across pharmacy and medical consumables',
      'Complex 24/7 doctor, nursing, and technician shift scheduling',
      'Zero tolerance for network downtime across diagnostic equipment'
    ],
    solutions: [
      'FEFO batch & expiry inventory alerts with automated vendor reorders',
      'Biometric-synced 24/7 shift roster and payroll management',
      'Redundant enterprise Wi-Fi, VLAN isolation, and firewall protection'
    ],
    recommendedServices: ['infrastructure', 'hrms', 'cloud'],
    seoTitle: 'Healthcare IT Infrastructure & ERP Solutions | Aircom Technologies',
    seoDescription: 'Reliable IT infrastructure, pharmacy inventory, and shift HRMS solutions for healthcare providers.'
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: 'factory',
    image: 'assets/images/industry-manufacturing.svg',
    shortDesc: 'Multi-level BOM, work orders, shop-floor job cards, quality checks, and MRP.',
    overview: 'Digitize production planning from raw material procurement to finished goods dispatch. Gain real-time visibility into machine capacity, scrap rates, subcontracting, and unit production costs.',
    challenges: [
      'Raw material stockouts halting production lines',
      'Manual job-card tracking and inaccurate work-in-progress valuation',
      'Disconnected factory biometric attendance and production costing'
    ],
    solutions: [
      'Automated MRP based on sales forecasts and multi-level BOMs',
      'Work order routing, quality inspection gates, and scrap accounting',
      'Integrated factory floor biometric shifts and TallyPrime financials'
    ],
    recommendedServices: ['erpnext', 'biometric', 'infrastructure'],
    seoTitle: 'Manufacturing ERP & Shop-Floor Automation | Aircom Technologies',
    seoDescription: 'End-to-end manufacturing ERPNext solutions covering BOM, MRP, quality checks, and costing.'
  },
  {
    slug: 'finance',
    name: 'Finance',
    icon: 'landmark',
    image: 'assets/images/industry-finance.svg',
    shortDesc: 'Audit-ready accounting, TallyPrime sync, secure VPN infrastructure, and BI analytics.',
    overview: 'Equip financial services firms, NBFCs, and corporate finance teams with hardened network security, automated multi-entity consolidation, and audit-compliant ERP/TallyPrime workflows.',
    challenges: [
      'Strict data security, backup, and branch access compliance requirements',
      'Manual consolidation across multiple branches or group entities',
      'Slow turnaround on management MIS and audit trails'
    ],
    solutions: [
      'Hardened firewalls, encrypted branch VPNs, and immutable backups',
      'Automated multi-company accounting and TallyPrime reconciliation',
      'Executive financial dashboards with granular role permissions'
    ],
    recommendedServices: ['tally', 'cloud', 'crm'],
    seoTitle: 'Finance & Accounting IT & ERP Solutions | Aircom Technologies',
    seoDescription: 'Secure IT infrastructure, TallyPrime automation, and financial ERP solutions by Aircom Technologies.'
  },
  {
    slug: 'education',
    name: 'Education',
    icon: 'graduation-cap',
    image: 'assets/images/industry-education.svg',
    shortDesc: 'Campus Wi-Fi infrastructure, biometric attendance, fee accounting, and web portals.',
    overview: 'Modernize schools, colleges, and training institutes with high-density campus networking, automated staff/student attendance systems, fee management, and responsive institutional web portals.',
    challenges: [
      'Unreliable campus Wi-Fi across large classrooms and hostels',
      'Manual fee reconciliation and multi-department staff payroll',
      'Outdated student/parent communication and inquiry portals'
    ],
    solutions: [
      'High-density managed campus Wi-Fi with role-based bandwidth policies',
      'Biometric & RFID attendance integrated with HRMS and payroll',
      'Modern admissions portals and streamlined fee accounting'
    ],
    recommendedServices: ['infrastructure', 'hrms', 'web-development'],
    seoTitle: 'Education Campus IT & ERP Solutions | Aircom Technologies',
    seoDescription: 'Campus Wi-Fi, biometric attendance, HRMS, and institutional portals by Aircom Technologies.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'erpnext-vs-legacy-erp-growing-enterprises',
    title: 'Why Growing Enterprises Are Switching to ERPNext & Open-Source ERP Architecture',
    category: 'ERP & Automation',
    date: 'October 18, 2026',
    readTime: '5 min read',
    author: 'Aircom ERP Engineering Team',
    image: 'assets/images/service-erpnext.svg',
    excerpt: 'Discover how modular open-source ERP eliminates per-seat licensing bottlenecks while giving finance, inventory, and operations a unified real-time platform.',
    content: [
      'Growing organizations frequently outgrow spreadsheets and standalone accounting software long before they are ready for rigid, high-cost legacy ERP suites. Per-user licensing fees often discourage companies from onboarding warehouse staff, site engineers, and sales executives—creating the exact data silos ERP was meant to eliminate.',
      'ERPNext, built on the extensible Frappe framework, flips this model. Organizations get unified modules for accounting, inventory, buying, selling, manufacturing, and HRMS without punitive seat taxes—allowing every stakeholder to work from a single source of truth.',
      'At Aircom Technologies, our 17+ years of enterprise IT experience helps clients go beyond default setups: we tailor custom DocTypes, automate approvals, integrate TallyPrime and Zoho CRM, and host workloads on hardened cloud infrastructure with daily encrypted backups.'
    ],
    tags: ['ERPNext Implementation', 'Digital Transformation', 'Open Source ERP']
  },
  {
    slug: 'automating-tallyprime-with-erp-and-pos',
    title: 'Bridging Operations & Finance: Automating TallyPrime Voucher Sync Without Manual Re-Entry',
    category: 'Accounting Integration',
    date: 'October 04, 2026',
    readTime: '4 min read',
    author: 'Aircom Integration Practice',
    image: 'assets/images/service-tally.svg',
    excerpt: 'Learn how automated XML/API voucher synchronization and custom TDL extensions eliminate reconciliation errors between operational apps and TallyPrime.',
    content: [
      'In thousands of Indian and international enterprises, operations run on specialized ERP, POS, or e-commerce systems while chartered accountants and finance controllers rely on TallyPrime for statutory books and GST reporting.',
      'When teams export Excel sheets and manually re-key hundreds of invoices each week, delays and clerical errors become inevitable. Dual-entry bottlenecks also prevent management from seeing up-to-date receivables and cash positions.',
      'Our TallyPrime integration architecture validates customer masters, tax ledgers, HSN codes, and voucher numbering rules before automatically posting sales, purchase, credit note, and receipt entries—keeping both operational teams and finance auditors aligned.'
    ],
    tags: ['TallyPrime Integration', 'TDL Development', 'GST Automation']
  },
  {
    slug: 'biometric-attendance-sync-multi-branch-hrms',
    title: 'Real-Time Biometric & Facial Attendance Integration for Multi-Branch Payroll Accuracy',
    category: 'HRMS & Hardware',
    date: 'September 21, 2026',
    readTime: '4 min read',
    author: 'Aircom Systems & IoT Team',
    image: 'assets/images/service-biometric.svg',
    excerpt: 'How push-protocol biometric synchronization eliminates USB log exports, stops proxy attendance, and streamlines monthly payroll runs across branches.',
    content: [
      'Managing shift attendance across multiple warehouses, retail outlets, or construction sites often degrades into manual spreadsheet collection at month-end—delaying salary runs and causing disputes over overtime or late marks.',
      'By connecting ZKTeco, eSSL, or Hikvision fingerprint and facial recognition terminals over secure push protocols directly into HRMS, punch logs appear in central shift dashboards within seconds.',
      'Even when a remote branch experiences temporary internet loss, modern terminals buffer attendance punches locally and backfill automatically once connectivity returns—ensuring accurate, audit-ready payroll every month.'
    ],
    tags: ['Biometric Integration', 'HRMS Software', 'Payroll Automation']
  },
  {
    slug: 'hardening-enterprise-networks-and-cloud-backups',
    title: 'Enterprise IT Resilience Checklist: Firewalls, Branch VPNs, and Ransomware-Proof Backups',
    category: 'Infrastructure & Cloud',
    date: 'September 08, 2026',
    readTime: '6 min read',
    author: 'Aircom Cloud & Network Architects',
    image: 'assets/images/service-infrastructure.svg',
    excerpt: 'Practical infrastructure safeguards every multi-branch organization needs—from VLAN segmentation and dual-ISP failover to automated off-site cloud snapshots.',
    content: [
      'Enterprise software is only as reliable as the network and server infrastructure beneath it. An unsegmented office LAN, single ISP dependency, or unverified local backup can halt billing and operations across an entire organization.',
      'We recommend a four-layer resilience model: next-generation UTM firewalls with dual-WAN automatic failover, VLAN separation for guest Wi-Fi and IoT/CCTV devices, encrypted site-to-site VPNs connecting branches, and automated off-site immutable cloud backups tested through regular restore drills.',
      'Through Aircom Managed IT AMC services, organizations gain continuous uptime monitoring, timely patching, and rapid L1–L3 escalation support.'
    ],
    tags: ['IT Infrastructure', 'Cloud Hosting', 'Cybersecurity']
  }
];

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', route: '/' },
  { label: 'About Us', route: '/about' },
  {
    label: 'Services',
    route: '/services',
    children: SERVICES_DATA.map((s) => ({
      label: s.title,
      route: `/services/${s.slug}`,
      description: s.shortDesc,
      icon: s.icon
    }))
  },
  {
    label: 'Industries',
    route: '/industries',
    children: INDUSTRIES_DATA.map((i) => ({
      label: i.name,
      route: `/industries/${i.slug}`,
      description: i.shortDesc,
      icon: i.icon
    }))
  },
  {
    label: 'Products',
    route: '/products',
    children: PRODUCTS_DATA.map((p) => ({
      label: p.title,
      route: `/products/${p.slug}`,
      description: p.shortDesc,
      icon: p.icon
    }))
  },
  { label: 'Blog', route: '/blog' },
  { label: 'Contact Us', route: '/contact' }
];
