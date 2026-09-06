import React from 'react';
import { motion } from 'framer-motion';
import { AboutScene } from '../components/three/Scenes';
import { useMediaQuery } from '../hooks';
import { Cpu, Brain, Database, Code, BarChart3 } from 'lucide-react';

const About: React.FC = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const expertiseItems = [
    {
      icon: Brain,
      title: 'Multi-Agent AI Systems',
      description: 'Orchestrating specialized agents for complex AI workflows',
      color: 'text-purple-400',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: Cpu,
      title: 'Generative AI & LLMs',
      description: 'Building with Gemini, Google ADK, and LLM APIs',
      color: 'text-cyan-400',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      icon: Database,
      title: 'Data Analytics & BI',
      description: 'Power BI, Tableau, SQL and statistical analysis',
      color: 'text-emerald-400',
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      icon: BarChart3,
      title: 'Automation Workflows',
      description: 'Building scalable automation and RAG pipelines',
      color: 'text-amber-400',
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
      icon: Code,
      title: 'Agent Orchestration',
      description: 'Prompt engineering and context-aware agent architectures',
      color: 'text-blue-400',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
  ];

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
          <span className="text-sm font-medium text-cyan-400">Profile</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Tushar Malhotra is an AI Engineer with expertise in Python, Google ADK, Gemini,
                Prompt Engineering, and Multi-Agent AI Systems. He has experience developing
                intelligent AI applications, integrating Google Search Grounding, and building
                scalable agentic workflows.
              </p>
              <p>
                His foundation spans data analytics, SQL, Power BI, and data modeling, providing him
                with a full-stack perspective on building AI-powered, data-driven solutions.
              </p>
            </div>

            <motion.div
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {expertiseItems.map((item) => (
                <motion.div
                  key={item.title}
                  className="group flex items-start gap-3 rounded-xl border border-gray-800/50 bg-gray-900/20 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-800/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`rounded-lg bg-gradient-to-br ${item.gradient} p-2`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[500px] w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {!isMobile && <AboutScene reducedMotion={prefersReducedMotion} />}
            <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] border border-cyan-500/10" />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
    </section>
  );
};

export default About;
