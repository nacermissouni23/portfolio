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
  eyebrow: "Content intelligence",
  title: "Viral Content Predictor",
  blurb:
    "Know how a post will perform before you hit publish, and what's holding it back.",
  summary:
    "Creators and social media teams publish on instinct and find out a day later whether it worked. The Viral Content Predictor flips that: describe a planned post (platform, format, topic, timing and audience size) and it returns an engagement score with the three factors pushing it up or down. Change the plan, run it again, and see the difference before a single follower does.",
  impact:
    "Explains 74% of the variation in engagement on posts it has never seen, and says why for every prediction.",
  highlights: [
    "Learned from 4,913 posts across platforms, formats, topics and audience sizes.",
    "Every score comes with its reasons: the top three drivers, in plain language.",
    "Built for marketers, not data scientists: a simple app to test an idea, tweak it and compare.",
  ],
  tags: ["Python", "XGBoost", "Streamlit", "scikit-learn"],
  company: "Personal",
  logo: null,
  github: "https://github.com/nacermissouni23/isViral",
};

const topApplicant: Omit<Project, "n"> = {
  slug: "top-applicant",
  eyebrow: "Career intelligence",
  title: "Top Applicant",
  blurb:
    "What do employers really want from a Data, ML or AI candidate? Let the job postings answer.",
  summary:
    "Career advice in AI is mostly opinion. Top Applicant goes to the source: it collects real job postings for data science, machine learning and AI roles, removes duplicates, rates the quality of every record and builds a clean archive of what employers actually ask for: the foundation for a data-driven roadmap of the skills that make a top applicant.",
  impact:
    "700 postings across 7 AI and data roles collected in about an hour, with zero failed requests.",
  highlights: [
    "Resilient by design: it saves its progress, resumes after interruptions and backs off politely when rate-limited.",
    "Clean from the start: every posting is fingerprinted, deduplicated and given a quality rating.",
    "Next step: skill and role analysis on top of the archive, turning postings into a career roadmap.",
  ],
  tags: ["Python", "Web scraping", "Data quality"],
  company: "Personal",
  logo: null,
  github: "https://github.com/nacermissouni23/top-applicant",
};

export const aiProjects: Project[] = [
  {
    slug: "almouhasib",
    n: "01",
    eyebrow: "Private AI bookkeeping",
    title: "Almouhasib",
    blurb:
      "From a client's phone photo to a balanced journal, with AI that never leaves the accountant's office.",
    summary:
      "Accounting firms lose their days chasing paperwork and retyping invoices. With Almouhasib, clients send their documents straight from their phone, a local AI model reads them on the accountant's own machine, and the platform drafts the journal entries ready for review. No document is ever sent to an external AI API, so client data stays inside the firm, in line with Algeria's personal data protection law (Law 18-07).",
    impact:
      "Less chasing, no retyping: documents in, journals out, and confidential data never leaves the firm.",
    highlights: [
      "Clients send directly: a simple mobile portal replaces WhatsApp photos, email threads and paper folders.",
      "Local AI, zero external APIs: scanning and extraction run on the accountant's PC, so nothing confidential reaches a third-party model.",
      "The accountant stays in control: every figure is checked against the original, journals are balanced before export, and the Excel output imports straight into the firm's ERP.",
    ],
    tags: ["Next.js", "TypeScript", "Local OCR", "On-device AI", "Excel"],
    company: "AlMouhasib",
    logo: "/logos/almouhasib.png",
  },
  {
    slug: "snoc-complaints",
    n: "02",
    eyebrow: "Agentic support",
    title: "Djezzy Support Agent",
    blurb:
      "An AI agent that reads support emails, fixes the problem and writes back before a human ever opens the inbox.",
    summary:
      "Djezzy's technical support team handled a constant stream of emails from the field by hand, around the clock: locked accounts, forgotten passwords, VPN access, OTP numbers to update. This agent reads every email, understands the request (even in mixed French and Darija), checks that the sender is authorised, applies the fix on the support platform and replies with the result. When a detail is missing, it asks for it. When a case is out of scope, it escalates to a supervisor with the full context.",
    impact:
      "Routine requests resolved end to end, automatically. The support team only handles the cases that truly need a human.",
    highlights: [
      "Reads, decides, acts: a 19-step workflow covers understanding, verification, execution and reply for four request types.",
      "Knows when to stop: missing information triggers a follow-up email, and anything ambiguous or unauthorised goes to a supervisor. The agent never guesses.",
      "Built to run: 400+ tests, a parallel processing queue, full tracing of every decision and an operations dashboard for the team.",
    ],
    tags: ["LangGraph", "Python", "FastAPI", "PostgreSQL", "React"],
    company: "Djezzy",
    logo: "/logos/djezzy.webp",
  },
  {
    slug: "hrms",
    n: "03",
    eyebrow: "Privacy-first AI",
    title: "HRMS",
    blurb:
      "Ask your HR data anything in plain language, without a single name, ID or phone number reaching the AI.",
    summary:
      "Algérie Télécom's HR department wanted an AI assistant over its employee records, but personal data can't be handed to a cloud provider, and hosting a private LLM is expensive. HRMS solves this with a security layer between the app and the LLM API: every name, national ID, phone number and address is swapped for an anonymous token before it reaches the model, both in the user's question and in the database results. It is restored on the way back, in the queries the AI generates and in the final answer. HR staff get real answers about real people, while the AI only ever sees placeholders.",
    impact:
      "The power of a cloud LLM at a fraction of the cost of self-hosting, with zero personal data exposed.",
    highlights: [
      "Two-way anonymisation: personal data is masked going into the LLM and restored coming out, across prompts, database results, generated queries and answers.",
      "Read-only by design: the AI can only run guarded, read-only queries, so it can analyse the HR database but never change it.",
      "A complete HR platform around it: employees, contracts, recruitment, training and absences, with OCR form filling, official Word documents and a portable desktop build.",
    ],
    tags: ["Anonymisation", "LLM API", "React", "SQLite", "Electron"],
    company: "Algérie Télécom",
    logo: "/logos/algerie-telecom.png",
  },
  {
    slug: "codivizer",
    n: "04",
    eyebrow: "Developer tooling",
    title: "Codivizer",
    blurb:
      "Drop into any codebase and see how it works in minutes, without your code ever leaving your machine.",
    summary:
      "Joining a new project usually means days of reading files to build a mental map. Codivizer builds that map for you. Point it at a repository and it opens an interactive view of the system: from a one-paragraph overview, to the outside services it talks to, its components and dependencies, down to a single function and everything that calls it. It runs entirely on your machine, stays in sync as you edit, and can optionally add plain-English labels using only folder and function names, never your source code.",
    impact:
      "35 programming languages, six levels of zoom, one command, and your code never leaves the laptop.",
    highlights: [
      "From the big picture to one line: six views that go from a repository brief to a function's callers, callees and source.",
      "Follow the flow: trace what happens from an entry point, step by step, through the codebase.",
      "Private by default: everything is computed locally; the optional AI labels see names only, never code.",
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
      "AI assistants are only as good as the passages they're given. This picks better ones.",
    summary:
      "When a company AI assistant answers from the wrong paragraph, the answer is wrong, however good the model. Working on 7,481 real questions over finance reports, legal texts, manuals and research papers, our team set out to fix the search step. My part was the re-ranker: a model that looks at the passages a keyword search returns, scores each one on 26 relevance signals and hands the assistant only the best two.",
    impact:
      "Retrieval quality up from 80.3% to 83.1% across 7,481 questions, with the biggest gain on finance documents.",
    highlights: [
      "26 relevance signals, from word coverage to meaning similarity, learned from about 150,000 question–passage pairs.",
      "The biggest win where it hurts most: finance retrieval improved from 62.3% to 66.8%.",
      "A team project at ENSIA: I built the re-ranker; teammates explored association rules and clustering to repair weak passages.",
    ],
    tags: ["Python", "scikit-learn", "LlamaIndex", "BM25"],
    company: "ENSIA",
    logo: null,
    github: "https://github.com/nacermissouni23/RAG-Optimization",
  },
  { ...topApplicant, n: "06" },
  { ...isViral, n: "07" },
  {
    slug: "mobai",
    n: "08",
    eyebrow: "Warehouse AI",
    title: "MobAI",
    blurb:
      "AI plans tomorrow's orders, picks the right shelf and draws the route, and a supervisor has the final word.",
    summary:
      "Built in a hackathon for BMS Electric's depot, MobAI runs the warehouse from goods received to goods delivered. Each day it forecasts the next day's preparation orders from delivery history. When stock arrives, it suggests where to store it, weighing distance to the lift, weight, volume and fragile items. When it's time to pick, it plans the routes and flags trolleys that would cross paths. Supervisors approve or override every suggestion; employees simply see a clear task on their phone.",
    impact:
      "AI suggests, people decide: forecasting, storage and routing across 2,671 slots on 4 floors, with a human sign-off on every move.",
    highlights: [
      "Three AI helpers in one app: next-day demand forecasts, smart storage slots and conflict-aware picking routes.",
      "Humans in control: supervisors validate or override, with the reason logged; employees only see approved tasks.",
      "Made for the warehouse floor: a mobile app with role-based screens that keeps working offline and syncs later.",
    ],
    tags: ["Flutter", "Python", "FastAPI", "Firebase", "Forecasting"],
    company: "BMS Electric",
    logo: null,
    github: "https://github.com/nacermissouni23/MobAI",
  },
];

export const dataScienceProjects: Project[] = [
  {
    slug: "clv",
    n: "01",
    eyebrow: "Customer value",
    title: "Customer Value Segmentation",
    blurb:
      "Find the customers who carry your revenue, so the retention budget goes where it pays back.",
    summary:
      "Most shops treat every customer the same, so their best buyers get the same emails as one-time visitors. This project turns 17,049 orders into a clear picture of 5,000 customers (how much they spend, how often they buy and how recently they came back) and groups them into high, medium and low value, each with a profile a marketing team can act on.",
    impact:
      "The top tier spends 17× more than the bottom one: 9,930 versus 578 on average.",
    highlights: [
      "From raw orders to customer profiles: spend, frequency, recency and favourite categories for every customer.",
      "Three clear tiers: 1,650 high-value, 1,700 medium and 1,650 low-value customers.",
      "Know where the money is: Electronics and Istanbul lead revenue, so campaigns know where to start.",
    ],
    tags: ["Python", "Pandas", "Segmentation", "Matplotlib"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/CLV",
  },
  {
    slug: "customer-retention",
    n: "02",
    eyebrow: "Churn prevention",
    title: "Churn Prediction & Retention Plays",
    blurb:
      "Spot the customers about to leave, and know exactly what to do about each one.",
    summary:
      "Losing a subscriber costs far more than keeping one, but a retention team can't call everybody. This system scores every customer of a telecom operator on how likely they are to leave, then sorts them into three groups with a ready action: a retention offer for the high-risk, engagement emails for the medium-risk, and no spend on the rest.",
    impact:
      "Tells leavers from stayers with 0.84 AUC, and turns 7,043 customers into a list of 1,042 to save first.",
    highlights: [
      "Two models compared head to head, and the simpler, easier-to-explain one won.",
      "A clear action per group: 1,042 high-risk, 1,032 medium-risk and 4,969 low-risk customers.",
      "Explains why people leave: month-to-month contracts and fibre-optic service are the strongest warning signs.",
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
    title: "Iniesta vs Zidane",
    blurb:
      "Football's favourite argument, settled with evidence instead of opinion.",
    summary:
      "Football debates are usually won by whoever shouts loudest. This project settles one with data: it compares Iniesta and Zidane across six dimensions (attack, possession, defence, big-match impact, consistency and trophies) using event data, match records and honours. Instead of forcing a winner, it shows where each player truly leads, in an interactive report anyone can explore.",
    impact:
      "1,574 matches, six dimensions, one honest verdict: each legend wins in different places.",
    highlights: [
      "Head to head: Zidane scores more often (0.21 vs 0.13 goals per 90); Iniesta creates more (163 vs 129 assists) and wins more (19 vs 9 major honours).",
      "Fair by design: no arbitrary weighting, and the gaps in older match data are stated, not hidden.",
      "A self-contained interactive report with radar, timeline and big-match visuals.",
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
    eyebrow: "Environmental AI",
    title: "PM2.5 Air Quality Estimator",
    blurb:
      "Estimates daily air pollution from satellite and weather data, validated on a future it never saw.",
    summary:
      "Air-quality monitors are expensive, so they're sparse, and decisions about health alerts and traffic need more than a handful of readings. This model estimates daily fine-particle pollution (PM2.5) by combining satellite measurements of aerosols and gases with weather data, trained on about 41,000 daily readings from 98 locations. It's evaluated the honest way: trained on the past, tested on a later period it never saw.",
    impact:
      "On unseen future data: R² 0.46 and an average error of 3.4 µg/m³, reported exactly as measured.",
    highlights: [
      "Satellite, weather and ground truth combined: aerosol, NO₂, CO and ozone readings merged with daily meteorology.",
      "No peeking at the future: a strict time-based split keeps the evaluation honest.",
      "Tuned automatically, then explained: a ranking of which inputs actually move the estimate.",
    ],
    tags: ["Python", "Optuna", "scikit-learn", "Earth Engine"],
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
      "Sends every arriving car to the right bay and stops wasting EV chargers and large spaces.",
    summary:
      "In a busy multi-level car park, bays go first come, first served: electric cars end up far from chargers, small cars take large bays and staff hold the best spots all day. This team project simulates a full day of 1,000 arrivals across 10 car parks and assigns each car a bay the moment it arrives, while anticipating who comes next. Six allocation strategies were compared against the first-come baseline.",
    impact:
      "More than twice as many electric cars get a charger (24% → 58%), and idle chargers drop from 25% to 7%.",
    highlights: [
      "Smarter by thinking ahead: keeping scarce bays for the cars that need them beat even exact, minute-by-minute solvers.",
      "Fast enough for the gate: 0.17 seconds per car park, against 6.4 seconds for the exact method.",
      "Clear trade-offs: staff are deliberately parked further away to free premium bays for visitors.",
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
      "Know next season's sales before they happen, with a range planners can trust.",
    summary:
      "Stock, staffing and budgets all hang on one question: how much will we sell? This project learns the weekly rhythm of Walmart's sales (seasons, holidays and the year-end rush) from almost three years of history, compares three forecasting approaches on six months they never saw, and produces a 20-week forecast with a confidence range.",
    impact:
      "Off by just 2.4% on average across 26 unseen weeks, and it sees the Thanksgiving spike coming.",
    highlights: [
      "Tested like a real forecast: trained on the past and judged on the 26 weeks that followed.",
      "Three approaches compared (ARIMA, SARIMA and Prophet), with SARIMA chosen for keeping large misses smallest.",
      "Planning-ready output: weekly figures with a 95% range, including the holiday peak (about 67M against 49M in a normal week).",
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
      "Call the customers your campaign will actually convince, not the ones who'd say yes anyway.",
    summary:
      "Classic marketing models find who is likely to buy, including people who would buy without a call. Uplift modelling asks a better question: who buys because we called? Using 45,211 bank-marketing records, this project compares clients reached through a known contact channel with those who weren't, estimates each client's lift and ranks the whole base into a prioritised call list.",
    impact:
      "Contacted clients responded more than 3× as often (14.9% vs 4.1%). The model finds who that lift comes from.",
    highlights: [
      "Two models, one question: the chance of a yes with contact versus without, scored for every client.",
      "A ranked call list in deciles, so the budget goes to the top of the list first.",
      "Honest about limits: the contact channel stands in for a true control group, so scores guide priorities rather than prove cause.",
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
      "Shorter exams, same insight: a student's score estimated after about a third of the questions.",
    summary:
      "A fixed quiz wastes students' time on questions that tell the teacher nothing new. This engine asks each student the question it is least sure they'll get right, learns from the answer and stops as soon as it is confident. Built by our team at ENSIA on real Data Mining quizzes: 121 students, 150 questions and 17,340 answers.",
    impact:
      "About 10 questions instead of 30, with the final score estimated within about 6 points out of 100.",
    highlights: [
      "Asks the most informative question next, matched to each student's level.",
      "Knows what students know: 0.87 AUC at predicting whether an answer will be right.",
      "Trained on real classroom data, not synthetic quizzes.",
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
    title: "AL Djisr",
    blurb:
      "A training-centre website built to be found on Google and turn visitors into enrolments.",
    summary:
      "AL Djisr, a training centre in Bab Ezzouar, needed students, not just a brochure. The site presents its courses in Machine Learning, Networks, Business English and Web development, answers questions before they're asked and makes it effortless to enquire or register. Every enquiry is checked, protected from spam and delivered straight to the centre's advisors, who call back within 24 hours.",
    impact:
      "From a Google search to an advisor's inbox in one step, with the spam filtered out on the way.",
    highlights: [
      "Built to rank: structured data for courses, FAQs and articles makes every programme eligible for rich Google results.",
      "Every lead counts: validated forms with spam protection, instant delivery by email and webhook, plus WhatsApp and phone shortcuts.",
      "Measured: visits and enquiries are tracked in Google Analytics.",
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
    title: "Auto Manager",
    blurb:
      "Run a car-rental agency from a phone, even when the internet drops.",
    summary:
      "Small rental agencies in Algeria live with patchy connections, paper notebooks and spreadsheets. Auto Manager, built as a team, puts the whole rental desk in one mobile app: fleet, customers, rentals and payments. Everything is saved on the phone first and synced to the cloud when the connection returns, so the counter never stops.",
    impact:
      "Offline-first: the agency keeps renting when the network doesn't.",
    highlights: [
      "Works without signal: data lives on the device and syncs in the background.",
      "The whole desk in one place: fleet availability, customers, rentals, payments and activity history.",
      "Arabic, French and English, PDF exports for reports and payment statements, and a backend covered by 69 tests.",
    ],
    tags: ["Flutter", "Flask", "Firebase", "SQLite", "Dart"],
    company: "Personal",
    logo: null,
    github: "https://github.com/houaria617/auto_manager",
  },
  {
    slug: "chifa",
    n: "03",
    eyebrow: "Healthcare website",
    title: "Clinique Douaa",
    blurb:
      "A bilingual clinic website that turns visitors into booking requests, sent straight to the clinic's WhatsApp.",
    summary:
      "Clinique Douaa's patients found it by word of mouth and booked by phone. The new site presents its 12 nutrition programmes in French and Arabic, builds trust with reviews and answers to common questions, and lets patients request a slot in a few taps. Each request gets a reference number and lands on the clinic's WhatsApp, where the team already works.",
    impact:
      "Twelve programmes, two languages and a booking path that ends where the clinic already answers: WhatsApp.",
    highlights: [
      "Fully bilingual, including right-to-left Arabic.",
      "Booking in a few taps, handed to WhatsApp with a reference number.",
      "An admin console prototype showing how appointments, patients, reviews and analytics will be managed.",
    ],
    tags: ["Next.js", "TypeScript", "i18n", "Tailwind"],
    company: "Clinique Douaa",
    logo: null,
    github: "https://github.com/nacermissouni23/Chifa",
    live: "https://chifa-five.vercel.app",
    screenshots: shot("chifa"),
  },
  {
    slug: "clinic",
    n: "04",
    eyebrow: "Dental clinic website",
    title: "Better Smile Clinic",
    blurb:
      "A dental clinic website that shows real results and makes booking a visit effortless.",
    summary:
      "Better Smile Clinic in Hydra wanted patients to see its work before walking in. The site presents 12 dental services, from scaling to implants, aligners and emergencies, in French and Arabic, with real before-and-after results and patient reviews. Booking takes a few taps and lands with reception on WhatsApp.",
    impact:
      "Real results up front and booking in a few taps, built to fill the chair.",
    highlights: [
      "Twelve services, each with its own page.",
      "Trust that converts: a before-and-after gallery and patient reviews.",
      "Bilingual French and Arabic, WhatsApp booking hand-off and an admin console prototype.",
    ],
    tags: ["Next.js", "TypeScript", "i18n", "Tailwind"],
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
    title: "Maskulino",
    blurb:
      "A menswear store built for how Algeria shops: on the phone, cash on delivery, all 69 wilayas.",
    summary:
      "Algerian shoppers arrive from social ads, buy on their phones and pay when the parcel arrives. Maskulino is built around exactly that. Customers pick a size and colour, see the delivery price for their commune (home or stop-desk) and order without an account. The owner gets an instant Telegram and push alert with call and WhatsApp buttons, confirms by phone, then moves the order through preparation, shipping and delivery with the carrier's tracking number.",
    impact:
      "From ad click to delivered parcel, with the owner alerted the second an order lands.",
    highlights: [
      "Local by design: 69 wilayas, 1,541 communes and Yalidine and ZR Express rates for home and stop-desk delivery.",
      "Never miss an order: Telegram and web-push alerts with one-tap call and WhatsApp.",
      "An owner back office: products and stock, an 8-step order pipeline, customers, Meta Pixel and Excel exports, with automated backups.",
    ],
    tags: ["Next.js", "Supabase", "TypeScript", "Telegram", "Web Push"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/maskulino",
    live: "https://maskulino.vercel.app",
    screenshots: shot("maskulino"),
  },
  {
    slug: "real-estate",
    n: "06",
    eyebrow: "Property portal",
    title: "Property Portal & Lead CRM",
    blurb:
      "Buyers find the right property; the agency never loses a lead again.",
    summary:
      "Algerian agencies often run on a brochure site and a WhatsApp inbox, and leads slip through the cracks. This platform gives buyers and renters a searchable catalogue (by wilaya, sale or rent, property type and price) with a map and an enquiry form on every listing. Every enquiry lands in the agency's dashboard, where staff follow it from new to contacted to converted, publish or archive listings and export leads.",
    impact:
      "Every enquiry captured, tracked and exportable, instead of buried in WhatsApp.",
    highlights: [
      "Search that matches how people look: wilaya, sale or rent, property type and price range.",
      "A simple lead pipeline (new, contacted, converted, closed) with the source of every lead.",
      "An agency dashboard with key figures, listing controls and CSV export; runs on Firebase or in demo mode.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind", "CRM"],
    company: "Personal",
    logo: null,
    github: "https://github.com/nacermissouni23/real-estate",
    live: "https://real-estate-eight-opal.vercel.app",
    screenshots: shot("real-estate"),
  },
  {
    slug: "techmotordz",
    n: "07",
    eyebrow: "Auto-parts e-commerce",
    title: "TechMotors DZ",
    blurb:
      "Find the right car part by brand, category or reference, and order it without an account.",
    summary:
      "Drivers and mechanics waste hours calling shops to ask whether a part is in stock. TechMotors puts the catalogue online: search by vehicle brand, category or reference, add to cart and order as a guest, with delivery priced for every commune in Algeria. Can't find it? A “find my part” request goes straight to the shop. Orders are confirmed on WhatsApp and managed by the team on a kanban board.",
    impact:
      "A deep parts catalogue, delivery to all 69 wilayas and no account needed to order.",
    highlights: [
      "Built for parts: 8 categories, 71 sub-families and 51 vehicle brands.",
      "Checkout for Algeria: guest orders with home or stop-desk delivery at Yalidine and ZR Express rates.",
      "A back office with stock, an order kanban, clients and analytics on confirmation, delivery and return rates.",
    ],
    tags: ["Next.js", "Supabase", "TypeScript", "E-commerce"],
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
      "Agents and private AI that take real work off people's plates: bookkeeping, customer support, HR data, warehouses and code.",
    tags: ["Agents", "LLMs", "Privacy"],
    count: aiProjects.length,
  },
  {
    slug: "data-science",
    n: "02",
    title: "Data Science",
    blurb:
      "Models that answer business questions: who will leave, who to call, what will sell and where the value is.",
    tags: ["Prediction", "Forecasting", "Analysis"],
    count: dataScienceProjects.length,
  },
  {
    slug: "web-dev",
    n: "03",
    title: "Web Dev",
    blurb:
      "Websites and stores built to bring in customers, and the back offices that keep the business running.",
    tags: ["Frontend", "Full-stack", "UX"],
    count: webDevProjects.length,
  },
];
