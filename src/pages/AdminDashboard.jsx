import { createElement, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  FolderKanban,
  ImagePlus,
  LayoutDashboard,
  Link2,
  LogOut,
  Pencil,
  PlusCircle,
  RotateCcw,
  Save,
  Trash2,
  XCircle,
} from "lucide-react";
import { usePortfolio } from "../ context/PortfolioContext";
import { defaultPortfolioData } from "../data/portfolioDefaults";

const PROJECT_TYPES = ["Software", "Dashboard", "Website", "PWA", "Native App", "API", "Other"];
const TECHNOLOGY_OPTIONS = [
  "HTML5",
  "CSS3",
  "Sass",
  "Less",
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Ant Design",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Gatsby",
  "Vue.js",
  "Nuxt.js",
  "Angular",
  "Svelte",
  "SvelteKit",
  "SolidJS",
  "Redux",
  "Zustand",
  "Recoil",
  "React Query",
  "GraphQL",
  "Apollo",
  "Relay",
  "D3.js",
  "Three.js",
  "Framer Motion",
  "GSAP",
  "PWA",
  "Service Workers",
  "Webpack",
  "Vite",
  "Rollup",
  "Babel",
  "Node.js",
  "Express.js",
  "Fastify",
  "NestJS",
  "Koa",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "CodeIgniter",
  "Java",
  "Spring Boot",
  "Kotlin",
  "C#",
  ".NET",
  "Go",
  "Rust",
  "C++",
  "C",
  "PostgreSQL",
  "MySQL",
  "MariaDB",
  "SQLite",
  "MongoDB",
  "Redis",
  "Elasticsearch",
  "Firebase",
  "Supabase",
  "Prisma",
  "Sequelize",
  "TypeORM",
  "Mongoose",
  "REST API",
  "OpenAPI",
  "gRPC",
  "WebSockets",
  "Socket.IO",
  "JWT",
  "OAuth 2.0",
  "Auth0",
  "Clerk",
  "Stripe",
  "PayPal API",
  "AWS",
  "AWS Lambda",
  "EC2",
  "S3",
  "CloudFront",
  "Azure",
  "Google Cloud",
  "Cloud Functions",
  "Docker",
  "Kubernetes",
  "Nginx",
  "CI/CD",
  "GitHub Actions",
  "GitLab CI",
  "Jenkins",
  "Linux",
  "Bash",
  "PowerShell",
  "Git",
  "GitHub",
  "Bitbucket",
  "Figma",
  "Adobe XD",
  "UI/UX",
  "Responsive Design",
  "Accessibility (a11y)",
  "Jest",
  "Vitest",
  "React Testing Library",
  "Cypress",
  "Playwright",
  "Pytest",
  "Postman",
  "Insomnia",
  "Microservices",
  "Monorepo",
  "Turborepo",
  "Nx",
  "Data Structures",
  "Algorithms",
  "Machine Learning",
  "TensorFlow",
  "Pandas",
  "NumPy",
  "OpenCV",
  "Flutter",
  "React Native",
  "Expo",
  "Swift",
  "SwiftUI",
  "Kotlin Multiplatform",
  "Electron",
  "Tauri",
];
const SKILL_CATEGORIES = ["Frontend", "Backend", "Database", "Cloud", "DevOps", "Mobile", "AI/ML", "Tools", "General"];

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
    videoPresentation: {
      src: "",
      name: "",
      type: "",
      size: 0,
    },
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const MotionDiv = motion.div;
const MotionP = motion.p;

function Panel({ icon, title, subtitle, children }) {
  return (
    <MotionDiv
      variants={itemVariants}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 shadow-lg shadow-slate-300/20 dark:shadow-black/20 backdrop-blur"
    >
      <div className="border-b border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 p-2 text-emerald-700 dark:text-emerald-300">
            {createElement(icon, { size: 18 })}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            {subtitle ? <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </MotionDiv>
  );
}

function FieldLabel({ children }) {
  return <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">{children}</label>;
}

function InputBase({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 ${className}`}
    />
  );
}

function TextareaBase({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 ${className}`}
    />
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    portfolioData,
    updateHero,
    updateAbout,
    updateStats,
    updateSkills,
    addProject,
    updateProject,
    deleteProject,
    logoutAdmin,
    resetPortfolioData,
  } = usePortfolio();

  const [heroBio, setHeroBio] = useState(portfolioData.hero.bio);
  const [heroName, setHeroName] = useState(portfolioData.hero.headingName);
  const [aboutHeading, setAboutHeading] = useState(portfolioData.about.heading || "About Me");
  const [aboutIntro, setAboutIntro] = useState(portfolioData.about.intro || "");
  const [aboutStory, setAboutStory] = useState(portfolioData.about.story || "");
  const [aboutAchievementsDraft, setAboutAchievementsDraft] = useState(
    Array.isArray(portfolioData.about.achievements) ? portfolioData.about.achievements : []
  );
  const [newAchievement, setNewAchievement] = useState("");
  const [profileImage, setProfileImage] = useState(portfolioData.hero.profileImage);
  const [heroRolesText, setHeroRolesText] = useState(portfolioData.hero.typewriterRoles.join("\n"));
  const [projectForm, setProjectForm] = useState(getEmptyProject());
  const [technologySearch, setTechnologySearch] = useState("");
  const [customTechnology, setCustomTechnology] = useState("");
  const [skillsDraft, setSkillsDraft] = useState(
    (portfolioData.skills || []).map((skill) => ({ ...skill }))
  );
  const [skillForm, setSkillForm] = useState({ name: "", category: "Frontend", experience: 60 });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [status, setStatus] = useState("");
  const heroImageInputRef = useRef(null);

  const statsForm = useMemo(() => portfolioData.stats.map((item) => ({ ...item })), [portfolioData.stats]);
  const [statsDraft, setStatsDraft] = useState(statsForm);
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
      setStatus("Please choose a valid video file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setStatus("Video is too large for browser storage. Use a video under 20MB.");
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
      setStatus("Video selected. Save project to persist.");
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

  const persistTextContent = () => {
    const heroResult = updateHero({
      headingName: heroName,
      bio: heroBio,
      profileImage,
      typewriterRoles: heroRolesText
        .split("\n")
        .map((role) => role.trim())
        .filter(Boolean),
    });
    if (!heroResult?.success) {
      setStatus(heroResult?.message || "Failed to save hero content.");
      return;
    }
    setStatus("Hero content saved.");
  };

  const persistAboutContent = () => {
    const result = updateAbout({
      heading: aboutHeading.trim() || "About Me",
      intro: aboutIntro.trim(),
      story: aboutStory.trim(),
      achievements: aboutAchievementsDraft.map((item) => String(item || "").trim()).filter(Boolean),
    });
    if (!result?.success) {
      setStatus(result?.message || "Failed to save about content.");
      return;
    }
    setStatus("About content saved.");
  };

  const persistStats = () => {
    const result = updateStats(statsDraft.map((item) => ({ ...item, value: Number(item.value) || 0 })));
    if (!result?.success) {
      setStatus(result.message || "Failed to save stats.");
      return;
    }
    setStatus("Stats saved.");
  };

  const persistSkills = () => {
    const sanitizedSkills = skillsDraft
      .map((skill, index) => ({
        id: Number(skill.id) || index + 1,
        name: String(skill.name || "").trim(),
        category: String(skill.category || "General").trim() || "General",
        experience: Math.max(0, Math.min(100, Number(skill.experience) || 0)),
      }))
      .filter((skill) => skill.name);

    const result = updateSkills(sanitizedSkills);
    if (!result?.success) {
      setStatus(result?.message || "Failed to save skills.");
      return;
    }
    setSkillsDraft(sanitizedSkills);
    setStatus("Skills saved.");
  };

  const addSkillDraft = () => {
    const name = skillForm.name.trim();
    if (!name) {
      setStatus("Please enter a skill name before adding.");
      return;
    }
    const nextId = skillsDraft.reduce((max, skill) => Math.max(max, Number(skill.id) || 0), 0) + 1;
    setSkillsDraft((prev) => [
      ...prev,
      {
        id: nextId,
        name,
        category: skillForm.category || "General",
        experience: Math.max(0, Math.min(100, Number(skillForm.experience) || 0)),
      },
    ]);
    setSkillForm({ name: "", category: skillForm.category || "Frontend", experience: 60 });
  };

  const addCustomTechnologyToProject = () => {
    const tech = customTechnology.trim();
    if (!tech) return;
    setProjectForm((prev) => {
      const hasTech = prev.technologies.some((item) => item.toLowerCase() === tech.toLowerCase());
      if (hasTech) return prev;
      return { ...prev, technologies: [...prev.technologies, tech] };
    });
    setCustomTechnology("");
  };

  const handleHeroImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(typeof reader.result === "string" ? reader.result : profileImage);
      setStatus("Profile image selected. Click Save Text Content to persist.");
    };
    reader.readAsDataURL(file);
  };

  const handleProjectSave = () => {
    const payload = {
      title: projectForm.title.trim(),
      image: projectForm.image,
      imageName: projectForm.imageName,
      description: projectForm.description.trim(),
      link: projectForm.link.trim(),
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
      setStatus("Please fill all project fields before saving.");
      return;
    }

    const result = editingProjectId ? updateProject(editingProjectId, payload) : addProject(payload);
    if (!result?.success) {
      setStatus(result?.message || "Failed to save project.");
      return;
    }

    setStatus(editingProjectId ? "Project updated." : "Project added.");

    setEditingProjectId(null);
    setProjectForm(getEmptyProject());
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
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <section className="relative min-h-screen overflow-hidden py-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-800/20" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-800/20" />
      </div>

      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="section-shell space-y-6"
      >
        <MotionDiv
          variants={itemVariants}
          className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/85 dark:bg-slate-900/80 p-4 sm:p-6 shadow-lg shadow-slate-300/20 dark:shadow-black/20 backdrop-blur"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Control Center
              </p>
              <h1 className="mt-1 flex items-center gap-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                <LayoutDashboard size={26} className="text-emerald-600 dark:text-emerald-400" />
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Manage your portfolio content, metrics, and projects in one responsive workspace.
              </p>
            </div>

            <div className="grid w-full gap-2 sm:grid-cols-2 lg:w-auto">
              <button
                onClick={() => {
                  resetPortfolioData();
                  setHeroBio(defaultPortfolioData.hero.bio);
                  setHeroName(defaultPortfolioData.hero.headingName);
                  setAboutHeading(defaultPortfolioData.about.heading || "About Me");
                  setAboutIntro(defaultPortfolioData.about.intro);
                  setAboutStory(defaultPortfolioData.about.story || "");
                  setAboutAchievementsDraft(defaultPortfolioData.about.achievements || []);
                  setNewAchievement("");
                  setProfileImage(defaultPortfolioData.hero.profileImage);
                  setHeroRolesText(defaultPortfolioData.hero.typewriterRoles.join("\n"));
                  setStatsDraft(defaultPortfolioData.stats);
                  setSkillsDraft((defaultPortfolioData.skills || []).map((skill) => ({ ...skill })));
                  setSkillForm({ name: "", category: "Frontend", experience: 60 });
                  setProjectForm(getEmptyProject());
                  setTechnologySearch("");
                  setCustomTechnology("");
                  setEditingProjectId(null);
                  setStatus("Reset to defaults.");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                <RotateCcw size={16} />
                Reset Defaults
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {status ? (
            <MotionP
              key={status}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800/70 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              {status}
            </MotionP>
          ) : null}
        </MotionDiv>

        <div className="grid gap-6 2xl:grid-cols-3">
          <div className="2xl:col-span-2">
            <Panel icon={FileText} title="Text Content" subtitle="Hero, intro, and profile updates">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FieldLabel>Hero Name</FieldLabel>
                  <InputBase value={heroName} onChange={(event) => setHeroName(event.target.value)} />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Hero Bio</FieldLabel>
                  <TextareaBase rows="4" value={heroBio} onChange={(event) => setHeroBio(event.target.value)} />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Hero Rotating Roles (one per line)</FieldLabel>
                  <TextareaBase
                    rows="4"
                    value={heroRolesText}
                    onChange={(event) => setHeroRolesText(event.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <FieldLabel>Profile Image</FieldLabel>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-300/90 dark:border-slate-600 bg-white/80 dark:bg-slate-950/60 p-3">
                    <div className="relative h-20 w-20 shrink-0">
                      <img
                        src={profileImage}
                        alt="Profile preview"
                        className="h-20 w-20 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => heroImageInputRef.current?.click()}
                        className="absolute -bottom-1 -right-1 rounded-full bg-emerald-600 p-1.5 text-white shadow transition hover:bg-emerald-700"
                        aria-label="Change profile image"
                      >
                        <Pencil size={13} />
                      </button>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Upload new avatar</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">PNG or JPG recommended</p>
                    </div>
                    <input
                      ref={heroImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    onClick={persistTextContent}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <Save size={16} />
                    Save Text Content
                  </button>
                </div>
              </div>
            </Panel>
          </div>

          <div>
            <Panel icon={BarChart3} title="Stats" subtitle="Homepage number cards">
              <div className="space-y-3">
                {statsDraft.map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <InputBase
                      value={stat.label}
                      onChange={(event) =>
                        setStatsDraft((prev) =>
                          prev.map((item, idx) => (idx === index ? { ...item, label: event.target.value } : item))
                        )
                      }
                      className="sm:col-span-2"
                    />
                    <InputBase
                      type="number"
                      value={stat.value}
                      onChange={(event) =>
                        setStatsDraft((prev) =>
                          prev.map((item, idx) => (idx === index ? { ...item, value: event.target.value } : item))
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  onClick={persistStats}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  <Save size={16} />
                  Save Stats
                </button>
              </div>
            </Panel>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel icon={FileText} title="About Manager" subtitle="CRUD your entire About Me section">
            <div className="space-y-3">
              <div>
                <FieldLabel>About Heading</FieldLabel>
                <InputBase value={aboutHeading} onChange={(event) => setAboutHeading(event.target.value)} />
              </div>
              <div>
                <FieldLabel>Intro</FieldLabel>
                <TextareaBase rows="4" value={aboutIntro} onChange={(event) => setAboutIntro(event.target.value)} />
              </div>
              <div>
                <FieldLabel>Story</FieldLabel>
                <TextareaBase rows="4" value={aboutStory} onChange={(event) => setAboutStory(event.target.value)} />
              </div>
              <div className="rounded-xl border border-slate-300/90 dark:border-slate-600 p-3 bg-white/80 dark:bg-slate-950/50">
                <FieldLabel>Achievements</FieldLabel>
                <div className="flex gap-2 mb-3">
                  <InputBase
                    value={newAchievement}
                    onChange={(event) => setNewAchievement(event.target.value)}
                    placeholder="Add achievement"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const value = newAchievement.trim();
                      if (!value) return;
                      setAboutAchievementsDraft((prev) => [...prev, value]);
                      setNewAchievement("");
                    }}
                    className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2 max-h-44 overflow-auto pr-1">
                  {aboutAchievementsDraft.map((achievement, index) => (
                    <div key={`${achievement}-${index}`} className="grid grid-cols-[1fr_auto] gap-2">
                      <InputBase
                        value={achievement}
                        onChange={(event) =>
                          setAboutAchievementsDraft((prev) =>
                            prev.map((item, idx) => (idx === index ? event.target.value : item))
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setAboutAchievementsDraft((prev) => prev.filter((_, idx) => idx !== index))
                        }
                        className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={persistAboutContent}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Save size={16} />
                Save About Content
              </button>
            </div>
          </Panel>

          <Panel icon={BarChart3} title="Skills Manager" subtitle="CRUD skills and throttle experience level">
            <div className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-[1.2fr_0.8fr]">
                <InputBase
                  value={skillForm.name}
                  onChange={(event) => setSkillForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Skill name"
                />
                <select
                  value={skillForm.category}
                  onChange={(event) => setSkillForm((prev) => ({ ...prev, category: event.target.value }))}
                  className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                >
                  {SKILL_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-xl border border-slate-300/90 dark:border-slate-600 p-3 bg-white/80 dark:bg-slate-950/50">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-2">
                  <span>Experience Level</span>
                  <span>{skillForm.experience}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={skillForm.experience}
                  onChange={(event) =>
                    setSkillForm((prev) => ({ ...prev, experience: Number(event.target.value) }))
                  }
                  className="w-full accent-emerald-600"
                />
              </div>
              <button
                type="button"
                onClick={addSkillDraft}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                <PlusCircle size={16} />
                Add Skill
              </button>
              <div className="space-y-2 max-h-72 overflow-auto pr-1">
                {skillsDraft.map((skill, index) => (
                  <div key={skill.id || index} className="rounded-xl border border-slate-300/90 dark:border-slate-600 p-3 bg-white/80 dark:bg-slate-950/50">
                    <div className="grid gap-2 sm:grid-cols-[1fr_0.8fr_auto]">
                      <InputBase
                        value={skill.name}
                        onChange={(event) =>
                          setSkillsDraft((prev) =>
                            prev.map((item, idx) => (idx === index ? { ...item, name: event.target.value } : item))
                          )
                        }
                      />
                      <select
                        value={skill.category}
                        onChange={(event) =>
                          setSkillsDraft((prev) =>
                            prev.map((item, idx) =>
                              idx === index ? { ...item, category: event.target.value } : item
                            )
                          )
                        }
                        className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                      >
                        {SKILL_CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setSkillsDraft((prev) => prev.filter((_, idx) => idx !== index))}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-1">
                        <span>Experience (Throttle)</span>
                        <span>{Number(skill.experience) || 0}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={Number(skill.experience) || 0}
                        onChange={(event) =>
                          setSkillsDraft((prev) =>
                            prev.map((item, idx) =>
                              idx === index ? { ...item, experience: Number(event.target.value) } : item
                            )
                          )
                        }
                        className="w-full accent-emerald-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={persistSkills}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Save size={16} />
                Save Skills
              </button>
            </div>
          </Panel>
        </div>

        <Panel icon={FolderKanban} title="Projects Manager" subtitle="Create and edit portfolio projects">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2 md:col-span-1">
                <FieldLabel>Project Title</FieldLabel>
                <InputBase
                  value={projectForm.title}
                  onChange={(event) => setProjectForm((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="Project title"
                />
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <FieldLabel>Project Type</FieldLabel>
                <select
                  value={projectForm.type}
                  onChange={(event) => setProjectForm((prev) => ({ ...prev, type: event.target.value }))}
                  className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <FieldLabel>Live Project URL</FieldLabel>
                <div className="relative">
                  <Link2
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <InputBase
                    value={projectForm.link}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, link: event.target.value }))}
                    placeholder="https://example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 rounded-xl border border-dashed border-slate-300/90 dark:border-slate-600 bg-white/70 dark:bg-slate-950/40 p-3">
                <FieldLabel>Upload Project Image</FieldLabel>
                <div className="flex flex-wrap items-center gap-2">
                  <ImagePlus size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProjectImageUpload}
                    className="w-full text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-3 file:py-2 file:text-white hover:file:bg-emerald-700"
                  />
                </div>
                {projectForm.image ? (
                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                    <img
                      src={projectForm.image}
                      alt="Project preview"
                      className="h-40 w-full object-cover"
                    />
                    <p className="truncate bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {projectForm.imageName || "Uploaded image preview"}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <FieldLabel>Technologies Used</FieldLabel>
                <div className="flex flex-wrap gap-2 rounded-xl border border-slate-300/90 dark:border-slate-600 bg-white/90 dark:bg-slate-950/60 p-3">
                  <div className="w-full grid gap-2 sm:grid-cols-[1fr_auto]">
                    <InputBase
                      value={technologySearch}
                      onChange={(event) => setTechnologySearch(event.target.value)}
                      placeholder="Search technologies (React, Docker, AWS, Flutter...)"
                    />
                    <div className="flex gap-2">
                      <InputBase
                        value={customTechnology}
                        onChange={(event) => setCustomTechnology(event.target.value)}
                        placeholder="Custom tech"
                      />
                      <button
                        type="button"
                        onClick={addCustomTechnologyToProject}
                        className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  {(technologySearch ? filteredTechnologyOptions : TECHNOLOGY_OPTIONS.slice(0, 120)).map((technology) => {
                    const selected = projectForm.technologies.includes(technology);
                    return (
                      <button
                        key={technology}
                        type="button"
                        onClick={() => toggleTechnology(technology)}
                        className={`rounded-full border px-3 py-1 text-xs sm:text-sm transition ${
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

              <div className="sm:col-span-2">
                <FieldLabel>Project Description</FieldLabel>
                <TextareaBase
                  rows="5"
                  value={projectForm.description}
                  onChange={(event) => setProjectForm((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="Describe the project impact, stack, and key features"
                />
              </div>

              <div className="sm:col-span-2 rounded-xl border border-slate-300/90 dark:border-slate-600 bg-white/80 dark:bg-slate-950/50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-3">
                  Case Study Content
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <FieldLabel>Problem</FieldLabel>
                    <TextareaBase
                      rows="3"
                      value={projectForm.caseStudyProblem}
                      onChange={(event) =>
                        setProjectForm((prev) => ({ ...prev, caseStudyProblem: event.target.value }))
                      }
                      placeholder="What core user or business problem did this project solve?"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel>Approach</FieldLabel>
                    <TextareaBase
                      rows="3"
                      value={projectForm.caseStudyApproach}
                      onChange={(event) =>
                        setProjectForm((prev) => ({ ...prev, caseStudyApproach: event.target.value }))
                      }
                      placeholder="Describe your technical and product approach."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel>Outcome</FieldLabel>
                    <TextareaBase
                      rows="3"
                      value={projectForm.caseStudyOutcome}
                      onChange={(event) =>
                        setProjectForm((prev) => ({ ...prev, caseStudyOutcome: event.target.value }))
                      }
                      placeholder="What was delivered and what improved?"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel>Architecture</FieldLabel>
                    <TextareaBase
                      rows="3"
                      value={projectForm.caseStudyArchitecture}
                      onChange={(event) =>
                        setProjectForm((prev) => ({ ...prev, caseStudyArchitecture: event.target.value }))
                      }
                      placeholder="Summarize architecture and important technical decisions."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel>Challenges (one per line)</FieldLabel>
                    <TextareaBase
                      rows="4"
                      value={projectForm.caseStudyChallengesText}
                      onChange={(event) =>
                        setProjectForm((prev) => ({ ...prev, caseStudyChallengesText: event.target.value }))
                      }
                      placeholder={"Challenge 1\nChallenge 2\nChallenge 3"}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 rounded-xl border border-dashed border-slate-300/90 dark:border-slate-600 bg-white/70 dark:bg-slate-950/40 p-3">
                <FieldLabel>Upload Case Study Video (Optional)</FieldLabel>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleProjectVideoUpload}
                  className="w-full text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-3 file:py-2 file:text-white hover:file:bg-cyan-700"
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  For reliable localStorage persistence, keep videos below 20MB.
                </p>
                {projectForm.videoPresentation?.src ? (
                  <div className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 p-2">
                    <video
                      controls
                      preload="metadata"
                      src={projectForm.videoPresentation.src}
                      className="w-full rounded-md bg-black"
                    />
                    <p className="mt-2 text-xs text-cyan-700 dark:text-cyan-300">
                      {projectForm.videoPresentation.name || "Uploaded video"}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setProjectForm((prev) => ({
                          ...prev,
                          videoPresentation: { src: "", name: "", type: "", size: 0 },
                        }))
                      }
                      className="mt-2 text-xs font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                    >
                      Remove Video
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-2 grid gap-2 sm:grid-cols-2">
                <button
                  onClick={handleProjectSave}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {editingProjectId ? <Save size={16} /> : <PlusCircle size={16} />}
                  {editingProjectId ? "Update Project" : "Add Project"}
                </button>
                <button
                  onClick={() => {
                    setEditingProjectId(null);
                    setProjectForm(getEmptyProject());
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  <XCircle size={16} />
                  Clear Form
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/90 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/40 p-3 sm:p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Current Projects ({portfolioData.projects.length})
              </h3>
              <div className="grid max-h-[34rem] gap-3 overflow-auto pr-1">
                {portfolioData.projects.map((project) => (
                  <MotionDiv
                    layout
                    key={project.id}
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
                      <button
                        onClick={() => startEditProject(project)}
                        className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition hover:bg-cyan-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          const result = deleteProject(project.id);
                          if (!result?.success) {
                            setStatus(result?.message || "Failed to delete project.");
                            return;
                          }
                          setStatus("Project deleted.");
                        }}
                        className="inline-flex items-center justify-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition hover:bg-rose-700"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </MotionDiv>
    </section>
  );
}
