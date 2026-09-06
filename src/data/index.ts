export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  color: string;
  skills: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubLink?: string;
  demoLink?: string;
  category: string;
  highlight: string;
  architecture?: {
    title: string;
    steps: { label: string; icon: string }[];
  };
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  visual?: {
    type: 'pipeline' | 'metric';
    agents?: string[];
    metric?: { value: string; label: string; improvement?: string };
  };
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
};

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/tushar-malhotra-293211257/',
  github: 'https://github.com/sharrymalhotra/Travel_Agent_Planner',
  email: 'mailto:tusharmalhotra2007@gmail.com',
};

export const skillsData: SkillCategory[] = [
  {
    id: 'genai',
    title: 'Generative AI & Agentic AI',
    icon: 'Brain',
    color: 'from-purple-400 to-pink-400',
    skills: [
      'Google ADK',
      'Gemini',
      'Multi-Agent Systems',
      'Agent Orchestration',
      'Prompt Engineering',
      'Google Search Grounding',
      'LLM API Integration',
      'LangChain',
      'LangGraph',
      'Retrieval-Augmented Generation (RAG)',
      'Vector Databases (Learning)',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Visualization',
    icon: 'BarChart3',
    color: 'from-emerald-400 to-teal-400',
    skills: [
      'Power BI',
      'Tableau',
      'MS Excel',
      'Pivot Tables',
      'Power Query',
      'Advanced Formulas',
      'Google Sheets',
    ],
  },
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: 'Code',
    color: 'from-cyan-400 to-blue-400',
    skills: ['Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering & Analytics',
    icon: 'Database',
    color: 'from-amber-400 to-orange-400',
    skills: [
      'Data Cleaning',
      'ETL',
      'Exploratory Data Analysis',
      'Statistical Analysis',
      'Data Modeling',
      'Compliance Monitoring',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'Settings',
    color: 'from-violet-400 to-indigo-400',
    skills: [
      'Git',
      'GitHub',
      'UV Package Manager',
      'REST APIs',
      'SharePoint',
      'MS Office Suite',
      'Automated Reporting',
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: 'social-media-agent',
    title: 'AI-Powered Social Media Content Generation Agent',
    description:
      'A multi-agent AI application built using Google Agent Development Kit (ADK) to automate content creation and marketing workflows.',
    technologies: [
      'Python',
      'Google ADK',
      'Gemini',
      'Google Search',
      'Imagen',
      'Veo',
      'Pydantic',
      'FunctionTools',
      'AgentTools',
    ],
    features: [
      'Content brief extraction',
      'Task routing',
      'Web research',
      'Social media post generation',
      'Ad image creation',
      'Report writing',
      'Video script generation',
    ],
    category: 'Generative AI',
    highlight: 'Multi-Agent Content Automation',
    architecture: {
      title: 'Social Media Agent Pipeline',
      steps: [
        { label: 'CONTENT BRIEF', icon: 'FileText' },
        { label: 'TASK ROUTER', icon: 'Router' },
        { label: 'RESEARCH', icon: 'Search' },
        { label: 'WRITER', icon: 'Edit3' },
        { label: 'IMAGE', icon: 'Image' },
        { label: 'REPORT', icon: 'FileText' },
        { label: 'VIDEO', icon: 'Video' },
      ],
    },
  },
  {
    id: 'travel-planner',
    title: 'AI Travel Planner Agent',
    description:
      'An AI-powered multi-agent travel planning system using Google ADK and Gemini for personalized travel itineraries.',
    technologies: [
      'Python',
      'Google ADK',
      'Gemini',
      'Google Search Grounding',
      'Custom Tools',
      'Multi-Agent Architecture',
    ],
    features: [
      'Personalized travel planning',
      'Destination inspiration',
      'Place discovery',
      'Real-time travel news',
      'Travel advisories and visa information',
      'Weather forecasts',
      'Nearby places and destination insights',
      'Day-wise itineraries',
      'Accommodation and transportation recommendations',
      'Attractions and food recommendations',
      'Estimated travel costs',
    ],
    githubLink: 'https://github.com/sharrymalhotra/Travel_Agent_Planner',
    category: 'Agentic AI',
    highlight: 'Multi-Agent Travel Orchestration',
    architecture: {
      title: 'Travel Agent Pipeline',
      steps: [
        { label: 'USER REQUEST', icon: 'User' },
        { label: 'TRAVEL PLANNER', icon: 'Brain' },
        { label: 'DESTINATION', icon: 'MapPin' },
        { label: 'INSPIRATION', icon: 'Lightbulb' },
        { label: 'PLACES', icon: 'Landmark' },
        { label: 'NEWS', icon: 'Globe' },
        { label: 'ITINERARY', icon: 'Calendar' },
      ],
    },
  },
];

export const experienceData: Experience[] = [
  {
    id: 'moptra',
    title: 'AI Engineer',
    company: 'Moptra Infotech Pvt. Ltd',
    period: '2026 – Present',
    location: 'Remote',
    achievements: [
      'Developed an AI-powered multi-agent Travel Planner using Python, Google ADK and Gemini.',
      'Designed specialized AI agents for itinerary generation, destination inspiration, place discovery and real-time travel news.',
      'Implemented Google Search Grounding and custom tools.',
      'Delivered travel advisories, weather updates, visa information, nearby places and destination insights.',
      'Applied prompt engineering and modular AI architecture.',
      'Built scalable and context-aware agent workflows.',
    ],
    visual: {
      type: 'pipeline',
      agents: [
        'Travel Agent',
        'Destination Agent',
        'Inspiration Agent',
        'Places Agent',
        'News Agent',
        'Search / Tools',
      ],
    },
  },
  {
    id: 'hcl',
    title: 'Data Engineering Intern',
    company: 'HCL Technologies',
    period: '2024 – 2025',
    location: 'Noida, India',
    achievements: [
      'Improved reporting efficiency by 15%.',
      'Redesigned SQL and Power BI data workflows.',
      'Built interactive dashboards using Tableau and Power BI.',
      'Managed and analyzed large-scale datasets using SQL.',
      'Ensured data accuracy, integrity and compliance.',
      'Participated in business impact reviews.',
      'Contributed to stakeholder requirement assessments.',
    ],
    visual: {
      type: 'metric',
      metric: {
        value: '15%',
        label: 'Reporting Efficiency Improvement',
      },
    },
  },
];

export const educationData: Education[] = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'Vidya College of Engineering, AKTU',
    location: 'Lucknow, Uttar Pradesh',
    period: '2020 – 2024',
    gpa: '8.1 SGPA',
  },
  {
    id: 'senior-secondary',
    degree: 'Intermediate — Class XII',
    institution: 'Government Boys Senior Secondary School',
    location: 'Delhi, India',
    period: '2018 – 2020',
    gpa: '73%',
  },
  {
    id: 'high-school',
    degree: 'High School — Class X',
    institution: 'Government Boys Senior Secondary School',
    location: 'Delhi, India',
    period: '2016 – 2018',
    gpa: '74%',
  },
];
