export type Project = {
  slug: string;
  n: string;
  /** Subcategory shown above the project name. */
  eyebrow: string;
  title: string;
  /** One-line value proposition used on cards and as the detail headline. */
  blurb: string;
  /** What the project is and why it exists, in plain language. */
  summary: string;
  /** The single most credible outcome or capability. */
  impact: string;
  /** Three supporting proof points. */
  highlights: string[];
  tags: string[];
  company: string;
  logo: string | null;
  /** Public GitHub repository, when there is one. */
  github?: string;
  /** Deployed site, for web projects. */
  live?: string;
  /** Desktop + mobile captures, for web projects. */
  screenshots?: { desktop: string; mobile: string };
};

const shot = (slug: string) => ({
  desktop: `/screenshots/${slug}-desktop.png`,
  mobile: `/screenshots/${slug}-mobile.png`,
});

/* Shared between the AI and Data Science listings. */
const isViral: Omit<Project, "n"> = {
  slug: "is-viral",
  eyebrow: "Predictive ML",
  title: "Viral Content Predictor",
  blurb:
    "Predicts post engagement before publishing — and shows which factors are driving the number.",
  summary:
    "Trained on 4,913 posts and 46 engineered features, the model estimates engagement with XGBoost and explains each prediction through per-feature contributions. A Streamlit interface lets a writer test a draft, see the predicted result and adjust the levers that matter most.",
  impact:
    "Test R² 0.7416 and MAE 0.0759 — with the top three drivers surfaced for every prediction.",
  highlights: [
    "46 features across content, timing, media and audience signals, built from 4,913 real posts.",
    "Explainable by default: per-feature contributions turn each score into a ranked list of what helped or hurt.",
    "Usable by non-technical teams: a Streamlit app for what-if testing before publishing.",
  ],
  tags: ["Python", "XGBoost", "Streamlit", "scikit-learn"],
  company: "Personal",
  logo: null,
  github: "https://github.com/nacermissouni23/isViral",
};

const topApplicant: Omit<Project, "n"> = {
  slug: "top-applicant",
  eyebrow: "Data engineering",
  title: "Top Applicant — Job Market Pipeline",
  blurb:
    "A resilient job-market pipeline that turns global postings into a clean, deduplicated, analysis-ready dataset.",
  summary:
    "Top Applicant collects Data, ML and AI job postings at scale and makes the raw data trustworthy. Company names are canonicalised, records are fingerprinted with SHA-256, long crawls checkpoint and resume, and rate limits are handled with exponential backoff. Output lands as partitioned Parquet and CSV, ready for analysis instead of cleanup.",
  impact:
    "Built for multi-hour crawls: resumable, deduplicated, rate-limit-aware and quality-scored at ingest.",
  highlights: [
    "Reliability first: checkpoints, retry budgets, backoff and per-run quality reports for crawls that cannot restart from zero.",
    "Clean by construction: canonical company keys, SHA-256 record hashing and normalised role, location and skill fields.",
    "Analysis-ready output: partitioned Parquet/CSV plus notebooks for exploring skill demand and role requirements.",
  ],
  tags: ["Python", "Pandas", "Parquet", "BeautifulSoup", "Data quality"],
  company: "Personal",
  logo: null,
  github: "https://github.com/nacermissouni23/top-applicant",
};

export const aiProjects: Project[] = [
  {
    slug: "almouhasib",
    n: "01",
    eyebrow: "AI bookkeeping",
    title: "Almouhasib",
    blurb:
      "Turns invoices and bank statements into balanced journals, reconciled accounts and ERP-ready exports.",
    summary:
      "Almouhasib is a multi-tenant bookkeeping platform for Algerian accounting firms. It reads supplier documents with Gemini, maps line items to a company's chart of accounts and drafts double-entry journals that an accountant reviews before posting. Bank statements are matched against the ledger, reports compile to PDF or Word, and journals export to Excel in an ERP-importable format.",
    impact:
      "From document upload to reconciled, exportable ledger — with every line traceable to its source.",
    highlights: [
      "AI extraction with review: Gemini reads PDFs and images, returns structured line items with confidence flags, and the accountant edits before anything posts.",
      "Built for real accounting work: nine journal types, balance control, a per-company chart of accounts, bank reconciliation and an audit log.",
      "Multi-tenant from day one: Supabase auth, row-level security, role-based access, per-company data isolation and an admin console.",
    ],
    tags: ["Next.js", "TypeScript", "Gemini", "Supabase", "PostgreSQL"],
    company: "Personal",
    logo: null,
  },
  {
    slug: "snoc-complaints",
    n: "02",
    eyebrow: "Agentic operations",
    title: "S-NOC Support Agent",
    blurb:
      "Resolves telecom support emails end-to-end — VPN, OTP, password resets and unlocks — and escalates the rest.",
    summary:
      "Built for Djezzy's SNOC operations, this LangGraph agent ingests support emails, verifies senders against Active Directory, extracts request details with an LLM and runs deterministic validation before calling the SNOC platform. It handles reply threads, enforces a three-reply limit and turns anything ambiguous or unauthorised into an escalation ticket with a supervisor notification.",
    impact:
      "19 nodes, 4 integrations and 400+ tests automate four request types — with a human fallback on every path.",
    highlights: [
      "19-node LangGraph state machine covering whitelist checks, reply threading, extraction, validation, execution and escalation.",
      "Guardrails that hold: 8-digit POS codes, 9-digit OTP normalisation, reply limits and a provider-agnostic LLM layer built for Djezzy's own inference servers.",
      "Production engineering: a concurrency-safe Postgres queue, rate-limited LLM calls, structured JSONL tracing, Docker deployment and a React operations dashboard.",
    ],
    tags: ["LangGraph", "Python", "FastAPI", "PostgreSQL", "React"],
    company: "Djezzy",
    logo: "/logos/djezzy.svg",
  },
  {
    slug: "hrms",
    n: "03",
    eyebrow: "HR operations",
    title: "HRMS — Algérie Télécom",
    blurb:
      "Digitises the entire HR file — people, leave, recruitment, training and assignments — and runs offline.",
    summary:
      "Built for Algérie Télécom's Direction Opérationnelle des Télécommunications de Saïda, HRMS replaces paper files and spreadsheets with one role-based desktop application. It manages employees, contracts, assignments, candidates, interns, apprentices, trainers, training sessions and absences, then generates the official documents and dashboard checks the department relies on.",
    impact:
      "A portable Windows app with a local database: no server, no internet dependency, no paper archive.",
    highlights: [
      "Document intelligence on-device: Tesseract and Xenova extract and normalise names, dates and wilaya data from scanned records — nothing leaves the machine.",
      "Administrative output built in: Word templates generate letters and certificates, Excel imports bring in absence sheets, and structured exports keep reporting consistent.",
      "Trustworthy by design: role-based access, schema-validated APIs, Vitest coverage, dashboard integrity checks and a single-file Electron build.",
    ],
    tags: ["React", "Express", "SQLite", "OCR", "Electron"],
    company: "Algérie Télécom",
    logo: "/logos/algerie-telecom.svg",
  },
  {
    slug: "codivizer",
    n: "04",
    eyebrow: "Developer tooling",
    title: "Codivizer",
    blurb:
      "Turns any repository into an interactive architecture map — locally, deterministically, in one command.",
    summary:
      "Codivizer indexes a codebase across TypeScript, Python, Go and 36 Tree-sitter grammars, then builds a graph of folders, files, symbols and call edges. Engineers trace execution from entry point to source, inspect callers and callees, and understand an unfamiliar system without uploading code. Optional AI adds plain-language labels from an anonymous graph summary.",
    impact:
      "30+ languages, 4 indexing engines and 6 levels of understanding — zero setup beyond Node.js.",
    highlights: [
      "Hybrid indexing: TS LanguageService, Pyright and Gopls for type-checked call edges, plus 36 bundled Tree-sitter grammars.",
      "Six progressive views, from a one-paragraph repository brief to a symbol inspector with callers, callees and source.",
      "Engineered for real repos: gitignore-aware walking, watch-mode reindex in ~500 ms, 15+ manifest formats and confidence-rated dependencies.",
    ],
    tags: ["TypeScript", "Node.js", "Tree-sitter", "LSP", "React"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/codivizer",
  },
  {
    slug: "rag-optimization",
    n: "05",
    eyebrow: "Retrieval quality",
    title: "RAG Retrieval Optimizer",
    blurb:
      "Re-ranks BM25 candidates with a learned model and lifts retrieval quality by 2.8 points — measured, not assumed.",
    summary:
      "On 7,481 questions across seven document domains, I built a BM25 baseline, engineered 26 query–chunk features, trained a Random Forest re-ranker and validated the gain on held-out data. Parallel experiments used association rules to explain chunk quality and clustering to isolate the chunks that drag retrieval down before they ever reach the model.",
    impact:
      "LCS 80.34% → 83.13% on 7,481 queries; 75.2% re-ranker accuracy across 44,886 held-out pairs.",
    highlights: [
      "26 features, ranked: query coverage, IDF-weighted window density, semantic similarity and 23 other signals, with importances reported.",
      "A fair test: 149,620 training pairs, a clean split, and the same 7,481 queries used to score baseline and re-ranker.",
      "Diagnostics that explain the number: 312 association rules, HDBSCAN/K-means quality tiers and a targeted clean-up that lifted poor chunks by 27 points.",
    ],
    tags: ["Python", "scikit-learn", "LlamaIndex", "BM25", "HDBSCAN"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/RAG-Optimization",
  },
  { ...topApplicant, n: "06" },
  { ...isViral, n: "07" },
  {
    slug: "mobai",
    n: "08",
    eyebrow: "Warehouse AI",
    title: "MobAI — AI Warehouse OS",
    blurb:
      "A mobile warehouse system that forecasts demand, assigns storage and routes pickers — with a human override.",
    summary:
      "Built for the MobAI hackathon with BMS Electric, this system covers receipt, transfer, preparation, picking and delivery. An AI layer forecasts preparation orders a day ahead, assigns storage slots by weight, demand and distance, and generates picking routes. Supervisors can override any recommendation, but the justification is logged and employees only see the validated decision.",
    impact:
      "Forecasting, slotting and routing in one WMS — mobile-first, offline-capable and fully auditable.",
    highlights: [
      "Three optimisation services — demand forecasting, storage assignment and shortest-path picking — benchmarked against a naive baseline.",
      "Operationally realistic: three roles, server-enforced permissions, immutable stock movements and four-hour offline operation with sync.",
      "Flutter client, Flask API and separate AI services, so models can be replaced without touching the warehouse workflow.",
    ],
    tags: ["Flutter", "Python", "Flask", "Forecasting", "Optimization"],
    company: "BMS Electric",
    logo: null,
    github: "https://github.com/nacermissouni23/MobAI",
  },
];

export const dataScienceProjects: Project[] = [
  {
    slug: "clv",
    n: "01",
    eyebrow: "Customer segmentation",
    title: "Customer Value Segmentation",
    blurb:
      "Segments 5,000 retail customers by value so retention spend goes where the revenue actually is.",
    summary:
      "This project does the commercially useful part properly: RFM analysis on 17,049 transactions, then a three-tier value segmentation with clear revenue and behaviour profiles. The output is a targeting map a CRM team can act on — not a predictive model the data cannot support.",
    impact:
      "5,000 customers segmented; the top 1,650 average 9,930 in value versus 578 for the bottom tier — a 17× gap.",
    highlights: [
      "RFM foundation: recency, frequency and monetary value computed across 17,049 transactions.",
      "Actionable tiers: High (1,650 customers), Medium (1,700) and Low (1,650), each with a distinct treatment recommendation.",
      "Honest scope: segmentation and profiling, with the limits of the dataset stated rather than hidden.",
    ],
    tags: ["Python", "Pandas", "RFM", "Segmentation", "Matplotlib"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/CLV",
  },
  {
    slug: "customer-retention",
    n: "02",
    eyebrow: "Churn intelligence",
    title: "Churn Prediction & Retention Plays",
    blurb:
      "Predicts which telecom customers will leave, then pairs each risk tier with the retention action most likely to work.",
    summary:
      "Using 7,043 telco customer records, I compared logistic regression and XGBoost, chose the model with the better held-out AUC and converted its probabilities into three risk bands. Each band carries a concrete playbook — from proactive contract review to low-cost nurture — so the output is a queue, not just a score.",
    impact:
      "AUC 0.8427 with logistic regression, beating XGBoost's 0.8224; 1,042 high-risk and 1,032 medium-risk customers isolated.",
    highlights: [
      "Model selection by evidence: both models tuned and compared on the same holdout, with the simpler model winning.",
      "Bands sized for operations: 1,042 high, 1,032 medium and 4,969 low risk, each with a recommended intervention.",
      "Drivers translated into business language — contract type, tenure and service mix — not just a feature-importance chart.",
    ],
    tags: ["Python", "scikit-learn", "XGBoost", "Pandas"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/Customer-Retention",
  },
  {
    slug: "iniesta",
    n: "03",
    eyebrow: "Sports analytics",
    title: "Iniesta vs Zidane — Six-Pillar Analysis",
    blurb:
      "A neutral, evidence-first comparison of two football legends — built to resist the answer the brief wanted.",
    summary:
      "The hypothesis was “Iniesta is better than Zidane”. Instead of proving it, I built a six-pillar framework — attack, possession, defence, clutch, consistency and recognition — from StatsBomb, Transfermarkt, Wikipedia and manual records, then reported where each player actually leads. The pre-analytics data gap is documented, not hidden.",
    impact:
      "885 matches, 16 elite seasons and six independent dimensions — with no single winner forced.",
    highlights: [
      "Six pillars, no arbitrary weighting: per-90 metrics and context notes keep the comparison defensible.",
      "Transparent lineage: StatsBomb event data, Transfermarkt records and manual honour compilation, with limitations stated.",
      "A self-contained HTML report with radar, timeline, peak-season, clutch and possession visuals.",
    ],
    tags: ["Python", "Pandas", "StatsBomb", "Matplotlib"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/Iniesta",
  },
  { ...isViral, n: "04" },
  {
    slug: "pm25-air-quality",
    n: "05",
    eyebrow: "Environmental ML",
    title: "PM2.5 Estimation Model",
    blurb:
      "Estimates ground-level PM2.5 from satellite and weather data — with an honest accuracy ceiling and leakage-safe validation.",
    summary:
      "Air-quality models are easy to overstate. This one uses 41,269 station-days, 24 final features and a temporal split that prevents future data leaking into the past. An Optuna-tuned neural network is benchmarked against reference models, and permutation importance shows which inputs actually move the prediction.",
    impact:
      "Held-out R² 0.4589, RMSE 5.31 µg/m³, MAE 3.44 µg/m³ — reported as measured.",
    highlights: [
      "Leakage-safe design: a time-based split, station-aware feature construction and a documented selection path.",
      "Tuned, not guessed: Optuna hyperparameter search over an MLP, compared against baselines.",
      "The right explainability tool: permutation importance, because the pipeline never used SHAP.",
    ],
    tags: ["Python", "Optuna", "scikit-learn", "GeoPandas"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/pm25-air-quality",
  },
  {
    slug: "smart-parking",
    n: "06",
    eyebrow: "Operations research",
    title: "Smart Parking Allocation",
    blurb:
      "Cuts parking operating cost by 23% by assigning 1,000 cars across 10 layouts with the Hungarian algorithm.",
    summary:
      "A simulation-based optimisation study: 1,000 vehicles, 10 parking layouts and competing objectives — driver walking distance, EV-charger utilisation and staff access. The baseline greedy assignment is compared with an optimal assignment, and every trade-off is quantified rather than hand-waved.",
    impact:
      "Cost 71,500 → 55,215 (−23%); EV access 24% → 58%; charger idle waste 25% → 7%.",
    highlights: [
      "Optimal assignment with the Hungarian algorithm, benchmarked against a realistic baseline.",
      "Multi-objective thinking: the model deliberately trades ~31 m of extra staff walking for far better EV access and lower cost.",
      "Decision-ready output: layout-level metrics that show exactly where the gain comes from.",
    ],
    tags: ["Python", "Optimization", "Hungarian algorithm", "Simulation"],
    company: "Personal",
    logo: null,
    github:
      "https://github.com/nacermissouni23/Smart-Multi-Level-Parking-Optimization",
  },
  { ...topApplicant, n: "07" },
  {
    slug: "tsac-sales-forecasting",
    n: "08",
    eyebrow: "Demand forecasting",
    title: "Walmart Sales Forecasting",
    blurb:
      "A 26-week forecast that held 2.37% MAPE on unseen data — with a 95% confidence band planners can use.",
    summary:
      "Weekly Walmart sales were modelled with ARIMA, SARIMA and Prophet, then judged on a 26-week holdout rather than in-sample fit. SARIMA won, and the final model produces a 20-week forward forecast with confidence intervals for replenishment and budget planning.",
    impact:
      "26-week holdout MAPE 2.37% (MAE ≈1.12M, RMSE ≈1.35M); 20-week forecast with 95% intervals.",
    highlights: [
      "Proper time-series validation: a 26-week holdout instead of random cross-validation.",
      "Seasonality-aware comparison: ARIMA, SARIMA and Prophet evaluated on the same split.",
      "Planning-ready output: point forecasts plus 95% confidence intervals.",
    ],
    tags: ["Python", "SARIMA", "Prophet", "Statsmodels"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/TSAC-Sales-Forecasting",
  },
  {
    slug: "uplift-modeling",
    n: "09",
    eyebrow: "Campaign analytics",
    title: "Uplift Modeling for Campaigns",
    blurb:
      "Finds the customers a campaign actually persuades — so budget stops going to people who would convert anyway.",
    summary:
      "Using 45,211 bank-marketing records, I trained separate response models for treated and control groups and scored each customer by uplift: P(response | treated) − P(response | control). Customers are ranked into deciles so the campaign team can target the persuadable segment first.",
    impact:
      "45,211 customers scored and ranked by incremental lift, not raw response probability.",
    highlights: [
      "Two-model uplift estimation with a clean treated/control split.",
      "Decile ranking that separates the persuadable from the sure thing and the lost cause.",
      "Stated honestly: treatment is a proxy from campaign contact, so results are prioritisation signals, not causal proof.",
    ],
    tags: ["Python", "scikit-learn", "Random Forest", "Uplift"],
    company: "Personal",
    logo: null,
    github:
      "https://github.com/nacermissouni23/Uplift-modeling-for-marketing-campaign",
  },
  {
    slug: "adaptive-exam-active-learning",
    n: "10",
    eyebrow: "Adaptive learning",
    title: "Adaptive Exam Engine",
    blurb:
      "Cuts exam length by 30–50% while holding knowledge estimates above 80% accuracy.",
    summary:
      "Built on real Data Mining quizzes at ENSIA, this system selects each next question by entropy — asking the item the model is least certain about — and stops when it has enough information. The result is a shorter, personalised assessment instead of one fixed paper for every student.",
    impact:
      "50–70% of the question set used at ≥80% accuracy; entropy-based selection reaches 50–65%.",
    highlights: [
      "Uncertainty sampling with entropy, backed by XGBoost knowledge estimation and response-time features.",
      "Trained on real quiz data: five quizzes, student history and question metadata across three difficulty levels.",
      "Evaluated on the trade-off that matters: accuracy per question asked, with learning curves and confusion matrices.",
    ],
    tags: ["Python", "XGBoost", "Active Learning", "scikit-learn"],
    company: "ENSIA",
    logo: null,
    github:
      "https://github.com/Mastene-Yahiaoui/Adaptive_Exam_Preparation_System_using_Active_Learning",
  },
];

export const webDevProjects: Project[] = [
  {
    slug: "al-djisr",
    n: "01",
    eyebrow: "Lead-generation site",
    title: "AL Djisr — Training Centre",
    blurb:
      "A French-language training-centre site built to turn search traffic into enrolled students.",
    summary:
      "AL Djisr needed more than a brochure. The site pairs a fast, SEO-structured course catalogue with lead forms that validate input, block bots, rate-limit abuse and deliver enquiries to the team through a webhook and Resend. Course, FAQ, breadcrumb and article schema make every programme eligible for rich results.",
    impact:
      "End-to-end lead engine: SEO, structured data, spam-resistant forms and instant notification — live in production.",
    highlights: [
      "Conversion path: course page → lead form → validated submission → webhook + transactional email, with honeypot and rate limiting.",
      "Search visibility: per-page metadata, sitemap, robots and JSON-LD for Course, FAQ, Breadcrumb and Article.",
      "Content that compounds: blog and programme pages the centre can grow without a developer.",
    ],
    tags: ["Next.js", "TypeScript", "SEO", "Resend", "Tailwind"],
    company: "AL Djisr",
    logo: null,
    github: "https://github.com/nacermissouni23/AL-Djisr",
    live: "https://al-djisr.vercel.app",
    screenshots: shot("al-djisr"),
  },
  {
    slug: "auto-manager",
    n: "02",
    eyebrow: "Rental operations",
    title: "Auto Manager — Fleet & Rentals",
    blurb:
      "Runs a vehicle-rental business offline: bookings, payments, fleet status and PDF contracts in one app.",
    summary:
      "Auto Manager is a Flutter front end with a Flask API designed for real rental desks, where connectivity is unreliable. A hybrid local/remote repository keeps the app usable offline, syncs when the connection returns and preserves the records staff need: vehicles, customers, reservations, payments and subscriptions. Contracts export to PDF and dashboards show utilisation.",
    impact:
      "Offline-first by design: local SQLite persistence, background sync and PDF-ready rental paperwork.",
    highlights: [
      "Hybrid data layer: SQLite locally, a remote API when available, and a sync service that reconciles both.",
      "Day-to-day operations: fleet availability, customer records, reservations, payments and subscription screens.",
      "Arabic, English and French UI, a tested Flask backend and analytics for fleet utilisation.",
    ],
    tags: ["Flutter", "Flask", "SQLite", "Dart", "REST"],
    company: "Personal",
    logo: null,
    github: "https://github.com/houaria617/auto_manager",
  },
  {
    slug: "chifa",
    n: "03",
    eyebrow: "Healthcare booking",
    title: "Clinique Douaa — Nutrition Platform",
    blurb:
      "A bilingual clinic platform that turns nutrition enquiries into booked, tracked appointments.",
    summary:
      "Clinique Douaa needed to stop managing appointments by phone. This platform gives patients a French/Arabic site with 12 nutrition programmes, online booking, reviews and a before/after gallery, while the clinic gets an admin console for appointments, patients, messages, reviews, analytics and settings.",
    impact:
      "One system for the whole patient journey: discover → book → confirm → follow up, in French and Arabic.",
    highlights: [
      "Bilingual patient experience with RTL Arabic, service pages, reviews, gallery and a WhatsApp shortcut.",
      "Admin console covering appointments, patients, messages, reviews, analytics and clinic settings.",
      "Booking and contact APIs with validation, plus SEO metadata, sitemap and robots for local discovery.",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "i18n", "Booking", "Tailwind"],
    company: "Clinique Douaa",
    logo: null,
    github: "https://github.com/nacermissouni23/Chifa",
    live: "https://chifa-five.vercel.app",
    screenshots: shot("chifa"),
  },
  {
    slug: "clinic",
    n: "04",
    eyebrow: "Dental clinic site",
    title: "Better Smile Clinic — Dental Platform",
    blurb:
      "A dental clinic platform that fills the chair: 12 services, online booking and a back office that runs the practice.",
    summary:
      "Better Smile Clinic in Hydra needed a site that could do reception work. Patients browse 12 dental services in French or Arabic, book online, read reviews and see real before/after results. The clinic manages appointments, patient records, messages, reviews, analytics and settings from a single dashboard.",
    impact:
      "12 services, two languages and a full admin console — built to reduce the load on reception.",
    highlights: [
      "Service-led conversion: dedicated pages for implants, orthodontics, veneers, whitening, aligners and emergencies.",
      "Trust built in: patient reviews, a before/after gallery and a mobile WhatsApp action.",
      "Operational back office: appointment status, patient history, message inbox, review moderation and analytics.",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "i18n", "Booking", "Tailwind"],
    company: "Better Smile Clinic",
    logo: null,
    github: "https://github.com/nacermissouni23/clinic",
    live: "https://clinic-nine-kappa.vercel.app",
    screenshots: shot("clinic"),
  },
  {
    slug: "maskulino",
    n: "05",
    eyebrow: "E-commerce",
    title: "Maskulino — Menswear Store",
    blurb:
      "A cash-on-delivery menswear store built for Algeria: 69 wilayas, live stock, push alerts and a full back office.",
    summary:
      "Maskulino is a production e-commerce build, not a template. Customers shop by category, choose size and colour, and check out with wilaya-specific home or stop-desk delivery pricing across all 69 wilayas. Behind it, the owner manages products, stock, orders, customers, marketing and analytics, with Excel exports, web-push alerts and automated backups.",
    impact:
      "From product page to delivered order: local pricing, COD checkout, order tracking and owner analytics in one stack.",
    highlights: [
      "Algeria-specific commerce: a 69-wilaya delivery grid, home versus stop-desk rates and cash-on-delivery checkout.",
      "Owner tooling: product and stock CRUD, order pipeline, customer view, marketing, analytics and Excel export.",
      "Retention and reliability: web push for new orders, a Telegram webhook, Facebook Pixel, keep-alive and backup workflows.",
    ],
    tags: ["Next.js", "Supabase", "TypeScript", "Web Push", "ExcelJS"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/maskulino",
    live: "https://maskulino.vercel.app",
    screenshots: shot("maskulino"),
  },
  {
    slug: "profile-agency",
    n: "06",
    eyebrow: "Static landing page",
    title: "ProFile — Career Services Site",
    blurb:
      "A fast, no-build landing page that sells resume, cover-letter and LinkedIn services and sends visitors straight to checkout.",
    summary:
      "ProFile is a deliberately lean static site for a career-services brand. Three service cards explain the offer, each CTA routes to the Fiverr listing, and the whole thing ships as plain HTML/CSS/JS on GitHub Pages — no framework, no build step, no hosting bill.",
    impact:
      "Zero-dependency delivery: instant loads, GitHub Pages hosting and every CTA pointed at conversion.",
    highlights: [
      "Clear offer architecture: resume, motivation letter and LinkedIn profile, each with its own sales copy and CTA.",
      "Lightweight delivery: static HTML/CSS/JS with a custom domain via CNAME — nothing to maintain or patch.",
      "Conversion-first layout: hero promise, service proof and repeated calls to action.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/ProFile",
    live: "https://profile-agency.vercel.app",
    screenshots: shot("profile-agency"),
  },
  {
    slug: "real-estate",
    n: "07",
    eyebrow: "Property portal",
    title: "Property Portal & Lead CRM",
    blurb:
      "A property portal plus lead CRM: searchable listings for buyers, a back office that turns enquiries into pipeline.",
    summary:
      "This platform replaces a static brochure site and WhatsApp-based lead handling. Buyers filter by transaction, property type, wilaya, commune, price and surface; the agency manages listings, media, leads and settings from a protected dashboard. Every enquiry lands in a CRM with status tracking and CSV export.",
    impact:
      "Public search and private CRM in one product — listings, media, leads and reporting without a developer.",
    highlights: [
      "Faceted search over sale/rent, type, wilaya, commune, price, surface, rooms and amenities.",
      "Admin CRUD for listings with image ordering, featured selection, status transitions and a media library.",
      "Lead pipeline with statuses, source tracking, dashboard stats and CSV export; Firebase-backed with a mock-data fallback for demos.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind", "CRM"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/real-estate",
    live: "https://real-estate-eight-opal.vercel.app",
    screenshots: shot("real-estate"),
  },
  {
    slug: "saint-raphael",
    n: "08",
    eyebrow: "Agency website + CRM",
    title: "Saint-Raphaël — Agency Platform",
    blurb:
      "A deployed agency site for Saint-Raphaël in El Biar, with property search and a back office for listings and leads.",
    summary:
      "Saint-Raphaël is the client-branded deployment of the property platform: a French-language agency site with wilaya and commune search, listing detail pages, maps and enquiry forms, backed by an admin console for listings, media, leads and agency settings.",
    impact:
      "A real agency address and contact flow, with a back office that replaces WhatsApp lead tracking.",
    highlights: [
      "Branded for Agence Immobilière Saint-Raphaël in El Biar, with agency contact details and office hours.",
      "The same robust core as the portal: Firebase data layer, protected admin routes, lead statuses and CSV export.",
      "Public pages built for local search: server-rendered listings and per-page metadata.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind", "SEO"],
    company: "Saint-Raphaël",
    logo: null,
    github: "https://github.com/nacermissouni23/saint-raphael",
    live: "https://saint-raphael-chi.vercel.app",
    screenshots: shot("saint-raphael"),
  },
  {
    slug: "techmotordz",
    n: "09",
    eyebrow: "B2B commerce",
    title: "TechMotors DZ — Auto Parts",
    blurb:
      "An auto-parts catalogue and order desk for Algeria, with stock, delivery pricing and a back office built for speed.",
    summary:
      "TechMotors sells parts without forcing customers to create an account. Visitors search a deep catalogue by category, brand, manufacturer and reference, build a cart and order with delivery calculated by wilaya. The team manages products, categories, brands, manufacturers, stock, orders and clients — with Excel and PDF import/export for catalogue and stock work.",
    impact:
      "Catalogue → cart → delivery quote → order, plus the operational tooling a parts business actually runs on.",
    highlights: [
      "Deep catalogue structure: categories, sub-categories, brands, manufacturers and reference-level product pages.",
      "Checkout built for Algeria: guest orders, wilaya-based delivery pricing and direct order or custom-request forms.",
      "Back office: product and stock management, order pipeline, client records, analytics, settings and Excel import/export.",
    ],
    tags: ["Next.js", "Supabase", "TypeScript", "XLSX", "E-commerce"],
    company: "TechMotors DZ",
    logo: null,
    github: "https://github.com/nacermissouni23/techmotordz",
    live: "https://techmotordz.vercel.app",
    screenshots: shot("techmotordz"),
  },
];

export const categories = [
  {
    slug: "ai",
    n: "01",
    title: "AI",
    blurb:
      "Agentic workflows and LLM systems that remove manual work — document processing, support operations, code intelligence and warehouse decisions.",
    tags: ["Agents", "LLMs", "RAG"],
    count: aiProjects.length,
  },
  {
    slug: "data-science",
    n: "02",
    title: "Data Science",
    blurb:
      "Models that earn their place: churn, uplift, forecasting, segmentation and operations research, each validated on held-out data.",
    tags: ["Prediction", "Forecasting", "Analysis"],
    count: dataScienceProjects.length,
  },
  {
    slug: "web-dev",
    n: "03",
    title: "Web Dev",
    blurb:
      "Production web products where the interface, the back office and the business model are designed together.",
    tags: ["Frontend", "Full-stack", "UX"],
    count: webDevProjects.length,
  },
];
