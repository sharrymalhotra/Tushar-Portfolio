import React from 'react';
import { motion } from 'framer-motion';
import type { Experience } from '../data';
import { experienceData } from '../data';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useMediaQuery } from '../hooks';
import { TravelScene } from '../components/three/Scenes';

const ExperienceItem: React.FC<{ exp: Experience; index: number; total: number }> = ({
  exp,
  index,
  total,
}) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.2 },
    viewport: { once: true },
  };

  const metricColors: Record<string, string> = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    emerald: 'from-emerald-500 to-teal-500',
    blue: 'from-blue-500 to-indigo-500',
    amber: 'from-amber-500 to-orange-500',
  };

  return (
    <motion.div className="relative mb-12 last:mb-0" {...fadeInUp}>
      {index < total - 1 && <div className="absolute top-8 left-6 h-full w-0.5 bg-gray-800" />}

      <div className="relative flex items-start gap-6">
        <motion.div
          className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-sm" />
        </motion.div>

        <div className="flex-1">
          <div className="glass-strong rounded-xl p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p className="text-lg text-cyan-400">{exp.company}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {exp.period}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {exp.location}
                </div>
              </div>
            </div>

            <ul className="mb-6 space-y-2 text-gray-300">
              {exp.achievements.map((achievement, i) => (
                <motion.li
                  key={`${exp.id}-achievement-${i}`}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                  {achievement}
                </motion.li>
              ))}
            </ul>

            {exp.visual?.type === 'pipeline' && exp.visual.agents && (
              <motion.div
                className="mt-6 rounded-lg border border-gray-800/50 bg-gray-900/20 p-4"
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="mb-3 text-sm font-medium text-gray-400">
                  Agent Pipeline Architecture
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {exp.visual.agents.map((agent, i) => (
                    <React.Fragment key={agent}>
                      <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300 border border-purple-500/20">
                        {agent}
                      </span>
                      {i < exp.visual!.agents!.length - 1 && (
                        <span className="text-gray-600">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}

            {exp.visual?.type === 'metric' && exp.visual.metric && (
              <motion.div
                className="mt-6 rounded-lg border border-gray-800/50 bg-gray-900/20 p-4"
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="mb-3 text-sm font-medium text-gray-400">Key Metric</p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <motion.div
                      className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${metricColors.amber}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {exp.visual.metric.value}
                    </motion.div>
                    <p className="text-sm text-gray-400">{exp.visual.metric.label}</p>
                  </div>
                  <Award className="h-8 w-8 text-amber-400/50" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const total = experienceData.length;

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
          <span className="text-sm font-medium text-cyan-400">Experience</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Professional Journey</h2>
          <p className="mt-3 max-w-2xl text-gray-400">
            Building AI-powered solutions across agentic AI engineering and data engineering
          </p>
        </motion.div>

        <div>
          {experienceData.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} total={total} />
          ))}
        </div>
      </div>

      {!isMobile && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 right-8 hidden xl:block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-[350px] w-[350px]">
            {!prefersReducedMotion && <TravelScene reducedMotion={prefersReducedMotion} />}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Experience;
