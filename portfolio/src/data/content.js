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
    tags: ['JavaScript ES6+', 'HTML5', 'CSS3', 'C'],
  },
  {
    icon: '🎨',
    name: 'Frontend',
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
    tags: ['MongoDB', 'MySQL', 'CRUD Operations'],
  },
  {
    icon: '🛠️',
    name: 'Tools & Deploy',
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
  },
  {
    icon: '💻',
    title: 'Full Stack Development',
    org: 'Self-Taught',
    desc: 'Proficient in MERN stack, WebRTC, and real-time applications with production deployments.',
  },
  {
    icon: '🏆',
    title: '3rd Place Hackathon',
    org: 'Hackathon Winner',
    desc: 'Achieved 3rd place in a competitive hackathon, demonstrating innovative problem-solving skills.',
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