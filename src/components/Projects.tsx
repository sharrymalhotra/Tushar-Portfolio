import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, Project } from '../data';
import { Github, ExternalLink, X, ArrowRight } from 'lucide-react';
import { useMediaQuery, useMousePosition } from '../hooks';
import { TravelScene } from '../components/three/Scenes';

const ProjectModal: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-strong relative m-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl p-8"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-gray-800/50 hover:text-white"
          whileHover={{ scale: 1.1 }}
        >
          <X className="h-5 w-5" />
        </motion.button>

        <h3 className="text-3xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-purple-400">{project.description}</p>

        <div className="my-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-700 bg-gray-800/30 px-3 py-1 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.architecture && (
          <div className="my-8">
            <h4 className="mb-4 text-sm font-medium text-gray-400">{project.architecture.title}</h4>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {project.architecture.steps.map((step, i) => (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                      <span className="text-xs text-cyan-300">
                        {step.label.split(' ').join(' ')}
                      </span>
                    </div>
                  </div>
                  {i < project.architecture!.steps.length - 1 && (
                    <div className="hidden sm:block">
                      <ArrowRight className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-400">Key Features</h4>
            <ul className="space-y-2 text-gray-300">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-400">Technology Stack</h4>
            <ul className="space-y-2 text-gray-300">
              {project.technologies.map((tech) => (
                <li key={tech} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-medium text-white"
              whileHover={{ scale: 1.05 }}
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </motion.a>
          )}
          {project.demoLink && (
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-6 py-3 text-sm font-medium text-purple-300"
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}
          {!project.githubLink && !project.demoLink && (
            <span className="text-sm text-gray-400">Project link coming soon</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void; index: number }> = ({
  project,
  onClick,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const mousePosition = useMousePosition();

  const calculateTilt = () => {
    if (!hovered) return { rotateX: 0, rotateY: 0 };
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rotateX = ((mousePosition.y - centerY) / centerY) * -5;
    const rotateY = ((mousePosition.x - centerX) / centerX) * 5;
    return { rotateX, rotateY };
  };

  const tilt = calculateTilt();

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="glass-strong relative h-full w-full overflow-hidden rounded-2xl border border-gray-800/50 p-8 transition-all duration-300 hover:border-cyan-500/30"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute -inset-40 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-3`}>
              <span className="text-2xl">{project.category === 'Agentic AI' ? '🚀' : '🤖'}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <span className="text-sm text-cyan-400">{project.category}</span>
            </div>
          </div>
          <div
            className="rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-2 py-1 text-xs"
            style={{
              background: `linear-gradient(135deg, ${project.category === 'Agentic AI' ? '#06b6d4' : '#8b5cf6'}20, ${project.category === 'Agentic AI' ? '#3b82f6' : '#ec4899'}20)`,
            }}
          >
            {project.highlight}
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-300 line-clamp-3">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-700 bg-gray-800/30 px-2.5 py-1 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-full border border-gray-700 bg-gray-800/30 px-2.5 py-1 text-xs text-gray-500">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {project.githubLink && (
              <span className="flex items-center gap-1">
                <Github className="h-4 w-4 text-cyan-400" />
                GitHub
              </span>
            )}
          </div>
          <motion.div
            className="flex items-center gap-1 text-sm text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
            animate={{ x: hovered ? 5 : 0 }}
          >
            <span>Details</span>
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>

        {project.id === 'travel-planner' && (
          <div className="mt-6 h-32 opacity-60">
            <motion.div
              className="h-full w-full rounded-lg border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1 }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-cyan-400">Projects</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">What I&apos;ve Built</h2>
          <p className="mt-3 max-w-2xl text-gray-400">
            Intelligent AI applications and multi-agent systems powered by cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -right-8 hidden xl:block"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="h-[400px] w-[400px]">
          {!isMobile && <TravelScene reducedMotion={prefersReducedMotion} />}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
