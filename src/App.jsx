import { useMemo, useState } from "react";
import "./App.css";

const filters = ["All Projects", "Web Development", "Mobile Development"];

const works = [
  {
    title: "MOPCARE Platform",
    tag: "Web Development",
    image: "/images/mopacre.png",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    github: null,
    live: null,
    story: [
      "As Frontend Engineer at MOPCARE, I worked on a product focused on reducing social isolation for elderly users through a clean, accessible digital experience.",
      "I built a type-safe frontend architecture with Next.js and TypeScript, improved routing and rendering performance, and integrated Supabase for real-time authentication and data sync.",
      "The project sharpened my focus on usability and stability, especially for users who need simple flows, clear content, and reliable performance across devices.",
    ],
  },
  {
    title: "Valorant Concept",
    tag: "Web Development",
    image: "/images/xamorite-riot.png",
    tech: ["React", "Vite", "TailwindCSS", "Valorant API"],
    github: null,
    live: "https://valorrent.netlify.app/",
    story: [
      "I built this as a premium fan concept inspired by Valorant's visual language and pacing.",
      "The site uses API-driven data for agents and content, with motion transitions and bold layout choices to keep the browsing flow immersive.",
      "This project pushed my skills in interactive UI architecture, component composition, and experience polish in React.",
    ],
  },
  {
    title: "PsychGen Portal",
    tag: "Web Development",
    image: "/images/psy.png",
    tech: ["Next.js", "ShadCN", "Axios", "PHP Backend"],
    github: null,
    live: "https://psychgenportal.netlify.app/",
    story: [
      "PsychGen Portal is a research-focused platform for centralized psychiatric genomics information.",
      "I developed scalable reusable UI components and integrated a structured metadata repository with backend services to support secure data access workflows.",
      "I also implemented optimized discovery and filter flows so researchers can find relevant datasets quickly.",
    ],
  },
  {
    title: "Nudge Mobile",
    tag: "Mobile Development",
    image: "/images/xamorite-mobile.png",
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "Riverpod"],
    github: null,
    live: null,
    story: [
      "Nudge is a productivity and accountability app built for planning habits and shared progress.",
      "The app combines structured daily planning, task organization, and accountability mechanics with a smooth mobile-first UI.",
      "Building Nudge helped me deepen practical Flutter architecture, state management, and product thinking for behavior-driven interfaces.",
    ],
  },
  {
    title: "Employee Record UI",
    tag: "Web Development",
    image: "/images/employee-management.jpg",
    tech: ["Java", "Swing", "File Handling", "OOP"],
    github: null,
    live: null,
    story: [
      "This was my capstone desktop project during my Aptech software engineering training.",
      "I built a full employee record manager with CRUD operations, data validation, and file-based persistence using Java Swing.",
      "It was a foundational project that strengthened my understanding of software structure, edge-case handling, and desktop interaction patterns.",
    ],
  },
  {
    title: "BTJ Campaign",
    tag: "Web Development",
    image: "/images/bibletalk.png",
    tech: ["HTML", "CSS", "JavaScript", "TailwindCSS"],
    github: null,
    live: "https://bibletalkwithjudah.vercel.app/",
    story: [
      "BTJ is a landing experience designed for a faith-centered community and message.",
      "I focused on visual tone, readability, and hierarchy so the page feels welcoming while preserving strong content clarity.",
      "The result is a focused single-page experience that balances storytelling and conversion intent.",
    ],
  },
];

const education = [
  [
    "B.Sc. Information Technology and Business Information Systems, Middlesex University Dubai (Expected Feb 2026)",
    "2026",
  ],
  [
    "Advanced Diploma in Software Engineering, Aptech Computer Education Nigeria",
    "2024",
  ],
];

const experience = [
  ["Frontend Engineer - MOPCARE", "Dec 2023 - Present"],
  ["Frontend Engineer - PsychGen Portal", "Nov 2024 - Dec 2024"],
  ["Faculty - Aptech Computer Education (React Instructor)", "2022"],
];

const coreStack = [
  ["Languages", "JavaScript, TypeScript, HTML, CSS, Java, Dart"],
  ["Frameworks", "React, Next.js, Flutter, TailwindCSS"],
  ["Backend/Data", "Supabase, Node.js, PostgreSQL, MySQL, MongoDB"],
  ["Tools", "Git, AWS, Notion, Riverpod, Provider"],
];

const socials = [
  ["X", "https://x.com/xamorite"],
  ["IG", "https://www.instagram.com/xamorite/"],
  ["LI", "https://www.linkedin.com/in/ipaoluwa/"],
  ["GH", "https://github.com/xamorite"],
];

function SectionTable({ label, rows }) {
  return (
    <section className="table-wrap">
      <p className="tiny-label">{label}</p>
      <div>
        {rows.map(([name, year]) => (
          <div className="line-row" key={name}>
            <p>{name}</p>
            <p>{year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterBlock() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <p>Portfolio 2023 - 2026</p>
        <p>Emmanuel Ogunneye</p>
        <p>Nigeria</p>
      </div>
      <div className="touch-block">
        <p>Have a nice project?</p>
        <h2>Get in Touch</h2>
      </div>
      <div className="footer-bottom">
        <p>&copy; All rights reserved.</p>
        <p>
          <a href="https://x.com/xamorite" target="_blank" rel="noreferrer">
            X
          </a>
          <a
            href="https://www.instagram.com/xamorite/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/ipaoluwa/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/xamorite"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
        <p>
          <a href="#">License</a>
          <a href="#">Terms of Use</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("All Projects");
  const [contactOpen, setContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const caseItems = useMemo(() => {
    if (filter === "All Projects") return works;
    return works.filter((item) => item.tag === filter);
  }, [filter]);
  const homeGrid = [works[4], works[3], works[0], works[5]];



  return (
    <div className="app-shell">
      <section className="surface">
        <header className="topbar">
          <div className="identity">
            <p>Emmanuel Ogunneye</p>
            <span>Nigeria</span>
          </div>

          <nav className="pill-nav">
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => setPage("home")}
            >
              Home
            </button>
            <button
              className={page === "case" ? "active" : ""}
              onClick={() => setPage("case")}
            >
              Case Studies
            </button>
            <button
              className={page === "about" ? "active" : ""}
              onClick={() => setPage("about")}
            >
              About
            </button>
            <button onClick={() => setContactOpen(true)}>Contacts</button>
          </nav>

          <div className="social-mini">
            <span>Social</span>
            <p>
              {socials.map(([label, link]) => (
                <a key={label} href={link} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ))}
            </p>
          </div>
        </header>

        {page === "home" ? (
          <main className="content home">
            <section className="hero-grid">
              <aside>
                <p>
                  Frontend engineer focused on practical, clean product
                  interfaces. I build web experiences that are responsive,
                  accessible, and easy to maintain.
                </p>
                <div className="updated">
                  <span>Last updated</span>
                  <span>04 - 03 - 2026</span>
                </div>
              </aside>
              <h1>Web and Mobile Developer currently based in Nigeria</h1>
            </section>

            <section className="lead-image">
              <button
                className="project-tile-btn"
                onClick={() => setActiveProject(works[1])}
              >
                <img src={works[1].image} alt={works[1].title} />
                <span className="tile-hover">
                  <strong>{works[1].title}</strong>
                  <small>{works[1].tech.join(" • ")}</small>
                </span>
              </button>
            </section>

            <section className="grid-four">
              {homeGrid.map((project) => (
                <button
                  className="project-tile-btn"
                  key={project.title}
                  onClick={() => setActiveProject(project)}
                >
                  <img src={project.image} alt={project.title} />
                  <span className="tile-hover">
                    <strong>{project.title}</strong>
                    <small>{project.tech.join(" • ")}</small>
                  </span>
                </button>
              ))}
            </section>

            <section className="split-text">
              <aside>
                <p className="tiny-label">Some of the clients</p>
                <p>
                  MOPCARE
                  <br />
                  Nudge
                  <br />
                  PsychGen
                  <br />
                  BTJ
                  <br />
                  Valorant Concept
                </p>
              </aside>
              <article>
                <h3>
                  B.Sc. IT &amp; Business Information Systems student at{" "}
                  <span>Middlesex University Dubai</span>
                  <br />
                  with hands-on frontend engineering experience.
                </h3>
                <p>
                  I enjoy translating product ideas into usable interfaces and
                  component systems. My recent work has centered on Next.js,
                  TypeScript, Supabase, and TailwindCSS, shipping clear user
                  flows and scalable frontend architecture.
                </p>
              </article>
            </section>

            <section className="lead-image">
              <video
                src="/images/Modern Workspace Coding Video.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </section>

            <SectionTable label="Recent Experience" rows={experience} />
          </main>
        ) : null}

        {page === "case" ? (
          <main className="content case">
            <a href="#" className="back-link">
              &larr; All Works
            </a>
            <h1>{filter}</h1>
            <div className="chips">
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <section className="case-grid">
              {caseItems.map((item) => (
                <article key={item.title}>
                  <button
                    className="project-tile-btn"
                    onClick={() => setActiveProject(item)}
                  >
                    <img src={item.image} alt={item.title} />
                    <span className="tile-hover">
                      <strong>{item.title}</strong>
                      <small>{item.tech.join(" • ")}</small>
                    </span>
                  </button>
                </article>
              ))}
            </section>
          </main>
        ) : null}

        {page === "about" ? (
          <main className="content about">
            <p className="about-intro">
              I am Emmanuel Ogunneye, a Front-end Engineer building reliable,
              scalable, and accessible web products with Next.js and type-safe
              architectures.
            </p>

            <section className="about-columns">
              <aside>
                <p className="tiny-label">Profile</p>
                <p>
                  Front end developer
                  <br />
                  Email: eogunneye@gmail.com
                  <br />
                  GitHub: xamorite
                  <br />
                  LinkedIn: ipaoluwa
                  <br />
                  Instagram: @xamorite
                </p>
              </aside>
              <article>
                <h3>
                  Building clear, maintainable frontend systems for real users.
                </h3>
                <p>
                  I currently study Information Technology and Business
                  Information Systems at Middlesex University Dubai, while
                  working as a frontend engineer. My background combines
                  practical software engineering with product thinking.
                </p>
                <p>
                  At MOPCARE, I built type-safe frontend architecture with
                  Next.js, TypeScript, and TailwindCSS, improved routing and
                  performance, and integrated real-time backend services with
                  Supabase. At PsychGen Portal, I delivered reusable UI systems,
                  robust API integration, and searchable data views for research
                  workflows.
                </p>
              </article>
            </section>

            <section className="lead-image">
              <video
                src="/images/Modern Workspace Coding Video.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </section>

            <SectionTable label="Education" rows={education} />
            <SectionTable label="Core Stack" rows={coreStack} />
            <SectionTable label="Experience" rows={experience} />
          </main>
        ) : null}
      </section>

      <FooterBlock />

      {activeProject ? (
        <div
          className="project-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} story`}
        >
          <div
            className="project-modal"
            style={{ "--project-bg": `url(${activeProject.image})` }}
          >
            <button
              className="close"
              onClick={() => setActiveProject(null)}
              aria-label="Close project story"
            >
              x
            </button>
            <p className="tiny-label">Project Story</p>
            <h3>{activeProject.title}</h3>
            <p className="story-tag">{activeProject.tag}</p>
            <div className="story-tech">
              {activeProject.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="story-copy">
              {activeProject.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="story-actions">
              {activeProject.live ? (
                <a href={activeProject.live} target="_blank" rel="noreferrer">
                  View Live Project
                </a>
              ) : null}
              {activeProject.github ? (
                <a href={activeProject.github} target="_blank" rel="noreferrer">
                  View Source
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {contactOpen ? (
        <div className="contact-overlay" role="dialog" aria-modal="true">
          <div className="contact-panel">
            <button
              className="close"
              onClick={() => setContactOpen(false)}
              aria-label="Close"
            >
              x
            </button>
            <p className="contact-title">
              Use this form to describe your project
            </p>

            <div className="contact-lines">
              <label>
                Hi, my name is
                <input placeholder="Emmanuel Ogunneye" />
              </label>
              <label>
                You can answer me on this email
                <input placeholder="email@example.com" />
              </label>
              <label>
                I am looking for help with a
                <input placeholder="website, app, product" />
              </label>
              <label>
                My budget is
                <input placeholder="1000" />
              </label>
              <label>
                and I need it done by
                <input placeholder="May 31, 2026" />
              </label>
            </div>

            <button className="contact-btn">Contact Us</button>

            <p className="contact-meta">
              <a
                href="https://www.instagram.com/xamorite/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/ipaoluwa/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:eogunneye@gmail.com">eogunneye@gmail.com</a>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
