import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import {
  about,
  aboutTeaser,
  clients,
  education,
  experience,
  intro,
  otherWork,
  profile,
  projects,
  socials,
  tools,
} from "./content";

const NavigateContext = createContext(() => {});

function scrollToTarget(id) {
  const target = id ? document.getElementById(id) : null;
  if (target) {
    target.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

// Minimal history-based router: pages live at real URLs so case studies can
// be shared, and Netlify's _redirects serves index.html for every path.
function useRouter() {
  const [path, setPath] = useState(() => window.location.pathname);
  const pendingTarget = useRef(null);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (pendingTarget.current === null) return;
    scrollToTarget(pendingTarget.current);
    pendingTarget.current = null;
  }, [path]);

  const navigate = (to) => {
    const url = new URL(to, window.location.href);
    const samePage = url.pathname === window.location.pathname;
    const target = url.hash.slice(1);
    window.history.pushState(null, "", url.pathname + url.hash);
    if (samePage) {
      scrollToTarget(target);
    } else {
      pendingTarget.current = target;
      setPath(url.pathname);
    }
  };

  return [path, navigate];
}

function matchRoute(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/") return { page: "home" };
  if (clean === "/about") return { page: "about" };
  const match = clean.match(/^\/work\/([\w-]+)$/);
  const index = match ? projects.findIndex((p) => p.slug === match[1]) : -1;
  if (index !== -1) return { page: "project", index };
  return { page: "not-found" };
}

function pageTitle(route) {
  if (route.page === "project") {
    return `${projects[route.index].title}, a case study by ${profile.name}`;
  }
  if (route.page === "about") return `About ${profile.name}`;
  if (route.page === "not-found") return `Page not found | ${profile.name}`;
  return `${profile.name} | Frontend Engineer`;
}

function Link({ to, ...props }) {
  const navigate = useContext(NavigateContext);
  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handleClick} {...props} />;
}

function Arrow({ direction = "right" }) {
  return (
    <svg
      className={`arrow arrow-${direction}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
      <Arrow direction="out" />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

function SiteHeader({ page }) {
  const onWork = page === "home" || page === "project";
  return (
    <header className="topbar">
      <div className="identity">
        <Link to="/">{profile.name}</Link>
        <span>Frontend engineer, Nigeria</span>
      </div>

      <nav className="pill-nav" aria-label="Main">
        <Link to="/" className={onWork ? "active" : undefined} aria-current={page === "home" ? "page" : undefined}>
          Work
        </Link>
        <Link
          to="/about"
          className={page === "about" ? "active" : undefined}
          aria-current={page === "about" ? "page" : undefined}
        >
          About
        </Link>
        <a href="#contact">Contact</a>
      </nav>

      <ul className="social-mini" aria-label="Elsewhere">
        {socials.slice(0, 2).map((social) => (
          <li key={social.label}>
            <a href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          </li>
        ))}
        <li>
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </li>
      </ul>
    </header>
  );
}

function ProjectTile({ project, lead = false }) {
  const [width, height] = project.imageSize;
  return (
    <Link to={`/work/${project.slug}`} className={lead ? "project-tile lead" : "project-tile"}>
      <span className="tile-media">
        <img
          src={project.image}
          alt=""
          width={width}
          height={height}
          loading={lead ? "eager" : "lazy"}
          fetchPriority={lead ? "high" : undefined}
        />
      </span>
      <span className="tile-caption">
        <span className="tile-text">
          <strong>{project.title}</strong>
          <span>{project.summary}</span>
        </span>
        <span className="tile-cta">
          Read the story
          <Arrow />
        </span>
      </span>
    </Link>
  );
}

function SectionTable({ label, rows, id }) {
  return (
    <section className="table-wrap" aria-labelledby={id}>
      <h2 id={id} className="side-heading">
        {label}
      </h2>
      <ul className="line-list">
        {rows.map((row) => (
          <li className="line-row" key={`${row.primary}-${row.secondary}`}>
            <p>
              {row.href ? <ExternalLink href={row.href}>{row.primary}</ExternalLink> : row.primary}
              {row.secondary ? <span>{row.secondary}</span> : null}
            </p>
            {row.period ? <p className="line-meta">{row.period}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function HomePage() {
  const [lead, ...rest] = projects;
  const otherRows = otherWork.map((item) => ({
    primary: item.title,
    secondary: item.description,
    period: item.stack,
    href: item.href,
  }));

  return (
    <>
      <section className="hero-grid">
        <h1>{intro.title}</h1>
        <aside>
          <p>{intro.body}</p>
          <dl className="status">
            <dt>Status</dt>
            <dd>{intro.availability}</dd>
          </dl>
        </aside>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <h2 id="work-title" className="visually-hidden">
          Selected work
        </h2>
        <ProjectTile project={lead} lead />
        <div className="work-grid">
          {rest.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <SectionTable id="other-title" label="Other projects" rows={otherRows} />

      <section className="split-text" aria-labelledby="clients-title">
        <aside>
          <h2 id="clients-title" className="side-heading">
            Teams I've built for
          </h2>
          <ul className="client-list">
            {clients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        </aside>
        <article>
          <p className="statement">{aboutTeaser.title}</p>
          <p>{aboutTeaser.body}</p>
          <Link to="/about" className="text-link">
            More about me
            <Arrow />
          </Link>
        </article>
      </section>
    </>
  );
}

function StorySection({ section }) {
  return (
    <section className="story-section">
      <h2>{section.heading}</h2>
      <div className="prose">
        {section.body?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.points ? (
          <dl className="points">
            {section.points.map((point) => (
              <div key={point.label}>
                <dt>{point.label}</dt>
                <dd>{point.text}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {section.after?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ProjectPage({ index }) {
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const [width, height] = project.imageSize;

  return (
    <article className="case-study">
      <Link to="/#work" className="back-link">
        <Arrow direction="left" />
        All work
      </Link>

      <header className="hero-grid case-hero">
        <div className="case-title">
          <h1>{project.title}</h1>
          <p className="lead-text">{project.summary}</p>
        </div>
        <aside>
          <dl className="facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            {project.period ? (
              <div>
                <dt>Timeline</dt>
                <dd>{project.period}</dd>
              </div>
            ) : null}
            <div>
              <dt>Type</dt>
              <dd>{project.kind}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(", ")}</dd>
            </div>
            {project.links.length ? (
              <div>
                <dt>Links</dt>
                <dd>
                  {project.links.map((link) => (
                    <ExternalLink key={link.href} href={link.href} className="text-link">
                      {link.label}
                    </ExternalLink>
                  ))}
                </dd>
              </div>
            ) : null}
            {project.note ? (
              <div>
                <dt>Note</dt>
                <dd>{project.note}</dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </header>

      <figure className="case-media">
        <img src={project.image} alt={project.imageAlt} width={width} height={height} fetchPriority="high" />
      </figure>

      <div className="story">
        {project.story.map((section) => (
          <StorySection key={section.heading} section={section} />
        ))}
      </div>

      <Link to={`/work/${next.slug}`} className="next-project">
        <span>Next: {next.title}</span>
        <Arrow />
      </Link>
    </article>
  );
}

function AboutPage() {
  return (
    <>
      <h1 className="about-intro">{about.lead}</h1>

      <section className="about-columns">
        <aside>
          <h2 className="side-heading">Find me</h2>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </aside>
        <article className="prose">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      <SectionTable id="experience-title" label="Experience" rows={experience} />
      <SectionTable id="education-title" label="Education" rows={education} />
      <SectionTable id="tools-title" label="Tools I use" rows={tools} />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>This page doesn't exist.</h1>
      <p>The link may be old, or the address may have a typo.</p>
      <Link to="/" className="text-link">
        Back to my work
        <Arrow />
      </Link>
    </section>
  );
}

const emptyBrief = { name: "", email: "", project: "", budget: "", deadline: "" };

function ProjectBrief() {
  const [brief, setBrief] = useState(emptyBrief);
  const [opened, setOpened] = useState(false);

  const update = (field) => (event) => setBrief({ ...brief, [field]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`New project proposal from ${brief.name || "a visitor"}`);
    const body = encodeURIComponent(
      `Hi, my name is ${brief.name || "[Name]"}.\n\n` +
        `You can answer me on this email: ${brief.email || "[Email]"}.\n\n` +
        `I am looking for help with a: ${brief.project || "[Project]"}.\n\n` +
        `My budget is: ${brief.budget || "[Budget]"}\n\n` +
        `I need it done by: ${brief.deadline || "[Date]"}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <form className="brief" onSubmit={handleSubmit}>
      <label>
        Hi, my name is
        <input name="name" autoComplete="name" placeholder="your name" value={brief.name} onChange={update("name")} />
      </label>
      <label>
        you can reach me at
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="email@example.com"
          value={brief.email}
          onChange={update("email")}
        />
      </label>
      <label>
        I need help with a
        <input name="project" placeholder="website, app, product" value={brief.project} onChange={update("project")} />
      </label>
      <label>
        my budget is
        <input name="budget" placeholder="an amount" value={brief.budget} onChange={update("budget")} />
      </label>
      <label>
        and I need it by
        <input name="deadline" placeholder="a date" value={brief.deadline} onChange={update("deadline")} />
      </label>
      <button type="submit">Write the email</button>
      <p className="brief-status" role="status">
        {opened
          ? `Your email app should now be open with this message. If nothing happened, write to ${profile.email}.`
          : "This opens your email app with the message filled in. Nothing is sent until you press send."}
      </p>
    </form>
  );
}

function SiteFooter() {
  return (
    <footer className="main-footer" id="contact" aria-labelledby="contact-title">
      <div className="touch-block">
        <div>
          <h2 id="contact-title">Get in touch</h2>
          <p>Have a project or a role in mind? Email me, or fill in the blanks and I'll take it from there.</p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <ProjectBrief />
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <ul aria-label="Social links">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function App() {
  const [path, navigate] = useRouter();
  const route = matchRoute(path);
  const title = pageTitle(route);
  const mainRef = useRef(null);
  const lastPath = useRef(path);

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Move focus to the new page so keyboard and screen reader users start there.
  useEffect(() => {
    if (lastPath.current === path) return;
    lastPath.current = path;
    if (!window.location.hash) mainRef.current?.focus({ preventScroll: true });
  }, [path]);

  return (
    <NavigateContext value={navigate}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="app-shell">
        <div className="surface">
          <SiteHeader page={route.page} />
          <main id="main" ref={mainRef} tabIndex={-1} className={`content ${route.page}`}>
            {route.page === "home" ? <HomePage /> : null}
            {route.page === "project" ? <ProjectPage index={route.index} /> : null}
            {route.page === "about" ? <AboutPage /> : null}
            {route.page === "not-found" ? <NotFoundPage /> : null}
          </main>
        </div>
        <SiteFooter />
      </div>
    </NavigateContext>
  );
}

export default App;
