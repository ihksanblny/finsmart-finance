export interface SkillDetail {
  name: string;
  subSkills: string[];
  prerequisites?: string[]; // Array of baseline subSkill names required to unlock
}

export interface SkillTaxonomy {
  goldenSkills: SkillDetail[];
  baselineSkills: SkillDetail[];
}

export const skillsTaxonomy: Record<string, SkillTaxonomy> = {
  // DATA
  "data-analyst": {
    goldenSkills: [
      { name: "Python / R", subSkills: ["Pandas/NumPy", "Data Visualization", "Scripting Automation"], prerequisites: ["Data Cleansing", "Interactive Dashboards"] },
      { name: "Machine Learning Concepts", subSkills: ["Regression/Classification", "Model Evaluation", "Scikit-Learn"], prerequisites: ["Calculated Fields", "Data Cleansing"] },
      { name: "Advanced SQL", subSkills: ["Window Functions", "CTEs", "Query Optimization"], prerequisites: ["SELECT/WHERE/JOIN", "GROUP BY/HAVING", "Basic Subqueries"] },
      { name: "Data Warehousing", subSkills: ["AWS/GCP Basics", "ETL Pipelines", "BigQuery/Redshift"], prerequisites: ["Data Connections", "Basic Subqueries"] }
    ],
    baselineSkills: [
      { name: "Microsoft Excel", subSkills: ["VLOOKUP/Index-Match", "Pivot Tables", "Data Cleansing"] },
      { name: "Tableau / PowerBI", subSkills: ["Data Connections", "Interactive Dashboards", "Calculated Fields"] },
      { name: "Basic SQL", subSkills: ["SELECT/WHERE/JOIN", "GROUP BY/HAVING", "Basic Subqueries"] },
      { name: "Data Presentation", subSkills: ["Storytelling", "Slide Deck Creation", "Audience Adaptation"] }
    ]
  },
  "data-scientist": {
    goldenSkills: [
      { name: "Deep Learning", subSkills: ["TensorFlow/PyTorch", "Neural Networks", "NLP/Computer Vision"], prerequisites: ["Data Structures", "Loops & Functions"] },
      { name: "MLOps", subSkills: ["Model Deployment", "Docker/Kubernetes", "CI/CD for ML"], prerequisites: ["OOP Basics", "Data Transformation"] },
      { name: "Big Data Tools", subSkills: ["Hadoop ecosystem", "Apache Spark", "Distributed Computing"], prerequisites: ["Data Extraction", "Joins"] },
      { name: "Advanced Statistics", subSkills: ["Bayesian Inference", "A/B Test Design", "Hypothesis Testing"], prerequisites: ["Handling Nulls", "Outlier Detection"] }
    ],
    baselineSkills: [
      { name: "Python", subSkills: ["Data Structures", "Loops & Functions", "OOP Basics"] },
      { name: "SQL", subSkills: ["Data Extraction", "Relational Databases", "Joins"] },
      { name: "Data Cleansing", subSkills: ["Handling Nulls", "Outlier Detection", "Data Transformation"] },
      { name: "Jupyter Notebook", subSkills: ["Markdown Documentation", "Kernel Management", "Library Imports"] }
    ]
  },
  "data-entry": {
    goldenSkills: [
      { name: "Data Automation", subSkills: ["Zapier/Integromat", "Excel Macros/VBA", "Basic Scripting"], prerequisites: ["Word/Docs", "Excel/Sheets"] },
      { name: "Database Admin", subSkills: ["Access Management", "Data Backups", "Record Indexing"], prerequisites: ["Data Input", "Sorting & Filtering"] },
      { name: "Fast Typing", subSkills: ["WPM > 80", "10-Key Data Entry", "High Accuracy"], prerequisites: ["Error Spotting", "Proofreading"] },
      { name: "Data Privacy", subSkills: ["GDPR/PDPA Basics", "Secure File Handling", "Access Controls"], prerequisites: ["Filing", "Record Keeping"] }
    ],
    baselineSkills: [
      { name: "Office / Workspace", subSkills: ["Word/Docs", "Excel/Sheets", "Email Client"] },
      { name: "Attention to Detail", subSkills: ["Error Spotting", "Proofreading", "Format Consistency"] },
      { name: "Basic Spreadsheets", subSkills: ["Data Input", "Sorting & Filtering", "Basic Formatting"] },
      { name: "Administration", subSkills: ["Filing", "Task Scheduling", "Record Keeping"] }
    ]
  },

  // ENGINEERING
  "software-engineer": {
    goldenSkills: [
      { name: "System Architecture", subSkills: ["System Design", "Scalability", "Fault Tolerance"], prerequisites: ["Data Structures", "Schema Design"] },
      { name: "Cloud Computing", subSkills: ["AWS/Azure/GCP", "Serverless", "Infrastructure as Code"], prerequisites: ["Git branching", "CRUD Operations"] },
      { name: "Microservices", subSkills: ["Service Communication", "API Gateways", "Event-Driven"], prerequisites: ["Classes/Objects", "Schema Design"] },
      { name: "CI/CD Pipeline", subSkills: ["GitHub Actions/GitLab CI", "Automated Testing", "Deployment Strategy"], prerequisites: ["Git branching", "Pull Requests", "Debugging"] }
    ],
    baselineSkills: [
      { name: "OOP Principles", subSkills: ["Classes/Objects", "Inheritance", "Polymorphism"] },
      { name: "Version Control", subSkills: ["Git branching", "Pull Requests", "Merge Conflict Resolution"] },
      { name: "Problem Solving", subSkills: ["Algorithms", "Data Structures", "Debugging"] },
      { name: "Databases", subSkills: ["CRUD Operations", "Schema Design", "Basic Querying"] }
    ]
  },
  "frontend-engineer": {
    goldenSkills: [
      { name: "Web Performance", subSkills: ["Lazy Loading", "Core Web Vitals", "Bundle Optimization"], prerequisites: ["Semantic HTML", "Flexbox/Grid"] },
      { name: "Advanced State", subSkills: ["Redux Toolkit", "Zustand/Jotai", "Context Architecture"], prerequisites: ["Hooks/Composition", "Props/State"] },
      { name: "Next.js / SSR", subSkills: ["Server Components", "Static Site Gen", "App Router"], prerequisites: ["Component Lifecycle", "Hooks/Composition"] },
      { name: "Web3 / 3D", subSkills: ["Three.js", "WebGL", "Ethers.js/Web3.js"], prerequisites: ["ES6+ Syntax", "Fetch/Axios"] }
    ],
    baselineSkills: [
      { name: "HTML/CSS/JS", subSkills: ["Semantic HTML", "Flexbox/Grid", "ES6+ Syntax"] },
      { name: "React / Vue", subSkills: ["Component Lifecycle", "Hooks/Composition", "Props/State"] },
      { name: "Responsive Design", subSkills: ["Media Queries", "Mobile-First", "TailwindCSS/SASS"] },
      { name: "REST API", subSkills: ["Fetch/Axios", "Error Handling", "Async/Await"] }
    ]
  },
  "backend-engineer": {
    goldenSkills: [
      { name: "Distributed Systems", subSkills: ["Message Queues (Kafka/RabbitMQ)", "Concurrency", "Consensus"], prerequisites: ["Node.js/Go/Python", "Frameworks (Express/Gin/Django)"] },
      { name: "Containerization", subSkills: ["Dockerfiles", "Kubernetes Pods", "Orchestration"], prerequisites: ["Linux Basics", "PM2/Systemd"] },
      { name: "Advanced APIs", subSkills: ["GraphQL", "gRPC / Protobuf", "WebSockets"], prerequisites: ["HTTP Methods", "Status Codes", "Routing"] },
      { name: "Caching", subSkills: ["Redis/Memcached", "Cache Invalidation", "Rate Limiting"], prerequisites: ["PostgreSQL/MySQL", "Transactions"] }
    ],
    baselineSkills: [
      { name: "Server Language", subSkills: ["Node.js/Go/Python", "Frameworks (Express/Gin/Django)", "Middleware"] },
      { name: "RESTful API", subSkills: ["HTTP Methods", "Status Codes", "Routing"] },
      { name: "Relational DB", subSkills: ["PostgreSQL/MySQL", "Transactions", "Normalization"] },
      { name: "Deployment", subSkills: ["Linux Basics", "Nginx/Apache", "PM2/Systemd"] }
    ]
  },

  // MANAGEMENT
  "product-manager": {
    goldenSkills: [
      { name: "GTM Strategy", subSkills: ["Launch Planning", "Pricing Strategy", "Market Positioning"], prerequisites: ["Prioritization", "Vision Alignment"] },
      { name: "Data-Driven Decisions", subSkills: ["SQL for PMs", "Cohort Analysis", "Funnel Tracking"], prerequisites: ["Prioritization", "Milestone Planning"] },
      { name: "A/B Testing", subSkills: ["Test Design", "Statistical Significance", "Optimizely/Mixpanel"], prerequisites: ["Acceptance Criteria", "Epic Creation"] },
      { name: "Agile Leadership", subSkills: ["Scrum Master", "Sprint Planning", "Retrospectives"], prerequisites: ["Expectation Setting", "Cross-functional Comms"] }
    ],
    baselineSkills: [
      { name: "Product Roadmap", subSkills: ["Prioritization", "Milestone Planning", "Vision Alignment"] },
      { name: "Stakeholder Mgt", subSkills: ["Expectation Setting", "Cross-functional Comms", "Negotiation"] },
      { name: "Project Tools", subSkills: ["Jira", "Asana/Trello", "Confluence"] },
      { name: "User Stories", subSkills: ["Acceptance Criteria", "Epic Creation", "Backlog Grooming"] }
    ]
  },
  "project-manager": {
    goldenSkills: [
      { name: "Risk Management", subSkills: ["Risk Identification", "Mitigation Strategy", "Contingency Planning"], prerequisites: ["Deadline Tracking", "Status Reporting"] },
      { name: "Budget Forecasting", subSkills: ["Cost Estimation", "Variance Analysis", "Resource Allocation"], prerequisites: ["Gantt Charts", "Critical Path"] },
      { name: "Change Management", subSkills: ["Impact Analysis", "Transition Planning", "Stakeholder Buy-in"], prerequisites: ["Meeting Facilitation", "Conflict Resolution"] },
      { name: "Certifications", subSkills: ["PMP Framework", "Six Sigma Basics", "ITIL"], prerequisites: ["Task Delegation", "Trello/Jira"] }
    ],
    baselineSkills: [
      { name: "Timeline Management", subSkills: ["Gantt Charts", "Critical Path", "Deadline Tracking"] },
      { name: "Team Coordination", subSkills: ["Task Delegation", "Meeting Facilitation", "Conflict Resolution"] },
      { name: "Tracking Tools", subSkills: ["Trello/Jira", "Microsoft Project", "Notion"] },
      { name: "Clear Communication", subSkills: ["Status Reporting", "Email Etiquette", "Active Listening"] }
    ]
  },

  // DESIGN & RESEARCH
  "ux-researcher": {
    goldenSkills: [
      { name: "Behavioral Psychology", subSkills: ["Cognitive Bias", "Mental Models", "Persuasive Design"], prerequisites: ["Test Moderation", "Observation"] },
      { name: "Quant Data Analysis", subSkills: ["Statistical Tools", "Survey Analytics", "Metrics Tracking"], prerequisites: ["Likert Scales", "Logic Jumps"] },
      { name: "Eye Tracking", subSkills: ["Heatmaps", "Gaze Plots", "Fixation Analysis"], prerequisites: ["Task Scenarios", "Open-ended Questions"] },
      { name: "Accessibility (A11y)", subSkills: ["WCAG Guidelines", "Screen Readers", "Inclusive Design"], prerequisites: ["Wireframing", "Prototyping"] }
    ],
    baselineSkills: [
      { name: "Usability Testing", subSkills: ["Test Moderation", "Task Scenarios", "Observation"] },
      { name: "User Interviewing", subSkills: ["Open-ended Questions", "Probing", "Empathy"] },
      { name: "Survey Design", subSkills: ["Question Wording", "Likert Scales", "Logic Jumps"] },
      { name: "Figma / FigJam", subSkills: ["Wireframing", "Prototyping", "Collaborative Brainstorming"] }
    ]
  },
  "graphic-designer": {
    goldenSkills: [
      { name: "Motion Graphics/3D", subSkills: ["After Effects", "Blender/C4D", "Keyframing"], prerequisites: ["Vector Drawing", "Compositing"] },
      { name: "Brand Identity", subSkills: ["Logo Design", "Brand Guidelines", "Visual Strategy"], prerequisites: ["Font Pairing", "Hierarchy"] },
      { name: "UI/UX Fundamentals", subSkills: ["Layout Grids", "Component States", "User Flow"], prerequisites: ["Harmonies", "Contrast"] },
      { name: "AI Generation", subSkills: ["Midjourney Prompting", "Stable Diffusion", "AI Retouching"], prerequisites: ["Masking", "Color Grading"] }
    ],
    baselineSkills: [
      { name: "Adobe Illustrator", subSkills: ["Vector Drawing", "Pen Tool", "Pathfinder"] },
      { name: "Adobe Photoshop", subSkills: ["Masking", "Color Grading", "Compositing"] },
      { name: "Color Theory", subSkills: ["Harmonies", "Contrast", "Psychology of Color"] },
      { name: "Typography", subSkills: ["Kerning/Leading", "Font Pairing", "Hierarchy"] }
    ]
  },

  // BUSINESS & MARKETING
  "digital-marketing": {
    goldenSkills: [
      { name: "Marketing Automation", subSkills: ["HubSpot/Marketo", "Email Drip Campaigns", "Lead Scoring"], prerequisites: ["Content Calendar", "Call to Action"] },
      { name: "Advanced SEO/SEM", subSkills: ["Technical SEO", "Keyword Strategy", "Bidding Optimization"], prerequisites: ["Headline Creation", "Basic Canva"] },
      { name: "CRO", subSkills: ["Landing Page Testing", "Funnel Optimization", "Heatmap Analysis"], prerequisites: ["Visual Aesthetics", "Tone of Voice"] },
      { name: "Advanced Analytics", subSkills: ["GA4 Configuration", "Tag Manager", "Data Studio"], prerequisites: ["Facebook Business", "Google Search Ads"] }
    ],
    baselineSkills: [
      { name: "Social Media Mgt", subSkills: ["Content Calendar", "Community Engagement", "Platform Trends"] },
      { name: "Content Creation", subSkills: ["Basic Canva", "Video Editing", "Visual Aesthetics"] },
      { name: "Copywriting", subSkills: ["Headline Creation", "Call to Action", "Tone of Voice"] },
      { name: "Basic Ads", subSkills: ["Facebook Business", "Google Search Ads", "Budgeting"] }
    ]
  },
  "finance": {
    goldenSkills: [
      { name: "Financial Modeling", subSkills: ["DCF Valuation", "Scenario Analysis", "LBO Models"], prerequisites: ["P&L Statements", "Cash Flow"] },
      { name: "Corporate Strategy", subSkills: ["Market Analysis", "Competitive Positioning", "Growth Planning"], prerequisites: ["Forecasting", "Variance Analysis"] },
      { name: "M&A Analysis", subSkills: ["Due Diligence", "Synergy Estimation", "Deal Structuring"], prerequisites: ["Financial Formulas", "Data Tables"] },
      { name: "Python for Finance", subSkills: ["Data Scraping", "Financial Libraries", "Algo Basics"], prerequisites: ["GAAP/IFRS", "Accrual Accounting"] }
    ],
    baselineSkills: [
      { name: "Financial Reporting", subSkills: ["P&L Statements", "Balance Sheets", "Cash Flow"] },
      { name: "Budgeting", subSkills: ["Variance Analysis", "Forecasting", "Cost Tracking"] },
      { name: "Microsoft Excel", subSkills: ["Financial Formulas", "Data Tables", "Goal Seek"] },
      { name: "Accounting Principles", subSkills: ["GAAP/IFRS", "Accrual Accounting", "Depreciation"] }
    ]
  },
  "accounting": {
    goldenSkills: [
      { name: "Taxation Strategy", subSkills: ["Corporate Tax", "Tax Planning", "Compliance Optimization"], prerequisites: ["Journal Entries", "Ledger Maintenance"] },
      { name: "Forensic Accounting", subSkills: ["Fraud Detection", "Audit Trails", "Litigation Support"], prerequisites: ["Bank Recs", "Discrepancy Resolution"] },
      { name: "ERP Systems", subSkills: ["SAP FI/CO", "Oracle NetSuite", "System Migration"], prerequisites: ["Zahir/Accurate", "Xero/QuickBooks"] },
      { name: "Audit Data Analytics", subSkills: ["Risk Assessment", "Anomaly Detection", "Audit Sampling"], prerequisites: ["Trial Balance", "Income Statement Prep"] }
    ],
    baselineSkills: [
      { name: "Bookkeeping", subSkills: ["Journal Entries", "Ledger Maintenance", "Accounts Payable/Receivable"] },
      { name: "Reconciliation", subSkills: ["Bank Recs", "Intercompany Reconciliations", "Discrepancy Resolution"] },
      { name: "Accounting Software", subSkills: ["Zahir/Accurate", "Xero/QuickBooks", "Data Entry"] },
      { name: "Financial Statements", subSkills: ["Trial Balance", "Income Statement Prep", "Balance Sheet Prep"] }
    ]
  },
  "staff-admin": {
    goldenSkills: [
      { name: "Process Automation", subSkills: ["UiPath/RPA", "Power Automate", "Workflow Optimization"], prerequisites: ["Word Formatting", "Basic Excel"] },
      { name: "Advanced ERP Usage", subSkills: ["Data Export/Import", "Custom Reporting", "Module Integration"], prerequisites: ["Cloud Storage (Drive/Dropbox)", "Archiving"] },
      { name: "Data Analytics (Basics)", subSkills: ["Dashboard Creation", "Trend Spotting", "Basic BI"], prerequisites: ["Professional Tone", "Mail Merge"] },
      { name: "Project Coordination", subSkills: ["Vendor Management", "Event Planning", "Resource Tracking"], prerequisites: ["Calendar Mgt", "Meeting Invites"] }
    ],
    baselineSkills: [
      { name: "Filing & Document Mgt", subSkills: ["Cloud Storage (Drive/Dropbox)", "Naming Conventions", "Archiving"] },
      { name: "Microsoft Office", subSkills: ["Word Formatting", "Basic Excel", "PowerPoint Layout"] },
      { name: "Email Correspondence", subSkills: ["Professional Tone", "Inbox Inbox Zero", "Mail Merge"] },
      { name: "Scheduling", subSkills: ["Calendar Mgt", "Meeting Invites", "Time Zoning"] }
    ]
  }
};
