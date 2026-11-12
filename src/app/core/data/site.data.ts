import {
  BlogPost,
  ContactInfo,
  HeroSliderConfig,
  IndustryItem,
  NavItem,
  PartnerItem,
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
  address: 'Plot No.12, Simhadri Nagar Colony, Near PBDAV School, Hyderabad, Telangana, India',
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

export const HERO_SLIDER_DEFAULT: HeroSliderConfig = {
  autoplayEnabled: true,
  autoplayDurationSec: 5,
  slides: [
    {
      id: 'slide-1',
      eyebrow: 'INNOVATIVE • SCALABLE • RELIABLE',
      title: 'Enterprise Technology Solutions for a',
      titleHighlight: 'Smarter Tomorrow',
      description:
        'At Aircom Technologies, we deliver cutting-edge ERPNext solutions, IT infrastructure, enterprise integrations, and digital services trusted by growing businesses since 2009.',
      primaryCtaText: 'Explore Our Solutions',
      primaryCtaHref: '/services',
      secondaryCtaText: 'Contact Us',
      secondaryCtaHref: '/contact',
      image: 'assets/images/hero-slide-1-cloud.png',
      mobileImage: 'assets/images/hero-slide-1-cloud.png',
      enabled: true,
      order: 1
    },
    {
      id: 'slide-2',
      eyebrow: 'ERPNEXT & BUSINESS MANAGEMENT',
      title: 'Unified ERPNext &',
      titleHighlight: 'Enterprise Operations',
      description:
        'Streamline multi-branch accounting, batch-tracked inventory, procurement, manufacturing BOMs, and HRMS on an extensible open-source ERP platform with zero per-seat bottlenecks.',
      primaryCtaText: 'Discover ERP Solutions',
      primaryCtaHref: '/services/erpnext',
      secondaryCtaText: 'Request ERP Demo',
      secondaryCtaHref: '/contact',
      image: 'assets/images/hero-slide-2.png',
      mobileImage: 'assets/images/hero-slide-2.png',
      enabled: true,
      order: 2
    },
    {
      id: 'slide-3',
      eyebrow: 'TALLYPRIME & WORKFLOW AUTOMATION',
      title: 'Automated TallyPrime &',
      titleHighlight: 'Business Integration',
      description:
        'Eliminate manual voucher re-entry with real-time two-way XML/API connectors, custom TDL extensions, Zoho/Salesforce CRM sync, and push-protocol biometric attendance.',
      primaryCtaText: 'Learn More',
      primaryCtaHref: '/services/tally',
      secondaryCtaText: 'View Integrations',
      secondaryCtaHref: '/services/crm',
      image: 'assets/images/hero-slide-3.png',
      mobileImage: 'assets/images/hero-slide-3.png',
      enabled: true,
      order: 3
    },
    {
      id: 'slide-4',
      eyebrow: 'IT INFRASTRUCTURE & DIGITAL TRANSFORMATION',
      title: 'Resilient Cloud, Security &',
      titleHighlight: 'Digital Portals',
      description:
        'Hardened enterprise firewalls, encrypted branch VPNs, managed cloud ERP hosting with automated backups, B2B self-service web portals, and proactive L1–L3 IT AMC support.',
      primaryCtaText: 'Contact Our Team',
      primaryCtaHref: '/contact',
      secondaryCtaText: 'Explore Cloud & IT',
      secondaryCtaHref: '/services/infrastructure',
      image: 'assets/images/hero-slide-4.jpg',
      mobileImage: 'assets/images/hero-slide-4.jpg',
      enabled: true,
      order: 4
    },
    {
      id: 'slide-5',
      eyebrow: 'BIOMETRIC ATTENDANCE & HRMS',
      title: 'Smart Workforce, Payroll &',
      titleHighlight: 'Access Control',
      description:
        'Real-time push-protocol biometric & facial attendance devices synced directly with shift rosters, leave policies, compliance, and automated monthly payroll processing.',
      primaryCtaText: 'Explore Biometric & HRMS',
      primaryCtaHref: '/services/biometric',
      secondaryCtaText: 'View HRMS Suite',
      secondaryCtaHref: '/services/hrms',
      image: 'assets/images/hero-slide-5-biometric.png',
      mobileImage: 'assets/images/hero-slide-5-biometric.png',
      enabled: true,
      order: 5
    },
    {
      id: 'slide-6',
      eyebrow: 'INDUSTRY-TAILORED DIGITAL GROWTH',
      title: 'Connected Cloud, Retail &',
      titleHighlight: 'Industry Solutions',
      description:
        'Purpose-built software stacks for retail POS, manufacturing, jewellery, healthcare, hospitality, and multi-location enterprises with dedicated onboarding and 24/7 support.',
      primaryCtaText: 'Explore Industries',
      primaryCtaHref: '/industries',
      secondaryCtaText: 'Get a Quote',
      secondaryCtaHref: '/contact',
      image: 'assets/images/hero-desktop.png',
      mobileImage: 'assets/images/hero-mobile.png',
      enabled: true,
      order: 6
    }
  ]
};

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
  image: 'assets/images/about-hq.png'
};

export const ABOUT_PILLARS = [
  {
    key: 'vision',
    title: 'Our Vision',
    icon: 'eye',
    accent: '#102A63',
    image: 'assets/images/pillar-vision.png',
    subtitle: 'Global Digital Transformation Partner',
    summary:
      'To become a trusted global technology partner through innovative IT infrastructure, enterprise software, and digital transformation.',
    highlights: ['Enterprise ERP Leadership', 'Hybrid Cloud Readiness', 'Long-Term Client Trust'],
    details: [
      { heading: 'Unified Technology Stack', text: 'Connecting ERPNext, TallyPrime, CRM, and biometric hardware seamlessly across branches.' },
      { heading: 'Cross-Border Footprint', text: 'Supporting growing organizations across India, Malaysia, Tanzania, and global operations.' }
    ]
  },
  {
    key: 'mission',
    title: 'Our Mission',
    icon: 'rocket',
    accent: '#2457A7',
    image: 'assets/images/pillar-mission.png',
    subtitle: 'Reliable, Scalable & Customized Solutions',
    summary:
      'To provide cost-effective, reliable, scalable, and customized technology solutions tailored around real operational workflows.',
    highlights: ['Process-First Engineering', 'Transparent Delivery', 'Zero Vendor Lock-In'],
    details: [
      { heading: 'Custom Fit Architecture', text: 'We adapt software workflows to your business rules instead of forcing rigid templates.' },
      { heading: 'Predictable Ownership', text: 'Open-source ERP foundations paired with documented infrastructure and responsive SLAs.' }
    ]
  },
  {
    key: 'values',
    title: 'Our Core Values',
    icon: 'gem',
    accent: '#0BA8EA',
    image: 'assets/images/pillar-values.png',
    subtitle: '8 Principles Guiding Every Engagement',
    summary:
      'Customer Satisfaction, Innovation, Quality, Integrity, Technical Excellence, Teamwork, Continuous Improvement, and On-Time Delivery.',
    highlights: ['Customer Satisfaction', 'Innovation & Quality', 'Integrity & On-Time Delivery'],
    details: [
      { heading: 'Engineering Accountability', text: 'Every deployment includes validation checkpoints, backup drills, and user training.' },
      { heading: 'Continuous Improvement', text: 'Proactive performance audits, security patching, and workflow optimization after go-live.' }
    ]
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Innovative Solutions',
    description: 'Stay ahead with cutting-edge ERPNext, cloud, API automation, and AI-ready enterprise technology stacks.',
    icon: 'cpu',
    accent: '#0BA8EA',
    image: 'assets/images/why-innovative.png',
    subtitle: 'Modern Enterprise Engineering & Automation',
    highlights: ['Custom Frappe & ERPNext Apps', 'Automated TallyPrime & CRM Sync', 'Cloud-Native DevOps'],
    details: [
      { heading: 'Tailored Workflows', text: 'Custom DocTypes, automated approval chains, and bespoke MIS dashboards built for your industry.' },
      { heading: 'API-First Integration', text: 'Connect Zoho, Salesforce, e-commerce, and biometric terminals with zero manual CSV re-entry.' }
    ]
  },
  {
    title: 'Trusted Partner',
    description: 'Over 17 years of proven integrity, transparent delivery, and long-term client relationships since 2009.',
    icon: 'handshake',
    accent: '#2457A7',
    image: 'assets/images/why-trusted.png',
    subtitle: 'Proven Track Record Since 2009',
    highlights: ['Established in 2009', 'Documented Architectures', 'Verified Data Migrations'],
    details: [
      { heading: 'Single Accountable Team', text: 'One partner uniting software engineers, ERP consultants, and network infrastructure specialists.' },
      { heading: 'Audit-Ready Delivery', text: 'Clear project milestones, reconciled opening balances, and full admin handover documentation.' }
    ]
  },
  {
    title: 'Expert Support',
    description: 'Dedicated technical engineering and managed AMC support whenever your operations need assistance.',
    icon: 'headphones',
    accent: '#F59E0B',
    image: 'assets/images/why-support.png',
    subtitle: 'Proactive Managed IT & ERP Care',
    highlights: ['L1–L3 Engineering Desk', '24/7 Server & Uptime Alerts', 'Comprehensive IT AMC'],
    details: [
      { heading: 'Rapid Response SLAs', text: 'Direct escalation to engineers familiar with your ERP configuration, firewall, and server topology.' },
      { heading: 'Preventive Maintenance', text: 'Automated daily off-site backups, OS patching, and periodic restore verification drills.' }
    ]
  },
  {
    title: 'Business Growth',
    description: 'Achieve measurable efficiency and scale seamlessly across locations with future-proof architecture.',
    icon: 'trending-up',
    accent: '#102A63',
    image: 'assets/images/why-growth.png',
    subtitle: 'Multi-Branch Scalability Without Friction',
    highlights: ['Multi-Company Consolidation', 'Real-Time Executive KPIs', 'Resilient Branch VPNs'],
    details: [
      { heading: 'Multi-Site Expansion', text: 'Onboard new outlets, factories, or offices smoothly under one unified ledger and network policy.' },
      { heading: 'Data-Driven Decisions', text: 'Live inventory aging, cash-flow forecasting, and branch profitability dashboards.' }
    ]
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
    heroImage: 'assets/images/service-erpnext.png',
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
    heroImage: 'assets/images/service-hrms.png',
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
    heroImage: 'assets/images/service-biometric.png',
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
    heroImage: 'assets/images/service-crm.png',
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
    heroImage: 'assets/images/service-tally.png',
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
    heroImage: 'assets/images/service-restaurant.png',
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
    heroImage: 'assets/images/service-jewellery.png',
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
    heroImage: 'assets/images/service-infrastructure.png',
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
    heroImage: 'assets/images/service-cloud.png',
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
    heroImage: 'assets/images/service-web.png',
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
    image: 'assets/images/product-cloud-erp.png',
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
    image: 'assets/images/product-analytics.png',
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
    image: 'assets/images/product-security.png',
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
    image: 'assets/images/product-automation.png',
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
    image: 'assets/images/product-it-support.png',
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
    image: 'assets/images/industry-retail.png',
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
    image: 'assets/images/industry-hospitality.png',
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
    image: 'assets/images/industry-jewellery.png',
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
    image: 'assets/images/industry-construction.png',
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
    image: 'assets/images/industry-healthcare.png',
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
    image: 'assets/images/industry-manufacturing.png',
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
    image: 'assets/images/industry-finance.png',
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
    image: 'assets/images/industry-education.png',
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
    readTime: '7 min read',
    author: 'Aircom ERP Engineering Team',
    image: 'assets/images/service-erpnext.png',
    heroImage: 'assets/images/service-erpnext.png',
    excerpt: 'Discover how modular open-source ERP eliminates per-seat licensing bottlenecks while giving finance, inventory, and operations a unified real-time platform.',
    content: [
      'Growing organizations frequently outgrow spreadsheets and standalone accounting software long before they are ready for rigid, high-cost legacy ERP suites. Per-user licensing fees often discourage companies from onboarding warehouse staff, site engineers, and sales executives—creating the exact data silos ERP was meant to eliminate.',
      'Legacy proprietary platforms also impose steep annual maintenance renewals, expensive customization retainers, and closed-source database constraints that slow down operational agility. Whenever a business adds a new warehouse, branch, or product vertical, software costs escalate disproportionately to team headcount.',
      'ERPNext, built on the extensible Frappe framework, flips this model completely. Organizations receive unified, production-grade modules for multi-company accounting, batch-tracked inventory, procurement, manufacturing BOMs, CRM, and HRMS without punitive seat taxes—allowing every stakeholder to work from a single source of truth.',
      'From automated GST e-invoicing and multi-warehouse stock transfers to mobile field approvals and barcode picking, teams operate in real time across locations. Role-based permission matrices keep sensitive financial ledgers secure while giving floor supervisors instant visibility into job cards and material requests.',
      'Migration does not have to disrupt daily operations. A structured phased rollout—starting with chart-of-accounts mapping, opening stock validation, master data cleansing, and parallel runs—ensures zero downtime during cutover.',
      'At Aircom Technologies, our 17+ years of enterprise IT experience helps clients go far beyond default setups: we tailor custom DocTypes, automate approval matrices, integrate TallyPrime and Zoho CRM, and host workloads on hardened cloud infrastructure with daily encrypted backups.'
    ],
    tags: ['ERPNext Implementation', 'Digital Transformation', 'Open Source ERP']
  },
  {
    slug: 'automating-tallyprime-with-erp-and-pos',
    title: 'Bridging Operations & Finance: Automating TallyPrime Voucher Sync Without Manual Re-Entry',
    category: 'Accounting Integration',
    date: 'October 04, 2026',
    readTime: '6 min read',
    author: 'Aircom Integration Practice',
    image: 'assets/images/service-tally.png',
    heroImage: 'assets/images/service-tally.png',
    excerpt: 'Learn how automated XML/API voucher synchronization and custom TDL extensions eliminate reconciliation errors between operational apps and TallyPrime.',
    content: [
      'In thousands of Indian and international enterprises, day-to-day operations run on specialized ERP, POS, or e-commerce systems while chartered accountants and finance controllers rely on TallyPrime for statutory books and GST reporting.',
      'When teams export Excel sheets and manually re-key hundreds of invoices, debit notes, and payment receipts each week, delays and clerical errors become inevitable. Dual-entry bottlenecks also prevent management from seeing up-to-date receivables, aged payables, and real-time cash positions.',
      'Manual reconciliation at month-end wastes dozens of skilled accounting hours hunting down mismatched tax ledgers, rounded-off paise discrepancies, or duplicate supplier names across operational and financial tools.',
      'Our TallyPrime integration architecture solves this using bidirectional XML/HTTP API connectors and tailored Tally Definition Language (TDL) extensions. Every sales invoice, purchase bill, credit note, and receipt generated in ERPNext, custom web portals, or retail POS terminals is queued and validated automatically.',
      'Before posting any voucher to TallyPrime, our middleware verifies customer masters, GSTIN numbers, HSN/SAC codes, cost centers, and voucher numbering rules—eliminating broken imports and guaranteeing audit compliance.',
      'With scheduled or instant push-sync triggers, comprehensive sync audit logs, and automated retry queues, both operational teams and finance auditors remain 100% aligned without touching manual spreadsheets.'
    ],
    tags: ['TallyPrime Integration', 'TDL Development', 'GST Automation']
  },
  {
    slug: 'biometric-attendance-sync-multi-branch-hrms',
    title: 'Real-Time Biometric & Facial Attendance Integration for Multi-Branch Payroll Accuracy',
    category: 'HRMS & Hardware',
    date: 'September 21, 2026',
    readTime: '6 min read',
    author: 'Aircom Systems & IoT Team',
    image: 'assets/images/service-biometric.png',
    heroImage: 'assets/images/service-biometric.png',
    excerpt: 'How push-protocol biometric synchronization eliminates USB log exports, stops proxy attendance, and streamlines monthly payroll runs across branches.',
    content: [
      'Managing shift attendance across multiple warehouses, retail outlets, factories, or construction sites often degrades into manual USB pen-drive exports and spreadsheet consolidation at month-end—delaying salary runs and causing frequent disputes over overtime or late marks.',
      'Traditional polling utilities installed on a single local PC fail whenever the local computer is turned off or loses VPN connectivity, creating blind spots in HR visibility across regional branches.',
      'By connecting ZKTeco, eSSL, or Hikvision fingerprint and AI facial recognition terminals over secure cloud push protocols directly into HRMS and ERPNext, employee punch logs appear in central shift dashboards within seconds.',
      'Automated attendance rules immediately classify first-in/last-out punches, rotational night shifts, grace periods, half-day deductions, and overtime slabs—eliminating manual attendance registers altogether.',
      'Even when a remote construction site or retail store experiences temporary internet loss, enterprise biometric terminals buffer tens of thousands of attendance punches locally and backfill automatically once connectivity returns.',
      'The result is a transparent, tamper-proof HR pipeline where leave balances, geo-fenced mobile check-ins for field teams, and biometric terminal logs feed directly into one-click payroll and statutory PF/ESI/PT compliance.'
    ],
    tags: ['Biometric Integration', 'HRMS Software', 'Payroll Automation']
  },
  {
    slug: 'hardening-enterprise-networks-and-cloud-backups',
    title: 'Enterprise IT Resilience Checklist: Firewalls, Branch VPNs, and Ransomware-Proof Backups',
    category: 'Infrastructure & Cloud',
    date: 'September 08, 2026',
    readTime: '7 min read',
    author: 'Aircom Cloud & Network Architects',
    image: 'assets/images/service-infrastructure.png',
    heroImage: 'assets/images/service-infrastructure.png',
    excerpt: 'Practical infrastructure safeguards every multi-branch organization needs—from VLAN segmentation and dual-ISP failover to automated off-site cloud snapshots.',
    content: [
      'Enterprise software is only as reliable as the network, server, and security infrastructure beneath it. An unsegmented office LAN, single ISP dependency, or unverified local backup can halt billing, ERP workflows, and customer service across an entire organization.',
      'Many growing companies discover backup failures only after an unexpected hardware crash, power surge, or ransomware incident—when critical financial databases and project files are already at risk.',
      'We recommend a four-layer resilience architecture starting at the perimeter: next-generation UTM firewalls (Fortinet, Sophos, or SonicWall) configured with dual-WAN automatic ISP failover so branch billing and cloud ERP connections never drop.',
      'Inside the office network, strict VLAN segmentation isolates guest Wi-Fi, CCTV/IoT cameras, VoIP phones, and corporate ERP workstations—preventing lateral movement if an endpoint is compromised.',
      'Encrypted IPsec or WireGuard site-to-site VPN tunnels connect head offices, factories, and regional warehouses seamlessly, while the 3-2-1 backup strategy ensures daily automated snapshots are replicated to immutable off-site cloud storage.',
      'Through Aircom Managed IT AMC services, organizations gain continuous uptime monitoring, proactive server patching, quarterly restore verification drills, and rapid L1–L3 engineering escalation support.'
    ],
    tags: ['IT Infrastructure', 'Cloud Hosting', 'Cybersecurity']
  },
  {
    slug: 'crm-erp-integration-sales-pipeline-automation',
    title: 'Connecting Sales & Delivery: Why CRM-to-ERP Integration Eliminates Revenue Leakage',
    category: 'CRM & Sales Ops',
    date: 'August 24, 2026',
    readTime: '6 min read',
    author: 'Aircom CRM & Automation Team',
    image: 'assets/images/service-crm.png',
    heroImage: 'assets/images/service-crm.png',
    excerpt: 'Unifying Salesforce, Zoho CRM, and WhatsApp lead capture with ERPNext inventory and billing ensures zero lost leads and faster order fulfillment.',
    content: [
      'When sales executives track leads in spreadsheets or a disconnected CRM while operations teams manage stock and invoicing inside an ERP, vital customer commitments frequently fall through the cracks during handover.',
      'Sales representatives often quote items without checking live warehouse availability or pending customer credit limits—leading to delayed dispatches, margin erosion, and frustrated clients.',
      'By integrating Zoho CRM, Salesforce, or Frappe CRM directly with ERPNext and TallyPrime, every won deal converts automatically into a validated Sales Order complete with accurate pricing tiers, tax rules, and delivery schedules.',
      'Lead capture pipelines from website contact forms, WhatsApp Business APIs, and inbound phone calls are routed instantaneously to the right regional sales manager with automated follow-up reminders and SLA escalation alerts.',
      'Inside the CRM view, account managers can inspect live ERP stock levels, recent dispatch tracking numbers, and overdue invoice balances before picking up the phone with a client.',
      'Aircom Technologies builds clean, fault-tolerant REST webhook integrations that unify marketing attribution, pipeline forecasting, and post-sales billing into a seamless revenue engine.'
    ],
    tags: ['CRM Integration', 'Sales Automation', 'WhatsApp API']
  },
  {
    slug: 'enterprise-web-portals-customer-self-service',
    title: 'Modern B2B Client & Vendor Portals: Automating Orders, Tickets & Invoices Online',
    category: 'Web & Portals',
    date: 'August 10, 2026',
    readTime: '6 min read',
    author: 'Aircom Digital & Web Practice',
    image: 'assets/images/service-web.png',
    heroImage: 'assets/images/service-web.png',
    excerpt: 'Empower distributors, dealers, and enterprise clients with 24/7 self-service portals connected directly to live ERP pricing, inventory, and statements.',
    content: [
      'High-growth B2B distributors, manufacturers, and service providers spend enormous support bandwidth answering routine phone calls and WhatsApp messages asking for ledger statements, invoice PDFs, order dispatch statuses, and price lists.',
      'Replacing repetitive manual requests with a fast, mobile-responsive B2B Customer & Vendor Self-Service Portal dramatically lowers administrative overhead while improving partner satisfaction.',
      'Built on modern Angular and cloud-native APIs synchronized directly with ERPNext or TallyPrime, authenticated dealers can log in anytime to browse contract-specific catalog pricing, check real-time stock, and place bulk repeat orders in seconds.',
      'Vendors gain dedicated portal views to submit RFQs, upload GST invoices, track goods receipt notes (GRNs), and monitor upcoming payment schedules without calling accounts payable.',
      'Integrated support ticketing, automated email/WhatsApp order notifications, and digital payment gateway links shorten invoice collection cycles and keep every stakeholder informed automatically.',
      'Whether you need a high-converting corporate website, an interactive distributor portal, or a custom operational web application, Aircom Technologies engineers fast, SEO-ready platforms built to scale.'
    ],
    tags: ['Web Portals', 'B2B E-Commerce', 'Angular Development']
  }
];

export const PARTNERS_DATA: PartnerItem[] = [
  {
    slug: 'frappe-erpnext',
    name: 'Frappe / ERPNext',
    tier: 'Official Implementation Partner',
    category: 'ERP & Accounting',
    tagline: 'Open-Source Enterprise ERP & Custom App Engineering',
    shortDesc: 'End-to-end ERPNext rollouts, custom Frappe DocTypes, multi-branch accounting, manufacturing BOMs, and HRMS deployment.',
    overview:
      'Aircom Technologies partners with the Frappe/ERPNext ecosystem to build zero-seat-tax, scalable ERP architectures tailored to Indian GST laws and global multi-company workflows.',
    image: 'assets/images/service-erpnext.png',
    highlights: ['Custom Frappe Development', 'Multi-Branch Rollout', 'Zero Per-User License Tax'],
    accent: '#0BA8EA'
  },
  {
    slug: 'tally-solutions',
    name: 'Tally Solutions (TallyPrime)',
    tier: 'Authorized Integration & TDL Partner',
    category: 'ERP & Accounting',
    tagline: 'Automated TallyPrime Voucher Sync & Custom TDL Add-ons',
    shortDesc: 'Seamless two-way XML/API connectors bridging TallyPrime accounting with ERPNext, web portals, and retail POS systems.',
    overview:
      'We empower finance teams and Chartered Accountants with automated sales/purchase voucher posting, HSN/GST validation, and bespoke Tally Definition Language extensions.',
    image: 'assets/images/service-tally.png',
    highlights: ['Two-Way Tally Sync', 'Custom TDL Reports', 'GST & E-Invoice Compliance'],
    accent: '#2457A7'
  },
  {
    slug: 'zoho-corporation',
    name: 'Zoho (CRM, Books & Desk)',
    tier: 'Authorized Solution Partner',
    category: 'CRM & Cloud',
    tagline: 'Zoho Suite Configuration & ERP API Connectors',
    shortDesc: 'Full implementation and bi-directional API synchronization across Zoho CRM, Zoho Books, Zoho Desk, and ERPNext.',
    overview:
      'Unify sales lead pipelines, customer support tickets, and backend warehouse/billing operations through fault-tolerant Zoho integration workflows.',
    image: 'assets/images/service-crm.png',
    highlights: ['Zoho CRM Automation', 'Zoho Books Sync', 'Omnichannel Lead Capture'],
    accent: '#F59E0B'
  },
  {
    slug: 'salesforce',
    name: 'Salesforce Enterprise CRM',
    tier: 'Technology Integration Partner',
    category: 'CRM & Cloud',
    tagline: 'Enterprise Sales Pipeline & Order Synchronization',
    shortDesc: 'Connect Salesforce opportunity pipelines directly to ERP inventory, credit limits, and automated invoicing.',
    overview:
      'Bridge front-office enterprise CRM forecasting with back-office fulfillment so every closed deal converts cleanly into a verified Sales Order.',
    image: 'assets/images/product-automation.png',
    highlights: ['Salesforce REST APIs', 'Lead-to-Cash Sync', 'Live Stock Visibility'],
    accent: '#0BA8EA'
  },
  {
    slug: 'amazon-web-services',
    name: 'Amazon Web Services (AWS)',
    tier: 'Cloud Infrastructure Partner',
    category: 'CRM & Cloud',
    tagline: 'High-Availability Cloud Hosting & Encrypted Backups',
    shortDesc: 'Managed EC2, RDS, S3 immutable backup vaults, and auto-scaling cloud architecture for ERPNext & enterprise portals.',
    overview:
      'Run mission-critical ERP and web workloads on hardened AWS clusters monitored 24/7 with automated off-site snapshot verification.',
    image: 'assets/images/service-cloud.png',
    highlights: ['99.9% Uptime SLA', 'Automated S3 Snapshots', 'Hardened VPC Security'],
    accent: '#F59E0B'
  },
  {
    slug: 'microsoft-azure-365',
    name: 'Microsoft Azure & Microsoft 365',
    tier: 'Authorized Cloud & Licensing Reseller',
    category: 'CRM & Cloud',
    tagline: 'Enterprise Cloud Workloads, Entra ID & M365 Suites',
    shortDesc: 'Authorized licensing, cloud server deployment, Azure AD SSO integration, and enterprise email security across branches.',
    overview:
      'Simplify Microsoft 365 procurement, SharePoint collaboration, and Azure hybrid server hosting backed by Aircom L1–L3 engineering support.',
    image: 'assets/images/product-cloud-erp.png',
    highlights: ['Authorized M365 Reseller', 'Azure Hybrid Cloud', 'Single Sign-On & Security'],
    accent: '#2457A7'
  },
  {
    slug: 'zkteco-biometrics',
    name: 'ZKTeco India',
    tier: 'Authorized Hardware Reseller',
    category: 'Biometrics & Security',
    tagline: 'Fingerprint, RFID & AI Facial Attendance Terminals',
    shortDesc: 'Supply, installation, and real-time cloud push-protocol integration of ZKTeco biometric devices directly into HRMS.',
    overview:
      'Eliminate manual USB exports and proxy attendance with multi-branch ZKTeco devices synchronized instantaneously to shift & payroll rules.',
    image: 'assets/images/service-biometric.png',
    highlights: ['Authorized ZKTeco Stock', 'Cloud Push Sync', 'Multi-Branch Payroll Sync'],
    accent: '#102A63'
  },
  {
    slug: 'essl-security',
    name: 'eSSL Security',
    tier: 'Authorized Reseller & Integrator',
    category: 'Biometrics & Security',
    tagline: 'Time Attendance, Access Control & Turnstile Systems',
    shortDesc: 'Enterprise biometric hardware, door access controllers, and automated ADMS server attendance integration.',
    overview:
      'Equip factories, warehouses, and offices with dependable eSSL biometric hardware backed by on-site installation and AMC maintenance.',
    image: 'assets/images/service-hrms.png',
    highlights: ['ADMS Real-Time Push', 'Door Access Control', 'Factory & Site Rollouts'],
    accent: '#2457A7'
  },
  {
    slug: 'hikvision-surveillance',
    name: 'Hikvision Enterprise Security',
    tier: 'Authorized Reseller & Systems Integrator',
    category: 'Biometrics & Security',
    tagline: 'AI Facial Terminals, IP CCTV & Command Monitoring',
    shortDesc: 'High-definition IP surveillance, NVR storage architecture, and facial recognition attendance & gate security.',
    overview:
      'Protect showrooms, warehouses, and manufacturing floors with structured CCTV networking, remote mobile viewing, and AI access terminals.',
    image: 'assets/images/product-security.png',
    highlights: ['AI Facial Recognition', 'IP CCTV & NVR Setup', 'VLAN Isolated Security'],
    accent: '#0BA8EA'
  },
  {
    slug: 'fortinet-sophos',
    name: 'Fortinet & Sophos Cybersecurity',
    tier: 'Authorized Firewall & Security Reseller',
    category: 'IT Infrastructure',
    tagline: 'Next-Gen UTM Firewalls, Dual-WAN Failover & Branch VPNs',
    shortDesc: 'Authorized firewall hardware licensing, IPS/IDS threat protection, and encrypted site-to-site VPNs across offices.',
    overview:
      'Keep multi-branch ERP billing and internal servers resilient against ransomware and ISP outages with dual-WAN enterprise firewall policies.',
    image: 'assets/images/service-infrastructure.png',
    highlights: ['UTM Firewall Appliances', 'Site-to-Site Branch VPN', 'Dual-ISP Auto Failover'],
    accent: '#102A63'
  },
  {
    slug: 'dell-hpe-infrastructure',
    name: 'Dell Technologies & HPE',
    tier: 'Authorized Hardware Reseller',
    category: 'IT Infrastructure',
    tagline: 'Enterprise Rack Servers, Switches & Workstations',
    shortDesc: 'On-premise servers, RAID storage arrays, structured Cat6A/Fiber switching, and corporate desktop fleets.',
    overview:
      'Full lifecycle hardware procurement, rack assembly, virtualization setup, and proactive annual maintenance contracts (AMC).',
    image: 'assets/images/product-it-support.png',
    highlights: ['Authorized Server Reseller', 'Virtualization & RAID', 'Comprehensive IT AMC'],
    accent: '#2457A7'
  },
  {
    slug: 'shopify-woocommerce',
    name: 'Shopify & WooCommerce',
    tier: 'Omnichannel Sync Partner',
    category: 'ERP & Accounting',
    tagline: 'Live E-Commerce Stock, Orders & GST Invoice Sync',
    shortDesc: 'Connect D2C storefronts directly with ERPNext warehouses and TallyPrime accounting for real-time order fulfillment.',
    overview:
      'Eliminate overselling and manual order entry by syncing web orders, customer ledgers, and dispatch statuses automatically.',
    image: 'assets/images/industry-retail.png',
    highlights: ['Real-Time Stock Sync', 'Automated Order Pull', 'D2C & B2B Storefronts'],
    accent: '#F59E0B'
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
    label: 'Products',
    route: '/products',
    children: PRODUCTS_DATA.map((p) => ({
      label: p.title,
      route: `/products/${p.slug}`,
      description: p.shortDesc,
      icon: p.icon
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
  { label: 'Partners', route: '/partners' },
  { label: 'Blog', route: '/blog' },
  { label: 'Contact Us', route: '/contact' }
];
