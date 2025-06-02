import { useState, useEffect } from 'react';
import { RevealOnScroll } from "../RevealOnScroll";

export const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topLanguages, setTopLanguages] = useState({});
  const username = 'nurads';
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Invalid GitHub token');
        }
        
        return true;
      } catch (error) {
        console.error('Token verification failed:', error);
        return false;
      }
    };

    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verify token first
        const isTokenValid = await verifyToken();
        if (!isTokenValid) {
          throw new Error('Invalid GitHub token. Please check your token in the .env file.');
        }

        // Fetch user profile
        const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (!profileResponse.ok) {
          throw new Error(`Failed to fetch profile: ${profileResponse.statusText}`);
        }
        const profileData = await profileResponse.json();
        console.log('Profile data:', profileData); // Debug log

        // Fetch repositories with auth
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );
        if (!reposResponse.ok) {
          throw new Error(`Failed to fetch repos: ${reposResponse.statusText}`);
        }
        const reposData = await reposResponse.json();
        console.log('Repos data:', reposData); // Debug log

        // Calculate top languages with auth
        const languages = {};
        let totalBytes = 0;
        
        // Fetch language data for each repo
        const languagePromises = reposData.map(async (repo) => {
          const langResponse = await fetch(repo.languages_url, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          if (!langResponse.ok) {
            console.warn(`Failed to fetch languages for ${repo.name}`);
            return;
          }
          const langData = await langResponse.json();
          
          Object.entries(langData).forEach(([lang, bytes]) => {
            languages[lang] = (languages[lang] || 0) + bytes;
            totalBytes += bytes;
          });
        });

        await Promise.all(languagePromises);

        // Sort and normalize languages
        const sortedLanguages = Object.entries(languages)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .reduce((acc, [lang, bytes]) => {
            acc[lang] = Math.round((bytes / totalBytes) * 100);
            return acc;
          }, {});

        // Fetch contribution stats using GitHub GraphQL API
        const graphqlQuery = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
              repositories(first: 6, orderBy: {field: UPDATED_AT, direction: DESC}) {
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

        console.log('Fetching GraphQL data...'); // Debug log
        const graphqlResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({ query: graphqlQuery }),
        });

        if (!graphqlResponse.ok) {
          const errorData = await graphqlResponse.json();
          console.error('GraphQL Error:', errorData); // Debug log
          throw new Error(`GraphQL request failed: ${errorData.message || graphqlResponse.statusText}`);
        }

        const graphqlData = await graphqlResponse.json();
        console.log('GraphQL data:', graphqlData); // Debug log

        if (graphqlData.errors) {
          throw new Error(`GraphQL errors: ${graphqlData.errors.map(e => e.message).join(', ')}`);
        }

        const contributionData = graphqlData.data?.user?.contributionsCollection?.contributionCalendar;
        const recentRepos = graphqlData.data?.user?.repositories?.nodes || [];

        if (!contributionData) {
          throw new Error('No contribution data found');
        }

        setStats({
          profile: profileData,
          contributions: contributionData,
          totalContributions: contributionData?.totalContributions || 0,
        });
        setRepos(recentRepos);
        setTopLanguages(sortedLanguages);
        setLoading(false);
      } catch (error) {
        console.error('Error in GitHub data fetch:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-20 relative overflow-hidden gradient-bg">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="modern-card p-6 text-center">
            <h2 className="text-2xl font-bold text-accent mb-4">Error Loading GitHub Data</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <p className="text-sm text-gray-500">
              Please check your GitHub token and try refreshing the page.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!stats) {
    return (
      <section className="py-20 relative overflow-hidden gradient-bg">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="modern-card p-6 text-center">
            <h2 className="text-2xl font-bold text-accent mb-4">No GitHub Data Available</h2>
            <p className="text-gray-400">
              Unable to load GitHub statistics. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden gradient-bg">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl -top-16 -right-16 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl -bottom-32 -left-32 animate-pulse delay-1000" />
      </div>

      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              GitHub Activity
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Check out my open source contributions and recent projects
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Profile Card */}
            <div className="modern-card p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={stats.profile.avatar_url}
                  alt={stats.profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold gradient-text mb-2">{stats.profile.name}</h3>
              <p className="text-gray-400 mb-4">@{stats.profile.login}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="text-primary font-bold text-xl">{stats.profile.public_repos}</div>
                  <div className="text-gray-400">Repositories</div>
                </div>
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="text-primary font-bold text-xl">{stats.profile.followers}</div>
                  <div className="text-gray-400">Followers</div>
                </div>
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="text-primary font-bold text-xl">{stats.totalContributions}</div>
                  <div className="text-gray-400">Contributions</div>
                </div>
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="text-primary font-bold text-xl">{stats.profile.public_gists}</div>
                  <div className="text-gray-400">Gists</div>
                </div>
              </div>
            </div>

            {/* Contribution Graph */}
            <div className="modern-card p-6 md:col-span-2">
              <h3 className="text-xl font-bold gradient-text mb-4">Contribution Activity</h3>
              <div className="grid grid-cols-53 gap-1 mb-4">
                {stats.contributions.weeks.map((week, weekIndex) => (
                  week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: day.color }}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                    />
                  ))
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Less</span>
                <div className="flex gap-1">
                  {['#0e4429', '#006d32', '#26a641', '#39d353'].map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Top Languages */}
          <div className="modern-card p-6 mb-12">
            <h3 className="text-xl font-bold gradient-text mb-4">Top Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {Object.entries(topLanguages).map(([lang, percentage]) => (
                  <div key={lang} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{lang}</span>
                      <span className="text-gray-400">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Add a pie chart or other visualization here if desired */}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Repositories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div key={repo.name} className="modern-card p-6 hover:transform hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold gradient-text mb-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {repo.name}
                  </a>
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {repo.description || 'No description provided'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.primaryLanguage && (
                    <span 
                      className="bg-primary/10 text-primary py-1 px-2 rounded-full text-xs flex items-center gap-1"
                      style={{ color: repo.primaryLanguage.color }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                  <span className="bg-primary/10 text-primary py-1 px-2 rounded-full text-xs">
                    {repo.stargazerCount} stars
                  </span>
                  <span className="bg-primary/10 text-primary py-1 px-2 rounded-full text-xs">
                    {repo.forkCount} forks
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Updated {new Date(repo.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Profile Link */}
          <div className="text-center mt-12">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <span>View Full GitHub Profile</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}; 