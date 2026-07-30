import { useMemo, useState } from "react";
import {
  ClickableTile,
  Column,
  ContentSwitcher,
  Grid,
  Switch,
  Tag,
} from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import { RevealOnScroll } from "../RevealOnScroll";
import { CaseStudyModal } from "../CaseStudyModal";
import { CATEGORIES, projects } from "../../data/projects";

export const Projects = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const category = CATEGORIES[categoryIndex];

  const visible = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(category)),
    [category],
  );

  return (
    <section id="projects" className="section section--projects">
      <RevealOnScroll>
        <Grid className="section__grid">
          <Column sm={4} md={8} lg={16}>
            <p className="section__eyebrow">Selected work</p>
            <h2 className="section__title">Projects</h2>
            <p className="section__lede">
              Case studies from client work at Gumisofts alongside products I
              have built and shipped.
            </p>
          </Column>

          <Column sm={4} md={8} lg={16} className="projects__filter">
            <ContentSwitcher
              selectedIndex={categoryIndex}
              onChange={({ index }) => setCategoryIndex(index)}
              size="md"
            >
              {CATEGORIES.map((name) => (
                <Switch key={name} name={name} text={name} />
              ))}
            </ContentSwitcher>
          </Column>

          {visible.map((project) => (
            <Column
              key={project.slug}
              sm={4}
              md={4}
              lg={8}
              className="projects__column"
            >
              <ClickableTile
                className="project-tile"
                onClick={() => setSelected(project)}
                aria-label={`Open ${project.title} case study`}
              >
                <div
                  className="project-tile__media"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="project-tile__image"
                  />
                </div>

                <div className="project-tile__body">
                  <h3 className="project-tile__title">{project.title}</h3>
                  {project.tagline && (
                    <p className="project-tile__tagline">{project.tagline}</p>
                  )}

                  <div className="project-tile__tags">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Tag key={tech} type="cool-gray" size="sm">
                        {tech}
                      </Tag>
                    ))}
                    {project.technologies.length > 4 && (
                      <Tag type="outline" size="sm">
                        +{project.technologies.length - 4}
                      </Tag>
                    )}
                  </div>
                </div>

                <span className="project-tile__cta">
                  Read case study
                  <ArrowRight size={16} />
                </span>
              </ClickableTile>
            </Column>
          ))}
        </Grid>
      </RevealOnScroll>

      <CaseStudyModal
        project={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};
