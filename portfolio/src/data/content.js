
//   content.js  —  SINGLE SOURCE OF TRUTH                  
//   Edit this file to update anything on the portfolio.    
//   No other file needs to be touched for content changes. 

export const personal = {
  name:       'Aditya Prabhat Gupta',
  initials:   'APG',
  navInitials:'AG',
  role:       'Full Stack Developer',
  tagline:    'MERN Stack Developer building responsive, scalable web applications with clean, maintainable code and a passion for real-world impact.',
  status:     'Open to opportunities',
  email:      'Aditygupta2474@gmail.com',
  phone:      '+91-9695535380',
  linkedin:   'https://www.linkedin.com/in/aditya-prabhat-gupta-45a2102aa/',
  github:     'https://github.com/AdityaPrabhatGupta',
  resume:     '/Resume.pdf',                       
  profileImg: '/Aditya.jpeg',                      
  heroBadge:  { value: '3rd', label: 'Hackathon' },
  heroChip:   'B.Tech CSE (AI & ML)',
};

export const heroTags = ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript ES6+'];

export const tickerItems = [
  'REACT.JS', 'NODE.JS', 'MONGODB', 'EXPRESS.JS',
  'JAVASCRIPT', 'REST APIs', 'MERN STACK',
  'GITHUB', 'NETLIFY', 'AI & ML',
];

export const skills = [
  {
    icon: '⚡',
    name: 'Languages',
    tags: ['JavaScript ES6+', 'HTML5', 'CSS3', 'C'],
  },
  {
    icon: '🎨',
    name: 'Frontend',
    tags: ['React.js', 'React Router DOM', 'React Hooks', 'LocalStorage API', 'Responsive Design'],
  },
  {
    icon: '⚙️',
    name: 'Backend',
    tags: ['Node.js', 'Express.js', 'RESTful APIs', 'API Integration', 'JWT Auth'],
  },
  {
    icon: '🗄️',
    name: 'Databases',
    tags: ['MongoDB', 'MySQL', 'CRUD Operations', 'Schema Design', 'Query Optimization'],
  },
  {
    icon: '🛠️',
    name: 'Tools & Deploy',
    tags: ['GitHub', 'VS Code', 'Netlify', 'Render', 'npm'],
  },
  {
    icon: '👨‍💼',
    name: 'Soft Skills',
    tags: ['Leadership', 'Team Work', 'Effective Communication', 'Time Management', 'Critical Thinking'],
  },
];

export const experience = [
  {
    date:    'Jun 2025 – Jul 2025',
    company: 'YBI Foundation',
    type:    'Remote · Internship',
    role:    'AI & Generative AI Intern',
    bullets: [
      'Completed 4-week intensive training on AI fundamentals, generative models, and practical applications.',
      'Gained hands-on experience with prompt engineering, model fine-tuning, and AI application deployment.',
      'Earned official certification in Artificial Intelligence and Generative AI.',
    ],
  },
  {
    date:    'Aug 2023 – Jul 2027',
    company: 'RIT Roorkee',
    type:    'Uttarakhand · Full-time',
    role:    'B.Tech — Computer Science (AI & ML)',
    bullets: [
      'Pursuing Bachelor of Technology in CSE with specialization in AI and Machine Learning.',
      'Competed in RIT Hackathon 2025, leading a team to 3rd place among 20+ competing teams.',
      'Trained by IIT Bombay in C, Python, and Java programming fundamentals.',
    ],
  },
];

export const projects = [
  {
    id:       'pm-tool',
    featured: false,
    tag:      'MERN Stack',
    award:   '🏆 Live on Netlify',
    name:     'Project Management Tool',
    desc:     'Full-stack MERN application with role-based access (Admin / Manager / Employee), Kanban board, task assignment with deadlines, group management, JWT auth, and a glassmorphism UI.',
    stack:    ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    link:     'https://project-management-system-2026.netlify.app/',
    linkLabel:'View Live Site',
    gradient: 'linear-gradient(135deg,#0d1117 0%,#1a2233 100%)',
    glyph:    'PM',
    image:    '/PMS.png',            
  },
  {
    id:       'recipex',
    featured: false,
    tag:      'React.js',
    award:    '🏆 Live on Netlify',
    name:     'RecipeX — Recipe Discovery',
    desc:     'Recipe discovery app using React hooks and TheMealDB API. Debounced calls reduced requests by 70%, with LocalStorage auth, protected routes, and persistent favourites.',
    stack:    ['React.js', 'React Router', 'CSS3', 'TheMealDB API', 'Netlify'],
    link:     'https://recipexbyadityaa.netlify.app',
    linkLabel:'View Live Site',
    gradient: 'linear-gradient(135deg,#0f1a0f 0%,#1e2a1e 100%)',
    glyph:    'RX',
    image:    '/recipex.png',             
  },
  {
    id:       'chatbot',
    featured: false,
    tag:      'AI / ML',
    award:    '🥉 3rd Place — RIT Hackathon 2025 &🏆 Live on Netlify',
    name:     'AI Medical Chatbot',
    desc:     'Led a team of 3 to build an AI-powered medical chatbot using TensorFlow for NLP query understanding. Implemented ethical guardrails and input validation.',
    stack:    ['Python', 'TensorFlow', 'JavaScript', 'HTML', 'CSS'],
    link:     'https://health-care-assitance.netlify.app/',
    linkLabel: 'View Live Site',
    gradient: 'linear-gradient(135deg,#110a1a 0%,#1a1a2e 100%)',
    glyph:    'AI',
    image:    '/HL.png',             
  },
  {
  id:        'voice-calc',
  featured:  false,
  tag:       'JavaScript',
  award:     '🏆 Live on Netlify',
  name:      'Voice-Enabled Calculator',
  desc:      'Responsive calculator with hands-free voice commands via Web Speech API. Achieved 95% speech recognition accuracy through custom command parsing algorithms.',
  stack:     ['JavaScript', 'Web Speech API', 'HTML5', 'CSS3'],
  link:      'https://calculator-with-voice-assistance.netlify.app/',
  linkLabel: 'View Live Site',
  gradient:  'linear-gradient(135deg,#0a0a16 0%,#1a1a2e 100%)',
  glyph:     '🎙',
  image:     '/calci.png',
},
];

export const about = {
  bio: [
    "I'm a MERN Stack Developer with hands-on experience building responsive, scalable web applications. Passionate about clean, maintainable code and eager to contribute to real-world full-stack projects.",
    'Currently pursuing B.Tech in Computer Science (AI & ML) at Roorkee Institute of Technology, combining strong software fundamentals with an evolving interest in AI and generative systems.',
  ],
  stats: [
    { count: 4,  suffix: '+', label: 'Projects Built'  },
    { count: 95, suffix: '%', label: 'Speech Accuracy' },
    { count: 70, suffix: '%', label: 'API Reduction'   },
  ],
  education: {
    degree: 'B.Tech — Computer Science & Engineering (AI & ML)',
    school: 'Roorkee Institute of Technology, Uttarakhand',
    year:   'Aug 2023 – July 2027',
  },
};

export const certifications = [
  {
    icon:  '🥉',
    title: 'Runner-Up — RIT Hackathon 2025',
    org:   '3rd Place · 20+ Teams',
    desc:  'Led a team of 3 building an AI-powered medical chatbot, competing against 20+ teams.',
  },
  {
    icon:  '🤖',
    title: 'AI & Generative AI Certification',
    org:   'YBI Foundation · 2025',
    desc:  'Completed a 4-week intensive internship on AI fundamentals, generative models, and deployment.',
  },
  {
    icon:  '🏛️',
    title: 'Programming Training — IIT Bombay',
    org:   'C · Python · Java',
    desc:  "Comprehensive training in C, Python, and Java under IIT Bombay's professional program.",
  },
];

// ── contactSubjects ────────────────────────────────────────────────────────

export const contactSubjects = [
  {
    id:    'internship',
    label: 'Internship Opportunity',
    icon:  '🚀',
    color: '#bcd631',              
    sub:   "Let's grow together",
  },
  {
    id:    'freelance',
    label: 'Freelance Project',
    icon:  '💼',
    color: '#4fc3f7',               
    sub:   'Build something great',
  },
  {
    id:    'fulltime',
    label: 'Full-time Role',
    icon:  '🏢',
    color: '#ce93d8',               
    sub:   'Long-term commitment',
  },
  {
    id:    'collab',
    label: 'Collaboration',
    icon:  '🤝',
    color: '#80cbc4',               
    sub:   'Two minds, one vision',
  },
  {
    id:    'other',
    label: 'Other',
    icon:  '✦',
    color: '#ffcc80',               
    sub:   'Tell me everything',
  },
];