import Link from "next/link";

// Match the lightened portfolio palette.
const T = {
  bg: "#0f1014",
  bgRaised: "#16171c",
  bgPanel: "#1c1d22",
  ink: "#ece9e2",
  ink2: "#cfccc4",
  muted: "#969289",
  soft: "#65635d",
  rule: "rgba(236, 233, 226, 0.10)",
  ruleStrong: "rgba(236, 233, 226, 0.18)",
  accent: "#7af5b3",
  accentSoft: "rgba(122, 245, 179, 0.10)",
  accentRule: "rgba(122, 245, 179, 0.28)",
};

const GITHUB_USER = "GeorgeKolo1";

export const metadata = {
  title: "Projects — George M. Kolodziejczyk",
  description:
    "Recent open-source projects and repositories on GitHub.",
};

async function fetchRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30&type=owner`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // ISR — refresh once an hour. Stays well under GitHub's
        // unauthenticated 60 req/hour limit.
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    return data
      .filter((r) => !r.fork && !r.archived && !r.private)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 12);
  } catch {
    return null;
  }
}

function relativeTime(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = now - then;
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) {
    const h = Math.max(1, Math.round(diff / (60 * 60 * 1000)));
    return `${h}h ago`;
  }
  if (diff < 30 * day) {
    const d = Math.round(diff / day);
    return `${d}d ago`;
  }
  if (diff < 365 * day) {
    const m = Math.round(diff / (30 * day));
    return `${m}mo ago`;
  }
  const y = Math.round(diff / (365 * day));
  return `${y}y ago`;
}

export default async function ProjectsPage() {
  const repos = await fetchRepos();

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: T.bg,
        color: T.ink,
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Instrument Serif', 'Times New Roman', serif; font-weight: 400; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }
        .small-caps { font-variant: all-small-caps; letter-spacing: 0.14em; }
        .tabular-nums { font-variant-numeric: tabular-nums; }
        .tighten { letter-spacing: -0.025em; }
        ::selection { background: ${T.accent}; color: ${T.bg}; }
        :focus-visible {
          outline: 1.5px solid ${T.accent};
          outline-offset: 3px;
          border-radius: 2px;
        }
        html { background: ${T.bg}; }
        body { background: ${T.bg}; }

        .repo-card {
          background: ${T.bgRaised};
          border: 1px solid ${T.rule};
          transition: border-color 0.25s, background-color 0.25s, transform 0.25s;
          position: relative;
        }
        .repo-card:hover {
          border-color: ${T.accentRule};
          background: ${T.bgPanel};
        }
        .repo-card:hover .arrow {
          color: ${T.accent};
          transform: translate(2px, -2px);
        }

        .link {
          color: ${T.accent};
          text-decoration: none;
          background-image: linear-gradient(${T.accent}, ${T.accent});
          background-position: 0 100%;
          background-repeat: no-repeat;
          background-size: 0% 1px;
          transition: background-size 0.3s ease;
        }
        .link:hover { background-size: 100% 1px; }

        .chip {
          color: ${T.accent};
          background-color: ${T.accentSoft};
          border: 1px solid ${T.accentRule};
        }
      `}</style>

      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 font-mono"
        style={{
          backgroundColor: "rgba(15,16,20,0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: `1px solid ${T.rule}`,
          fontSize: 11,
          color: T.muted,
          letterSpacing: "0.04em",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            style={{ color: T.muted }}
          >
            <span style={{ color: T.accent }}>←</span>
            <span className="small-caps group-hover:text-[var(--ink)]" style={{ color: T.muted }}>
              back to portfolio
            </span>
          </Link>
          <span className="small-caps" style={{ color: T.soft }}>
            <span style={{ color: T.accent }}>§ 07</span> · projects
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-14">
          <div
            className="font-mono text-[11px] small-caps mb-6 flex items-center gap-3"
            style={{ color: T.muted }}
          >
            <span style={{ color: T.accent }}>§ 07</span>
            <span style={{ color: T.soft }}>—</span>
            <span>open-source projects</span>
          </div>
          <h1
            className="font-display tighten"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 0.95,
              color: T.ink,
            }}
          >
            Projects<span style={{ color: T.accent }}>.</span>
          </h1>
          <p
            className="mt-6 font-sans max-w-xl"
            style={{
              color: T.ink2,
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.55,
            }}
          >
            Most recent public repositories on GitHub, sorted by last pushed.
            Each card links directly to the source.
          </p>
          <div
            className="mt-6 font-mono text-[12px]"
            style={{ color: T.soft }}
          >
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              github.com/{GITHUB_USER} ↗
            </a>
          </div>
        </header>

        {repos === null ? (
          <ApiError />
        ) : repos.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px">
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
      </main>

      <footer
        className="border-t"
        style={{ borderColor: T.rule }}
      >
        <div
          className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap justify-between items-baseline gap-4 font-mono small-caps text-[10px]"
          style={{ color: T.soft }}
        >
          <div>
            © 2026 George M. Kolodziejczyk{" "}
            <span style={{ color: T.muted }}>·</span> all rights reserved
          </div>
          <div>
            <Link href="/" className="link">
              ← portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RepoCard({ repo, index }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="repo-card p-6 flex flex-col gap-4 group"
    >
      <div className="flex items-start justify-between">
        <span
          className="font-mono text-[11px] tabular-nums"
          style={{ color: T.soft }}
        >
          P / {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="arrow font-mono text-[14px] transition-all"
          style={{ color: T.muted }}
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <h3
        className="font-display"
        style={{
          fontSize: "1.5rem",
          lineHeight: 1.15,
          color: T.ink,
          wordBreak: "break-word",
        }}
      >
        {repo.name}
      </h3>

      {repo.description ? (
        <p
          className="font-sans text-[13.5px] leading-[1.55] flex-1"
          style={{ color: T.muted }}
        >
          {repo.description}
        </p>
      ) : (
        <p
          className="font-sans text-[13.5px] italic flex-1"
          style={{ color: T.soft }}
        >
          No description
        </p>
      )}

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="chip font-mono text-[10px] px-2 py-0.5 rounded-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div
        className="mt-auto pt-4 border-t flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tabular-nums"
        style={{ borderColor: T.rule, color: T.muted }}
      >
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: T.accent }}
              aria-hidden="true"
            />
            <span>{repo.language}</span>
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span>★ {repo.stargazers_count}</span>
        )}
        {repo.forks_count > 0 && (
          <span>⑂ {repo.forks_count}</span>
        )}
        <span style={{ color: T.soft, marginLeft: "auto" }}>
          {relativeTime(repo.pushed_at)}
        </span>
      </div>
    </a>
  );
}

function ApiError() {
  return (
    <div
      className="font-sans p-10 text-center rounded-sm"
      style={{
        border: `1px solid ${T.rule}`,
        backgroundColor: T.bgRaised,
        color: T.ink2,
      }}
    >
      <p className="mb-4" style={{ fontSize: "1.05rem" }}>
        Could not load repositories from GitHub right now.
      </p>
      <a
        href={`https://github.com/${GITHUB_USER}`}
        target="_blank"
        rel="noreferrer"
        className="link font-mono text-[13px]"
      >
        Visit github.com/{GITHUB_USER} directly ↗
      </a>
    </div>
  );
}

function Empty() {
  return (
    <div
      className="font-sans p-10 text-center rounded-sm"
      style={{
        border: `1px solid ${T.rule}`,
        backgroundColor: T.bgRaised,
        color: T.muted,
      }}
    >
      No public repositories yet.
    </div>
  );
}
