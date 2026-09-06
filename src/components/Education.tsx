import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
    viewport: { once: true },
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  const metrics = [
    {
      id: 'btech-gpa',
      label: 'B.Tech SGPA',
      value: '8.1',
      description: 'Vidya College of Engineering',
      color: 'from-cyan-400 to-blue-400',
      icon: GraduationCap,
    },
    {
      id: 'efficiency',
      label: 'Reporting Efficiency Improvement',
      value: '15%',
      description: 'At HCL Technologies',
      color: 'from-emerald-400 to-teal-400',
      icon: Award,
    },
    {
      id: 'projects',
      label: 'Major AI Projects',
      value: '2',
      description: 'Multi-Agent Systems',
      color: 'from-purple-400 to-pink-400',
      icon: Award,
    },
    {
      id: 'architecture',
      label: 'AI Architecture',
      value: 'Multi-Agent',
      description: 'Agent Orchestration',
      color: 'from-blue-400 to-indigo-400',
      icon: Award,
    },
  ];

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div className="mb-12 text-center" {...fadeInUp}>
          <span className="text-sm font-medium text-cyan-400">Achievements</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Key Metrics</h2>
        </motion.div>

        <motion.div
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerChildren}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="glass-strong rounded-2xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex justify-center">
                <div className={`rounded-xl bg-gradient-to-br ${metric.color} p-3 bg-opacity-10`}>
                  <metric.icon className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <motion.div
                className={`mb-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${metric.color}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {metric.value}
              </motion.div>
              <h3 className="mb-1 text-sm font-medium text-white">{metric.label}</h3>
              <p className="text-xs text-gray-500">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mb-12 text-center" {...fadeInUp}>
          <span className="text-sm font-medium text-cyan-400">Education</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Academic Background</h2>
        </motion.div>

        <motion.div className="mx-auto max-w-4xl" variants={staggerChildren}>
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="relative mb-8 last:mb-0"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-8 left-6 h-full w-0.5 bg-gray-800" />

              <div className="relative flex items-start gap-6">
                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                  <GraduationCap className="h-6 w-6 text-cyan-400" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-sm" />
                </div>

                <div className="glass-strong flex-1 rounded-xl p-8">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-lg text-cyan-400">{edu.institution}</p>
                    </div>
                    <Award className="h-5 w-5 text-amber-400/50" />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {edu.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-white">{edu.gpa}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
