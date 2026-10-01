import { profile, projects } from "./content.js";

const homeTitle = `${profile.name} | Frontend Engineer`;

export function matchRoute(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/") return { page: "home" };
  if (clean === "/about") return { page: "about" };
  const match = clean.match(/^\/work\/([\w-]+)$/);
  const index = match ? projects.findIndex((p) => p.slug === match[1]) : -1;
  if (index !== -1) return { page: "project", index };
  return { page: "not-found" };
}

// Title and link-preview details for each page. The app uses the title at
// runtime; the build writes all of it into a static HTML file per page so
// shared links preview correctly without running JavaScript.
export function metaForRoute(route) {
  if (route.page === "project") {
    const project = projects[route.index];
    return {
      title: `${project.title}, a case study by ${profile.name}`,
      description: project.summary,
      path: `/work/${project.slug}`,
      image: project.shareImage,
    };
  }
  if (route.page === "about") {
    return {
      title: `About ${profile.name}`,
      description: `Experience, education and tools of ${profile.name}, a frontend engineer from Nigeria.`,
      path: "/about",
      image: "/og/home.jpg",
    };
  }
  if (route.page === "not-found") {
    return {
      title: `Page not found | ${profile.name}`,
      description: "This page doesn't exist.",
      path: "/404",
      image: "/og/home.jpg",
      noindex: true,
    };
  }
  return { title: homeTitle, path: "/" };
}

// Pages the build writes as their own HTML file. The home page is index.html
// itself, and 404.html is what Netlify serves for unknown addresses.
export const prerenderRoutes = [
  { page: "about", file: "about/index.html" },
  ...projects.map((project, index) => ({
    page: "project",
    index,
    file: `work/${project.slug}/index.html`,
  })),
  { page: "not-found", file: "404.html" },
];
