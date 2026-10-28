/**
 * High-level "how it works" diagrams, one per project slug.
 * Coordinates are node centres in the diagram's own viewBox (w × h).
 * Keep them sketch-level: people, one box for the product, a few
 * external pieces, short verb labels on the arrows.
 */

export type NodeKind =
  | "actor" // a person or role
  | "system" // the product itself
  | "secure" // a protective layer around something
  | "model" // an AI / ML model
  | "box" // an external service or platform
  | "blocked" // something deliberately kept out
  | "store" // a database or dataset
  | "doc" // a file or report
  | "note"; // free text, no frame

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  kind: NodeKind;
  x: number;
  y: number;
  /** Fixed width for framed nodes; otherwise sized from the label. */
  w?: number;
  /** Position in the portrait (phone) layout. */
  m?: [number, number];
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  /** Arrowheads on both ends. */
  both?: boolean;
  /** Bend the line; positive and negative bow to opposite sides. */
  curve?: number;
  /** Dashed line with a cross: a path that is never taken. */
  blocked?: boolean;
  /** Nudge the label away from the line's midpoint. */
  lx?: number;
  ly?: number;
  /** Label nudges for the portrait layout. */
  mlx?: number;
  mly?: number;
};

export type Diagram = {
  w: number;
  h: number;
  /** One sentence read by screen readers. */
  alt: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** Portrait canvas for phones; used when every node has an `m` position. */
  mw?: number;
  mh?: number;
};

export const diagrams: Record<string, Diagram> = {
  almouhasib: {
    w: 900,
    h: 420,
    mw: 380,
    mh: 640,
    alt: "Clients send documents to Almouhasib, a local AI model on the accountant's PC reads them with no external API, the accountant approves, and Almouhasib produces an Excel journal.",
    nodes: [
      { id: "client", kind: "actor", label: "Client business", sub: "photo or PDF", x: 100, y: 110, m: [70, 50] },
      { id: "app", kind: "system", label: "Almouhasib", x: 450, y: 110, w: 220, m: [170, 230] },
      { id: "journal", kind: "doc", label: "Excel journal", sub: "ready for the ERP", x: 790, y: 110, m: [310, 50] },
      { id: "model", kind: "model", label: "Local AI model", sub: "on the accountant's PC", x: 450, y: 320, w: 230, m: [150, 420] },
      { id: "cloud", kind: "blocked", label: "External AI APIs", x: 130, y: 320, w: 190, m: [150, 590] },
      { id: "accountant", kind: "actor", label: "Accountant", x: 790, y: 300, m: [320, 340] },
    ],
    edges: [
      { from: "client", to: "app", label: "sends documents", mlx: -22 },
      { from: "app", to: "journal", label: "balanced entries", mlx: 30 },
      { from: "app", to: "model", label: "scans & reads", both: true },
      { from: "model", to: "cloud", label: "nothing leaves", blocked: true },
      { from: "accountant", to: "app", label: "reviews & approves" },
    ],
  },

  "snoc-complaints": {
    w: 900,
    h: 400,
    mw: 380,
    mh: 520,
    alt: "A client emails a problem to the Djezzy Support Agent, which fixes it on the SNOC platform and replies, escalating hard cases to a supervisor.",
    nodes: [
      { id: "client", kind: "actor", label: "Client", x: 70, y: 140, m: [60, 50] },
      { id: "agent", kind: "system", label: "Djezzy Support Agent", sub: "reads · fixes · replies", x: 430, y: 140, w: 260, m: [190, 260] },
      { id: "snoc", kind: "box", label: "SNOC platform", x: 805, y: 140, w: 170, m: [190, 460] },
      { id: "supervisor", kind: "actor", label: "Supervisor", sub: "only the hard cases", x: 430, y: 310, m: [310, 50] },
    ],
    edges: [
      { from: "client", to: "agent", label: "emails a problem", curve: -80 },
      { from: "agent", to: "client", label: "replies with the fix", curve: -80 },
      { from: "agent", to: "snoc", label: "applies the fix", both: true },
      { from: "agent", to: "supervisor", label: "escalates", lx: 46 },
    ],
  },

  hrms: {
    w: 900,
    h: 400,
    mw: 380,
    mh: 600,
    alt: "HR staff ask questions through a security layer that anonymises personal data before it reaches the LLM API and restores it on the way back, while the HR database is only queried read-only.",
    nodes: [
      { id: "llm", kind: "box", label: "LLM API", sub: "sees only placeholders", x: 450, y: 60, w: 220, m: [190, 450] },
      { id: "layer", kind: "secure", label: "Security layer", sub: "anonymise in · de-anonymise out", x: 450, y: 240, w: 330, m: [190, 230] },
      { id: "hr", kind: "actor", label: "HR staff", x: 60, y: 230, m: [70, 50] },
      { id: "db", kind: "store", label: "HR database", x: 830, y: 230, m: [310, 50] },
      { id: "ex", kind: "note", label: "“Ahmed B. · NIN 1099…”  ⇄  “EMP_12 · NIN_A”", x: 450, y: 360, m: [190, 560] },
    ],
    edges: [
      { from: "hr", to: "layer", label: "asks · gets answers", both: true, ly: -22 },
      { from: "layer", to: "llm", label: "masked question & data", curve: 90, lx: 70, mlx: -40 },
      { from: "llm", to: "layer", label: "query & answer", curve: 90, lx: -50, mlx: 50 },
      { from: "layer", to: "db", label: "read-only", both: true, ly: -22 },
    ],
  },

  codivizer: {
    w: 900,
    h: 420,
    mw: 380,
    mh: 560,
    alt: "A developer points Codivizer at a codebase on their own machine; it reads the code, draws an interactive architecture map and can optionally ask an AI for labels using names only.",
    nodes: [
      { id: "dev", kind: "actor", label: "Developer", x: 100, y: 120, m: [70, 50] },
      { id: "sys", kind: "system", label: "Codivizer", sub: "runs on your machine", x: 450, y: 120, w: 240, m: [190, 220] },
      { id: "repo", kind: "store", label: "Codebase", sub: "never uploaded", x: 790, y: 120, m: [310, 50] },
      { id: "map", kind: "doc", label: "Architecture map", sub: "six levels of zoom", x: 250, y: 310, m: [85, 410] },
      { id: "ai", kind: "box", label: "AI labels", sub: "optional · names only", x: 680, y: 320, w: 180, m: [280, 420] },
    ],
    edges: [
      { from: "dev", to: "sys", label: "points at a repo", mlx: -25 },
      { from: "sys", to: "repo", label: "reads & watches", both: true, mlx: 35 },
      { from: "sys", to: "map", label: "draws" },
      { from: "sys", to: "ai", label: "names only", both: true },
    ],
  },

  "rag-optimization": {
    w: 900,
    h: 400,
    mw: 380,
    mh: 640,
    alt: "An employee asks the AI assistant; the Retrieval Optimizer searches company documents, re-ranks the passages and hands the best two to the assistant, which answers.",
    nodes: [
      { id: "user", kind: "actor", label: "Employee", x: 100, y: 100, m: [70, 50] },
      { id: "llm", kind: "model", label: "AI assistant", x: 450, y: 100, w: 210, m: [190, 200] },
      { id: "sys", kind: "system", label: "Retrieval Optimizer", sub: "re-ranks with 26 signals", x: 450, y: 300, w: 280, m: [190, 410] },
      { id: "docs", kind: "store", label: "Company documents", sub: "finance · law · manuals", x: 800, y: 290, m: [190, 560] },
    ],
    edges: [
      { from: "user", to: "llm", label: "asks · gets an answer", both: true },
      { from: "llm", to: "sys", label: "find evidence", curve: 90, lx: -40, mlx: -45 },
      { from: "sys", to: "llm", label: "best 2 passages", curve: 90, lx: 50, mlx: 50 },
      { from: "sys", to: "docs", label: "search", both: true },
    ],
  },

  "top-applicant": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 620,
    alt: "Top Applicant collects job postings, deduplicates and rates them into a clean archive, which will be analysed into a skills roadmap for job seekers.",
    nodes: [
      { id: "li", kind: "box", label: "Job listings", sub: "Data · ML · AI roles", x: 110, y: 120, w: 190, m: [190, 50] },
      { id: "sys", kind: "system", label: "Top Applicant", x: 450, y: 120, w: 220, m: [190, 190] },
      { id: "ds", kind: "store", label: "Clean archive", sub: "deduplicated · rated", x: 790, y: 120, m: [80, 330] },
      { id: "out", kind: "doc", label: "Skills roadmap", sub: "next step", x: 790, y: 320, m: [300, 330] },
      { id: "seeker", kind: "actor", label: "Job seeker", x: 450, y: 320, m: [190, 510] },
    ],
    edges: [
      { from: "li", to: "sys", label: "collects postings" },
      { from: "sys", to: "ds", label: "dedupes & rates" },
      { from: "ds", to: "out", label: "analyse" },
      { from: "out", to: "seeker", label: "what employers want" },
    ],
  },

  "is-viral": {
    w: 900,
    h: 440,
    mw: 380,
    mh: 590,
    alt: "A creator describes a planned post; the Viral Content Predictor, trained on 4,913 past posts, returns a score and its top three reasons, and the creator tweaks and retests.",
    nodes: [
      { id: "creator", kind: "actor", label: "Creator", sub: "or social media team", x: 100, y: 180, m: [70, 150] },
      { id: "sys", kind: "system", label: "Viral Content Predictor", x: 450, y: 180, w: 280, m: [190, 320] },
      { id: "out", kind: "doc", label: "Score + top 3 reasons", x: 790, y: 180, m: [290, 150] },
      { id: "hist", kind: "store", label: "4,913 past posts", x: 450, y: 350, m: [190, 470] },
    ],
    edges: [
      { from: "creator", to: "sys", label: "describes a post", mlx: -30 },
      { from: "sys", to: "out", label: "predicts & explains", mlx: 35 },
      { from: "out", to: "creator", label: "tweak & retest", curve: 150 },
      { from: "hist", to: "sys", label: "learned from" },
    ],
  },

  mobai: {
    w: 900,
    h: 430,
    mw: 380,
    mh: 640,
    alt: "MobAI learns demand from delivery history and suggests orders, storage slots and routes; the supervisor approves or overrides, and employees receive the approved task and route to store and pick in the depot.",
    nodes: [
      { id: "hist", kind: "store", label: "Delivery history", x: 100, y: 120, m: [70, 60] },
      { id: "sys", kind: "system", label: "MobAI", sub: "forecast · slot · route", x: 450, y: 120, w: 240, m: [190, 230] },
      { id: "sup", kind: "actor", label: "Supervisor", x: 790, y: 120, m: [310, 60] },
      { id: "emp", kind: "actor", label: "Warehouse employee", x: 450, y: 320, m: [190, 410] },
      { id: "wh", kind: "box", label: "Depot floors", sub: "2,671 slots", x: 790, y: 330, w: 170, m: [190, 580] },
    ],
    edges: [
      { from: "hist", to: "sys", label: "learns demand" },
      { from: "sys", to: "sup", label: "suggests", curve: -45 },
      { from: "sup", to: "sys", label: "approves / overrides", curve: -45 },
      { from: "sys", to: "emp", label: "approved task + route" },
      { from: "emp", to: "wh", label: "stores & picks" },
    ],
  },

  clv: {
    w: 900,
    h: 420,
    mw: 380,
    mh: 600,
    alt: "Order history goes into the value segmentation, which ranks customers into high, medium and low tiers; the marketing team prioritises them and sends targeted offers to customers.",
    nodes: [
      { id: "orders", kind: "doc", label: "Order history", sub: "17,049 orders", x: 100, y: 120, m: [70, 50] },
      { id: "sys", kind: "system", label: "Value segmentation", x: 450, y: 120, w: 250, m: [190, 220] },
      { id: "tiers", kind: "box", label: "High · Mid · Low", sub: "5,000 customers", x: 790, y: 120, w: 190, m: [190, 360] },
      { id: "crm", kind: "actor", label: "Marketing team", x: 790, y: 310, m: [300, 490] },
      { id: "cust", kind: "actor", label: "Customers", x: 450, y: 310, m: [80, 490] },
    ],
    edges: [
      { from: "orders", to: "sys", label: "aggregates" },
      { from: "sys", to: "tiers", label: "ranks by value" },
      { from: "tiers", to: "crm", label: "prioritise" },
      { from: "crm", to: "cust", label: "targeted offers" },
    ],
  },

  "customer-retention": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 480,
    alt: "Customer records are scored by the churn risk scorer, which gives the retention team risk tiers and actions; the team sends offers and emails to customers, whose behaviour feeds back into the records.",
    nodes: [
      { id: "data", kind: "store", label: "Customer records", x: 100, y: 120, m: [62, 50] },
      { id: "sys", kind: "system", label: "Churn risk scorer", x: 450, y: 120, w: 240, m: [245, 210] },
      { id: "team", kind: "actor", label: "Retention team", x: 790, y: 120, m: [310, 370] },
      { id: "cust", kind: "actor", label: "Customers", sub: "1,042 high-risk first", x: 450, y: 310, m: [62, 370] },
    ],
    edges: [
      { from: "data", to: "sys", label: "scores everyone" },
      { from: "sys", to: "team", label: "risk tiers + actions" },
      { from: "team", to: "cust", label: "offers & emails" },
      { from: "cust", to: "data", label: "behaviour" },
    ],
  },

  iniesta: {
    w: 900,
    h: 420,
    mw: 380,
    mh: 600,
    alt: "Stats and records are collected and normalised into a six-pillar comparison, which produces an interactive report that fans and analysts explore.",
    nodes: [
      { id: "src", kind: "box", label: "Stats & records", sub: "StatsBomb · Transfermarkt", x: 120, y: 120, w: 210, m: [190, 50] },
      { id: "sys", kind: "system", label: "Six-pillar comparison", x: 500, y: 120, w: 260, m: [190, 200] },
      { id: "rep", kind: "doc", label: "Interactive report", x: 800, y: 120, m: [190, 350] },
      { id: "fan", kind: "actor", label: "Fans & analysts", x: 800, y: 320, m: [190, 510] },
    ],
    edges: [
      { from: "src", to: "sys", label: "collect & normalise" },
      { from: "sys", to: "rep", label: "verdict per pillar" },
      { from: "rep", to: "fan", label: "explore" },
    ],
  },

  "pm25-air-quality": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 620,
    alt: "Satellite and weather data feed the PM2.5 estimator, calibrated on ground monitors; it produces daily PM2.5 estimates used by health and environment agencies for alerts and planning.",
    nodes: [
      { id: "sat", kind: "box", label: "Satellite & weather", x: 120, y: 110, w: 210, m: [105, 50] },
      { id: "sens", kind: "store", label: "Ground monitors", sub: "98 locations", x: 120, y: 300, m: [300, 55] },
      { id: "sys", kind: "system", label: "PM2.5 estimator", x: 470, y: 200, w: 230, m: [190, 220] },
      { id: "est", kind: "doc", label: "Daily PM2.5 estimates", x: 800, y: 110, m: [190, 370] },
      { id: "agency", kind: "actor", label: "Health agencies", sub: "alerts & planning", x: 800, y: 300, m: [190, 530] },
    ],
    edges: [
      { from: "sat", to: "sys", label: "feeds" },
      { from: "sens", to: "sys", label: "calibrates" },
      { from: "sys", to: "est", label: "estimates" },
      { from: "est", to: "agency", label: "informs" },
    ],
  },

  "smart-parking": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 500,
    alt: "Arriving drivers get a bay assigned by the bay allocator, which checks and reserves the live bay map and reports EV and waste figures to the car-park operator.",
    nodes: [
      { id: "car", kind: "actor", label: "Arriving drivers", x: 100, y: 130, m: [70, 50] },
      { id: "sys", kind: "system", label: "Bay allocator", sub: "thinks one step ahead", x: 450, y: 130, w: 240, m: [190, 230] },
      { id: "lot", kind: "store", label: "Live bay map", sub: "EV · large · staff", x: 790, y: 130, m: [310, 50] },
      { id: "op", kind: "actor", label: "Car-park operator", x: 450, y: 320, m: [190, 400] },
    ],
    edges: [
      { from: "car", to: "sys", label: "arrive", curve: -45 },
      { from: "sys", to: "car", label: "the right bay", curve: -45 },
      { from: "sys", to: "lot", label: "checks & reserves", both: true },
      { from: "sys", to: "op", label: "EV & waste figures" },
    ],
  },

  "tsac-sales-forecasting": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 610,
    alt: "Weekly sales history trains the sales forecaster, which produces a 20-week forecast with a 95% range; the planning team uses it to plan stock and staff and replenish the stores.",
    nodes: [
      { id: "hist", kind: "store", label: "Weekly sales", sub: "143 weeks", x: 100, y: 120, m: [70, 50] },
      { id: "sys", kind: "system", label: "Sales forecaster", x: 450, y: 120, w: 230, m: [190, 210] },
      { id: "fc", kind: "doc", label: "20-week forecast", sub: "with a 95% range", x: 790, y: 120, m: [190, 360] },
      { id: "plan", kind: "actor", label: "Planning team", x: 790, y: 310, m: [80, 520] },
      { id: "stores", kind: "actor", label: "Stores", x: 450, y: 310, m: [300, 520] },
    ],
    edges: [
      { from: "hist", to: "sys", label: "learns seasonality" },
      { from: "sys", to: "fc", label: "forecasts" },
      { from: "fc", to: "plan", label: "plan stock & staff" },
      { from: "plan", to: "stores", label: "replenish" },
    ],
  },

  "uplift-modeling": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 610,
    alt: "The uplift scorer scores every client in the base and ranks them into a call list by lift; the campaign team calls the persuadable clients first.",
    nodes: [
      { id: "base", kind: "store", label: "Client base", sub: "45,211 clients", x: 100, y: 120, m: [70, 50] },
      { id: "sys", kind: "system", label: "Uplift scorer", x: 450, y: 120, w: 220, m: [190, 210] },
      { id: "list", kind: "doc", label: "Ranked call list", sub: "by lift, in deciles", x: 790, y: 120, m: [190, 360] },
      { id: "mkt", kind: "actor", label: "Campaign team", x: 790, y: 310, m: [80, 520] },
      { id: "tgt", kind: "actor", label: "Persuadable clients", x: 450, y: 310, m: [290, 520] },
    ],
    edges: [
      { from: "base", to: "sys", label: "scores each client" },
      { from: "sys", to: "list", label: "ranks by lift" },
      { from: "list", to: "mkt", label: "top deciles first" },
      { from: "mkt", to: "tgt", label: "calls" },
    ],
  },

  "adaptive-exam-active-learning": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 500,
    alt: "The teacher sets a quiz; the adaptive quiz engine asks the student one question at a time, asks the answer predictor how sure it is, and stops when confident with an estimated score.",
    nodes: [
      { id: "prof", kind: "actor", label: "Teacher", x: 100, y: 120, m: [70, 50] },
      { id: "sys", kind: "system", label: "Adaptive quiz engine", x: 450, y: 120, w: 270, m: [190, 220] },
      { id: "stu", kind: "actor", label: "Student", x: 790, y: 120, m: [310, 50] },
      { id: "model", kind: "model", label: "Answer predictor", x: 450, y: 320, w: 220, m: [130, 400] },
      { id: "rep", kind: "doc", label: "Estimated score", sub: "after ~10 of 30", x: 790, y: 310, m: [320, 390] },
    ],
    edges: [
      { from: "prof", to: "sys", label: "sets the quiz", mlx: -25 },
      { from: "sys", to: "stu", label: "next question · answer", both: true, mlx: 30 },
      { from: "sys", to: "model", label: "how sure?", both: true, mlx: -30 },
      { from: "sys", to: "rep", label: "stops when confident", mlx: 40 },
    ],
  },

  "auto-manager": {
    w: 900,
    h: 420,
    mw: 380,
    mh: 620,
    alt: "The rental desk records rentals and payments in the Auto Manager mobile app, which saves everything on the phone, syncs to the cloud when online and exports PDF reports.",
    nodes: [
      { id: "staff", kind: "actor", label: "Rental desk", x: 100, y: 130, m: [70, 50] },
      { id: "app", kind: "system", label: "Auto Manager", sub: "mobile app", x: 450, y: 130, w: 220, m: [190, 210] },
      { id: "cloud", kind: "box", label: "Cloud", sub: "syncs when online", x: 790, y: 130, w: 160, m: [290, 380] },
      { id: "phone", kind: "store", label: "On the phone", sub: "works offline", x: 300, y: 320, m: [80, 380] },
      { id: "pdf", kind: "doc", label: "PDF reports", x: 620, y: 320, m: [190, 540] },
    ],
    edges: [
      { from: "staff", to: "app", label: "rentals & payments" },
      { from: "app", to: "cloud", label: "sync", both: true },
      { from: "app", to: "phone", label: "saves instantly", both: true },
      { from: "app", to: "pdf", label: "exports" },
    ],
  },
};
