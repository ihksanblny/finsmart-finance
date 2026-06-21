export interface TaxonomySkill {
  name: string;
  subSkills: string[];
  prerequisites?: string[];
}

export interface SkillTaxonomy {
  goldenSkills: TaxonomySkill[];
  baselineSkills: TaxonomySkill[];
}

export const skillsTaxonomy: Record<string, SkillTaxonomy> = {
  // --- DATA ---
  "data-analyst": {
    goldenSkills: [
      { name: "Python / R", subSkills: ["Pandas", "NumPy"], prerequisites: ["Basic SQL", "Pivot Tables"] },
      { name: "Advanced SQL", subSkills: ["Window Functions", "CTEs"], prerequisites: ["Basic SQL"] },
      { name: "Data Warehousing", subSkills: ["BigQuery", "Snowflake"], prerequisites: ["Tableau"] }
    ],
    baselineSkills: [
      { name: "Data Visualization", subSkills: ["Tableau", "PowerBI"] },
      { name: "Microsoft Excel", subSkills: ["Pivot Tables", "VLOOKUP"] },
      { name: "Core DB", subSkills: ["Basic SQL", "Data Cleansing"] }
    ]
  },
  "data-scientist": {
    goldenSkills: [
      { name: "Deep Learning", subSkills: ["TensorFlow", "PyTorch"], prerequisites: ["Python", "Linear Algebra"] },
      { name: "MLOps", subSkills: ["Docker", "MLflow"], prerequisites: ["Python"] },
      { name: "Big Data", subSkills: ["Spark", "Kafka"], prerequisites: ["PostgreSQL"] }
    ],
    baselineSkills: [
      { name: "Programming", subSkills: ["Python", "Scipy"] },
      { name: "Database", subSkills: ["PostgreSQL", "MySQL"] },
      { name: "Math Foundation", subSkills: ["Linear Algebra", "Calculus"] }
    ]
  },
  "data-entry": {
    goldenSkills: [
      { name: "Process Automation", subSkills: ["Zapier", "VBA Macros"], prerequisites: ["Excel"] },
      { name: "Database Querying", subSkills: ["Access", "SQL Select"], prerequisites: ["Word", "Excel"] }
    ],
    baselineSkills: [
      { name: "Fast Typing", subSkills: ["Touch Typing > 80 WPM"] },
      { name: "Microsoft Office", subSkills: ["Word", "Excel"] },
      { name: "Accuracy", subSkills: ["Data Validation", "Proofreading"] }
    ]
  },

  // --- ENGINEERING ---
  "software-engineer": {
    goldenSkills: [
      { name: "System Architecture", subSkills: ["Microservices", "Event-Driven"], prerequisites: ["SOLID", "Git"] },
      { name: "Cloud Computing", subSkills: ["AWS", "GCP"], prerequisites: ["Relational (SQL)"] },
      { name: "CI/CD Pipeline", subSkills: ["GitHub Actions", "Terraform"], prerequisites: ["Git"] }
    ],
    baselineSkills: [
      { name: "OOP & Clean Code", subSkills: ["SOLID", "DRY"] },
      { name: "Version Control", subSkills: ["Git", "GitHub/GitLab"] },
      { name: "Databases", subSkills: ["Relational (SQL)", "NoSQL (MongoDB)"] }
    ]
  },
  "frontend-engineer": {
    goldenSkills: [
      { name: "Web Performance", subSkills: ["Core Web Vitals", "Asset Optimization"], prerequisites: ["JavaScript (ES6+)"] },
      { name: "Advanced State", subSkills: ["Zustand", "React Query"], prerequisites: ["React", "JavaScript (ES6+)"] },
      { name: "3D & WebGL", subSkills: ["Three.js", "React Three Fiber"], prerequisites: ["React", "Tailwind CSS"] }
    ],
    baselineSkills: [
      { name: "Core Web Tech", subSkills: ["HTML5", "CSS3", "JavaScript (ES6+)"] },
      { name: "Frameworks", subSkills: ["React", "Next.js"] },
      { name: "Styling", subSkills: ["Tailwind CSS", "CSS Modules"] }
    ]
  },
  "backend-engineer": {
    goldenSkills: [
      { name: "Distributed Systems", subSkills: ["Kafka", "gRPC"], prerequisites: ["Node.js", "Normalization"] },
      { name: "Containerization", subSkills: ["Docker", "Kubernetes"], prerequisites: ["Node.js"] },
      { name: "Caching Strategy", subSkills: ["Redis", "Memcached"], prerequisites: ["Normalization"] }
    ],
    baselineSkills: [
      { name: "Server Languages", subSkills: ["Node.js", "Go"] },
      { name: "RESTful APIs", subSkills: ["Express", "FastAPI"] },
      { name: "Database Design", subSkills: ["Normalization", "Indexing"] }
    ]
  },

  // --- MANAGEMENT ---
  "product-manager": {
    goldenSkills: [
      { name: "Go-to-Market", subSkills: ["Market Sizing", "Pricing Strategy"], prerequisites: ["Jira", "Cross-functional Comms"] },
      { name: "Data Decisions", subSkills: ["A/B Testing", "Mixpanel"], prerequisites: ["Acceptance Criteria"] },
      { name: "Agile Leadership", subSkills: ["Scrum Master", "Sprint Planning"], prerequisites: ["Jira"] }
    ],
    baselineSkills: [
      { name: "Roadmapping", subSkills: ["Jira", "Linear"] },
      { name: "Stakeholders", subSkills: ["Negotiation", "Cross-functional Comms"] },
      { name: "User Stories", subSkills: ["Acceptance Criteria", "Wireframing"] }
    ]
  },
  "project-manager": {
    goldenSkills: [
      { name: "Risk Management", subSkills: ["Mitigation Planning", "Contingency"], prerequisites: ["Trello", "Meeting Facilitation"] },
      { name: "Budgeting", subSkills: ["EVM", "Resource Allocation"], prerequisites: ["Status Dashboards"] },
      { name: "Methodologies", subSkills: ["PMP", "Six Sigma"], prerequisites: ["Trello"] }
    ],
    baselineSkills: [
      { name: "Timeline Tracking", subSkills: ["Gantt Charts", "Trello"] },
      { name: "Coordination", subSkills: ["Meeting Facilitation", "Conflict Resolution"] },
      { name: "Reporting", subSkills: ["Status Dashboards", "Documentation"] }
    ]
  },

  // --- DESIGN & RESEARCH ---
  "ux-researcher": {
    goldenSkills: [
      { name: "Behavioral Psych", subSkills: ["Cognitive Biases", "Mental Models"], prerequisites: ["Empathy"] },
      { name: "Quant Analytics", subSkills: ["Statistical Significance", "Funnel Analysis"], prerequisites: ["Typeform"] },
      { name: "Accessibility", subSkills: ["WCAG Guidelines", "Screen Readers"], prerequisites: ["Moderated Testing"] }
    ],
    baselineSkills: [
      { name: "Usability Testing", subSkills: ["Moderated Testing", "Maze"] },
      { name: "Interviewing", subSkills: ["Empathy", "Non-leading Questions"] },
      { name: "Survey Design", subSkills: ["Typeform", "Qualtrics"] }
    ]
  },
  "graphic-designer": {
    goldenSkills: [
      { name: "3D & Motion", subSkills: ["Blender", "After Effects"], prerequisites: ["Adobe Photoshop"] },
      { name: "Brand Identity", subSkills: ["Guidelines Creation", "Visual Language"], prerequisites: ["Adobe Illustrator", "Color Theory"] },
      { name: "AI Generation", subSkills: ["Midjourney", "Prompt Engineering"], prerequisites: ["Color Theory"] }
    ],
    baselineSkills: [
      { name: "Vector Graphics", subSkills: ["Adobe Illustrator", "CorelDRAW"] },
      { name: "Photo Manipulation", subSkills: ["Adobe Photoshop", "Lightroom"] },
      { name: "Fundamentals", subSkills: ["Typography", "Color Theory"] }
    ]
  },

  // --- BUSINESS & MARKETING ---
  "digital-marketing": {
    goldenSkills: [
      { name: "Marketing Auto", subSkills: ["HubSpot", "Klaviyo"], prerequisites: ["Copywriting", "Meta Ads"] },
      { name: "CRO", subSkills: ["Landing Page Testing", "Hotjar"], prerequisites: ["Meta Ads"] },
      { name: "Advanced Analytics", subSkills: ["Google Analytics 4", "Tag Manager"], prerequisites: ["Instagram/TikTok"] }
    ],
    baselineSkills: [
      { name: "Social Media", subSkills: ["Instagram/TikTok", "LinkedIn"] },
      { name: "Content", subSkills: ["Copywriting", "Canva"] },
      { name: "Paid Ads", subSkills: ["Meta Ads", "Google Ads (Basic)"] }
    ]
  },
  "finance": {
    goldenSkills: [
      { name: "Financial Modeling", subSkills: ["DCF", "LBO"], prerequisites: ["Financial Functions", "Forecasting"] },
      { name: "Corporate Strategy", subSkills: ["M&A Analysis", "Capital Raising"], prerequisites: ["P&L", "Balance Sheet"] },
      { name: "Data & Code", subSkills: ["Python for Finance", "Advanced PowerBI"], prerequisites: ["Financial Functions"] }
    ],
    baselineSkills: [
      { name: "Reporting", subSkills: ["P&L", "Balance Sheet"] },
      { name: "Budgeting", subSkills: ["Variance Analysis", "Forecasting"] },
      { name: "Excel Mastery", subSkills: ["Index/Match", "Financial Functions"] }
    ]
  },
  "accounting": {
    goldenSkills: [
      { name: "Taxation Strategy", subSkills: ["Corporate Tax", "Transfer Pricing"], prerequisites: ["Journal Entries", "Ledgers"] },
      { name: "Forensic", subSkills: ["Fraud Detection", "Risk Assessment"], prerequisites: ["Bank Reconciliation"] },
      { name: "ERP Systems", subSkills: ["SAP FICO", "Oracle Cloud"], prerequisites: ["Zahir/Accurate"] }
    ],
    baselineSkills: [
      { name: "Bookkeeping", subSkills: ["Journal Entries", "Ledgers"] },
      { name: "Reconciliation", subSkills: ["Bank Reconciliation", "AP/AR"] },
      { name: "Local Software", subSkills: ["Zahir/Accurate", "Xero"] }
    ]
  },
  "staff-admin": {
    goldenSkills: [
      { name: "RPA Automation", subSkills: ["UiPath", "Power Automate"], prerequisites: ["Google Workspace", "Scheduling"] },
      { name: "Advanced ERP", subSkills: ["SAP (End-User)", "Salesforce"], prerequisites: ["Filing", "Business Email"] },
      { name: "Data Analytics", subSkills: ["Dashboarding", "Data Cleansing"], prerequisites: ["Google Workspace"] }
    ],
    baselineSkills: [
      { name: "Doc Management", subSkills: ["Filing", "Google Workspace"] },
      { name: "Correspondence", subSkills: ["Business Email", "Memo Drafting"] },
      { name: "Administration", subSkills: ["Scheduling", "Travel Arrangements"] }
    ]
  }
};
