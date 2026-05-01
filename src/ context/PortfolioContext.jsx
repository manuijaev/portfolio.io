import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { defaultPortfolioData } from "../data/portfolioDefaults";

const STORAGE_KEY = "portfolio_data_v1";
const SESSION_KEY = "portfolio_admin_session_v1";

const ADMIN_CREDENTIALS = {
  email: "Kenyaniemmanuel44@gmail.com",
  password: "Graul@2026",
};

const PortfolioContext = createContext();

function normalizeAbout(about) {
  const source = about && typeof about === "object" ? about : {};
  return {
    heading: String(source.heading || defaultPortfolioData.about.heading || "About Me"),
    intro: String(source.intro || defaultPortfolioData.about.intro || ""),
    story: String(source.story || defaultPortfolioData.about.story || ""),
    achievements: Array.isArray(source.achievements)
      ? source.achievements.map((item) => String(item || "").trim()).filter(Boolean)
      : defaultPortfolioData.about.achievements || [],
  };
}

function normalizeSkill(skill, fallbackId = 1) {
  const source = skill && typeof skill === "object" ? skill : {};
  return {
    id: Number(source.id) || fallbackId,
    name: String(source.name || ""),
    category: String(source.category || "General"),
    experience: Math.max(0, Math.min(100, Number(source.experience) || 0)),
  };
}

function normalizeCaseStudy(caseStudy, project = {}) {
  const source = caseStudy && typeof caseStudy === "object" ? caseStudy : {};
  const fallbackTitle = String(project?.title || "this project");
  const fallbackType = String(project?.type || "web product").toLowerCase();
  const fallbackDescription = String(project?.description || "").trim();
  const fallbackTech = Array.isArray(project?.technologies) ? project.technologies : [];

  return {
    problem:
      String(source.problem || "").trim() ||
      `Build ${fallbackTitle} as a reliable ${fallbackType} that solves a clear user need while keeping the experience intuitive.`,
    approach:
      String(source.approach || "").trim() ||
      `Implemented an iterative delivery plan using ${fallbackTech.join(", ") || "modern frontend and backend tools"} with frequent UI and logic refinements.`,
    outcome:
      String(source.outcome || "").trim() ||
      `Shipped a production-ready experience with measurable usability improvements and a maintainable code structure.`,
    architecture:
      String(source.architecture || "").trim() ||
      (fallbackDescription
        ? `System summary: ${fallbackDescription}`
        : "Structured the app into reusable UI components, service logic, and persistence layers for easier scaling."),
    challenges: Array.isArray(source.challenges)
      ? source.challenges.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
}

function normalizeVideoPresentation(videoPresentation) {
  const source = videoPresentation && typeof videoPresentation === "object" ? videoPresentation : {};
  return {
    src: typeof source.src === "string" ? source.src : "",
    name: typeof source.name === "string" ? source.name : "",
    type: typeof source.type === "string" ? source.type : "",
    size: Number(source.size) || 0,
  };
}

function normalizeProject(project, fallbackId = 1) {
  const normalizedProject = {
    id: Number(project?.id) || fallbackId,
    title: String(project?.title || ""),
    image: String(project?.image || ""),
    imageName: String(project?.imageName || ""),
    description: String(project?.description || ""),
    link: String(project?.link || ""),
    technologies: Array.isArray(project?.technologies) ? project.technologies : [],
    type: String(project?.type || "Website"),
  };

  return {
    ...normalizedProject,
    caseStudy: normalizeCaseStudy(project?.caseStudy, normalizedProject),
    videoPresentation: normalizeVideoPresentation(project?.videoPresentation),
  };
}

function normalizePortfolioData(input) {
  const source = input && typeof input === "object" ? input : defaultPortfolioData;
  const projectsSource = Array.isArray(source.projects) ? source.projects : defaultPortfolioData.projects;
  const skillsSource = Array.isArray(source.skills) ? source.skills : defaultPortfolioData.skills;

  return {
    hero: { ...defaultPortfolioData.hero, ...(source.hero || {}) },
    about: normalizeAbout(source.about),
    stats: Array.isArray(source.stats) ? source.stats : defaultPortfolioData.stats,
    skills: skillsSource.map((skill, index) => normalizeSkill(skill, index + 1)),
    projects: projectsSource.map((project, index) => normalizeProject(project, index + 1)),
  };
}

function safelyReadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(() =>
    normalizePortfolioData(safelyReadStorage(STORAGE_KEY, defaultPortfolioData))
  );
  const [adminSession, setAdminSession] = useState(() =>
    safelyReadStorage(SESSION_KEY, { authenticated: false, email: "" })
  );
  const portfolioDataRef = useRef(portfolioData);
  const adminSessionRef = useRef(adminSession);

  useEffect(() => {
    portfolioDataRef.current = portfolioData;
  }, [portfolioData]);

  useEffect(() => {
    adminSessionRef.current = adminSession;
  }, [adminSession]);

  const persistPortfolioData = (updater) => {
    const nextData = normalizePortfolioData(
      typeof updater === "function" ? updater(portfolioDataRef.current) : updater
    );
    try {
      const serialized = JSON.stringify(nextData);
      localStorage.setItem(STORAGE_KEY, serialized);
      portfolioDataRef.current = nextData;
      setPortfolioData(nextData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error?.name === "QuotaExceededError"
            ? "Storage is full. Please use smaller images or delete some projects."
            : "Failed to save portfolio data.",
      };
    }
  };

  const updateHero = (heroPatch) => {
    return persistPortfolioData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroPatch },
    }));
  };

  const updateAbout = (aboutPatch) => {
    return persistPortfolioData((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutPatch },
    }));
  };

  const updateStats = (nextStats) => {
    return persistPortfolioData((prev) => ({
      ...prev,
      stats: nextStats,
    }));
  };

  const updateSkills = (nextSkills) => {
    return persistPortfolioData((prev) => ({
      ...prev,
      skills: Array.isArray(nextSkills)
        ? nextSkills.map((skill, index) => normalizeSkill(skill, index + 1))
        : prev.skills,
    }));
  };

  const addProject = (projectInput) => {
    return persistPortfolioData((prev) => {
      const maxId = prev.projects.reduce((max, project) => Math.max(max, Number(project.id) || 0), 0);
      const newProject = normalizeProject({ ...projectInput, id: maxId + 1 }, maxId + 1);
      return {
        ...prev,
        projects: [...prev.projects, newProject],
      };
    });
  };

  const updateProject = (projectId, projectPatch) => {
    return persistPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === projectId ? normalizeProject({ ...project, ...projectPatch }, project.id) : project
      ),
    }));
  };

  const deleteProject = (projectId) => {
    return persistPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== projectId),
    }));
  };

  const resetPortfolioData = () => {
    return persistPortfolioData(() => defaultPortfolioData);
  };

  const loginAdmin = ({ email, password }) => {
    const isValid =
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password;

    if (!isValid) {
      return { success: false, message: "Invalid email or password." };
    }

    const session = { authenticated: true, email: ADMIN_CREDENTIALS.email };
    adminSessionRef.current = session;
    setAdminSession(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true };
  };

  const logoutAdmin = () => {
    const session = { authenticated: false, email: "" };
    adminSessionRef.current = session;
    setAdminSession(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  };

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        const incoming = normalizePortfolioData(safelyReadStorage(STORAGE_KEY, defaultPortfolioData));
        portfolioDataRef.current = incoming;
        setPortfolioData(incoming);
      }

      if (event.key === SESSION_KEY) {
        const incomingSession = safelyReadStorage(SESSION_KEY, { authenticated: false, email: "" });
        adminSessionRef.current = incomingSession;
        setAdminSession(incomingSession);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      portfolioData,
      updateHero,
      updateAbout,
      updateStats,
      updateSkills,
      addProject,
      updateProject,
      deleteProject,
      resetPortfolioData,
      adminSession,
      loginAdmin,
      logoutAdmin,
    }),
    [portfolioData, adminSession]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
