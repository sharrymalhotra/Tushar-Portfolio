import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { HeroScene } from '../components/three/Scenes';
import { socialLinks } from '../data';
import { useMousePosition, useMediaQuery } from '../hooks';

const Hero: React.FC = () => {
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const scrollToSection = (href: string) => {
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openGitHub = () => {
    window.open(socialLinks.github, '_blank', 'noopener,noreferrer');
  };

  const openContact = () => {
    scrollToSection('#contact');
  };

  const openProjects = () => {
    scrollToSection('#projects');
  };

  return (
    <section className="relative flex h-screen min-h-screen w-full items-center">
      <div className="absolute inset-0 z-0">
        {!isMobile && (
          <HeroScene reducedMotion={prefersReducedMotion} mousePosition={mousePosition} />
        )}
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-6 pt-20 md:pt-0 md:flex-row md:items-start md:justify-between">
        <motion.div
          className="flex max-w-2xl flex-col"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="block">Hi, I&apos;m</span>
            <span className="neon-text block">Tushar Malhotra</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <span className="font-medium text-cyan-400">AI Engineer</span> |{' '}
            <span className="text-purple-400">Generative AI</span> |{' '}
            <span className="text-blue-400">Agentic AI</span> |{' '}
            <span className="text-emerald-400">Python</span>
          </motion.p>

          <motion.p
            className="mt-4 max-w-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Building intelligent AI applications, multi-agent systems and scalable automation
            workflows.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.button
              onClick={openProjects}
              className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore My Work</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>

            <motion.button
              onClick={openContact}
              className="group relative flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-8 py-3 text-sm font-medium text-purple-300 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/20 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Let&apos;s Connect</span>
            </motion.button>

            <motion.button
              onClick={openGitHub}
              className="group relative flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/50 px-8 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:text-cyan-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-4 w-4" />
              <span className="relative z-10">View GitHub</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {!isMobile && (
          <motion.div
            className="relative mt-12 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ width: '500px', height: '500px' }}
          >
            <div className="glass-strong relative h-full w-full overflow-hidden rounded-full border-4 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)]">
              <img
                src="/profile.jpg"
                alt="Tushar Malhotra"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="flex h-10 w-5 justify-center rounded-full border-2 border-gray-600"
          animate={{ borderColor: ['#6b7280', '#06b6d4', '#6b7280'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400"
            animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <p className="mt-2 text-xs text-gray-500">Scroll to explore</p>
      </motion.div>
    </section>
  );
};

export default Hero;
