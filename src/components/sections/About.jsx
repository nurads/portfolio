import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
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

  const workExperiences = [
    {
      title: "Senior Software Engineer",
      company: "Syntaxen Software",
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
      endDate: null,
    },
    {
      title: "Backend Engineer",
      company: "AzCare.ai",
      roles: [
        "Developed and optimized web scraping scripts to extract data from multiple sources.",
        "Designed and managed data storage solutions with S3, ensuring efficient access and retrieval.",
        "Built REST APIs to streamline data accessibility and integration with other systems.",
        "Automated data scraping workflows, reducing manual effort and improving efficiency.",
      ],
      startDate: new Date(2024, 8),
      endDate: new Date(2025, 2),
    },
    {
      title: "Fullstack Engineer",
      company: "Syntaxen Software",
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
    },
    {
      title: "Software Engineer Intern",
      company: "Syntaxen Software",
      roles: [
        "Developed scripts to parse scientific documents from TeX into a structured database.",
        "Created REST APIs to facilitate efficient data collection and management.",
        "Built backend APIs for educational platforms using Django, improving content accessibility.",
      ],
      startDate: new Date(2020, 5),
      endDate: new Date(2020, 8),
    },
  ];
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            About Me
          </h2>

          <div className="rounded-xl text-center p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6">
              A passionate software engineer with a love for coding and
              problem-solving. I have a strong background in Web, Backend and
              Mobile Development.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
            <h3 className="text-xl font-bold mb-4"> 💼 Work Experience </h3>
            <div className="space-y-4 text-gray-300">
              {workExperiences.map((experience) => (
                <div>
                  <h4 className="font-semibold text-xl">
                    {" "}
                    {experience.title} (
                    {experience.startDate.toLocaleDateString("en-Us", {
                      year: "numeric",
                      month: "long",
                    })}{" "}
                    -{" "}
                    {experience.endDate == null
                      ? "Present"
                      : experience.endDate.toLocaleDateString("en-Us", {
                          year: "numeric",
                          month: "long",
                        })}
                    ){" "}
                  </h4>

                  <ul className="list-disc pl-6">
                    {experience.roles.map((role) => (
                      <li>{role}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
