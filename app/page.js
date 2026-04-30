"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

// Brand icons (lucide v1 dropped them).
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function OrcidIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
  );
}

// Theme — dark, warm, with a single bioluminescent accent.
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
  accentDim: "rgba(122, 245, 179, 0.55)",
  accentSoft: "rgba(122, 245, 179, 0.10)",
  accentRule: "rgba(122, 245, 179, 0.28)",
  amber: "#ffb84d",
  rose: "#ff8aa3",
};

const NAV_ITEMS = [
  { id: "about", label: "About", num: "01" },
  { id: "research", label: "Research", num: "02" },
  { id: "experience", label: "Experience", num: "03" },
  { id: "education", label: "Education", num: "04" },
  { id: "skills", label: "Skills", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

const RESEARCH_AREAS = [
  {
    title: "Pathogen genomics",
    note: "Whole-genome surveillance, subtyping, outbreak detection.",
  },
  {
    title: "Machine learning",
    note: "Classical & explainable models for biological prediction tasks.",
  },
  {
    title: "Bayesian inference",
    note: "Probabilistic programming for uncertainty quantification.",
  },
  {
    title: "Statistical genomics",
    note: "Population genetics, GWAS, host-association modelling.",
  },
  {
    title: "Research software engineering",
    note: "Reproducible pipelines, tooling, and platforms for science.",
  },
  {
    title: "Scientific computing",
    note: "HPC and AWS workflows for large genomic datasets.",
  },
];

const SKILLS = [
  {
    title: "Software engineering",
    items: [
      "Python · C++",
      "Git · Linux · shell scripting",
      "Unit testing · CI/CD",
      "Code review",
    ],
  },
  {
    title: "Machine learning",
    items: [
      "scikit-learn · PyTorch",
      "Classical & explainable ML",
      "Conformal prediction",
    ],
  },
  {
    title: "Statistics",
    items: [
      "Statistical testing & regression",
      "Bayesian statistics & inference",
      "Probabilistic programming (PyMC, Stan)",
    ],
  },
  {
    title: "Genomics & bioinformatics",
    items: [
      "Microbial subtyping & phylogenetics",
      "Pathogen genomics",
      "Population genetics, GWAS",
      "Statistical genomics",
    ],
  },
];

const EXPERIENCE = [
  {
    company:
      "Ritchie Lab — University of Surrey & Animal and Plant Health Agency (APHA)",
    role: "PhD student",
    dates: "2024 — present",
    summary: (
      <>
        My project focuses on host-association studies of <i>Salmonella</i>{" "}
        Typhimurium using machine learning.
      </>
    ),
    bullets: [
      <>
        Investigated machine learning approaches as a direct replacement for the{" "}
        <i>Salmonella</i> Typhimurium phage-typing scheme, using
        whole-genome-sequencing-based subtyping methods.
      </>,
      <>
        Assessed conformal prediction for quantifying uncertainty in model
        predictions of the animal host of <i>Salmonella</i> Typhimurium.
      </>,
      <>
        Performed genome-wide association studies to identify genomic markers
        associated with phage types and animal hosts of <i>Salmonella</i>{" "}
        Typhimurium.
      </>,
    ],
    tags: [
      "experimental design",
      "machine learning",
      "Python",
      "Git",
      "PyTorch",
      "scikit-learn",
      "PyMC",
      "Stan",
      "Linux",
      "AWS",
      "HPC",
    ],
  },
];

const EDUCATION = [
  {
    years: "2024 — present",
    degree:
      "Ph.D. Biosciences & Medicine (Bioinformatics and Applied AI / Machine Learning)",
    school: "University of Surrey",
    note: (
      <>
        Thesis — Machine learning approaches for genomic host association in{" "}
        <i>Salmonella</i>.
      </>
    ),
  },
  {
    years: "2023 — 2024",
    degree: "M.Sc. Rehabilitation Engineering & Assistive Technology",
    school: "University College London (UCL)",
  },
  {
    years: "2020 — 2023",
    degree: "B.Sc.",
    school: "University of Plymouth",
  },
];

// ----------------------------------------------------------------------------
// Procedural phylogenetic tree — branches grow from a root, mouse-near tips wobble.
// ----------------------------------------------------------------------------
function PhyloTree() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0,
      height = 0,
      raf = 0,
      t = 0;
    let nodes = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      buildTree();
    };

    const buildTree = () => {
      nodes = [];
      // Root is offscreen-left so the trunk doesn't sit next to the title.
      const root = {
        x: -width * 0.08,
        y: height * 0.5,
        angle: 0,
        len: 0,
        depth: 0,
        parent: null,
        grow: 1,
        wobble: Math.random() * Math.PI * 2,
      };
      nodes.push(root);

      const grow = (parent, depth, baseAngle) => {
        if (depth > 8) return;
        const branches = depth < 2 ? 2 : Math.random() < 0.45 ? 3 : 2;
        for (let i = 0; i < branches; i++) {
          const spread = 0.55 + Math.random() * 0.25;
          const a =
            baseAngle +
            (i - (branches - 1) / 2) *
              (spread / Math.max(1, branches - 1));
          const len =
            width * 0.18 *
            Math.pow(0.84, depth) *
            (0.85 + Math.random() * 0.3);
          const node = {
            x: parent.x + Math.cos(a) * len,
            y: parent.y + Math.sin(a) * len,
            angle: a,
            len,
            depth: depth + 1,
            parent,
            grow: 0,
            wobble: Math.random() * Math.PI * 2,
          };
          nodes.push(node);
          grow(node, depth + 1, a);
        }
      };
      grow(root, 0, 0);
    };

    const tick = () => {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        const target = Math.min(1, Math.max(0, t * 0.7 - n.depth * 0.18));
        n.grow += (target - n.grow) * 0.05;
      }

      for (const n of nodes) {
        if (!n.parent) continue;
        let mx = 0,
          my = 0;
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 180 * 180) {
            const d = Math.max(1, Math.sqrt(d2));
            const f = (1 - d / 180) * 8;
            mx = (dx / d) * f;
            my = (dy / d) * f;
          }
        }
        const wob = Math.sin(t * 0.9 + n.wobble) * (1 + n.depth * 0.4);
        n._dx = mx + Math.cos(n.angle + Math.PI / 2) * wob * 0.3;
        n._dy = my + Math.sin(n.angle + Math.PI / 2) * wob * 0.3;
      }

      for (const n of nodes) {
        if (!n.parent) continue;
        const p = n.parent;
        const ex = p.x + (n.x + (n._dx || 0) - p.x) * n.grow;
        const ey = p.y + (n.y + (n._dy || 0) - p.y) * n.grow;
        const alpha = 0.18 + (1 - n.depth / 9) * 0.35;
        ctx.strokeStyle = `rgba(122, 245, 179, ${alpha * n.grow})`;
        ctx.lineWidth = Math.max(0.5, 2.2 - n.depth * 0.28);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      for (const n of nodes) {
        if (n.depth < 4) continue;
        const ex = n.parent
          ? n.parent.x + (n.x + (n._dx || 0) - n.parent.x) * n.grow
          : n.x;
        const ey = n.parent
          ? n.parent.y + (n.y + (n._dy || 0) - n.parent.y) * n.grow
          : n.y;
        ctx.fillStyle = `rgba(122, 245, 179, ${0.55 * n.grow})`;
        ctx.beginPath();
        ctx.arc(ex, ey, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    if (!reduce) {
      tick();
    } else {
      // Reduced motion: snap all nodes to fully grown and draw a single static frame.
      for (const n of nodes) n.grow = 1;
      tick();
      cancelAnimationFrame(raf);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ----------------------------------------------------------------------------
// Reveal-on-scroll wrapper.
// ----------------------------------------------------------------------------
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------
export default function Page() {
  const [activeSection, setActiveSection] = useState("about");
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState("");

  // Active section
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const ratio = max > 0 ? h.scrollTop / max : 0;
      setProgress(Math.max(0, Math.min(1, ratio)) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live clock for status bar
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const date = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
        d.getUTCDate()
      )}`;
      const time = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(
        d.getUTCSeconds()
      )}`;
      return `${date} ${time} UTC`;
    };
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  // Keyboard shortcuts 1–6
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      const tag = (t?.tagName || "").toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        t?.isContentEditable
      )
        return;
      const map = {
        1: "about",
        2: "research",
        3: "experience",
        4: "education",
        5: "skills",
        6: "contact",
      };
      if (map[e.key]) {
        e.preventDefault();
        scrollTo(map[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: T.bg,
        color: T.ink,
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        fontFeatureSettings: '"kern", "ss01", "cv11"',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .font-display { font-family: 'Instrument Serif', 'Times New Roman', serif; font-weight: 400; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }

        .small-caps { font-variant: all-small-caps; letter-spacing: 0.14em; }
        .tabular-nums { font-variant-numeric: tabular-nums; }

        ::selection { background: ${T.accent}; color: ${T.bg}; }

        :focus-visible {
          outline: 1.5px solid ${T.accent};
          outline-offset: 3px;
          border-radius: 2px;
        }

        html { background: ${T.bg}; }
        body { background: ${T.bg}; }

        /* Subtle film-grain / noise overlay for warmth */
        .grain::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.04;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* Section heading rule */
        .rule-accent { border-color: ${T.accentRule}; }

        /* Link */
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

        /* Pill / tag */
        .chip {
          color: ${T.accent};
          background-color: ${T.accentSoft};
          border: 1px solid ${T.accentRule};
          transition: background-color 0.2s, transform 0.2s;
        }
        .chip:hover { background-color: rgba(122,245,179,0.18); transform: translateY(-1px); }

        /* Status dot pulse */
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 ${T.accentDim}; }
          50% { box-shadow: 0 0 0 8px transparent; }
        }
        .pulse { animation: pulse-dot 2.4s ease-in-out infinite; }

        /* Slow drift for hero gradient */
        @keyframes hero-drift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -1.5%, 0); }
        }
        .drift { animation: hero-drift 14s ease-in-out infinite; }

        /* Cursor caret */
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .caret { animation: blink 1.05s steps(1) infinite; }

        /* Underline reveal for nav active */
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -6px;
          height: 1px;
          background: ${T.accent};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link[aria-current="true"]::after { transform: scaleX(1); }
        .nav-link:hover::after { transform: scaleX(1); }

        /* Card hover */
        .card {
          background: ${T.bgRaised};
          border: 1px solid ${T.rule};
          transition: border-color 0.25s, transform 0.25s, background-color 0.25s;
          position: relative;
        }
        .card:hover {
          border-color: ${T.accentRule};
          background: ${T.bgPanel};
        }
        .card:hover .card-arrow { color: ${T.accent}; transform: translate(2px, -2px); }

        /* Hairline */
        .hairline { border-color: ${T.rule}; }

        /* Display kerning tweak */
        .tighten { letter-spacing: -0.025em; }

        @media (prefers-reduced-motion: reduce) {
          .drift, .pulse, .caret { animation: none !important; }
        }

        @media print {
          nav, footer, .no-print { display: none !important; }
          html, body { background: #ffffff !important; color: #000 !important; }
          main { padding-top: 0 !important; }
        }
      `}</style>

      <div className="grain" aria-hidden="true" />

      {/* Top status bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] no-print font-mono"
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
        <div className="max-w-6xl mx-auto px-6 h-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span
                className="pulse inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: T.accent }}
                aria-hidden="true"
              />
              <span style={{ color: T.ink2 }}>SYSTEM</span>
              <span style={{ color: T.soft }}>·</span>
              <span style={{ color: T.accent }}>online</span>
            </span>
            <span className="hidden sm:inline" style={{ color: T.soft }}>|</span>
            <span className="hidden sm:inline">
              <span style={{ color: T.ink2 }}>LOC</span>{" "}
              <span style={{ color: T.muted }}>51.2362°N, 0.5704°W</span>
            </span>
          </div>
          <div className="flex items-center gap-4 tabular-nums">
            <span className="hidden md:inline" style={{ color: T.soft }}>
              {now}
            </span>
            <span style={{ color: T.soft }}>v2.0</span>
          </div>
        </div>
        {/* Reading progress, integrated */}
        <div
          className="absolute left-0 bottom-0 h-px"
          style={{
            width: `${progress}%`,
            backgroundColor: T.accent,
            transition: "width 100ms linear",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Primary navigation */}
      <nav
        className="fixed left-0 right-0 z-50 no-print"
        style={{
          top: 28,
          backgroundColor: "rgba(15,16,20,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${T.rule}`,
        }}
        aria-label="Primary"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo("about")}
            className="flex items-center gap-3"
          >
            <span
              className="font-mono text-[11px] tabular-nums"
              style={{ color: T.accent }}
            >
              [GMK]
            </span>
            <span
              className="font-display"
              style={{ color: T.ink, fontSize: "1.35rem", lineHeight: 1 }}
            >
              George <span style={{ fontStyle: "italic" }}>Kolodziejczyk</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  aria-current={active ? "true" : undefined}
                  className="nav-link relative py-1 flex items-baseline gap-1.5"
                >
                  <span
                    className="font-mono text-[10px] tabular-nums"
                    style={{ color: active ? T.accent : T.soft }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="font-sans text-[13px]"
                    style={{
                      color: active ? T.ink : T.muted,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative" style={{ paddingTop: 28 + 56 }}>
        <div className="relative" style={{ height: "min(100vh, 880px)" }}>
          {/* Animated canvas */}
          <div className="absolute inset-0 overflow-hidden">
            <PhyloTree />
            {/* Soft top/bottom fades */}
            <div
              className="absolute inset-x-0 top-0 h-32 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, ${T.bg}, transparent)`,
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${T.bg}, transparent)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center pb-12">
            <Reveal>
              <div
                className="font-mono text-[11px] small-caps mb-8 flex items-center gap-3"
                style={{ color: T.muted }}
              >
                <span style={{ color: T.accent }}>vol. ii</span>
                <span style={{ color: T.soft }}>—</span>
                <span>research portfolio · 2026</span>
                <span
                  className="hidden sm:inline-block flex-1 h-px max-w-[160px]"
                  style={{ backgroundColor: T.rule }}
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="font-display tighten"
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 9rem)",
                  lineHeight: 0.92,
                  color: T.ink,
                }}
              >
                George M.
                <br />
                <span style={{ fontStyle: "italic" }}>Kolodziejczyk</span>
                <span style={{ color: T.accent }}>.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <div
                className="mt-10 grid md:grid-cols-12 gap-8 items-end"
              >
                <div className="md:col-span-7">
                  <p
                    className="font-sans"
                    style={{
                      color: T.ink2,
                      fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                      lineHeight: 1.5,
                      maxWidth: "44ch",
                    }}
                  >
                    Research engineer working on{" "}
                    <span style={{ color: T.accent }}>machine learning</span>{" "}
                    and{" "}
                    <span style={{ color: T.accent }}>research software</span>{" "}
                    for pathogen genomics.
                  </p>
                </div>

                <div className="md:col-span-5 flex md:justify-end">
                  <div
                    className="font-mono text-[12px] tabular-nums w-full md:w-auto"
                    style={{ color: T.muted }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span style={{ color: T.soft }}>role</span>
                      <span style={{ color: T.ink }}>
                        PhD student · Research Software Engineer
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span style={{ color: T.soft }}>aff.</span>
                      <span style={{ color: T.ink2 }}>
                        Ritchie Lab · Surrey · APHA
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ color: T.soft }}>status</span>
                      <span className="flex items-center gap-2">
                        <span
                          className="pulse inline-block w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: T.accent }}
                          aria-hidden="true"
                        />
                        <span style={{ color: T.ink }}>actively researching</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div
                className="mt-14 flex flex-wrap gap-x-8 gap-y-3 items-center font-mono text-[12px]"
              >
                <button
                  onClick={() => scrollTo("research")}
                  className="link inline-flex items-center gap-1.5"
                >
                  <span>view research</span>
                  <span aria-hidden="true">↓</span>
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="link inline-flex items-center gap-1.5"
                >
                  <span>get in touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <span
                  className="hidden sm:inline-flex items-center gap-2"
                  style={{ color: T.soft }}
                >
                  <kbd
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      border: `1px solid ${T.rule}`,
                      backgroundColor: T.bgRaised,
                      color: T.ink2,
                    }}
                  >
                    1
                  </kbd>
                  <span>–</span>
                  <kbd
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      border: `1px solid ${T.rule}`,
                      backgroundColor: T.bgRaised,
                      color: T.ink2,
                    }}
                  >
                    6
                  </kbd>
                  <span>navigate</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Scroll cue */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] small-caps flex flex-col items-center gap-2 z-10"
            style={{ color: T.soft }}
            aria-hidden="true"
          >
            <span>scroll</span>
            <span
              className="w-px h-8 block"
              style={{
                background: `linear-gradient(to bottom, ${T.accentRule}, transparent)`,
              }}
            />
          </div>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-6 pt-12 pb-16">
        {/* ABOUT */}
        <Section id="about" num="01" title="About">
          <div className="grid md:grid-cols-12 gap-12">
            <Reveal className="md:col-span-7">
              <div
                className="space-y-6 font-sans"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  color: T.ink2,
                }}
              >
                <p>
                  I work at the boundary between{" "}
                  <span style={{ color: T.ink }}>research</span> and{" "}
                  <span style={{ color: T.ink }}>
                    research software engineering
                  </span>
                  — developing the scientific methods and the software that
                  makes them reproducible and accessible at scale.
                </p>
                <p>
                  My doctoral research investigates{" "}
                  <span style={{ color: T.accent }}>
                    host-association models of <i>Salmonella</i> Typhimurium
                  </span>
                  , using a combination of machine learning, software
                  engineering, and Bayesian inference. I have deployed
                  production-grade research software to solve research problems
                  and enable efficient scientific investigation.
                </p>
                <p>
                  I am particularly interested in the{" "}
                  <span style={{ color: T.accent }}>
                    reproducibility, observability, and operational readiness
                  </span>{" "}
                  of scientific software — the engineering practices that let
                  research results survive contact with new machines, new users,
                  and the passage of time.
                </p>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={100}>
              <div
                className="card rounded-sm p-6"
              >
                <div
                  className="small-caps text-[10px] mb-5 flex items-center gap-2"
                  style={{ color: T.muted }}
                >
                  <span style={{ color: T.accent }}>◆</span>
                  <span>profile · meta</span>
                </div>

                <dl
                  className="font-mono text-[12.5px] tabular-nums space-y-3"
                  style={{ color: T.ink2 }}
                >
                  <Meta label="program" value="Ph.D. — year 2 of 3.5" />
                  <Meta
                    label="orcid"
                    value={
                      <a
                        href="https://orcid.org/0009-0003-6188-2174"
                        target="_blank"
                        rel="noreferrer"
                        className="link"
                      >
                        0009-0003-6188-2174
                      </a>
                    }
                  />
                  <Meta label="lab" value="Ritchie Lab — Surrey & APHA" />
                  <Meta label="loc" value="Guildford, United Kingdom" />
                  <Meta
                    label="email"
                    value={
                      <a href="mailto:gk00709@surrey.ac.uk" className="link">
                        gk00709@surrey.ac.uk
                      </a>
                    }
                  />
                </dl>

                <div
                  className="mt-6 pt-5 border-t hairline font-mono text-[11px]"
                  style={{ color: T.soft }}
                >
                  <span style={{ color: T.accent }}>$</span> cat
                  ~/research/focus.txt
                  <span className="caret ml-1" style={{ color: T.accent }}>
                    ▍
                  </span>
                </div>
                <div
                  className="mt-2 font-mono text-[12px] leading-relaxed"
                  style={{ color: T.ink2 }}
                >
                  pathogen genomics · ML · Bayesian inference · RSE
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* RESEARCH */}
        <Section id="research" num="02" title="Research">
          <Reveal>
            <p
              className="font-sans mb-10 max-w-2xl"
              style={{ color: T.muted, fontSize: "1rem", lineHeight: 1.6 }}
            >
              Six axes of focus that shape my doctoral work and my engineering
              practice.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px">
            {RESEARCH_AREAS.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 60}
                className="card rounded-none p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="font-mono text-[11px] tabular-nums"
                    style={{ color: T.soft }}
                  >
                    R / {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 card-arrow transition-all"
                    style={{ color: T.muted }}
                  />
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.5rem",
                    lineHeight: 1.15,
                    color: T.ink,
                    marginBottom: "0.6rem",
                  }}
                >
                  {a.title}
                </h3>
                <p
                  className="font-sans text-[13.5px] leading-[1.55]"
                  style={{ color: T.muted }}
                >
                  {a.note}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" num="03" title="Experience">
          <div className="space-y-16">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={i}>
                <article className="grid md:grid-cols-12 gap-8 md:gap-10">
                  <div className="md:col-span-3">
                    <div
                      className="font-mono text-[11px] small-caps tabular-nums mb-3"
                      style={{ color: T.accent }}
                    >
                      {job.dates}
                    </div>
                    <div
                      className="font-mono text-[11px]"
                      style={{ color: T.soft }}
                    >
                      ongoing
                    </div>
                  </div>

                  <div className="md:col-span-9">
                    <h3
                      className="font-display tighten mb-2"
                      style={{
                        color: T.ink,
                        fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)",
                        lineHeight: 1.05,
                      }}
                    >
                      {job.role}
                    </h3>
                    <div
                      className="font-sans text-[15px] mb-6 flex items-start gap-2"
                      style={{ color: T.ink2 }}
                    >
                      <span style={{ color: T.accent }}>→</span>
                      <span>{job.company}</span>
                    </div>

                    <p
                      className="font-sans mb-6"
                      style={{
                        color: T.ink2,
                        fontSize: "1rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {job.summary}
                    </p>

                    <ol className="space-y-3 mb-7 list-none">
                      {job.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex gap-4 font-sans"
                          style={{
                            color: T.ink2,
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            className="font-mono text-[11px] tabular-nums pt-1.5 flex-shrink-0"
                            style={{ color: T.accent, minWidth: "2.25rem" }}
                          >
                            {String(bi + 1).padStart(2, "0")}
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                      {job.tags.map((t) => (
                        <span
                          key={t}
                          className="chip px-2 py-1 rounded-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" num="04" title="Education">
          <div>
            {EDUCATION.map((e, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="grid md:grid-cols-12 gap-6 py-7 border-t hairline last:border-b">
                  <div
                    className="md:col-span-3 font-mono text-[11px] small-caps tabular-nums"
                    style={{ color: T.muted }}
                  >
                    {e.years}
                  </div>
                  <div className="md:col-span-9">
                    <div
                      className="font-display"
                      style={{
                        color: T.ink,
                        fontSize: "1.4rem",
                        lineHeight: 1.25,
                      }}
                    >
                      {e.degree}
                    </div>
                    <div
                      className="font-sans text-[14.5px] mt-1.5"
                      style={{ color: T.accent }}
                    >
                      {e.school}
                    </div>
                    {e.note && (
                      <div
                        className="font-sans text-[13.5px] mt-2 italic"
                        style={{ color: T.muted, lineHeight: 1.55 }}
                      >
                        {e.note}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" num="05" title="Skills">
          <div className="grid md:grid-cols-2 gap-px">
            {SKILLS.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} className="card p-7">
                <div className="flex items-baseline justify-between mb-5">
                  <div
                    className="font-display"
                    style={{
                      fontSize: "1.4rem",
                      color: T.ink,
                      lineHeight: 1,
                    }}
                  >
                    {s.title}
                  </div>
                  <span
                    className="font-mono text-[11px] tabular-nums"
                    style={{ color: T.soft }}
                  >
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(SKILLS.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="font-mono text-[13px] space-y-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                      style={{ color: T.ink2 }}
                    >
                      <span
                        style={{ color: T.accent }}
                        className="select-none"
                      >
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" num="06" title="Contact">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <Reveal className="md:col-span-7">
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  lineHeight: 1.3,
                  color: T.ink,
                  letterSpacing: "-0.01em",
                  marginBottom: "1.5rem",
                }}
              >
                Open to research and software collaborations, research software
                engineering roles, and conversations about{" "}
                <span style={{ fontStyle: "italic", color: T.accent }}>
                  interesting and difficult scientific problems
                </span>
                .
              </p>
              <p
                className="font-sans"
                style={{ color: T.muted, fontSize: "0.95rem", lineHeight: 1.6 }}
              >
                I respond to most messages within a day.
              </p>

              <div
                className="mt-8 flex items-center gap-2 font-mono small-caps text-[10px]"
                style={{ color: T.muted }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: T.accent }} />
                <span>Guildford, United Kingdom</span>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={100}>
              <div className="card rounded-sm">
                <ContactLink
                  icon={Mail}
                  label="email"
                  value="gk00709@surrey.ac.uk"
                  href="mailto:gk00709@surrey.ac.uk"
                  first
                />
                <ContactLink
                  icon={OrcidIcon}
                  label="orcid"
                  value="0009-0003-6188-2174"
                  href="https://orcid.org/0009-0003-6188-2174"
                />
                <ContactLink
                  icon={GithubIcon}
                  label="github"
                  value="github.com/GeorgeKolo1"
                  href="https://github.com/GeorgeKolo1"
                />
                <ContactLink
                  icon={LinkedinIcon}
                  label="linkedin"
                  value="linkedin.com/in/georgemkolodziejczyk"
                  href="https://www.linkedin.com/in/georgemkolodziejczyk/"
                  last
                />
              </div>
            </Reveal>
          </div>
        </Section>
      </main>

      <footer
        className="relative mt-20 border-t hairline no-print"
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
          <div className="flex items-center gap-3">
            <span style={{ color: T.accent }}>v 2.0</span>
            <span style={{ color: T.muted }}>·</span>
            <span>compiled 2026-04-30</span>
            <span style={{ color: T.muted }}>·</span>
            <span>built with care</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Pieces
// ----------------------------------------------------------------------------
function Section({ id, num, title, children }) {
  return (
    <section id={id} className="pt-32 pb-4 scroll-mt-28">
      <Reveal>
        <div
          className="mb-12 flex items-baseline gap-5 pb-5 border-b rule-accent"
          style={{ borderBottomWidth: 1 }}
        >
          <span
            className="font-mono text-[12px] tabular-nums small-caps"
            style={{ color: T.accent }}
          >
            § {num}
          </span>
          <h2
            className="font-display flex-1 tighten"
            style={{
              color: T.ink,
              fontSize: "clamp(2.25rem, 5.5vw, 3.5rem)",
              lineHeight: 1,
            }}
          >
            {title}
          </h2>
          <span
            className="font-mono text-[10px] small-caps hidden sm:inline"
            style={{ color: T.soft }}
          >
            section
          </span>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

function Meta({ label, value }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt
        className="small-caps text-[10px] flex-shrink-0"
        style={{ color: T.soft, minWidth: "3.5rem" }}
      >
        {label}
      </dt>
      <dd className="flex-1" style={{ color: T.ink2 }}>
        {value}
      </dd>
    </div>
  );
}

function ContactLink({ icon: Icon, label, value, href, first, last }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between p-5 transition-colors"
      style={{
        borderTop: first ? "none" : `1px solid ${T.rule}`,
        borderBottom: last ? "none" : "none",
      }}
    >
      <div className="flex items-center gap-4">
        <Icon className="w-4 h-4" style={{ color: T.accent }} />
        <div>
          <div
            className="font-mono small-caps text-[10px]"
            style={{ color: T.soft }}
          >
            {label}
          </div>
          <div
            className="font-mono text-[13px] mt-0.5"
            style={{ color: T.ink }}
          >
            {value}
          </div>
        </div>
      </div>
      <ArrowUpRight
        className="w-4 h-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: T.muted }}
      />
    </a>
  );
}
