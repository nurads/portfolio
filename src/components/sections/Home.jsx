import { Button, Column, Grid, Tag, Tile } from "@carbon/react";
import { ArrowDown, ArrowRight, Download } from "@carbon/icons-react";
import { RevealOnScroll } from "../RevealOnScroll";
import { formatMonthYear, workExperiences } from "../../data/experience";
import { projects } from "../../data/projects";

const [currentRole] = workExperiences;

// Older entries point straight at the listing; CribCRM ships on both stores, so
// its Play link lives alongside the App Store one instead.
const playStoreApps = projects.filter(({ liveLink, storeLinks }) =>
  [liveLink, ...storeLinks.map((link) => link.href)].some((url) =>
    url?.includes("play.google.com"),
  ),
).length;

const stats = [
  { value: "4+", label: "Years shipping" },
  { value: projects.length, label: "Projects delivered" },
  { value: playStoreApps, label: "Play Store apps" },
];

export const Home = () => (
  <section id="home" className="section section--home">
    <RevealOnScroll>
      <Grid className="section__grid">
        <Column sm={4} md={8} lg={9}>
          <p className="home__role">Backend Engineer</p>
          <h1 className="home__name">Murad Usman</h1>
          <p className="home__lede">
            I build backend systems, APIs, and infrastructure. 4+ years working
            across the stack - from data pipelines to mobile apps.
          </p>

          <div className="home__actions">
            <Button href="#projects" renderIcon={ArrowRight} kind="primary">
              View projects
            </Button>
            <Button
              href="/murad-usman.pdf"
              target="_blank"
              rel="noopener noreferrer"
              renderIcon={Download}
              kind="tertiary"
            >
              Download resume
            </Button>
          </div>

          <div className="home__stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="home__stat">
                <span className="home__stat-value">{value}</span>
                <span className="home__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </Column>

        <Column sm={4} md={8} lg={7} className="home__aside">
          <Tile className="home__current">
            <p className="home__current-label">Currently</p>
            <p className="home__current-title">{currentRole.title}</p>
            <p className="home__current-company">
              {currentRole.company} · {currentRole.location}
            </p>
            <p className="home__current-since">
              Since {formatMonthYear(currentRole.startDate)}
            </p>
            <div className="home__current-tags">
              {currentRole.technologies.map((tech) => (
                <Tag key={tech} type="cool-gray" size="sm">
                  {tech}
                </Tag>
              ))}
            </div>
          </Tile>

          <a
            href="#about"
            className="home__scroll-link"
            aria-label="Scroll to about"
          >
            <ArrowDown size={20} />
          </a>
        </Column>
      </Grid>
    </RevealOnScroll>
  </section>
);
