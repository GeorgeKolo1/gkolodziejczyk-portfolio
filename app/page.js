"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

// Brand icons (removed from lucide v1, so inlined here)
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

// Palette — paper tones + a scientific-journal accent pair (teal + magenta).
const C = {
  bg: "#fbfaf6",
  ink: "#1a1a1a",
  ink2: "#2e2e2e",
  muted: "#5a5a5a",
  soft: "#8a8a8a",
  rule: "rgba(26, 26, 26, 0.12)",
  ruleSoft: "rgba(26, 26, 26, 0.06)",

  // Accents — inspired by microbial genomics / molecular-biology visual conventions.
  teal: "#0a7e8f",        // primary accent: muted scientific teal
  tealBright: "#12a2b3",  // brighter hover state
  tealSoft: "rgba(10, 126, 143, 0.08)",
  tealRule: "rgba(10, 126, 143, 0.28)",
  magenta: "#a4174d",     // secondary accent: deep scientific magenta
  magentaSoft: "rgba(164, 23, 77, 0.06)",
};

export default function Page() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = ["about", "skills", "experience", "education", "contact"];
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= y) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  const navItems = [
    { id: "about", label: "About", num: "1" },
    { id: "skills", label: "Skills", num: "2" },
    { id: "experience", label: "Experience", num: "3" },
    { id: "education", label: "Education", num: "4" },
    { id: "contact", label: "Contact", num: "5" },
  ];

  const researchAreas = [
    "Pathogen genomics",
    "Scientific computing",
    "Research software engineering",
    "machine learning",
    "Bayesian inference",
    "Statistical genomics",
  ];

  const skills = [
    {
      title: "Software engineering",
      items: ["Python", "C++", "Linux (bash), unit testing, CI/CD, code review"],
    },
    {
      title: "Machine learning",
      items: ["scikit-learn", "classical machine learning", "explainable machine learning", 'conformal prediction'],
    },
    {
      title: "Statistics",
      items: ["Statistical testing, regression, Bayesian statistics and inference", "Probabilistic programming (PyMC, Stan)"],
    },
    {
      title: "Genomics & bioinformatics",
      items: ["Microbial subtyping, phylogenetics, pathogen genomics", "Population genetics, GWAS, and statistical genomics"],
    }
  ];

  const experience = [
    {
      company: "Ritchie Lab - University of Surrey, Animal and Plant Health Agency (APHA)",
      role: "PhD student",
      dates: "2024–present",
      summary:
        "My project focuses on host-association studies of <em> Salmonella </em> Typhimurium using machine learning",
      bullets: [
        "Investigated machine learning approaches for direct replacement of the <em> Salmonella </em> Typhimurium phage typing scheme using whole genome sequencing based subtyping methods",
        "Assessed the potential of using conformal prediction to quantify uncertainty in model predictions of the animal host of <em> Salmonella </em> Typhimurium",
        ".Performed genome-wide association studies to identify genomic markers associated with phage types and animal hosts of <em> Salmonella </em> Typhimurium",
        ".........",
      ],
      tags: ["experimental design", "machine learning", "Python", "Git", "PyTorch, 'scikit-learn'", "PyMC, Stan", "Linux", "AWS, HPC clusters"],
    }
  ];

  const education = [
    {
      years: "2024–present",
      degree: "Ph.D. Biosciences & Medicine (Bioinformatics and Applied AI / Machine Learning)",
      school: "University of Surrey",
      note: "Thesis: Machine Learning approaches for genomic host association in <em> Salmonella </em>",
    },
    {
      years: "2023–2024",
      degree: "M.Sc. Rehabilitation Engineering & Assistive Technology",
      school: "University College London (UCL)"
    },
    {
      years: "2020–2023",
      degree: "B.Sc.",
      school: "University of Plymouth"
    },
  ];

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: C.bg,
        color: C.ink,
        fontFamily: "'EB Garamond', Georgia, serif",
        fontFeatureSettings: '"kern", "liga", "onum"',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-serif { font-family: 'EB Garamond', Georgia, serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .small-caps { font-variant: all-small-caps; letter-spacing: 0.08em; }
        .tabular-nums { font-variant-numeric: tabular-nums; }

        ::selection { background: ${C.teal}; color: ${C.bg}; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }

        .scholarly-link {
          color: ${C.teal};
          text-decoration: underline;
          text-decoration-thickness: 0.5px;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .scholarly-link:hover { color: ${C.tealBright}; }

        .drop-cap::first-letter {
          font-size: 3.4em;
          line-height: 0.9;
          float: left;
          margin-right: 0.08em;
          margin-top: 0.05em;
          font-weight: 500;
          color: ${C.teal};
        }

        .justify-para { text-align: justify; hyphens: auto; }
        .hairline { border-color: ${C.rule}; }

        .emph-magenta { color: ${C.magenta}; font-style: italic; }
        .emph-teal { color: ${C.teal}; font-style: italic; }
      `}</style>

      {/* Masthead / Nav — bumped to readable sizes */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(251, 250, 246, 0.88)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: `1px solid ${C.ruleSoft}`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("about")}
            className="flex items-baseline gap-2.5"
          >
            <span
              className="font-serif italic"
              style={{ color: C.ink, fontSize: "1.25rem", lineHeight: 1 }}
            >
              G. M. Kolodziejczyk
            </span>
            <span
              className="hidden sm:inline font-serif text-[15px]"
              style={{ color: C.muted }}
            >
              · PhD student, Research software engineer
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative py-1 flex items-baseline gap-1.5 transition-colors"
              >
                <span
                  className="font-mono text-[11px] tabular-nums"
                  style={{
                    color: activeSection === item.id ? C.teal : C.soft,
                  }}
                >
                  §{item.num}
                </span>
                <span
                  className="font-serif text-[16px]"
                  style={{
                    color: activeSection === item.id ? C.ink : C.muted,
                  }}
                >
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-[1.5px]"
                    style={{ backgroundColor: C.teal }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative max-w-4xl mx-auto px-6 pt-36 pb-16">
        {/* MASTHEAD / HERO */}
        <section className="pb-28 fade-up">
          <div className="text-[11px] tracking-[0.22em] small-caps mb-10 flex items-center gap-3">
            <span className="font-mono" style={{ color: C.teal }}>§ 0</span>
            <span className="flex-1 h-px" style={{ backgroundColor: C.rule }} />
            <span style={{ color: C.soft }}>Portfolio · Version 1.0</span>
          </div>

          <h1
            className="font-serif mb-4"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            George M. Kolodziejczyk
            <span style={{ color: C.teal }}>.</span>
          </h1>

          <div
            className="font-serif text-[17px] mb-12 pb-8 border-b hairline"
            style={{ color: C.muted }}
          >
            PhD student
            <span className="mx-3" style={{ color: C.teal }}>·</span>
            Research Software Engineer
            <span className="mx-3" style={{ color: C.teal }}>·</span>
            University of Surrey - Ritchie Lab, Animal and Plant Health Agency (APHA)
          </div>

          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-8">
              <p
                className="text-[18px] leading-[1.6] drop-cap justify-para"
                style={{ color: C.ink2 }}
              >
                I am a second year PhD student working on{" "}
                <span className="emph-magenta">computational biology</span> and{" "}
                <span className="emph-magenta">machine learning</span> applied to pathogen genomics..
                My research focuses on developing {" "}
                <span className="emph-teal">machine learning models </span> and <span className='emph-teal'>research software</span> than can enable surveillance and outbreak investigations of <em> Salmonella </em> Typhimurium, drawing on
                classical machine learning methods, conformal prediction and uncertainty quantification, as well as modern
                software engineering practices. In parallel, I contribute to research
                software engineering efforts across my department — building
                platforms and tooling that enable scientific research at scale.
              </p>
            </div>

            <div
              className="md:col-span-4 md:pl-6 md:border-l-2 py-1"
              style={{ borderColor: C.tealRule }}
            >
              <div
                className="small-caps text-[11px] tracking-[0.2em] mb-3"
                style={{ color: C.magenta }}
              >
                Metadata
              </div>
              <dl className="space-y-2.5 text-[14px] font-mono tabular-nums" style={{ color: C.muted }}>
                <div>
                  <dt className="inline" style={{ color: C.soft }}>Year · </dt>
                  <dd className="inline" style={{ color: C.ink2 }}>2 of 3.5</dd>
                </div>
                <div>
                  <dt className="inline" style={{ color: C.soft }}>ORCID · </dt>
                  <dd className="inline" style={{ color: C.teal }}>0009-0003-6188-2174</dd>
                </div>
                <div>
                  <dt className="inline" style={{ color: C.soft }}>University of Surrey · </dt>
                  <dd className="inline" style={{ color: C.ink2 }}>Ritchie Lab</dd>
                </div>
                <div>
                  <dt className="inline" style={{ color: C.soft }}>Contact · </dt>
                  <dd className="inline">
                    <a href="mailto:gk00709@surrey.ac.uk" className="scholarly-link">
                      gk00709@surrey.ac.uk
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mb-12">
            <div
              className="small-caps text-[11px] tracking-[0.2em] mb-2"
              style={{ color: C.magenta }}
            >
              Keywords
            </div>
            <p className="text-[16px] font-serif italic" style={{ color: C.ink2 }}>
              {researchAreas.join(" · ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center text-[15px]">
            <button
              onClick={() => scrollTo("experience")}
              className="scholarly-link inline-flex items-center gap-1"
            >
              View experience
              <span>↓</span>
            </button>
            <span style={{ color: C.rule }}>|</span>
            <button
              onClick={() => scrollTo("contact")}
              className="scholarly-link inline-flex items-center gap-1"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span style={{ color: C.rule }}>|</span>
            <a href="#" className="scholarly-link inline-flex items-center gap-1">
              Download CV (PDF)
            </a>
          </div>
        </section>

        {/* ABOUT — § 1 */}
        <Section id="about" num="1" title="About">
          <div className="grid md:grid-cols-12 gap-10">
            <div
              className="md:col-span-8 space-y-5 text-[17px] leading-[1.65] justify-para"
              style={{ color: C.ink2 }}
            >
              <p>
                I work at the boundary between{" "}
                <span className="emph-magenta">research</span> and{" "}
                <span className="emph-magenta">research software engineering</span> —
                developing both the scientific methods and the computational
                infrastructure that makes them reproducible at scale.
              </p>
              <p>
                My doctoral research investigates{" "}
                <span className="emph-teal">[host-association models of <em> Salmonella </em> Typhimurium]</span>, using
                a combination of machine learning, software engineering,
                and bayesian inference. I have deployed production-grade
                research software to solve research problems and enable efficient scientific research.
              </p>
              <p>
                I am particularly interested in the{" "}
                <span className="emph-magenta">
                  reproducibility, observability, and operational readiness
                </span>{" "}
                of scientific software — the engineering practices that let research
                results survive contact with new machines, new users, and the
                passage of time.
              </p>
            </div>

            <div
              className="md:col-span-4 md:pl-6 md:border-l-2 space-y-6"
              style={{ borderColor: C.tealRule }}
            >
              {[
                { label: "Ph.D.", sub: "in progress (yr 2 of 3.5)", color: C.teal },
                { label: "RSE", sub: "research software engineering", color: C.teal },
              ].map((c) => (
                <div key={c.label}>
                  <div
                    className="font-serif"
                    style={{ color: c.color, fontSize: "2.125rem", lineHeight: 1, fontWeight: 500 }}
                  >
                    {c.label}
                  </div>
                  <div
                    className="small-caps text-[11px] tracking-[0.16em] mt-1.5"
                    style={{ color: C.muted }}
                  >
                    {c.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* SKILLS — § 2 */}
        <Section id="skills" num="2" title="Skills">
          <div className="mb-14">
            <div
              className="small-caps text-[11px] tracking-[0.2em] mb-5 flex items-center gap-3"
            >
              <span className="font-mono" style={{ color: C.teal }}>§ 2.1</span>
              <span style={{ color: C.magenta }}>Research Areas</span>
              <span className="flex-1 h-px" style={{ backgroundColor: C.ruleSoft }} />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
              {researchAreas.map((a) => (
                <div
                  key={a}
                  className="text-[16px] font-serif italic"
                  style={{ color: C.ink2 }}
                >
                  <span style={{ color: C.teal }}>—</span> {a}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div
              className="small-caps text-[11px] tracking-[0.2em] mb-6 flex items-center gap-3"
            >
              <span className="font-mono" style={{ color: C.teal }}>§ 2.2</span>
              <span style={{ color: C.magenta }}>Technical Stack</span>
              <span className="flex-1 h-px" style={{ backgroundColor: C.ruleSoft }} />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-10">
              {skills.map((s) => (
                <div key={s.title}>
                  <div
                    className="small-caps text-[12px] tracking-[0.14em] pb-2 mb-3 border-b-2"
                    style={{ color: C.ink, borderColor: C.tealRule }}
                  >
                    {s.title}
                  </div>
                  <ul className="space-y-1.5 text-[15px] font-mono" style={{ color: C.ink2 }}>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* EXPERIENCE — § 3 */}
        <Section id="experience" num="3" title="Experience">
          <div className="space-y-12">
            {experience.map((job, i) => (
              <div
                key={i}
                className="grid md:grid-cols-12 gap-6 md:gap-8 pb-12 border-b last:border-b-0 last:pb-0 hairline"
              >
                <div className="md:col-span-3">
                  <div
                    className="small-caps text-[12px] tracking-[0.14em] font-mono tabular-nums"
                    style={{ color: C.muted }}
                  >
                    {job.dates}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h3
                    className="font-serif mb-1"
                    style={{ color: C.ink, fontSize: "1.65rem", lineHeight: 1.2, fontWeight: 500 }}
                  >
                    {job.role}
                  </h3>
                  <div
                    className="font-serif italic mb-4 text-[17px]"
                    style={{ color: C.teal }}
                  >
                    {job.company}
                  </div>
                  <p
                    className="text-[16px] leading-relaxed mb-4 justify-para"
                    style={{ color: C.ink2 }}
                    dangerouslySetInnerHTML={{ __html: job.summary }}
                  />
                  <ol className="space-y-2 mb-5 text-[15px] leading-relaxed list-none">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3" style={{ color: C.ink2 }}>
                        <span
                          className="flex-shrink-0 font-mono text-[13px] pt-0.5"
                          style={{ color: C.teal }}
                        >
                          ({romanize(bi + 1)})
                        </span>
                        <span className="justify-para" dangerouslySetInnerHTML={{ __html: b }} />
                      </li>
                    ))}
                  </ol>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12px]">
                    {job.tags.map((t, ti) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded"
                        style={{
                          color: C.teal,
                          backgroundColor: C.tealSoft,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EDUCATION — § 4 */}
        <Section id="education" num="4" title="Education">
          <div>
            {education.map((e, i) => (
              <div
                key={i}
                className="grid md:grid-cols-12 gap-6 py-6 border-t hairline"
              >
                <div
                  className="md:col-span-3 small-caps text-[12px] tracking-[0.14em] font-mono tabular-nums"
                  style={{ color: C.muted }}
                >
                  {e.years}
                </div>
                <div className="md:col-span-9">
                  <div
                    className="font-serif"
                    style={{ color: C.ink, fontSize: "1.35rem", lineHeight: 1.3, fontWeight: 500 }}
                  >
                    {e.degree}
                    <span
                      className="font-serif italic ml-3"
                      style={{ color: C.teal, fontSize: "0.95em" }}
                    >
                      {e.school}
                    </span>
                  </div>
                  {e.note && (
                    <div className="text-[14px] mt-1 italic" style={{ color: C.muted }}
                      dangerouslySetInnerHTML={{ __html: e.note }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT — § 5 */}
        <Section id="contact" num="5" title="Contact">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <p
                className="font-serif text-[20px] leading-[1.5] mb-6 justify-para"
                style={{ color: C.ink2 }}
              >
                Open to research & software collaborations, research software engineering roles, and
                conversations about interesting and difficult scientific problems! I respond to most
                messages within a day.
              </p>
              <div
                className="small-caps text-[11px] tracking-[0.18em] flex items-center gap-2"
                style={{ color: C.muted }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: C.teal }} />
                <span>Guildford, United Kingdom</span>
              </div>
            </div>

            <div className="md:col-span-5 space-y-px">
              <ContactLink
                icon={Mail}
                label="Email"
                value="george.kolodziejczyk@surrey.ac.uk"
                href="mailto:gk00709@surrey.ac.uk"
              />
              <ContactLink
                icon={OrcidIcon}
                label="ORCID"
                value="0009-0003-6188-2174"
                href="https://orcid.org/0009-0003-6188-2174"
              />
              <ContactLink
                icon={GithubIcon}
                label="GitHub"
                value="github.com/GeorgeKolo1"
                href="https://github.com/GeorgeKolo1"
              />
              <ContactLink
                icon={LinkedinIcon}
                label="LinkedIn"
                value="www.linkedin.com/in/georgemkolodziejczyk/"
                href="https://www.linkedin.com/in/georgemkolodziejczyk/"
              />
            </div>
          </div>
        </Section>

      </main>

      <footer className="relative mt-16 border-t hairline">
        <div
          className="max-w-4xl mx-auto px-6 py-8 flex flex-wrap justify-between items-baseline gap-2 small-caps text-[11px] tracking-[0.16em] font-mono"
          style={{ color: C.soft }}
        >
          <div>© 2026 George Kolodziejczyk · All rights reserved</div>
          <div>
            <span style={{ color: C.teal }}>v 1.0</span> · last compiled 2026-04-23
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, num, title, children }) {
  return (
    <section id={id} className="pt-24 pb-4 scroll-mt-20">
      <div className="mb-10 flex items-baseline gap-4 pb-4 border-b-2" style={{ borderColor: C.tealRule }}>
        <span className="font-mono text-[14px]" style={{ color: C.teal }}>
          § {num}
        </span>
        <h2
          className="font-serif flex-1"
          style={{
            color: C.ink,
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            lineHeight: 1,
            letterSpacing: "-0.015em",
            fontWeight: 500,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ContactLink({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between py-4 border-b hairline transition-colors"
    >
      <div className="flex items-center gap-4">
        <Icon className="w-4 h-4 transition-colors" style={{ color: C.teal }} />
        <div>
          <div className="small-caps text-[11px] tracking-[0.18em]" style={{ color: C.soft }}>
            {label}
          </div>
          <div className="text-[15px] font-mono" style={{ color: C.ink }}>
            {value}
          </div>
        </div>
      </div>
      <ArrowUpRight
        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: C.muted }}
      />
    </a>
  );
}

function romanize(n) {
  const map = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
  return map[n - 1] || String(n);
}