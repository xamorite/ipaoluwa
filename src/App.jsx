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
import { matchRoute, metaForRoute } from "./routes";

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

function ExternalLink({ href, children, showIcon = true, ...props }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
      {showIcon ? <Arrow direction="out" /> : null}
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
        <Link
          to="/"
          className={onWork ? "active" : undefined}
          aria-current={page === "home" ? "page" : onWork ? "true" : undefined}
        >
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
            <ExternalLink href={social.href} showIcon={false}>
              {social.label}
            </ExternalLink>
          </li>
        ))}
        <li>
          <ExternalLink href={profile.resume} showIcon={false}>
            Résumé
          </ExternalLink>
        </li>
      </ul>
    </header>
  );
}

const smallImage = (src) => src.replace(/\.webp$/, "-800.webp");

function ProjectTile({ project, lead = false }) {
  const [width, height] = project.imageSize;
  return (
    <Link to={`/work/${project.slug}`} className={lead ? "project-tile lead" : "project-tile"}>
      <span className="tile-media">
        <img
          src={project.image}
          srcSet={`${smallImage(project.image)} 800w, ${project.image} 1600w`}
          sizes={lead ? "(max-width: 1000px) 100vw, 1300px" : "(max-width: 820px) 100vw, 420px"}
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
        <img
          src={project.image}
          srcSet={`${smallImage(project.image)} 800w, ${project.image} 1600w`}
          sizes="(max-width: 1000px) 100vw, 1300px"
          alt={project.imageAlt}
          width={width}
          height={height}
          fetchPriority="high"
        />
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
                <ExternalLink href={social.href} showIcon={false}>
                  {social.label}
                </ExternalLink>
              </li>
            ))}
            <li>
              <ExternalLink href={profile.resume} showIcon={false}>
                Résumé (PDF)
              </ExternalLink>
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

// WhatsApp glyph from Simple Icons (CC0).
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  );
}

function SiteFooter() {
  const whatsappMessage = encodeURIComponent("Hi Emmanuel, I saw your portfolio.");
  return (
    <footer className="main-footer" id="contact" aria-labelledby="contact-title">
      <div className="touch-block">
        <h2 id="contact-title">Get in touch</h2>
        <p>Have a project or a role in mind? Send me an email or a WhatsApp message.</p>
        <div className="contact-actions">
          <a className="button" href={`mailto:${profile.email}`}>
            Email me
            <Arrow />
          </a>
          <ExternalLink
            className="button button-secondary"
            href={`https://wa.me/${profile.whatsapp}?text=${whatsappMessage}`}
            showIcon={false}
          >
            <WhatsAppIcon />
            WhatsApp
          </ExternalLink>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <ul aria-label="Social links">
          {socials.map((social) => (
            <li key={social.label}>
              <ExternalLink href={social.href} showIcon={false}>
                {social.label}
              </ExternalLink>
            </li>
          ))}
          <li>
            <ExternalLink href={profile.resume} showIcon={false}>
              Résumé
            </ExternalLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function App() {
  const [path, navigate] = useRouter();
  const route = matchRoute(path);
  const { title } = metaForRoute(route);
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
