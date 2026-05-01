import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { defaultPortfolioData } from "../data/portfolioDefaults";

const STORAGE_KEY = "portfolio_data_v1";
const SESSION_KEY = "portfolio_admin_session_v1";

const ADMIN_CREDENTIALS = {
  email: "Kenyaniemmanuel44@gmail.com",
  password: "Graul@2026",
};

const PortfolioContext = createContext();

function normalizeProject(project, fallbackId = 1) {
  return {
    id: Number(project?.id) || fallbackId,
    title: String(project?.title || ""),
    image: String(project?.image || ""),
    imageName: String(project?.imageName || ""),
    description: String(project?.description || ""),
    link: String(project?.link || ""),
    technologies: Array.isArray(project?.technologies) ? project.technologies : [],
    type: String(project?.type || "Website"),
  };
}

function normalizePortfolioData(input) {
  const source = input && typeof input === "object" ? input : defaultPortfolioData;
  const projectsSource = Array.isArray(source.projects) ? source.projects : defaultPortfolioData.projects;

  return {
    hero: { ...defaultPortfolioData.hero, ...(source.hero || {}) },
    about: { ...defaultPortfolioData.about, ...(source.about || {}) },
    stats: Array.isArray(source.stats) ? source.stats : defaultPortfolioData.stats,
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
