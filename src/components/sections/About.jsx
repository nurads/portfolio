import { RevealOnScroll } from "../RevealOnScroll";
import { useState } from "react";

export const About = () => {
  const [activeExperience, setActiveExperience] = useState(null);

  const frontendSkills = [
    "React",
    "NextJs",
    "TypeScript",
    "TailwindCSS",
    "Dart",
    "Flutter",
    "Figma",
    "Javascript",
    "HTML",
    "CSS",
  ];

  const backendSkills = [
    "Node.js",
    "Python",
    "Django",
    "Fast Api",
    "AWS",
    "GCP",
    "MongoDB",
    "GraphQL",
    "Postgres",
    "Redis",
    "Bash",
    "BeautifulSoup",
  ];

  const devopsSkills = [
    "Azure",
    "AWS",
    "Git",
    "Github Actions",
    "CI/CD",
    "Jenkins",
    "Lambda",
    "Ansible",
    "Docker",
  ];

  const workExperiences = [
    {
      title: "Senior Software Engineer",
      company: "Adero Tech",
      location: "Remote",
      roles: [
        "Led the development of enterprise-level software solutions using modern technologies.",
        "Architected and implemented scalable backend systems using microservices architecture.",
        "Mentored junior developers and conducted code reviews to maintain code quality.",
        "Collaborated with cross-functional teams to deliver high-impact features.",
        "Implemented CI/CD pipelines and automated testing to improve development efficiency.",
        "Optimized database performance and implemented caching strategies.",
        "Designed and developed RESTful APIs and GraphQL endpoints."
      ],
      startDate: new Date(2025, 3),
      endDate: null,
      technologies: ["Node.js", "React", "GraphQL", "MongoDB", "AWS", "Docker", "Kubernetes"],
      achievements: [
        "Reduced API response time by 70% through optimization",
        "Implemented automated testing reducing bugs by 40%",
        "Successfully migrated legacy systems to microservices architecture"
      ]
    },
    {
      title: "Senior Software Engineer",
      company: "Syntaxen Software",
      location: "Remote",
      roles: [
        "Led and managed multiple projects, ensuring timely delivery and high-quality output.",
        "Developed and maintained Android mobile applications, optimizing performance and user experience.",
        "Built and scaled APIs using FastAPI, Django, PostgreSQL, and Celery, improving system efficiency.",
        "Communicated with clients to gather requirements and translate them into technical solutions.",
        "Mentored and guided interns, fostering a collaborative and growth-oriented environment.",
        "Streamlined CI/CD pipelines with GitHub Actions for multiple projects, reducing deployment time.",
        "Designed and developed internal tools to enhance company operations and productivity.",
      ],
      startDate: new Date(2025, 2),
      endDate: new Date(2025, 3),
      technologies: ["FastAPI", "Django", "PostgreSQL", "Celery", "GitHub Actions", "AWS"],
      achievements: [
        "Reduced deployment time by 40% through CI/CD optimization",
        "Improved system performance by 60% through API optimization",
        "Successfully delivered 15+ client projects"
      ]
    },
    {
      title: "Backend Engineer",
      company: "AzCare.ai",
      location: "Remote",
      roles: [
        "Developed and optimized web scraping scripts to extract data from multiple sources.",
        "Designed and managed data storage solutions with S3, ensuring efficient access and retrieval.",
        "Built REST APIs to streamline data accessibility and integration with other systems.",
        "Automated data scraping workflows, reducing manual effort and improving efficiency.",
      ],
      startDate: new Date(2024, 8),
      endDate: new Date(2025, 2),
      technologies: ["Python", "AWS S3", "REST APIs", "Web Scraping", "Data Processing"],
      achievements: [
        "Reduced data processing time by 50%",
        "Implemented automated workflows saving 20 hours/week",
        "Achieved 99.9% data accuracy in scraping"
      ]
    },
    {
      title: "Fullstack Engineer",
      company: "Syntaxen Software",
      location: "Remote",
      roles: [
        "Developed and deployed mobile applications to the Play Store.",
        "Built a blog web application for Temarico, enhancing content accessibility.",
        "Led development teams, ensuring efficient collaboration and project success.",
        "Mentored and guided interns, fostering a learning-oriented environment.",
        "Designed deployment and DevOps structures for multiple systems using AWS.",
        "Automated infrastructure management with Ansible to improve efficiency.",
        "Created and managed CI/CD pipelines, streamlining deployment workflows.",
        "Implemented user authentication with AWS Cognito, enhancing security.",
        "Designed multiple data pipelining systems for efficient data processing.",
      ],
      startDate: new Date(2021, 5),
      endDate: new Date(2024, 8),
      technologies: ["React Native", "AWS", "Ansible", "CI/CD", "AWS Cognito", "Data Pipelines"],
      achievements: [
        "Successfully launched 5+ mobile applications",
        "Reduced infrastructure costs by 30%",
        "Improved team productivity by 40%"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Syntaxen Software",
      location: "Remote",
      roles: [
        "Developed scripts to parse scientific documents from TeX into a structured database.",
        "Created REST APIs to facilitate efficient data collection and management.",
        "Built backend APIs for educational platforms using Django, improving content accessibility.",
      ],
      startDate: new Date(2020, 5),
      endDate: new Date(2020, 8),
      technologies: ["Python", "Django", "REST APIs", "TeX", "Database Design"],
      achievements: [
        "Successfully parsed 10,000+ scientific documents",
        "Reduced data entry time by 80%",
        "Improved content accessibility by 90%"
      ]
    },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section
      id="about"
      className="min-h-screen py-20 relative overflow-hidden gradient-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl -top-16 -right-16 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl -bottom-32 -left-32 animate-pulse delay-1000" />
      </div>

      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              About Me
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A passionate software engineer with expertise in full-stack development,
              system architecture, and cloud technologies.
            </p>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="modern-card p-6">
              <h3 className="text-xl font-bold mb-4 gradient-text">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((tech, key) => (
                  <span
                    key={key}
                    className="bg-primary/10 text-primary py-1 px-3 rounded-full text-sm hover:bg-primary/20 
                    hover:shadow-[0_2px_8px_rgba(99,102,241,0.1)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="modern-card p-6">
              <h3 className="text-xl font-bold mb-4 gradient-text">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((tech, key) => (
                  <span
                    key={key}
                    className="bg-primary/10 text-primary py-1 px-3 rounded-full text-sm hover:bg-primary/20 
                    hover:shadow-[0_2px_8px_rgba(99,102,241,0.1)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="modern-card p-6">
              <h3 className="text-xl font-bold mb-4 gradient-text">DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {devopsSkills.map((tech, key) => (
                  <span
                    key={key}
                    className="bg-primary/10 text-primary py-1 px-3 rounded-full text-sm hover:bg-primary/20 
                    hover:shadow-[0_2px_8px_rgba(99,102,241,0.1)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-8 gradient-text text-center">
              Work Experience
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 to-secondary/50 transform -translate-x-1/2" />

              {workExperiences.map((experience, index) => (
                <div
                  key={index}
                  className={`relative mb-12 ${
                    index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"
                  } md:w-1/2`}
                  onMouseEnter={() => setActiveExperience(index)}
                  onMouseLeave={() => setActiveExperience(null)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>

                  <div className={`modern-card p-6 ml-12 md:ml-0 transition-all duration-300 ${
                    activeExperience === index ? "transform scale-105" : ""
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold gradient-text">
                          {experience.title}
                        </h4>
                        <p className="text-gray-400">
                          {experience.company} • {experience.location}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="text-sm text-accent font-medium">
                          {formatDate(experience.startDate)} -{" "}
                          {experience.endDate ? formatDate(experience.endDate) : "Present"}
                        </span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/5 text-primary py-1 px-2 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Key Achievements */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-accent mb-2">Key Achievements:</h5>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h5 className="text-sm font-semibold text-accent mb-2">Responsibilities:</h5>
                      <ul className="space-y-2">
                        {experience.roles.map((role, idx) => (
                          <li key={idx} className="text-sm text-gray-400 flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
