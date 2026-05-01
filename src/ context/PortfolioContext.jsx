import { createContext, useContext, useMemo, useState } from "react";
import { defaultPortfolioData } from "../data/portfolioDefaults";

const STORAGE_KEY = "portfolio_data_v1";
const SESSION_KEY = "portfolio_admin_session_v1";

const ADMIN_CREDENTIALS = {
  email: "Kenyaniemmanuel44@gmail.com",
  password: "Graul@2026",
};

const PortfolioContext = createContext();

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
    safelyReadStorage(STORAGE_KEY, defaultPortfolioData)
  );
  const [adminSession, setAdminSession] = useState(() =>
    safelyReadStorage(SESSION_KEY, { authenticated: false, email: "" })
  );

  const persistPortfolioData = (nextData) => {
    try {
      const serialized = JSON.stringify(nextData);
      localStorage.setItem(STORAGE_KEY, serialized);
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
    return persistPortfolioData({
      ...portfolioData,
      hero: { ...portfolioData.hero, ...heroPatch },
    });
  };

  const updateAbout = (aboutPatch) => {
    return persistPortfolioData({
      ...portfolioData,
      about: { ...portfolioData.about, ...aboutPatch },
    });
  };

  const updateStats = (nextStats) => {
    return persistPortfolioData({
      ...portfolioData,
      stats: nextStats,
    });
  };

  const addProject = (projectInput) => {
    const maxId = portfolioData.projects.reduce((max, project) => Math.max(max, project.id), 0);
    const newProject = { ...projectInput, id: maxId + 1 };
    return persistPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, newProject],
    });
  };

  const updateProject = (projectId, projectPatch) => {
    return persistPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.map((project) =>
        project.id === projectId ? { ...project, ...projectPatch } : project
      ),
    });
  };

  const deleteProject = (projectId) => {
    return persistPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.filter((project) => project.id !== projectId),
    });
  };

  const resetPortfolioData = () => {
    return persistPortfolioData(defaultPortfolioData);
  };

  const loginAdmin = ({ email, password }) => {
    const isValid =
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password;

    if (!isValid) {
      return { success: false, message: "Invalid email or password." };
    }

    const session = { authenticated: true, email: ADMIN_CREDENTIALS.email };
    setAdminSession(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true };
  };

  const logoutAdmin = () => {
    const session = { authenticated: false, email: "" };
    setAdminSession(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  };

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
