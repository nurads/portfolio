import gumisofts from "./gumisofts.json";

/**
 * Case studies mirrored from gumisofts.com/work (see scripts/fetch-gumisofts.mjs)
 * merged with the projects that only live here.
 *
 * Every entry ends up in the same shape:
 *   slug, title, tagline, description, categories[], technologies[], features[],
 *   problem, problemPoints[], solution, solutionPoints[],
 *   image, screenshots[], liveLink, githubLink, storeLinks[], featured
 */

export const CATEGORIES = ["All", "Web", "Mobile", "Education"];

const asset = (path) => (path ? `/${path.replace(/^\//, "")}` : null);

const deriveCategories = (category) => {
  const value = (category ?? "").toLowerCase();
  const categories = [];
  if (value.includes("web")) categories.push("Web");
  if (value.includes("mobile")) categories.push("Mobile");
  if (value.includes("education")) categories.push("Education");
  return categories.length ? categories : ["Web"];
};

/**
 * Fills the gaps in the upstream data. The Gumisofts API has no cover image for
 * AderoTech or Dabbaal, and it doesn't track source repositories at all.
 */
const overrides = {
  "aderotech-digital-solutions": {
    title: "Adero.tech",
    tagline: "Marketing and product site for Adero Tech",
    image: "/projects/a91b22cd369f9860004e169bdb8077d0bf7ca479.png",
  },
  "dabbaal-tour-and-travels": {
    title: "Dabbaal Tour and Travels",
    tagline: "Tour packages, online booking, and a destination gallery",
    image: "/projects/61897b084c95aa68778a64ff7d9fba2474a4245b.png",
  },
  "temarico-national-exam-prep": {
    title: "TemariCo Mobile App",
    tagline: "National exam prep for Ethiopian high school students",
    categories: ["Mobile", "Education"],
  },
  "entrance-tricks-grade-9-12": {
    tagline: "Study smarter for Grade 9-12 entrance exams",
    categories: ["Mobile", "Education"],
  },
  "bita-business-application": {
    title: "Bita Business",
  },
  "savana-online-marketplace": {
    title: "Savana Online Marketplace",
  },
};

const fromCaseStudy = (study) => {
  const override = overrides[study.slug] ?? {};

  return {
    slug: study.slug,
    title: override.title ?? study.title,
    tagline: override.tagline || study.tagline,
    description: study.description,
    categories: override.categories ?? deriveCategories(study.category),
    technologies: study.technologies,
    features: study.features,
    problem: study.problem,
    problemPoints: study.problemPoints,
    solution: study.solution,
    solutionPoints: study.solutionPoints,
    image: override.image ?? asset(study.image),
    screenshots: study.screenshots.map(asset),
    liveLink: study.demoUrl,
    githubLink: override.githubLink ?? study.githubUrl,
    featured: study.isFeatured,
  };
};

/** Projects that predate the Gumisofts case studies and have no upstream entry. */
const localOnly = [
  {
    slug: "cribcrm",
    title: "CribCRM",
    tagline: "All-in-one community platform with a built-in AI assistant",
    description:
      "CribCRM replaces the stack of tools community builders normally juggle — funnels, courses, email, booking, payments, and a CRM — with a single platform on web, iOS, and Android. My work was the AI assistant: integrating OpenAI so members can chat with it from anywhere in the product.",
    categories: ["Web", "Mobile"],
    technologies: ["React", "Fastify", "PostgreSQL", "OpenAI", "Stripe"],
    features: [
      "Chat-based AI assistant in both the web app and the mobile app",
      "Lead summaries and content drafts generated from CRM data",
      "Funnels and landing pages built with a visual editor",
      "Courses with topics, multiple videos per lesson, and completion tracking",
      "Bookings, payments, and checkout through Stripe Connect",
      "QR-code sign-in that pairs the mobile app with a desktop session",
    ],
    problem:
      "Community builders run their business across five subscriptions that never talk to each other: a page builder, a booking tool, a video host, an email platform, and a spreadsheet standing in for a CRM.",
    problemPoints: [
      "A separate login and separate billing for every tool in the stack",
      "Leads captured in one product had to be re-entered somewhere else",
      "No single view of how a member moved from lead to trained team member",
    ],
    solution:
      "One platform where signup flows into automation, automation triggers email, and the pipeline unlocks training. My part sits on top of that data — an OpenAI-backed assistant reachable from web and mobile.",
    solutionPoints: [
      "Integrated OpenAI behind a dedicated Assistant tab in the web and mobile apps",
      "Connected the assistant to CRM context so it can summarize a lead and draft the follow-up",
      "Answered product questions in place, so members get help without leaving the app",
    ],
    image: "/projects/cribcrm/cover.webp",
    screenshots: [
      "/projects/cribcrm/community.webp",
      "/projects/cribcrm/assistant.webp",
      "/projects/cribcrm/events.webp",
      "/projects/cribcrm/web-duplication.webp",
      "/projects/cribcrm/welcome.webp",
      "/projects/cribcrm/qr-login.webp",
    ],
    liveLink: "https://cribcrm.com",
    githubLink: null,
    storeLinks: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/crib-crm/id6748067130",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.cribcrm.app",
      },
    ],
    featured: true,
  },
  {
    slug: "gumisofts-com",
    title: "Gumisofts.com",
    tagline: "Agency site with a blog and client application tracker",
    description:
      "My software agency website — includes a blog and an application tracker for client projects.",
    categories: ["Web"],
    technologies: ["Next.js", "PostgreSQL", "Django"],
    features: [],
    problem: "",
    problemPoints: [],
    solution: "",
    solutionPoints: [],
    image: "/projects/gumisofts-com.webp",
    screenshots: [],
    liveLink: "https://gumisofts.com",
    githubLink: "https://github.com/nurads/gumisofts_website",
    featured: false,
  },
  {
    slug: "azcare-ai",
    title: "Azcare.ai",
    tagline: "AI-powered clinic search and appointment booking",
    description:
      "Healthcare marketplace with AI-powered clinic search, real-time appointment booking, and location-based discovery.",
    categories: ["Web"],
    technologies: ["FastAPI", "React", "PostgreSQL", "AWS"],
    features: [],
    problem: "",
    problemPoints: [],
    solution: "",
    solutionPoints: [],
    image: "/projects/azcare.png",
    screenshots: [],
    liveLink: "https://azcare.ai",
    githubLink: null,
    featured: false,
  },
  {
    slug: "temarico-com",
    title: "Temarico.com",
    tagline: "Web platform for an Ethiopian EdTech company",
    description:
      "Web platform for Temarico, an Ethiopian EdTech company. Blog, CMS, and course management.",
    categories: ["Web", "Education"],
    technologies: ["React", "Django", "PostgreSQL", "AWS"],
    features: [],
    problem: "",
    problemPoints: [],
    solution: "",
    solutionPoints: [],
    image: "/projects/1ffb9211103a5f491d205c97c7ff3dc343351b59.png",
    screenshots: [],
    liveLink: "https://temarico.com",
    githubLink: null,
    featured: false,
  },
];

/** Only CribCRM ships an app store listing, so the rest fall back to an empty list. */
const withDefaults = (project) => ({ storeLinks: [], ...project });

export const projects = [...gumisofts.map(fromCaseStudy), ...localOnly].map(
  withDefaults,
);

export const hasCaseStudy = (project) =>
  Boolean(project.problem || project.solution || project.screenshots.length);
