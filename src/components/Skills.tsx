import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../data';
import { Code, Brain, BarChart3, Database, Settings } from 'lucide-react';
import { useMediaQuery } from '../hooks';
import { TechOrbitScene } from '../components/three/Scenes';

const categoryIcons: Record<string, React.ReactNode> = {
  programming: <Code className="h-5 w-5" />,
  genai: <Brain className="h-5 w-5" />,
  'data-analytics': <BarChart3 className="h-5 w-5" />,
  'data-engineering': <Database className="h-5 w-5" />,
  tools: <Settings className="h-5 w-5" />,
};

const skillDescriptions: Record<string, string> = {
  Python: 'Core language for AI development, multi-agent systems, and automation workflows.',
  SQL: 'Database querying, data modeling, and large-scale data analysis.',
  HTML: 'Web markup for responsive UI development.',
  CSS: 'Styling and layout for modern web interfaces.',
  'Google ADK': 'Official Google framework for building agentic AI applications.',
  Gemini: "Google's multimodal LLM for advanced AI applications and content generation.",
  'Multi-Agent Systems':
    'Architecting and orchestrating specialized AI agents for complex workflows.',
  'Agent Orchestration':
    'Coordinating multiple AI agents to achieve complex goals with context management.',
  'Prompt Engineering':
    'Crafting and optimizing prompts for LLMs to achieve reliable, high-quality outputs.',
  'Google Search Grounding':
    'Integrating real-time web search to provide factual, up-to-date AI responses.',
  'LLM API Integration': 'Building robust integrations with large language model APIs at scale.',
  LangChain: 'Framework for developing applications powered by language models and chains.',
  LangGraph: 'Library for building stateful, multi-agent applications with LLMs.',
  'Retrieval-Augmented Generation (RAG)':
    'Combining retrieval systems with generation for accurate, context-aware responses.',
  'Vector Databases (Learning)':
    'Exploring vector storage solutions for embeddings and semantic search.',
  'Power BI': 'Building interactive dashboards, automated reports, and data visualizations.',
  Tableau: 'Creating interactive data visualizations and business intelligence dashboards.',
  'MS Excel': 'Advanced spreadsheet analysis, pivot tables, and data manipulation.',
  'Pivot Tables': 'Data summarization and aggregation for reporting and analysis.',
  'Power Query': 'ETL and data transformation within the Microsoft ecosystem.',
  'Advanced Formulas': 'Complex Excel formulas for data processing and analysis.',
  'Google Sheets': 'Cloud-based spreadsheet analysis and automation.',
  'Data Cleaning': 'Preprocessing and cleaning data for accurate analysis and AI training.',
  ETL: 'Extract, transform, load pipelines for data integration and reporting.',
  'Exploratory Data Analysis': 'Statistical analysis to discover patterns and extract insights.',
  'Statistical Analysis': 'Applying statistical methods to derive business insights from data.',
  'Data Modeling': 'Designing data structures for analytics, reporting, and AI pipelines.',
  'Compliance Monitoring': 'Ensuring data accuracy, integrity, and regulatory compliance.',
  Git: 'Version control for code collaboration and deployment.',
  GitHub: 'Hosting AI projects and managing multi-agent system repositories.',
  'UV Package Manager': 'Fast Python package management and environment isolation.',
  'REST APIs': 'Building and consuming RESTful APIs for AI service integration.',
  SharePoint: 'Enterprise collaboration and document management integration.',
  'MS Office Suite': 'Productivity tools for data analysis and business automation.',
  'Automated Reporting': 'Generating scheduled reports and dashboards.',
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(skillsData[0].id);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

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
          <span className="text-sm font-medium text-cyan-400">Skills</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Technical Expertise</h2>
        </motion.div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <motion.div
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {skillsData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                      : 'border-gray-800 bg-gray-900/30 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                  }`}
                >
                  <div className="mb-1">{categoryIcons[category.id]}</div>
                  <span className="block text-sm font-medium">{category.title}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {skillsData.map(
                (category) =>
                  activeCategory === category.id && (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          className="group cursor-pointer rounded-lg border border-gray-800/50 bg-gray-900/20 p-3 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-800/30"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-sm font-medium text-gray-200">{skill}</span>
                          {skillDescriptions[skill] && (
                            <motion.div
                              className="mt-1 max-h-0 overflow-hidden text-xs text-gray-500"
                              initial={{ maxHeight: 0, opacity: 0 }}
                              whileHover={{ maxHeight: 100, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {skillDescriptions[skill]}
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="relative h-[500px] w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <TechOrbitScene reducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>

      <div className="absolute -bottom-px left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </section>
  );
};

export default Skills;
