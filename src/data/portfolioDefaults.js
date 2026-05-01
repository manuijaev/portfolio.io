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
    intro:
      "Hi, I’m Emmanuel Kenyani, a passionate Junior Software Developer. I enjoy turning ideas into real-world solutions by leveraging modern technologies. My main focus has been web development, where I have gained hands-on experience with HTML, CSS, TailwindCSS, JavaScript, React, Python, Django, SQLite, and Firebase. My goal is to keep learning and contribute to impactful projects that improve lives.",
  },
  stats: [
    { label: "Projects Completed", value: 8, suffix: "+" },
    { label: "Happy Clients", value: 1, suffix: "+" },
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Technologies", value: 10, suffix: "+" },
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
