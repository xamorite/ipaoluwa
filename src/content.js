export const profile = {
  name: "Emmanuel Ogunneye",
  email: "eogunneye@gmail.com",
  resume: "/images/Resume.pdf",
  whatsapp: "2349013729581",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/xamorite" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ipaoluwa/" },
  { label: "X", href: "https://x.com/xamorite" },
  { label: "Instagram", href: "https://www.instagram.com/xamorite/" },
];

export const intro = {
  title: "Frontend engineer passionate about building excellent software.",
  body: "I'm Emmanuel. I work mostly in React, Next.js and TypeScript, and I care about the details that make an interface feel obvious: clear flows, fast pages and screens that work for everyone.",
  availability: "Open to frontend roles and freelance projects",
};

export const clients = ["Hanoled", "MOPCARE", "PsychGen Africa", "BTJ"];

export const aboutTeaser = {
  title:
    "Trained in software engineering at Aptech, and in IT and business systems at Middlesex University Dubai.",
  body: "That mix shows up in how I work: before deciding how to build a feature, I want to know why it matters and who it's for.",
};

// Featured projects. Each `story` follows the same tour: the problem, what I
// built, the interesting part, and what I learned.
export const projects = [
  {
    slug: "hanoled",
    title: "Hanoled",
    kind: "Live product",
    summary:
      "A school management platform that brings administrators, teachers and parents into one system.",
    role: "Frontend engineer",
    period: null,
    stack: ["React", "Vite", "Node.js", "PostgreSQL", "Prisma"],
    image: "/images/hanoled.webp",
    imageSize: [1600, 1000],
    imageAlt:
      "Hanoled landing page with the headline “The ultimate school management system” and a call to log in.",
    links: [{ label: "hanoled.com", href: "https://hanoled.com" }],
    story: [
      {
        heading: "The problem",
        body: [
          "A school is a web of relationships. Every student belongs to a class, every class has teachers, and every student has parents or guardians who want to know how they're doing. When that information is spread across office spreadsheets, teachers' notebooks and end-of-term report cards, everyone works from an incomplete picture, and parents often hear about a slipping grade only when the term is already over.",
          "Hanoled puts the whole school in one place, so each person sees exactly what they need and nothing they don't.",
        ],
      },
      {
        heading: "Three people, one product",
        body: [
          "Hanoled has to serve three very different users, and each of them comes to the app for a different reason:",
        ],
        points: [
          {
            label: "Administrators",
            text: "Set up the school and keep it organized: who teaches which class, which parents belong to which student, and who can see what.",
          },
          {
            label: "Teachers",
            text: "Record scores and keep track of the classes they're responsible for, without wading through the rest of the school.",
          },
          {
            label: "Parents",
            text: "Follow their child's academic performance as it's recorded, instead of waiting for a report card.",
          },
        ],
        after: [
          "That became the shape of the frontend: a role-based dashboard for each user, built from one shared set of components so the three experiences still feel like a single product.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "I built the frontend in React with Vite, on top of a Node.js API backed by PostgreSQL and Prisma. The main pieces:",
        ],
        points: [
          {
            label: "Role-based dashboards",
            text: "Each role lands on a home screen built around its own tasks, with navigation that only shows the parts of the school that role works with.",
          },
          {
            label: "A central directory",
            text: "One place to manage students, teachers and parents, with clear assignments and role tags, so an administrator can answer “who teaches this class?” or “who are this student's guardians?” at a glance.",
          },
          {
            label: "Dynamic gradebooks",
            text: "Gradebooks that adapt to each class and subject, so teachers enter scores in one consistent flow.",
          },
          {
            label: "Color-coded grade tracking",
            text: "Results are color-coded so strong and struggling subjects stand out immediately, whether it's a teacher scanning a class or a parent checking in from their phone.",
          },
          {
            label: "Real-time progress for parents",
            text: "Parents see academic performance as soon as it's recorded, which turns the parent view from an end-of-term report into an early warning.",
          },
        ],
      },
      {
        heading: "The interesting part",
        body: [
          "The hardest part wasn't any single screen. It was that the same data has to look different depending on who's looking. A student's grades are something a teacher edits, an administrator oversees and a parent reads. Three separate apps would have been simpler on day one and painful forever after.",
          "Instead, the role is the main organizing idea of the interface. Shared building blocks like tables, profile cards, grade cells and the directory are written once and composed differently for each dashboard. That keeps the experience consistent, and an improvement to a component reaches every role at the same time.",
        ],
      },
      {
        heading: "Built to grow with a school",
        body: [
          "Schools come in every size, so Hanoled is offered in tiers that run from small, newly founded schools up to institutions with no practical limit on scale. That shaped the interface too: the directory and gradebooks have to feel as usable with a handful of classes as they do with hundreds of students.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Designing for three audiences at once forces clarity. A parent checking in from a phone, a teacher entering a full class of scores and an administrator managing the whole school need very different screens, even when they're looking at the same record. Starting from “who is this for, and what are they here to do?” made every later decision easier.",
        ],
      },
    ],
  },
  {
    slug: "mopcare",
    title: "MOPCARE",
    kind: "Product",
    summary:
      "A platform that encourages younger people to care for the emotional needs of older adults, not just their physical ones.",
    role: "Frontend engineer",
    period: "Dec 2023 – Present",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    image: "/images/mopacre.webp",
    imageSize: [1600, 1000],
    imageAlt:
      "MOPCARE home page: “Welcome To Mopcare” over a photo of two people embracing.",
    links: [],
    story: [
      {
        heading: "The problem",
        body: [
          "Loneliness in older adults is easy to miss, because it doesn't show up the way a physical illness does. MOPCARE's mission is to get the younger generation paying attention to seniors' psychological and emotional needs, in addition to their physical ones, through information, courses and services in one place.",
          "That makes the audience broad: family members, volunteers and older adults themselves. The product has to feel calm and obvious to all of them.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "I joined as a frontend engineer in December 2023 and have worked on the product since.",
        ],
        points: [
          {
            label: "A type-safe foundation",
            text: "I built the frontend architecture with Next.js, TypeScript and TailwindCSS, which reduced runtime errors and made it faster to ship new pages with confidence.",
          },
          {
            label: "Faster, more accessible pages",
            text: "I optimized routing and rendering in Next.js to improve load times and accessibility for people who aren't always on the newest phone or the fastest connection.",
          },
          {
            label: "Real-time backend with Supabase",
            text: "I integrated Supabase for authentication and real-time data sync, so signing up, logging in and keeping data current all feel seamless.",
          },
        ],
      },
      {
        heading: "The interesting part",
        body: [
          "Designing for people who may not be confident with technology changes your defaults. Fewer choices per screen. Plain language instead of clever labels. Pages that load quickly even on a modest phone. Here, a slow or confusing screen isn't a minor annoyance. It's the moment someone gives up.",
          "Those constraints turned performance and accessibility from a checklist into the core of the job.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Usability and stability are features. MOPCARE taught me to judge my work by whether the least technical person using it can get where they're going, not by how clever the code is.",
        ],
      },
    ],
  },
  {
    slug: "psychgen",
    title: "PsychGen Portal",
    kind: "Research platform",
    summary:
      "A research portal that gathers African psychiatric genomics data into one searchable place.",
    role: "Frontend engineer",
    period: "Nov 2024 – Dec 2024",
    stack: ["Next.js", "TailwindCSS", "ShadCN", "Axios", "PHP backend"],
    image: "/images/psy.webp",
    imageSize: [1600, 1000],
    imageAlt:
      "PsychGen Portal home page: “Explore African Genomics – Your Gateway to Psychiatric Research”.",
    links: [
      { label: "View live site", href: "https://psychgenportal.netlify.app/" },
    ],
    story: [
      {
        heading: "The problem",
        body: [
          "Psychiatric genomics research depends on finding the right datasets, and that information is often scattered. PsychGen Portal is meant to be a single gateway: one place where researchers can discover, explore and access genomic data relevant to psychiatric research in Africa.",
        ],
      },
      {
        heading: "What I built",
        points: [
          {
            label: "A reusable component system",
            text: "Scalable UI components in Next.js and TailwindCSS that keep every page consistent, responsive and accessible across devices.",
          },
          {
            label: "A unified metadata repository",
            text: "I connected the frontend to a central metadata repository on a PHP backend, so research data can be managed and exchanged securely from one source.",
          },
          {
            label: "Search and filters",
            text: "An optimized search flow that lets researchers quickly locate and filter genomic datasets.",
          },
          {
            label: "Data views",
            text: "API communication with Axios and interactive data views built with ShadCN, giving researchers clearer insight into what each dataset contains.",
          },
        ],
      },
      {
        heading: "The interesting part",
        body: [
          "Search is the heart of a research portal. Researchers usually arrive knowing roughly what they need, so the job of the interface is to narrow things down quickly and get out of the way. Every filter and result view was judged by one question: does this get a researcher to the right dataset faster?",
          "The engagement was short, about two months, so reusable components mattered. Building the shared pieces first meant the search and data views could be assembled from parts that already worked.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Short projects reward good foundations. Investing early in reusable components is what made it possible to ship a consistent portal in a tight window.",
        ],
      },
    ],
  },
  {
    slug: "valorant-concept",
    title: "Valorant Concept",
    kind: "Personal project",
    summary:
      "A fan-made Valorant site where every agent, role and ability is pulled from a live API.",
    role: "Design and development",
    period: null,
    stack: ["React", "Vite", "TailwindCSS", "Valorant API"],
    image: "/images/xamorite-riot.webp",
    imageSize: [1600, 958],
    imageAlt:
      "Valorant concept site showing the agent Jett, her Duelist role, a short bio and her four abilities.",
    links: [{ label: "View live site", href: "https://valorrent.netlify.app/" }],
    note: "Fan project. Not affiliated with or endorsed by Riot Games.",
    story: [
      {
        heading: "Why I built it",
        body: [
          "Game websites are some of the most expressive on the web: bold type, hard angles, motion everywhere. I wanted to see whether I could capture Valorant's sharp, high-contrast visual language, and use it as a reason to practice building an interface driven entirely by live data.",
        ],
      },
      {
        heading: "What I built",
        points: [
          {
            label: "An agent showcase",
            text: "A full-screen carousel that introduces each agent with their role, a short bio, their artwork and their abilities.",
          },
          {
            label: "API-driven content",
            text: "Agents, roles and abilities come from an API instead of being hard-coded, so the site keeps up with the game's roster.",
          },
          {
            label: "Motion with a purpose",
            text: "Transitions between agents give browsing some of the game's energy without getting in the way of reading.",
          },
        ],
      },
      {
        heading: "The interesting part",
        body: [
          "Because I don't write the content, every component has to work with whatever data arrives. One agent layout has to render every agent in the roster, with different names, roles, artwork and abilities, and still look intentional. That pushed me to think in terms of composition: small components with clear inputs, assembled into a layout that doesn't care which agent it's showing.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "This project pushed my skills in interactive UI architecture, component composition and polish: the small details, like consistent spacing and transitions that finish cleanly, that make an interface feel finished.",
        ],
      },
    ],
  },
];

export const otherWork = [
  {
    title: "Nudge",
    description:
      "A mobile app for planning habits, organizing tasks and sharing progress with the people keeping you accountable.",
    stack: "Flutter · Firebase · Riverpod",
  },
  {
    title: "BTJ Campaign",
    description:
      "A landing page for a faith-centered community, designed for warmth and easy reading.",
    stack: "HTML · TailwindCSS · JavaScript",
    href: "https://bibletalkwithjudah.vercel.app/",
  },
  {
    title: "Employee Record Manager",
    description:
      "My Aptech capstone: a Java desktop app with full CRUD, validation and file-based storage.",
    stack: "Java · Swing",
  },
];

export const about = {
  lead: "I'm a frontend engineer from Nigeria. I like taking messy, real-world problems, like running a school, caring for someone or finding the right dataset, and turning them into interfaces that feel simple.",
  body: [
    "I trained at Aptech Computer Education in Nigeria, where I earned an Advanced Diploma in Software Engineering and later joined the faculty as a React instructor. Teaching beginners was a crash course in clarity: if I couldn't explain a component simply, it was usually doing too much.",
    "Since December 2023 I've been a frontend engineer at MOPCARE, building a type-safe Next.js and TypeScript frontend on Supabase. In late 2024 I worked on PsychGen Portal, building reusable components, search and data views for researchers. I also built the frontend for Hanoled, a school management platform for administrators, teachers and parents.",
    "My B.Sc. in Information Technology and Business Information Systems at Middlesex University Dubai added the business side: thinking about who a product serves and what it needs to achieve, not only how it's built.",
  ],
};

export const experience = [
  {
    primary: "Frontend Engineer",
    secondary: "MOPCARE",
    period: "Dec 2023 – Present",
  },
  {
    primary: "Frontend Engineer",
    secondary: "PsychGen Portal",
    period: "Nov 2024 – Dec 2024",
  },
  {
    primary: "React Instructor",
    secondary: "Aptech Computer Education",
    period: "2022",
  },
];

export const education = [
  {
    primary: "B.Sc. Information Technology and Business Information Systems",
    secondary: "Middlesex University Dubai",
    period: "2026",
  },
  {
    primary: "Advanced Diploma in Software Engineering",
    secondary: "Aptech Computer Education, Nigeria",
    period: "2022 – 2024",
  },
];

export const tools = [
  {
    primary: "Languages",
    secondary: "JavaScript, TypeScript, HTML, CSS, Java, Dart",
  },
  {
    primary: "Frameworks and libraries",
    secondary: "React, Next.js, TailwindCSS, Flutter, Riverpod, Provider",
  },
  {
    primary: "Backend and data",
    secondary: "Supabase, Node.js, Prisma, PostgreSQL, MySQL, MongoDB",
  },
  { primary: "Tools", secondary: "Git, AWS, Notion" },
];
