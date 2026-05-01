import { createElement } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clapperboard, Cpu, Layers, Target } from "lucide-react";
import { usePortfolio } from "../ context/PortfolioContext";
import { buildCaseStudy, formatBytes, getProjectVideo } from "../utils/caseStudy";

const MotionDiv = motion.div;

export default function ProjectCaseStudy() {
  const { projectId } = useParams();
  const { portfolioData } = usePortfolio();

  const id = Number(projectId);
  const project = portfolioData.projects.find((item) => item.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const caseStudy = buildCaseStudy(project);
  const video = getProjectVideo(project);

  return (
    <section className="section-shell py-8 sm:py-12 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-300 hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
            <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 px-3 py-1 text-xs font-semibold">
              {project.type}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">{project.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2"
            >
              Visit Live Project
            </a>
          </div>
        </MotionDiv>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
          <CaseCard icon={Target} title="Problem Solved" content={caseStudy.problem} />
          <CaseCard icon={Layers} title="Approach" content={caseStudy.approach} />
          <CaseCard icon={CheckCircle2} title="Outcome" content={caseStudy.outcome} />
          <CaseCard icon={Cpu} title="Architecture" content={caseStudy.architecture} />
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">Challenges and Decisions</h2>
          <ul className="mt-3 space-y-2">
            {caseStudy.challenges.map((challenge, index) => (
              <li key={`${challenge}-${index}`} className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                - {challenge}
              </li>
            ))}
          </ul>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Clapperboard size={18} className="text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">Video Presentation</h2>
          </div>

          {video ? (
            <>
              <video controls preload="metadata" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-black" src={video.src}>
                Your browser does not support the video tag.
              </video>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {video.name} • {formatBytes(video.size)}
              </p>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                No project video has been uploaded yet. The full written case study above still covers the problem,
                architecture, technical approach, and final outcome in detail.
              </p>
            </div>
          )}
        </MotionDiv>
      </div>
    </section>
  );
}

function CaseCard({ icon: Icon, title, content }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5"
    >
      <div className="flex items-center gap-2 mb-2">
        {createElement(Icon, { size: 17, className: "text-cyan-600 dark:text-cyan-400" })}
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      </div>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{content}</p>
    </MotionDiv>
  );
}
