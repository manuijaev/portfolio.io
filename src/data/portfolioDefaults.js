export const defaultPortfolioData = {
  hero: {
    headingName: "Emmanuel Kenyani",
    typewriterRoles: [
      "Junior Software Developer",
      "Full-Stack Developer",
      "React & Tailwind Specialist",
      "Firebase & Cloud Enthusiast",
      "Python & Django Developer",
      "RESTful API Engineer",
    ],
    bio:
      "I’m a Junior Software Developer who loves transforming ideas into fast, clean, and interactive digital experiences. I specialize in HTML, CSS, Tailwind, and JavaScript, with strong hands-on experience in React and Firebase. I also work with Python, Django, SQLite, and RESTful API development to build powerful and scalable backend solutions. I’m constantly exploring new technologies and refining my craft to create impactful and user-friendly applications.",
    profileImage: "/projects/me.png",
  },
  about: {
    heading: "About Me",
    intro:
      "Hi, I’m Emmanuel Kenyani, a passionate Junior Software Developer. I enjoy turning ideas into real-world solutions by leveraging modern technologies. My main focus has been web development, where I have gained hands-on experience with HTML, CSS, TailwindCSS, JavaScript, React, Python, Django, SQLite, and Firebase. My goal is to keep learning and contribute to impactful projects that improve lives.",
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
    { label: "Projects Completed", value: 8, suffix: "+" },
    { label: "Happy Clients", value: 1, suffix: "+" },
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Technologies", value: 10, suffix: "+" },
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
  ],
};
