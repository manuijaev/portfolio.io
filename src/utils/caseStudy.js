export function buildCaseStudy(project) {
  const title = String(project?.title || "Untitled Project");
  const type = String(project?.type || "Product");
  const description = String(project?.description || "").trim();
  const technologies = Array.isArray(project?.technologies) ? project.technologies : [];
  const stored = project?.caseStudy && typeof project.caseStudy === "object" ? project.caseStudy : {};

  const fallbackProblem = `The core mission for ${title} was to deliver a stable ${type.toLowerCase()} that solves a real user workflow with speed and clarity.`;
  const fallbackApproach = `The implementation focused on incremental delivery, reusable UI patterns, and clear state management using ${technologies.join(", ") || "a practical full-stack toolkit"}.`;
  const fallbackOutcome = `The result is a deployable experience with stronger usability, clearer data flow, and a codebase that is easier to maintain over time.`;
  const fallbackArchitecture = description
    ? `Architecture focus: ${description}`
    : "Architecture focus: modular components on the client, dedicated logic for data handling, and persistence-ready project structure.";

  const normalizedChallenges = Array.isArray(stored.challenges)
    ? stored.challenges.map((item) => String(item || "").trim()).filter(Boolean)
    : [];

  const challenges =
    normalizedChallenges.length > 0
      ? normalizedChallenges
      : [
          "Converting requirements into an intuitive and responsive UI across mobile and desktop.",
          "Maintaining clean data flow while supporting fast iteration on features.",
          "Balancing delivery speed with maintainable code and future scalability.",
        ];

  return {
    problem: String(stored.problem || "").trim() || fallbackProblem,
    approach: String(stored.approach || "").trim() || fallbackApproach,
    outcome: String(stored.outcome || "").trim() || fallbackOutcome,
    architecture: String(stored.architecture || "").trim() || fallbackArchitecture,
    challenges,
    highlights:
      technologies.length > 0
        ? technologies.map((tech) => `${tech} integration to support core product goals.`)
        : ["End-to-end product delivery from concept to working implementation."],
  };
}

export function getProjectVideo(project) {
  const video = project?.videoPresentation;
  if (!video || typeof video !== "object") return null;
  if (typeof video.src !== "string" || !video.src.trim()) return null;

  return {
    src: video.src,
    name: String(video.name || "Project walkthrough"),
    type: String(video.type || "video/mp4"),
    size: Number(video.size) || 0,
  };
}

export function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (!value) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${size.toFixed(size >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}
