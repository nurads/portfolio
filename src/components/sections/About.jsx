import { Column, Grid, ListItem, Tag, Tile, UnorderedList } from "@carbon/react";
import { RevealOnScroll } from "../RevealOnScroll";
import { formatMonthYear, workExperiences } from "../../data/experience";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
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
    ],
  },
  {
    title: "Backend",
    skills: [
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
    ],
  },
  {
    title: "DevOps",
    skills: [
      "Azure",
      "AWS",
      "Git",
      "Github Actions",
      "CI/CD",
      "Jenkins",
      "Lambda",
      "Ansible",
      "Docker",
    ],
  },
];

export const About = () => (
  <section id="about" className="section section--band cds--layer-two">
    <RevealOnScroll>
      <Grid className="section__grid">
        <Column sm={4} md={8} lg={16}>
          <p className="section__eyebrow">Background</p>
          <h2 className="section__title">About</h2>
          <p className="section__lede">
            Backend-focused engineer with 5+ years of experience. I have built
            everything from data pipelines and REST APIs to mobile apps and
            CI/CD infrastructure.
          </p>
        </Column>

        {skillGroups.map(({ title, skills }) => (
          <Column key={title} sm={4} md={8} lg={5}>
            <Tile className="about__panel">
              <h3 className="about__panel-title">{title}</h3>
              <div className="about__tags">
                {skills.map((skill) => (
                  <Tag key={skill} type="cool-gray" size="sm">
                    {skill}
                  </Tag>
                ))}
              </div>
            </Tile>
          </Column>
        ))}

        <Column sm={4} md={8} lg={16}>
          <h3 className="section__subtitle">Work experience</h3>
        </Column>

        <Column sm={4} md={8} lg={12}>
          <div className="about__timeline">
            {workExperiences.map((experience) => (
              <article
                key={`${experience.company}-${experience.startDate.toISOString()}`}
                className="about__role"
              >
                <header className="about__role-header">
                  <div>
                    <h4 className="about__role-title">{experience.title}</h4>
                    <p className="about__role-company">
                      {experience.company} · {experience.location}
                    </p>
                  </div>
                  <span className="about__role-dates">
                    {formatMonthYear(experience.startDate)} –{" "}
                    {experience.endDate
                      ? formatMonthYear(experience.endDate)
                      : "Present"}
                  </span>
                </header>

                <UnorderedList className="about__role-list">
                  {experience.roles.map((role) => (
                    <ListItem key={role}>{role}</ListItem>
                  ))}
                </UnorderedList>

                <div className="about__tags">
                  {experience.technologies.map((tech) => (
                    <Tag key={tech} type="outline" size="sm">
                      {tech}
                    </Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Column>
      </Grid>
    </RevealOnScroll>
  </section>
);
