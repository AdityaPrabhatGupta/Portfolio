// content.js — SINGLE SOURCE OF TRUTH

export const personal = {
  name: 'Aditya Prabhat Gupta',
  initials: 'APG',
  navInitials: 'AG',
  role: 'Full Stack Developer',
  tagline:
    'MERN Stack Developer building responsive, scalable web applications with clean, maintainable code and a passion for real-world impact.',
  status: 'Open to opportunities',
  email: 'Aditygupta2474@gmail.com',
  phone: '+91-9695535380',
  linkedin: 'https://www.linkedin.com/in/aditya-prabhat-gupta-45a2102aa/',
  github: 'https://github.com/AdityaPrabhatGupta',
  resume: '/Resume.pdf',
  profileImg: '/Aditya.jpeg',
  heroBadge: { value: '3rd', label: 'Hackathon' },
  heroChip: 'B.Tech CSE (AI & ML)',
};

export const heroTags = [
  'React.js',
  'Node.js',
  'MongoDB',
  'Express.js',
  'WebRTC',
];

export const tickerItems = [
  'REACT.JS',
  'NODE.JS',
  'MONGODB',
  'EXPRESS.JS',
  'SOCKET.IO',
  'WEBRTC',
  'REST APIs',
  'MERN STACK',
  'GITHUB',
  'VERCEL',
  'RENDER',
];

export const skills = [
  {
    icon: '⚡',
    name: 'Languages',
    score: 90,
    tags: ['JavaScript ES6+', 'HTML5', 'CSS3', 'C'],
  },
  {
    icon: '🎨',
    name: 'Frontend',
    score: 95,
    tags: [
      'React.js',
      'React Router DOM',
      'React Hooks',
      'LocalStorage API',
      'Responsive Design',
    ],
  },
  {
    icon: '⚙️',
    name: 'Backend',
    score: 90,
    tags: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Auth',
      'Socket.IO',
      'WebRTC',
    ],
  },
  {
    icon: '🗄️',
    name: 'Databases',
    score: 85,
    tags: ['MongoDB', 'MySQL', 'CRUD Operations'],
  },
  {
    icon: '🛠️',
    name: 'Tools & Deploy',
    score: 80,
    tags: ['GitHub', 'VS Code', 'Vercel', 'Render', 'Cloudinary', 'FFmpeg'],
  },
];

export const experience = [
  {
    date: 'Jun 2025 – Jul 2025',
    company: 'YBI Foundation',
    type: 'Remote · Internship',
    role: 'AI & Generative AI Intern',
    bullets: [
      'Worked on generative AI models and prompt engineering',
      'Built AI-based applications and deployed them',
      'Certified in Artificial Intelligence & Generative AI',
    ],
  },
];

export const projects = [
  {
    id: 'convox',
    featured: true,
    tag: 'MERN + WebRTC',
    award: '🚀 Live on Vercel',
    name: 'Convox — Real-Time Chat & Calling App',
    desc:
      'Built a full-stack real-time messaging and calling platform using MERN, Socket.IO, and WebRTC. Implemented peer-to-peer audio/video calls using SDP, ICE candidates, and STUN/TURN servers. Developed secure authentication with Google OAuth and JWT. Optimized media uploads using Cloudinary, Sharp, and FFmpeg. Deployed on Vercel and Render with proper CORS handling, SPA routing, and production-ready environment configuration.',
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.IO',
      'WebRTC',
      'Cloudinary',
    ],
    link: 'https://convox-tan.vercel.app/',
    linkLabel: 'View Live Site',
    github: 'https://github.com/AdityaPrabhatGupta/Convox',
    gradient: 'linear-gradient(135deg,#0a0f1c 0%,#1c2541 100%)',
    glyph: 'CX',
    image: '/convox-2.png',
    hoverImage: '/convox-1.png',
    caseStudy: {
      architecture: 'MERN Stack + Socket.IO + WebRTC (Mesh Network)',
      database: 'MongoDB (Mongoose Schemas for users, messages, and calls)',
      features: [
        'Peer-to-peer audio/video calls with SDP and ICE gathering.',
        'Real-time text chat with message receipt events and active statuses.',
        'Secure authentication via Google OAuth 2.0 and JWT.',
        'Rich media uploads using Cloudinary cloud storage and Sharp compression.'
      ],
      challenges: [
        {
          problem: 'High latency and connection failure rates behind firewalls.',
          solution: 'Configured STUN/TURN servers to enable WebRTC connection path negotiation across symmetric NAT firewalls.'
        },
        {
          problem: 'Real-time message ordering delays under heavy network loads.',
          solution: 'Designed a message sequence caching mechanism on the Express backend and synchronized Socket.IO streams.'
        }
      ]
    }
  },

  {
    id: 'pm-tool',
    tag: 'MERN Stack',
    name: 'Project Management Tool',
    desc:
      'Role-based MERN app with Kanban board, Role-based MERN project management app featuring a Kanban board (Todo → In Progress → Done), real-time progress tracking, and a team notice board. Supports three access levels — Admin, Manager, and Member — secured with JWT authentication. Built with React, Node.js, Express, and MongoDB, deployed across Netlify and Render.',
    stack: ['React.js', 'Node.js', 'MongoDB'],
    link: 'https://project-management-system-2026.netlify.app/',
    linkLabel: 'View Live Site',
    github: 'https://github.com/AdityaPrabhatGupta/project-management-system',
    image: '/PMS.png',
    hoverImage: '/PMS-2.png',
    glyph: 'PM',
    caseStudy: {
      architecture: 'MERN Stack with RESTful API endpoints',
      database: 'MongoDB (Collections for Teams, Notices, and Kanban Cards)',
      features: [
        'Dynamic Kanban board with Drag & Drop column transitions.',
        'Notice board for real-time team broadcasts.',
        'Role-Based Access Control (RBAC) separating Admin, Manager, and Member roles.',
        'JWT token authentication stored securely in client cookies.'
      ],
      challenges: [
        {
          problem: 'Kanban cards state shifting when multiple users dragged in parallel.',
          solution: 'Optimized Mongoose atomic updates ($set, $push) and decoupled UI transitions from DB synchronization.'
        },
        {
          problem: 'Unauthorized API manipulation bypassing route controls.',
          solution: 'Implemented strict middleware authorization validation checks on all REST API points.'
        }
      ]
    }
  },

  {
    id: 'recipex',
    tag: 'React.js',
    name: 'RecipeX — Recipe Discovery',
    desc:
      'RecipeX is a modern recipe discovery web application that helps users explore delicious meals from around the world. Users can search for recipes, view detailed cooking instructions, and save their favorite dishes. Built recipe app with debounced API calls reducing requests by 70% and persistent storage.',
    stack: ['React.js', 'API'],
    link: 'https://recipexbyadityaa.netlify.app',
    linkLabel: 'View Live Site',
    github: 'https://github.com/AdityaPrabhatGupta/RecipeX-react-',
    image: '/recipex.png',
    hoverImage: '/recipex-2.png',
    glyph: 'RX',
    caseStudy: {
      architecture: 'React Client + Third-Party Food Database API',
      database: 'LocalStorage API (Favorites persistence & cached recipes)',
      features: [
        'Ingredient-based search with autocomplete filters.',
        'Interactive cooking steps and nutritional breakdown cards.',
        'Custom favorites list with instant offline loading.'
      ],
      challenges: [
        {
          problem: 'Rapid keystroke searches triggered duplicate API calls, hitting rate limits.',
          solution: 'Implemented a custom debouncing hook (`useDebounce`) that delayed the query execution by 400ms.'
        },
        {
          problem: 'Slow initial load times when requesting remote recipe data.',
          solution: 'Built a lightweight client-side memory cache that stored raw responses for 10 minutes.'
        }
      ]
    }
  },

  {
    id: 'chatbot',
    tag: 'AI',
    name: 'AI Medical Chatbot',
    desc:
      ' Our AI-powered health monitoring system helps users track their well-being by analyzing symptoms, calculating BMI, and providing real-time health insights. Whether you are looking to predict diseases, monitor vital signs, or get personalized health recommendations, our platform ensures accuracy and efficiency.Developed NLP-based chatbot using TensorFlow with secure response handling.',
    stack: ['Python', 'TensorFlow'],
    link: 'https://health-care-assitance.netlify.app/',
    linkLabel: 'View Live Site',
    github: 'https://github.com/AdityaPrabhatGupta/Health-care-ai',
    image: '/HL.png',
    hoverImage: '/HL-2.png',
    glyph: 'AI',
    caseStudy: {
      architecture: 'Python AI Engine + Flask Web API Wrapper',
      database: 'CSV Data Storage (Loaded on server startup)',
      features: [
        'Natural Language Processing (NLP) symptom classification model.',
        'BMI calculator integrated with customized healthy diet recommendations.',
        'Structured responses categorizing symptoms into levels of urgency.'
      ],
      challenges: [
        {
          problem: 'Deep NLP classification model took too long to load in web contexts.',
          solution: 'Decoupled model compilation from route handling, caching the compiled weights in server memory.'
        },
        {
          problem: 'Misclassification of multiple symptoms typed in a single string.',
          solution: 'Refactored training patterns to include compound sentences and multi-symptom intent targets.'
        }
      ]
    }
  },
  {
    id: 'voice-calc',
    featured: false,
    tag: 'JavaScript',
    award: '🏆 Live on Netlify',
    name: 'Voice-Enabled Calculator',
    desc: 'Built a responsive calculator with voice command support using Web Speech API, achieving ~95% speech recognition accuracy through custom command parsing.',
    stack: ['JavaScript', 'Web Speech API', 'HTML5', 'CSS3'],
    link: 'https://calculator-with-voice-assistance.netlify.app/',
    linkLabel: 'View Live Site',
    github: 'https://github.com/AdityaPrabhatGupta/calculator-with-voice-assistance',
    gradient: 'linear-gradient(135deg,#0a0a16 0%,#1a1a2e 100%)',
    glyph: '🎙',
    image: '/calci.png',
    hoverImage: '/calci.png',
    caseStudy: {
      architecture: 'Vanilla JavaScript Web Speech Interface',
      database: 'No database (State managed locally in memory)',
      features: [
        'Real-time voice capture utilizing Web Speech API.',
        'Regex-driven math expression parser matching vocal inputs.',
        'Interactive auditory feedback detailing results.'
      ],
      challenges: [
        {
          problem: 'Speech engine misidentifying operations (e.g., "in" as "*").',
          solution: 'Built a custom phonetic replacement dictionary mapping operations like "add, plus, sum" to "+".'
        },
        {
          problem: 'Mic activation issues across secure HTTPS contexts.',
          solution: 'Implemented check-validation logic for browser permissions with helpful user permission popups.'
        }
      ]
    }
  }
];

export const about = {
  bio: [
    'Full Stack Developer specializing in MERN and real-time systems , Passionate about Developing, scalable architectures, and building production-ready apps.',
  ],
  stats: [
    { count: 5, suffix: '+', label: 'Projects Built' },
    { count: 95, suffix: '%', label: 'Speech Accuracy' },
    { count: 70, suffix: '%', label: 'API Optimization' },
  ],
  education: {
    degree: 'B.Tech CSE (AI & ML)',
    school: 'Your University',
    year: '2025',
  },
};

export const certifications = [
  {
    icon: '🤖',
    title: 'Artificial Intelligence & Generative AI',
    org: 'YBI Foundation',
    desc: 'Certified in AI and Generative AI technologies, including prompt engineering and model deployment.',
    link: 'https://www.apnaclassroom.com/credential-validation?credentialId=5LTZU49HIV9KR',
  },
  {
    icon: '💻',
    title: 'Full Stack Development with AI',
    org: 'Physics Wallah x NSDC x PwC | 2026',
    desc: 'Comprehensive training in full-stack engineering integrated with artificial intelligence. Verified credentials through pwskills.',
    link: 'https://pwskills.com/learn/certificate/b0eed40e-81f0-47b3-8e79-f05b4641d761/?isCareerPath=true',
  },
  {
    icon: '🏆',
    title: '3rd Place — VibeCon ’26',
    org: 'GDGoC RIT Roorkee',
    desc: 'Secured 3rd place in the AI Creator Showcase. Built "DreamForge AI", an immersive cinematic universe generator using Gemini, Imagen, and Multi-model orchestration.',
  },
  {
    icon: '🥉',
    title: '2nd Runner-Up — RIT Hackathon 2025',
    org: 'RIT Roorkee',
    desc: 'Secured 2nd Runner-Up position. Led a 4-member team to develop an NLP-based AI Medical Assistant Chatbot using TensorFlow.',
  },
];

export const contactSubjects = [
  {
    id: 'collaboration',
    color: '#00d4ff',
    icon: '🤝',
    label: 'Collaboration',
  },
  {
    id: 'job-opportunity',
    color: '#ff6b6b',
    icon: '💼',
    label: 'Job Opportunity',
  },
  {
    id: 'project-inquiry',
    color: '#4ecdc4',
    icon: '🚀',
    label: 'Project Inquiry',
  },
  {
    id: 'general',
    color: '#ffd93d',
    icon: '💬',
    label: 'General Inquiry',
  },
];