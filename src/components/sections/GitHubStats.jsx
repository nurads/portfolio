import { useState, useEffect } from "react";
import {
  Column,
  Grid,
  InlineNotification,
  Loading,
  Tag,
  Tile,
} from "@carbon/react";
import { ArrowRight, Fork, Star } from "@carbon/icons-react";
import { RevealOnScroll } from "../RevealOnScroll";

const USERNAME = "nurads";

// The API returns light-mode swatches, which read as harsh white blocks on the
// g100 theme. GitHub's own dark greens fixed that but fought the amber accent,
// so the levels ramp through Carbon's orange scale instead.
const CONTRIBUTION_COLORS = {
  NONE: "#333333",
  FIRST_QUARTILE: "#5e2900",
  SECOND_QUARTILE: "#8a3800",
  THIRD_QUARTILE: "#ba4e00",
  FOURTH_QUARTILE: "#ff832b",
};

const CONTRIBUTION_LEGEND = [
  CONTRIBUTION_COLORS.FIRST_QUARTILE,
  CONTRIBUTION_COLORS.SECOND_QUARTILE,
  CONTRIBUTION_COLORS.THIRD_QUARTILE,
  CONTRIBUTION_COLORS.FOURTH_QUARTILE,
];

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      repositories(first: 6, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          updatedAt
        }
      }
    }
  }
`;

export const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topLanguages, setTopLanguages] = useState({});
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };

    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        const profileResponse = await fetch(
          `https://api.github.com/users/${USERNAME}`,
          { headers }
        );
        if (!profileResponse.ok) {
          throw new Error(
            profileResponse.status === 401
              ? "The GitHub token in VITE_GITHUB_TOKEN is invalid or expired."
              : `Failed to fetch profile (${profileResponse.status}).`
          );
        }
        const profileData = await profileResponse.json();

        const reposResponse = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100&type=owner`,
          { headers }
        );
        if (!reposResponse.ok) {
          throw new Error(`Failed to fetch repos: ${reposResponse.statusText}`);
        }
        const reposData = await reposResponse.json();

        const languages = {};
        let totalBytes = 0;

        await Promise.all(
          reposData.map(async (repo) => {
            const langResponse = await fetch(repo.languages_url, { headers });
            if (!langResponse.ok) return;

            const langData = await langResponse.json();
            for (const [lang, bytes] of Object.entries(langData)) {
              languages[lang] = (languages[lang] || 0) + bytes;
              totalBytes += bytes;
            }
          })
        );

        const sortedLanguages = Object.entries(languages)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .reduce((acc, [lang, bytes]) => {
            acc[lang] = Math.round((bytes / totalBytes) * 100);
            return acc;
          }, {});

        const graphqlResponse = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            query: GRAPHQL_QUERY,
            variables: { login: USERNAME },
          }),
        });
        if (!graphqlResponse.ok) {
          throw new Error(
            `GraphQL request failed: ${graphqlResponse.statusText}`
          );
        }

        const graphqlData = await graphqlResponse.json();
        if (graphqlData.errors) {
          throw new Error(
            graphqlData.errors.map((entry) => entry.message).join(", ")
          );
        }

        const contributionData =
          graphqlData.data?.user?.contributionsCollection?.contributionCalendar;
        if (!contributionData) {
          throw new Error("No contribution data found");
        }

        setStats({
          profile: profileData,
          contributions: contributionData,
          totalContributions: contributionData.totalContributions ?? 0,
        });
        setRepos(graphqlData.data?.user?.repositories?.nodes ?? []);
        setTopLanguages(sortedLanguages);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [token]);

  const header = (
    <Column sm={4} md={8} lg={16}>
      <p className="section__eyebrow">Open source</p>
      <h2 className="section__title">GitHub activity</h2>
      <p className="section__lede">
        Contributions and recent repositories, pulled live from the GitHub API.
      </p>
    </Column>
  );

  if (loading || error || !stats) {
    return (
      <section id="github" className="section section--band cds--layer-two">
        <Grid className="section__grid">
          {header}
          <Column sm={4} md={8} lg={12}>
            {loading ? (
              <Loading active small withOverlay={false} description="Loading GitHub data" />
            ) : (
              <InlineNotification
                kind="warning"
                lowContrast
                hideCloseButton
                title="GitHub data unavailable"
                subtitle={error ?? "No statistics were returned."}
              />
            )}
          </Column>
        </Grid>
      </section>
    );
  }

  const { profile, contributions, totalContributions } = stats;

  const summary = [
    { label: "Repositories", value: profile.public_repos },
    { label: "Followers", value: profile.followers },
    { label: "Contributions", value: totalContributions },
    { label: "Gists", value: profile.public_gists },
  ];

  return (
    <section id="github" className="section section--band cds--layer-two">
      <RevealOnScroll>
        <Grid className="section__grid">
          {header}

          {summary.map(({ label, value }) => (
            <Column key={label} sm={2} md={4} lg={4}>
              <Tile className="stats__tile">
                <p className="stats__value">{value}</p>
                <p className="stats__label">{label}</p>
              </Tile>
            </Column>
          ))}

          <Column sm={4} md={8} lg={11}>
            <Tile className="stats__tile">
              <h3 className="about__panel-title">Contribution activity</h3>
              <div className="stats__calendar-scroll">
                <div className="stats__calendar">
                  {contributions.weeks.flatMap((week, weekIndex) =>
                    week.contributionDays.map((day, dayIndex) => (
                      <span
                        key={`${weekIndex}-${dayIndex}`}
                        className="stats__cell"
                        style={{
                          backgroundColor:
                            CONTRIBUTION_COLORS[day.contributionLevel] ??
                            CONTRIBUTION_COLORS.NONE,
                        }}
                        title={`${day.date}: ${day.contributionCount} contributions`}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="stats__legend">
                <span>Less</span>
                {CONTRIBUTION_LEGEND.map((color) => (
                  <span
                    key={color}
                    className="stats__cell"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <span>More</span>
              </div>
            </Tile>
          </Column>

          <Column sm={4} md={8} lg={5}>
            <Tile className="stats__tile">
              <h3 className="about__panel-title">Top languages</h3>
              {Object.entries(topLanguages).map(([lang, percentage]) => (
                <div key={lang} className="stats__language">
                  <div className="stats__language-row">
                    <span>{lang}</span>
                    <span className="stats__label">{percentage}%</span>
                  </div>
                  <div className="stats__bar">
                    <div
                      className="stats__bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </Tile>
          </Column>

          {repos.map((repo) => (
            <Column key={repo.name} sm={4} md={4} lg={5}>
              <Tile className="stats__tile">
                <h3 className="project-tile__title">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stats__repo-link"
                  >
                    {repo.name}
                  </a>
                </h3>
                <p className="project-tile__tagline">
                  {repo.description || "No description provided"}
                </p>
                <div className="about__tags">
                  {repo.primaryLanguage && (
                    <Tag type="cool-gray" size="sm">
                      {repo.primaryLanguage.name}
                    </Tag>
                  )}
                  <Tag type="outline" size="sm" renderIcon={Star}>
                    {repo.stargazerCount}
                  </Tag>
                  <Tag type="outline" size="sm" renderIcon={Fork}>
                    {repo.forkCount}
                  </Tag>
                </div>
              </Tile>
            </Column>
          ))}

          <Column sm={4} md={8} lg={16}>
            <a
              className="contact__link"
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View full GitHub profile</span>
              <ArrowRight size={20} />
            </a>
          </Column>
        </Grid>
      </RevealOnScroll>
    </section>
  );
};
