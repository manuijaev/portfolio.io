export const defaultPortfolioData = {
  footer: {
    tagline: "I'm open to opportunities in web development, frontend engineering, and full-stack projects.",
    socialLinks: [
      { platform: "Email", url: "mailto:kenyaniemmanuel44@gmail.com", icon: "Mail" },
      { platform: "GitHub", url: "https://github.com/manuijaev", icon: "Github" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/emmanuel-kenyani-48b763383", icon: "Linkedin" },
    ],
    adminLink: "/admin/login",
    adminLabel: "Admin Login",
  },
  hero: {
    headingName: "Emmanuel Kenyani",
    typewriterRoles: [
      "Software Developer",
      "Full-Stack Developer",
      "React & Tailwind Specialist",
      "Firebase & Cloud Enthusiast",
      "Python & Django Developer",
      "RESTful API Engineer",
    ],
    bio:
      "I’m a Software Developer who loves transforming ideas into fast, clean, and interactive digital experiences. I specialize in HTML, CSS, Tailwind, and JavaScript, with strong hands-on experience in React and Firebase. I also work with Python, Django, SQLite, and RESTful API development to build powerful and scalable backend solutions. I’m constantly exploring new technologies and refining my craft to create impactful and user-friendly applications.",
    profileImage: "/projects/me.png",
  },
  about: {
    heading: "About Me",
    intro:
      "Hi, I’m Emmanuel Kenyani, a passionate Software Developer. I enjoy turning ideas into real-world solutions by leveraging modern technologies. My main focus has been web development, where I have gained hands-on experience with HTML, CSS, TailwindCSS, JavaScript, React, Python, Django, SQLite, and Firebase. My goal is to keep learning and contribute to impactful projects that improve lives.",
    story:
      "I build practical products with strong UI clarity and dependable backend behavior. I enjoy owning features end-to-end, from wireframe and architecture decisions to deployment and iteration.",
    achievements: [
      "Built and deployed House Hunter, a platform connecting tenants and landlords with dynamic listings.",
      "Designed and developed a bill splitter app with persistent storage and filtering features.",
      "Completed hands-on training at Zindua School covering modern frontend and backend workflows.",
      "Continuously improve through personal projects, collaboration, and real-world problem solving.",
    ],
  },
  stats: [
    { label: "Projects Completed", value: 7, suffix: "+" },
    { label: "Happy Clients", value: 1, suffix: "+" },
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Technologies", value: 16, suffix: "+" },
  ],
  skills: [
    { id: 1, name: "React", category: "Frontend", experience: 86 },
    { id: 2, name: "Tailwind CSS", category: "Frontend", experience: 84 },
    { id: 3, name: "JavaScript", category: "Frontend", experience: 82 },
    { id: 4, name: "TypeScript", category: "Frontend", experience: 70 },
    { id: 5, name: "Node.js", category: "Backend", experience: 74 },
    { id: 6, name: "Django", category: "Backend", experience: 76 },
    { id: 7, name: "Flask", category: "Backend", experience: 72 },
    { id: 8, name: "PostgreSQL", category: "Database", experience: 68 },
    { id: 9, name: "Firebase", category: "Cloud", experience: 78 },
    { id: 10, name: "Git & GitHub", category: "Tools", experience: 88 },
    { id: 11, name: "MySQL", category: "Database", experience: 65 },
    { id: 12, name: "MongoDB", category: "Database", experience: 62 },
    { id: 13, name: "Framer motion", category: "Frontend", experience: 70 },
    { id: 14, name: "Next.js", category: "Frontend", experience: 68 },
    { id: 15, name: "Websockets", category: "Backend", experience: 60 },
    { id: 16, name: "UI/UX", category: "Design", experience: 75 },
  ],
  projects: [
    {
      id: 1,
      title: "House Hunter Platform",
      image: "/projects/image.png",
      description:
        "A web app connecting tenants and landlords, allowing landlords to post houses with specifications and tenants to view listings and comment. NOTE, STILL UNDER DEVELOPMENT",
      link: "https://house-hunter-ehq3.vercel.app/",
      technologies: ["Django", "React.js"],
      type: "Website",
    },
    {
      id: 2,
      title: "Bill Splitter App",
      image: "/projects/bill.png",
      description:
        "A budget tracker web app that records income and expenses, supports filtering and deletion, and persists data with cookies.",
      link: "https://manuijaev.github.io/bill-splliter/",
      technologies: ["JavaScript", "HTML", "CSS"],
      type: "Website",
    },
    {
      id: 3,
      title: "Smart Budget Dashboard",
      image: "/projects/smartbudget.png",
      description:
        "A single visual hub that categorizes spending, tracks goals, and gives financial clarity using a modern dashboard interface.",
      link: "https://smart-dash-mlb2.onrender.com/",
      technologies: ["Flask", "UI/UX Principles", "Python"],
      type: "Dashboard",
      caseStudy: {
        problem:
          "Designing a dashboard that stays simple while displaying rich financial data.",
        approach:
          "Built category-level spending views with clear hierarchy and progressive disclosure so users can see detail without feeling overwhelmed.",
        outcome:
          "Delivered a clean and responsive budgeting interface that supports decision-making across different spending behaviors.",
        architecture:
          "Separated budgeting logic, visualization components, and interaction handling to keep the system maintainable during rapid iteration.",
        challenges: [
          "Designing a dashboard that stays simple while displaying rich financial data.",
          "Balancing visual clarity with detailed category-level spending insights.",
          "Keeping budgeting logic accurate across different user spending patterns.",
          "Maintaining a clean codebase while iterating quickly on UI and features.",
          "Ensuring the interface feels responsive and readable on multiple screen sizes.",
        ],
      },
    },
    {
      id: 4,
      title: "Patrolscan",
      image: "/projects/patrol.png",
      description:
        "A modern patrol management system with QR-based guard tracking, real-time reports, offline PWA support, and role-based access.",
      link: "https://patrolscan.vercel.app/admin-login",
      technologies: ["Node.js", "React.js"],
      type: "Dashboard",
    },

    {
      id: 5,
      title: "Visitor attendance system",
      image: "/projects/visitor.png",
      description:
        "The Smart Appointment Booking System is a role-based PWA for handling visitor/staff appointments end-to-end. Visitors submit requests through a guided multi-step form, staff manage and respond from a dashboard, and admins control departments, divisions, staff accounts, and appointment assignments from an admin dashboard. The system uses JWT-secured APIs and multi-channel notifications (push, email, SMS) to keep everyone updated in near real time.",
      link: "https://smart-appointment-dashboard-iota.vercel.app/",
      technologies: ["React", "Python", "Django", "PostgreSQL", "Firebase", "EmailJs"],
      type: "Website",
      caseStudy: {
        problem:
          "Organizations handling appointments manually face delayed responses, poor visibility, and inconsistent communication between visitors, staff, and administrators.",
        approach:
          "Built a full-stack web app with:\n\n-Visitor flow for structured appointment requests\n-Staff workspace for accepting, rescheduling, or declining requests\n-Admin control center for organizational setup and oversight\n-Secure JWT auth with role-based access\n-Notification stack (FCM + Email + SMS) and periodic dashboard refresh",
        outcome:
          "-Faster appointment routing and response turnaround\n-Better transparency for visitors and teams\n-Centralized administrative control\n-Improved responsiveness through PWA behavior and real-time alerts",
        architecture:
          "-React PWA frontend handles UI, routing, auth state, and API calls\n-Django REST API handles business logic, validation, auth, and notifications\n-PostgreSQL stores users, departments/divisions, and appointments\n-Notification services fan out updates via FCM, email, and SMS\n-Dashboards refresh every ~15 seconds, with push used for immediate alerts",
        challenges: [
          "Ensuring real-time reliability across polling + push notifications",
          "Managing JWT refresh and session consistency across tabs/devices",
          "Maintaining strict data integrity (department/division/staff relationships)",
          "Handling fallback behavior when external notification providers fail",
          "Balancing offline/PWA caching with always-fresh operational data",
        ],
      },
      videoPresentation: { src: "", name: "", type: "", size: 0 },
    },
    {
      id: 6,
      title: "Security Gate management system",
      image: "/projects/security.png",
      description:
        "Security Gate Management is a full-stack web application for controlling and tracking people/vehicle movement in a secure facility (warehouse/campus). It centralizes visitor intake, vehicle entry, delivery logs, yard exits, repossessed vehicles, staff/department management, and role-based dashboards for guards, supervisors, and admins.",
      link: "https://security-gate-manegement-system.vercel.app/",
      technologies: ["React", "Node.js", "Express.js", "PostgreSQL", "JWT"],
      type: "Dashboard",
      caseStudy: {
        problem:
          "Security teams were handling gate operations across scattered logs and manual records, making it hard to:\n\n-enforce role-based access,\n-monitor who/what is currently inside,\n-track complete movement history,\n-produce reliable operational reports quickly",
        approach:
          "Built a single-repo platform with:\n\n-unified movement APIs (visitors, vehicle_entries, deliveries, yard_exits, repossessed_vehicles),\n-role-aware UI workflows for guard/supervisor/admin,\n-daily dashboard + analytics endpoints,\n-report exports (CSV/Excel/PDF),\n-alerts for overdue visitors and vehicles still inside,\n-PostgreSQL schema with constraints and idempotent startup initialization.",
        outcome:
          "-Centralized and searchable gate records in one system.\n-Faster daily operations through specialized role dashboards and quick-entry forms.\n-Better oversight via real-time summaries, notifications, and exportable reports for audit/compliance workflows.",
        architecture:
          "-Frontend (React SPA): UI, forms, filters, tables, exports, session timeout handling.\n-API Layer (Express): authentication, authorization, CRUD + reporting endpoints.\n-Data Layer (PostgreSQL): normalized tables for users, departments, staff, and all movement entities.\n-Deployment Model: can run split (frontend + API) in dev, and backend serves built SPA in production.",
        challenges: [
          "Key challenge was unifying multiple operational domains into one consistent movement timeline while enforcing role permissions and maintaining operational speed.",
          "A second challenge is security hardening for production (current codebase stores plaintext passwords, so password hashing and stronger session controls are a required next step).",
        ],
      },
      videoPresentation: { src: "", name: "", type: "", size: 0 },
    },
    {
      id: 7,
      title: "SkyWorld Survey Platform",
      image: "/projects/skyworld.png",
      description:
        "A full-stack survey management platform built for a technical assessment, spanning web, mobile, and API layers in a single monorepo. Admins can create surveys with multiple question types, while respondents complete surveys through a dynamic, stepped form with review-before-submit and multipart XML submission. Includes a PostgreSQL-backed REST API with full XML request/response support, a responsive Next.js web app installable as a PWA, and a native Android app packaged as a Trusted Web Activity (TWA) with a signed APK release.",
      link: "https://survey-platform-lemon-one.vercel.app",
      technologies: ["Next.js", "React", "TypeScript", "PWA", "Java", "Spring Boot", "PostgreSQL", "REST API"],
      type: "Website",
      caseStudy: {
        problem:
          "Sky World needed a survey platform where admins could build and manage dynamic surveys and respondents could complete them seamlessly across web and mobile, with certificates generated on completion. The brief also required XML-based REST APIs rather than JSON.",
        approach:
          "Structured the project as a monorepo with separated backend, frontend, database, and mobile layers. Built the API in Spring Boot with Jackson XML for serialization, modeled the schema in PostgreSQL with Flyway migrations, and built a stepped survey form in Next.js with review and multipart submission. Wrapped the production PWA in a Trusted Web Activity (TWA) via Bubblewrap to ship a signed Android APK from the same codebase.",
        outcome:
          "Delivered a fully compliant implementation covering database design, a complete XML REST API, an admin dashboard with CRUD and paginated/filterable response management, a public survey flow, and three install paths for mobile (APK, Android PWA, iOS PWA).",
        architecture:
          "Three-tier monorepo: PostgreSQL database layer, a Spring Boot REST API using XML for all request/response bodies, and a Next.js/React frontend serving both the admin dashboard and public survey flow. The mobile app is a TWA wrapping the deployed PWA rather than a separate codebase.",
        challenges: [
          "Implementing XML (not JSON) as the API's request/response format with Jackson XML",
          "Designing a dynamic, multi-step survey form that adapts its inputs per question type",
          "Handling multipart form submissions (including file uploads) within an XML API contract",
          "Packaging a web PWA as a signed, installable native Android app via Bubblewrap/TWA",
          "Managing ephemeral disk storage for certificate files on Render's free tier",
        ],
      },
      videoPresentation: { src: "", name: "", type: "", size: 0 },
    },
  ],
};