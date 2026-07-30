/** Roles in reverse-chronological order; the first entry is the current one. */
export const workExperiences = [
  {
    title: "Backend Engineer",
    company: "Ideeza",
    location: "Remote",
    roles: [
      "Develop enterprise financial and accounting systems with Django and PostgreSQL.",
      "Built double-entry accounting, payroll, reporting, and multi-currency finance modules.",
      "Designed scalable REST APIs and asynchronous processing using Celery and Redis.",
      "Improved backend performance through database optimization, caching, and infrastructure tuning.",
      "Collaborated with frontend and DevOps teams to deliver production-ready enterprise features.",
    ],
    startDate: new Date(2026, 6), // Update to your actual start month
    endDate: null,
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "AWS",
      "GitLab CI",
    ],
  },

  {
    title: "Senior Software Engineer",
    company: "Gumisofts",
    location: "Remote",
    roles: [
      "Architect backend systems for SaaS and fintech products using Django and FastAPI.",
      "Designed cloud infrastructure on AWS including EC2, RDS, S3, CloudFront, and ECS.",
      "Built payment gateway services, ERP solutions, and merchant management platforms.",
      "Led technical architecture, code reviews, and backend engineering decisions.",
      "Developed AI-powered features and scalable APIs for multiple commercial products.",
    ],
    startDate: new Date(2025, 3), // Update if different
    endDate: null,
    technologies: [
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Docker",
      "TypeScript",
      "GitHub Actions",
    ],
  },

  {
    title: "Backend Engineer",
    company: "AzCare.ai",
    location: "Remote",
    roles: [
      "Built web scraping pipelines for healthcare datasets.",
      "Designed scalable AWS S3 data storage and processing workflows.",
      "Developed FastAPI services to expose collected data.",
      "Automated data collection pipelines and monitoring.",
    ],
    startDate: new Date(2024, 8),
    endDate: new Date(2025, 2),
    technologies: [
      "Python",
      "FastAPI",
      "AWS S3",
      "Web Scraping",
      "Playwright",
    ],
  },

  {
    title: "Full Stack Engineer",
    company: "Syntaxen Software",
    location: "Remote",
    roles: [
      "Built web and mobile applications using Django, React Native, and Flutter.",
      "Designed AWS infrastructure and deployment automation using Docker and Ansible.",
      "Implemented secure authentication with AWS Cognito.",
      "Published multiple production mobile applications to the Google Play Store.",
      "Developed scalable APIs and backend services for international clients.",
    ],
    startDate: new Date(2021, 5),
    endDate: new Date(2024, 8),
    technologies: [
      "Django",
      "React Native",
      "Flutter",
      "AWS",
      "Docker",
      "Ansible",
      "PostgreSQL",
    ],
  },

  {
    title: "Software Engineer Intern",
    company: "Syntaxen Software",
    location: "Remote",
    roles: [
      "Built Django REST APIs for educational platforms.",
      "Developed data extraction tools for scientific documents.",
      "Designed relational database models and backend services.",
    ],
    startDate: new Date(2020, 5),
    endDate: new Date(2020, 8),
    technologies: ["Python", "Django", "PostgreSQL"],
  },
];

export const formatMonthYear = (date) =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
