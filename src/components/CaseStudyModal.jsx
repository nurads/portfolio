import { useEffect, useState } from "react";
import {
  Button,
  ListItem,
  Modal,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  UnorderedList,
} from "@carbon/react";
import { Launch, LogoGithub, MobileDownload } from "@carbon/icons-react";

const Section = ({ title, body, points = [] }) => (
  <div className="case-study__section">
    <h4 className="case-study__heading">{title}</h4>
    {body && <p className="case-study__body">{body}</p>}
    {points.length > 0 && (
      <UnorderedList className="case-study__list">
        {points.map((point) => (
          <ListItem key={point}>{point}</ListItem>
        ))}
      </UnorderedList>
    )}
  </div>
);

const Gallery = ({ screenshots, title }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="case-study__gallery">
      <img
        className="case-study__gallery-main"
        src={screenshots[active]}
        alt={`${title} screenshot ${active + 1}`}
        loading="lazy"
      />
      <div className="case-study__thumbs">
        {screenshots.map((shot, index) => (
          <button
            key={shot}
            type="button"
            className={`case-study__thumb${
              index === active ? " case-study__thumb--active" : ""
            }`}
            onClick={() => setActive(index)}
            aria-label={`View screenshot ${index + 1}`}
            aria-current={index === active}
          >
            <img src={shot} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const CaseStudyModal = ({ project, open, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setTabIndex(0);
  }, [project?.slug]);

  if (!project) return null;

  const tabs = [
    { label: "Overview", key: "overview" },
    project.problem || project.problemPoints.length
      ? { label: "Problem", key: "problem" }
      : null,
    project.solution || project.solutionPoints.length
      ? { label: "Solution", key: "solution" }
      : null,
    project.screenshots.length ? { label: "Gallery", key: "gallery" } : null,
  ].filter(Boolean);

  return (
    <Modal
      open={open}
      passiveModal
      size="lg"
      modalHeading={project.title}
      modalLabel={project.categories.join(" / ")}
      onRequestClose={onClose}
      className="case-study"
    >
      {project.tagline && (
        <p className="case-study__tagline">{project.tagline}</p>
      )}

      <div className="case-study__tags">
        {project.technologies.map((tech) => (
          <Tag key={tech} type="cool-gray" size="md">
            {tech}
          </Tag>
        ))}
      </div>

      <Tabs selectedIndex={tabIndex} onChange={({ selectedIndex }) => setTabIndex(selectedIndex)}>
        <TabList aria-label={`${project.title} case study`} contained>
          {tabs.map((tab) => (
            <Tab key={tab.key}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.key}>
              {tab.key === "overview" && (
                <>
                  <p className="case-study__body">{project.description}</p>
                  {project.features.length > 0 && (
                    <Section
                      title="Key features"
                      points={project.features}
                    />
                  )}
                </>
              )}
              {tab.key === "problem" && (
                <Section
                  title="The problem"
                  body={project.problem}
                  points={project.problemPoints}
                />
              )}
              {tab.key === "solution" && (
                <Section
                  title="The solution"
                  body={project.solution}
                  points={project.solutionPoints}
                />
              )}
              {tab.key === "gallery" && (
                <Gallery
                  screenshots={project.screenshots}
                  title={project.title}
                />
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      <div className="case-study__actions">
        {project.liveLink && (
          <Button
            kind="primary"
            renderIcon={Launch}
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live site
          </Button>
        )}
        {project.storeLinks.map(({ label, href }) => (
          <Button
            key={href}
            kind="tertiary"
            renderIcon={MobileDownload}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </Button>
        ))}
        {project.githubLink && (
          <Button
            kind="tertiary"
            renderIcon={LogoGithub}
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source
          </Button>
        )}
      </div>
    </Modal>
  );
};
