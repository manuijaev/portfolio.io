import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImagePlus,
  Link2,
  PlusCircle,
  Save,
  Trash2,
  XCircle,
  Pencil,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { getProjectLink } from "../../utils/caseStudy";
import GlassButton from "../../components/GlassButton";

const PROJECT_TYPES = ["Software", "Dashboard", "Website", "PWA", "Native App", "API", "Other"];
const TECHNOLOGY_OPTIONS = [
  "HTML5", "CSS3", "Sass", "Less", "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Ant Design",
  "JavaScript", "TypeScript", "React", "Next.js", "Gatsby", "Vue.js", "Nuxt.js", "Angular", "Svelte", "SvelteKit",
  "SolidJS", "Redux", "Zustand", "Recoil", "React Query", "GraphQL", "Apollo", "Relay", "D3.js", "Three.js",
  "Framer Motion", "GSAP", "PWA", "Service Workers", "Webpack", "Vite", "Rollup", "Babel", "Node.js", "Express.js",
  "Fastify", "NestJS", "Koa", "Python", "Django", "Flask", "FastAPI", "Ruby on Rails", "PHP", "Laravel",
  "CodeIgniter", "Java", "Spring Boot", "Kotlin", "C#", ".NET", "Go", "Rust", "C++", "C", "PostgreSQL", "MySQL",
  "MariaDB", "SQLite", "MongoDB", "Redis", "Elasticsearch", "Firebase", "Supabase", "Prisma", "Sequelize",
  "TypeORM", "Mongoose", "REST API", "OpenAPI", "gRPC", "WebSockets", "Socket.IO", "JWT", "OAuth 2.0",
  "Auth0", "Clerk", "Stripe", "PayPal API", "AWS", "AWS Lambda", "EC2", "S3", "CloudFront", "Azure",
  "Google Cloud", "Cloud Functions", "Docker", "Kubernetes", "Nginx", "CI/CD", "GitHub Actions", "GitLab CI",
  "Jenkins", "Linux", "Bash", "PowerShell", "Git", "GitHub", "Bitbucket", "Figma", "Adobe XD", "UI/UX",
  "Responsive Design", "Accessibility (a11y)", "Jest", "Vitest", "React Testing Library", "Cypress", "Playwright",
  "Pytest", "Postman", "Insomnia", "Microservices", "Monorepo", "Turborepo", "Nx", "Data Structures", "Algorithms",
  "Machine Learning", "TensorFlow", "Pandas", "NumPy", "OpenCV", "Flutter", "React Native", "Expo", "Swift",
  "SwiftUI", "Kotlin Multiplatform", "Electron", "Tauri",
];

const MotionDiv = motion.div;

function getEmptyProject() {
  return {
    title: "",
    image: "",
    imageName: "",
    description: "",
    link: "",
    technologies: [],
    type: "Website",
    caseStudyProblem: "",
    caseStudyApproach: "",
    caseStudyOutcome: "",
    caseStudyArchitecture: "",
    caseStudyChallengesText: "",
    videoPresentation: { src: "", name: "", type: "", size: 0 },
  };
}

export default function ProjectsManagerPanel() {
  const { portfolioData, addProject, updateProject, deleteProject } = usePortfolio();
  const [projectForm, setProjectForm] = useState(getEmptyProject());
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectSaveState, setProjectSaveState] = useState({ isSaving: false, progress: 0, label: "" });
  const [technologySearch, setTechnologySearch] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const heroImageInputRef = useRef(null);

  const filteredTechnologyOptions = useMemo(() => {
    const query = technologySearch.trim().toLowerCase();
    return TECHNOLOGY_OPTIONS.filter((tech) => tech.toLowerCase().includes(query)).slice(0, 80);
  }, [technologySearch]);

  const handleProjectImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProjectForm((prev) => ({
        ...prev,
        image: typeof reader.result === "string" ? reader.result : "",
        imageName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleProjectVideoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      alert("Please choose a valid video file.");
      return;
    }
    if (file.size > 40 * 1024 * 1024) {
      alert("This video is too large. Use a hosted video URL below for larger videos.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProjectForm((prev) => ({
        ...prev,
        videoPresentation: {
          src: typeof reader.result === "string" ? reader.result : "",
          name: file.name,
          type: file.type,
          size: file.size,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const toggleTechnology = (technology) => {
    setProjectForm((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(technology)
        ? prev.technologies.filter((item) => item !== technology)
        : [...prev.technologies, technology],
    }));
  };

  const handleProjectSave = async () => {
    if (projectSaveState.isSaving) return;

    setProjectSaveState({ isSaving: true, progress: 10, label: "Validating project details..." });
    const normalizedProjectLink = getProjectLink({ link: projectForm.link });
    const payload = {
      title: projectForm.title.trim(),
      image: projectForm.image,
      imageName: projectForm.imageName,
      description: projectForm.description.trim(),
      link: normalizedProjectLink,
      technologies: projectForm.technologies,
      type: projectForm.type.trim() || "Website",
      caseStudy: {
        problem: projectForm.caseStudyProblem.trim(),
        approach: projectForm.caseStudyApproach.trim(),
        outcome: projectForm.caseStudyOutcome.trim(),
        architecture: projectForm.caseStudyArchitecture.trim(),
        challenges: projectForm.caseStudyChallengesText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      },
      videoPresentation: projectForm.videoPresentation,
    };

    if (!payload.title || !payload.image || !payload.description || !payload.link) {
      setProjectSaveState({ isSaving: false, progress: 0, label: "" });
      alert("Fill the title, image, description, and a valid live URL.");
      return;
    }

    setProjectSaveState({ isSaving: true, progress: 35, label: "Preparing project payload..." });

    setTimeout(() => {
      setProjectSaveState((prev) =>
        prev.isSaving ? { isSaving: true, progress: Math.max(prev.progress, 70), label: "Saving to local storage..." } : prev
      );
    }, 150);

    const result = editingProjectId ? await updateProject(editingProjectId, payload) : await addProject(payload);
    if (!result?.success) {
      setProjectSaveState({ isSaving: false, progress: 0, label: "" });
      alert(result?.message || "Failed to save project.");
      return;
    }

    setProjectSaveState({ isSaving: false, progress: 100, label: "Saved successfully." });
    setEditingProjectId(null);
    setProjectForm(getEmptyProject());
    setShowProjectForm(false);
    setTimeout(() => {
      setProjectSaveState({ isSaving: false, progress: 0, label: "" });
    }, 1200);
  };

  const startEditProject = (project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      image: project.image,
      imageName: project.imageName || "",
      description: project.description,
      link: project.link,
      technologies: project.technologies || [],
      type: project.type,
      caseStudyProblem: project.caseStudy?.problem || "",
      caseStudyApproach: project.caseStudy?.approach || "",
      caseStudyOutcome: project.caseStudy?.outcome || "",
      caseStudyArchitecture: project.caseStudy?.architecture || "",
      caseStudyChallengesText: (project.caseStudy?.challenges || []).join("\n"),
      videoPresentation: {
        src: project.videoPresentation?.src || "",
        name: project.videoPresentation?.name || "",
        type: project.videoPresentation?.type || "",
        size: Number(project.videoPresentation?.size) || 0,
      },
    });
    setShowProjectForm(true);
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg backdrop-blur"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Projects Manager</h2>
        <GlassButton
          onClick={() => {
            setShowProjectForm(!showProjectForm);
            if (showProjectForm) {
              setEditingProjectId(null);
              setProjectForm(getEmptyProject());
            }
          }}
          color="emerald"
          size="sm"
          icon={showProjectForm ? ChevronUp : PlusCircle}
        >
          {showProjectForm ? "Cancel" : "New Project"}
        </GlassButton>
      </div>

      <AnimatePresence>
        {showProjectForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Project Title</label>
                <input
                  value={projectForm.title}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Project title"
                  className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Project Type</label>
                <select
                  value={projectForm.type}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Live Project URL</label>
              <div className="relative">
                <Link2 size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={projectForm.link}
                  onChange={(e) => setProjectForm((prev) => ({ ...prev, link: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 pl-10 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300/90 dark:border-slate-600 bg-white/70 dark:bg-slate-950/40 p-3">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Upload Project Image</label>
              <div className="flex flex-wrap items-center gap-2">
                <ImagePlus size={16} className="text-emerald-600 dark:text-emerald-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProjectImageUpload}
                  className="w-full text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-2 file:text-white hover:file:bg-emerald-700"
                />
              </div>
              {projectForm.image && (
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                  <img src={projectForm.image} alt="Project preview" className="h-40 w-full object-cover" />
                  <p className="truncate bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                    {projectForm.imageName || "Uploaded image preview"}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Technologies Used</label>
              <div className="flex flex-wrap gap-2 rounded-xl border border-slate-300/90 dark:border-slate-600 bg-white/90 dark:bg-slate-950/60 p-3">
                <div className="w-full grid gap-2 sm:grid-cols-[1fr_auto]">
                  <input
                    value={technologySearch}
                    onChange={(e) => setTechnologySearch(e.target.value)}
                    placeholder="Search technologies"
                    className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(technologySearch ? filteredTechnologyOptions : TECHNOLOGY_OPTIONS.slice(0, 120)).map((technology) => {
                    const selected = projectForm.technologies.includes(technology);
                    return (
                      <button
                        key={technology}
                        type="button"
                        onClick={() => toggleTechnology(technology)}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          selected
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {technology}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Project Description</label>
              <textarea
                rows="5"
                value={projectForm.description}
                onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the project impact, stack, and key features"
                className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
              />
            </div>

            <div className="rounded-xl border border-slate-300/90 dark:border-slate-600 bg-white/80 dark:bg-slate-950/50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-3">Case Study Content</h3>
              <div className="grid gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Problem</label>
                  <textarea
                    rows="3"
                    value={projectForm.caseStudyProblem}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, caseStudyProblem: e.target.value }))}
                    placeholder="What core user or business problem did this project solve?"
                    className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Approach</label>
                  <textarea
                    rows="3"
                    value={projectForm.caseStudyApproach}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, caseStudyApproach: e.target.value }))}
                    placeholder="Describe your technical and product approach."
                    className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Outcome</label>
                  <textarea
                    rows="3"
                    value={projectForm.caseStudyOutcome}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, caseStudyOutcome: e.target.value }))}
                    placeholder="What was delivered and what improved?"
                    className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Architecture</label>
                  <textarea
                    rows="3"
                    value={projectForm.caseStudyArchitecture}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, caseStudyArchitecture: e.target.value }))}
                    placeholder="Summarize architecture and important technical decisions."
                    className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Challenges (one per line)</label>
                  <textarea
                    rows="4"
                    value={projectForm.caseStudyChallengesText}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, caseStudyChallengesText: e.target.value }))}
                    placeholder={"Challenge 1\nChallenge 2\nChallenge 3"}
                    className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300/90 dark:border-slate-600 bg-white/70 dark:bg-slate-950/40 p-3">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Case Study Video (Optional)</label>
              <input
                value={projectForm.videoPresentation?.src?.startsWith("data:") ? "" : projectForm.videoPresentation?.src || ""}
                onChange={(e) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    videoPresentation: {
                      src: e.target.value,
                      name: e.target.value ? "Hosted project video" : "",
                      type: "",
                      size: 0,
                    },
                  }))
                }
                placeholder="Paste a hosted MP4/WebM, YouTube, or Vimeo URL"
                className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
              />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">A hosted URL is best for mobile playback. Direct uploads up to 40MB are also supported.</p>
              <input
                type="file"
                accept="video/*"
                onChange={handleProjectVideoUpload}
                className="mt-3 w-full text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-3 file:py-2 file:text-white hover:file:bg-cyan-700"
              />
              {projectForm.videoPresentation?.src && (
                <div className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 p-2">
                  {projectForm.videoPresentation.src.startsWith("data:") ? (
                    <video
                      controls
                      preload="metadata"
                      src={projectForm.videoPresentation.src}
                      className="w-full max-h-64 rounded-md bg-black"
                    />
                  ) : (
                    <div className="flex items-center justify-center rounded-md bg-slate-100 p-4 dark:bg-slate-800">
                      <GlassButton
                        href={projectForm.videoPresentation.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue"
                        size="sm"
                        icon={ExternalLink}
                      >
                        Watch Video
                      </GlassButton>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-cyan-700 dark:text-cyan-300">
                    {projectForm.videoPresentation.name || "Uploaded video"}
                  </p>
                  <GlassButton
                    type="button"
                    onClick={() =>
                      setProjectForm((prev) => ({
                        ...prev,
                        videoPresentation: { src: "", name: "", type: "", size: 0 },
                      }))
                    }
                    color="rose"
                    size="sm"
                    className="mt-2"
                  >
                    Remove Video
                  </GlassButton>
                </div>
              )}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <GlassButton onClick={handleProjectSave} disabled={projectSaveState.isSaving} color="emerald" size="md" className="w-full" icon={editingProjectId ? Save : PlusCircle}>
                {projectSaveState.isSaving ? "Saving..." : editingProjectId ? "Update Project" : "Add Project"}
              </GlassButton>
              <GlassButton onClick={() => { setEditingProjectId(null); setProjectForm(getEmptyProject()); setShowProjectForm(false); }} color="slate" size="md" className="w-full" icon={XCircle}>
                Clear Form
              </GlassButton>
            </div>
            <AnimatePresence>
              {(projectSaveState.isSaving || projectSaveState.progress > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800/70 dark:bg-emerald-950/40"
                >
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium text-emerald-800 dark:text-emerald-200">
                    <span>{projectSaveState.label || "Saving project..."}</span>
                    <span>{projectSaveState.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                      style={{ width: `${projectSaveState.progress}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 grid max-h-[50rem] gap-3 overflow-auto pr-1">
        {portfolioData.projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/85 p-3"
          >
            <div className="flex items-start gap-3">
              <img
                src={project.image}
                alt={project.title}
                className="h-16 w-16 shrink-0 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900 dark:text-slate-100">{project.title}</p>
                <p className="max-h-8 overflow-hidden text-xs text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">{project.type}</p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {project.videoPresentation?.src ? "Video uploaded" : "No video uploaded"}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <GlassButton onClick={() => startEditProject(project)} color="blue" size="sm" className="w-full">
                Edit
              </GlassButton>
              <GlassButton onClick={async () => { if (confirm("Delete this project?")) { const result = await deleteProject(project.id); if (result?.success) { if (editingProjectId === project.id) { setEditingProjectId(null); setProjectForm(getEmptyProject()); setShowProjectForm(false); } } else { alert(result?.message || "Failed to delete project."); } } }} color="rose" size="sm" className="w-full" icon={Trash2} iconPosition="right">
                Delete
              </GlassButton>
            </div>
          </motion.div>
        ))}
      </div>
    </MotionDiv>
  );
}
