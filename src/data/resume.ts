// ─── Resume Data ───────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content

export const personalInfo = {
  name: "Vidhyang Jain",
  role: "Full-Stack Software Engineer",
  tagline: "I engineer elegant, high-performance web experiences. Merging robust backend architectures with pixel-perfect, interactive frontends to build digital products that truly matter.",
  email: "vidhyangj99@gmail.com",   // replace with real email
  github: "https://github.com/Vidhyang199",  // replace with real link
  linkedin: "https://linkedin.com/in/Vidhyang", // replace with real link
  location: "India",
};

export const experiences = [
  {
    id: 1,
    company: "In Time Inc",
    role: "Junior Software Developer Intern",
    period: "Jan 2026 – Present",
    type: "Full-time Internship",
    description: [
      "Building and integrating DRONES APIs using Vite.js and React.js with DroneKit hardware support.",
      "Implemented robust collision-avoidance features through real-time sensor-data processing, improving operational safety.",
      "Engineered a live-streaming drone camera module using advanced WebRTC and socket communication.",
      "Contributing to full-stack feature development in an Agile team environment.",
    ],
    tech: ["React", "Vite", "WebRTC", "DroneKit", "Socket.io", "Python"],
  },
  {
    id: 2,
    company: "Consultant Pvt Ltd",
    role: "Software Applications Intern",
    period: "May 2025 – July 2025",
    type: "Internship",
    description: [
      "Analyzed real-world datasets, delivering insights that boosted operational efficiency by 30%.",
      "Analyzed website performance metrics, optimizing load times and enhancing overall user experience.",
    ],
    tech: ["Data Analysis", "Web Performance", "Python", "Dashboards"],
  },
  {
    id: 3,
    company: "PaxPlus",
    role: "Digital Marketing Intern at UIN Surakarta Platforms",
    period: "Feb 2025",
    type: "Internship",
    description: [
      "Built a functional MERN-stack landing-page website using MERN stack with REST APIs, optimizing for performance.",
      "Designed a frontend interface for better engagement and implemented REST API services.",
    ],
    tech: ["MERN Stack", "REST API", "MongoDB", "Express", "React"],
  },
];

export const projects = [
  {
    id: 1,
    title: "SocialSpace",
    subtitle: "Full-Stack Social Media Platform",
    description:
      "A complete social media platform with real-time messaging, post feeds, stories, and notifications. Built with a scalable microservices-inspired architecture.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    links: {
      github: "https://github.com/vidhyangjain/socialspace",
      live: "",
    },
    featured: true,
  },
  {
    id: 2,
    title: "GotHire",
    subtitle: "AI-Powered Hiring Platform",
    description:
      "An intelligent recruitment platform leveraging AI to match candidates with roles, generate interview questions, and streamline the hiring funnel.",
    tech: ["React", "Node.js", "OpenAI API", "MongoDB", "Tailwind"],
    links: {
      github: "https://github.com/vidhyangjain/gothire",
      live: "",
    },
    featured: true,
  },
  {
    id: 3,
    title: "StudySync",
    subtitle: "AI Study Assistant",
    description:
      "A MERN-stack AI study tool that generates summaries, quizzes, and flashcards from uploaded documents using OpenAI GPT.",
    tech: ["MERN Stack", "OpenAI", "PDF.js", "REST API"],
    links: {
      github: "https://github.com/vidhyangjain/studysync",
      live: "",
    },
    featured: false,
  },
  {
    id: 4,
    title: "CodeCollab",
    subtitle: "Real-Time Collaborative IDE",
    description:
      "A browser-based collaborative code editor supporting multi-user sessions, real-time sync, and syntax highlighting across 20+ languages.",
    tech: ["MERN Stack", "WebSockets", "Monaco Editor", "Socket.io"],
    links: {
      github: "https://github.com/vidhyangjain/codecollab",
      live: "",
    },
    featured: false,
  },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "C++", "SQL", "HTML", "CSS"],
  Frameworks: ["React.js", "Node.js", "Express.js", "Next.js", "React Native", "Vite"],
  Databases: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"],
  Tools: ["Git", "Docker", "AWS", "Postman", "Figma", "Linux"],
  Concepts: ["REST APIs", "WebSockets", "WebRTC", "Agile", "Microservices", "CI/CD"],
};

export const education = [
  {
    institution: "Raj Public Senior Secondary School",
    board: "CBSE – Science + CS",
    year: "2024",
    score: "Class 12",
  },
  {
    institution: "Raj Public Senior Secondary School",
    board: "CBSE",
    year: "2022",
    score: "Class 10",
  },
];
