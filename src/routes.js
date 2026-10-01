import { education, profile, projects, socials } from "./content.js";

export function matchRoute(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/") return { page: "home" };
  if (clean === "/about") return { page: "about" };
  const match = clean.match(/^\/work\/([\w-]+)$/);
  const index = match ? projects.findIndex((p) => p.slug === match[1]) : -1;
  if (index !== -1) return { page: "project", index };
  return { page: "not-found" };
}

const site = profile.siteUrl;
const personId = `${site}/#person`;
const websiteId = `${site}/#website`;

// Who the site is about. Search engines use alternateName and sameAs to tie
// "xamorite" and the social profiles to the same person.
const person = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: profile.alias,
  jobTitle: profile.role,
  url: `${site}/`,
  image: `${site}/icon-512.png`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  sameAs: socials.map((social) => social.href),
  alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: item.secondary })),
  knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Frontend development", "Flutter"],
};

// The site's own name, which Google can show as the site name in results.
const website = {
  "@type": "WebSite",
  "@id": websiteId,
  name: profile.alias,
  alternateName: [profile.name, `${profile.alias} portfolio`],
  url: `${site}/`,
  inLanguage: "en",
  author: { "@id": personId },
};

const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": [website, person, ...nodes] });

// Title, link-preview details and structured data for each page. The app uses
// the title at runtime; the build writes all of it into a static HTML file per
// page so shared links and search engines see it without running JavaScript.
export function metaForRoute(route) {
  if (route.page === "project") {
    const project = projects[route.index];
    const path = `/work/${project.slug}`;
    return {
      title: `${project.title} case study · ${profile.alias}`,
      description: project.summary,
      path,
      image: project.shareImage,
      imageAlt: `${project.title} case study by ${profile.name} (${profile.alias})`,
      jsonLd: graph(
        {
          "@type": "CreativeWork",
          "@id": `${site}${path}#work`,
          name: project.title,
          description: project.summary,
          url: `${site}${path}`,
          image: `${site}${project.shareImage}`,
          keywords: project.stack.join(", "),
          author: { "@id": personId },
          isPartOf: { "@id": websiteId },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: profile.alias, item: `${site}/` },
            { "@type": "ListItem", position: 2, name: project.title, item: `${site}${path}` },
          ],
        },
      ),
    };
  }
  if (route.page === "about") {
    return {
      title: `About ${profile.name} · ${profile.alias}`,
      description: `${profile.name}, known online as ${profile.alias}, is a frontend engineer from Nigeria. Experience, education and the tools he works with.`,
      path: "/about",
      image: profile.shareImage,
      imageAlt: `${profile.alias}: ${profile.name}, frontend engineer in Nigeria`,
      jsonLd: graph({
        "@type": "ProfilePage",
        "@id": `${site}/about#page`,
        url: `${site}/about`,
        name: `About ${profile.name}`,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      }),
    };
  }
  if (route.page === "not-found") {
    return {
      title: `Page not found · ${profile.alias}`,
      description: "This page doesn't exist.",
      path: "/404",
      image: profile.shareImage,
      imageAlt: `${profile.alias}: ${profile.name}, frontend engineer in Nigeria`,
      noindex: true,
    };
  }
  return {
    title: `${profile.alias} · ${profile.name}, ${profile.role}`,
    description: profile.description,
    path: "/",
    image: profile.shareImage,
    imageAlt: `${profile.alias}: ${profile.name}, frontend engineer in Nigeria`,
    jsonLd: graph(),
  };
}

// Pages the build writes as their own HTML file. The home page rewrites
// index.html itself, and 404.html is what Netlify serves for unknown addresses.
export const prerenderRoutes = [
  { page: "home", file: "index.html" },
  { page: "about", file: "about/index.html" },
  ...projects.map((project, index) => ({
    page: "project",
    index,
    file: `work/${project.slug}/index.html`,
  })),
  { page: "not-found", file: "404.html" },
];
