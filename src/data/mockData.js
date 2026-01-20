/**
 * Mock Data for HireMind Agent
 * Contains all static/dummy data used across the application
 */

// User profile data
export const userData = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  title: "Senior Software Engineer",
  experience: "5 years",
  avatar: null,
  preferences: {
    roles: ["Software Engineer", "Full Stack Developer", "Backend Developer"],
    experienceLevel: "Senior",
    locations: ["San Francisco", "Remote", "New York"],
    salary: "$120,000 - $180,000"
  }
};

// Resume data
export const resumeData = {
  skills: [
    { name: "JavaScript", level: "Expert", years: 5 },
    { name: "React.js", level: "Expert", years: 4 },
    { name: "Node.js", level: "Advanced", years: 4 },
    { name: "Python", level: "Intermediate", years: 3 },
    { name: "TypeScript", level: "Advanced", years: 3 },
    { name: "SQL", level: "Advanced", years: 4 },
    { name: "MongoDB", level: "Intermediate", years: 2 },
    { name: "AWS", level: "Intermediate", years: 2 },
    { name: "Docker", level: "Intermediate", years: 2 },
    { name: "Git", level: "Expert", years: 5 }
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      duration: "2021 - Present",
      description: "Led development of microservices architecture, mentored junior developers, and improved system performance by 40%."
    },
    {
      title: "Software Engineer",
      company: "StartupXYZ",
      duration: "2019 - 2021",
      description: "Built full-stack web applications using React and Node.js, implemented CI/CD pipelines."
    },
    {
      title: "Junior Developer",
      company: "WebAgency Co.",
      duration: "2018 - 2019",
      description: "Developed responsive websites and maintained client projects."
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      year: "2018"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      school: "UC Berkeley",
      year: "2016"
    }
  ],
  strength: {
    score: 85,
    summary: "Strong technical background with excellent experience in modern web technologies.",
    highlights: [
      "Diverse skill set covering frontend and backend",
      "Strong educational background",
      "Progressive career growth",
      "Experience with cloud technologies"
    ],
    improvements: [
      "Add more certifications",
      "Include specific project metrics",
      "Add soft skills section"
    ]
  }
};

// Jobs data
export const jobsData = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "Google",
    location: "Mountain View, CA",
    salary: "$180,000 - $250,000",
    type: "Full-time",
    posted: "2 days ago",
    requiredSkills: ["React.js", "TypeScript", "JavaScript", "CSS", "Testing"],
    matchPercentage: 92,
    description: "Join our team to build next-generation web applications used by billions of users."
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    salary: "$160,000 - $220,000",
    type: "Full-time",
    posted: "1 day ago",
    requiredSkills: ["React.js", "Node.js", "GraphQL", "Python", "SQL"],
    matchPercentage: 88,
    description: "Work on cutting-edge social features and infrastructure."
  },
  {
    id: 3,
    role: "Software Engineer III",
    company: "Netflix",
    location: "Los Gatos, CA",
    salary: "$200,000 - $300,000",
    type: "Full-time",
    posted: "3 days ago",
    requiredSkills: ["Java", "Microservices", "AWS", "React.js", "Node.js"],
    matchPercentage: 78,
    description: "Build and scale the platform that delivers entertainment to 200M+ subscribers."
  },
  {
    id: 4,
    role: "Backend Engineer",
    company: "Stripe",
    location: "San Francisco, CA",
    salary: "$170,000 - $240,000",
    type: "Full-time",
    posted: "5 days ago",
    requiredSkills: ["Ruby", "Python", "PostgreSQL", "AWS", "Docker"],
    matchPercentage: 72,
    description: "Help build the economic infrastructure of the internet."
  },
  {
    id: 5,
    role: "React Developer",
    company: "Airbnb",
    location: "Remote",
    salary: "$150,000 - $200,000",
    type: "Full-time",
    posted: "1 week ago",
    requiredSkills: ["React.js", "JavaScript", "CSS", "Node.js", "GraphQL"],
    matchPercentage: 95,
    description: "Create beautiful, accessible experiences for travelers worldwide."
  },
  {
    id: 6,
    role: "Senior Software Engineer",
    company: "Uber",
    location: "San Francisco, CA",
    salary: "$175,000 - $235,000",
    type: "Full-time",
    posted: "4 days ago",
    requiredSkills: ["Go", "Python", "Kubernetes", "MySQL", "React.js"],
    matchPercentage: 68,
    description: "Scale systems that power millions of rides daily."
  }
];

// Application tracking data
export const applicationsData = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "Google",
    appliedDate: "2024-12-15",
    status: "Interview",
    statusColor: "green"
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Meta",
    appliedDate: "2024-12-14",
    status: "Under Review",
    statusColor: "yellow"
  },
  {
    id: 3,
    role: "React Developer",
    company: "Airbnb",
    appliedDate: "2024-12-12",
    status: "Applied",
    statusColor: "blue"
  },
  {
    id: 4,
    role: "Software Engineer",
    company: "Spotify",
    appliedDate: "2024-12-10",
    status: "Rejected",
    statusColor: "red"
  },
  {
    id: 5,
    role: "Backend Engineer",
    company: "Stripe",
    appliedDate: "2024-12-08",
    status: "Interview",
    statusColor: "green"
  },
  {
    id: 6,
    role: "Senior Developer",
    company: "Twitter",
    appliedDate: "2024-12-05",
    status: "Under Review",
    statusColor: "yellow"
  }
];

// Dashboard stats
export const dashboardStats = {
  totalApplied: 24,
  inProgress: 8,
  interviews: 3,
  skillGaps: 5
};

// Skill gap analysis data
export const skillGapData = {
  userSkills: ["JavaScript", "React.js", "Node.js", "Python", "SQL", "Git", "Docker", "AWS"],
  requiredSkills: [
    { name: "JavaScript", required: true, userHas: true },
    { name: "React.js", required: true, userHas: true },
    { name: "TypeScript", required: true, userHas: true },
    { name: "GraphQL", required: true, userHas: false },
    { name: "Kubernetes", required: true, userHas: false },
    { name: "System Design", required: true, userHas: false },
    { name: "Node.js", required: true, userHas: true },
    { name: "Redis", required: true, userHas: false },
    { name: "Testing", required: true, userHas: false }
  ],
  suggestedLearning: [
    {
      skill: "GraphQL",
      priority: "High",
      resources: ["GraphQL Official Docs", "Apollo Tutorial", "Udemy Course"]
    },
    {
      skill: "Kubernetes",
      priority: "High",
      resources: ["Kubernetes.io", "KodeKloud", "Linux Foundation Course"]
    },
    {
      skill: "System Design",
      priority: "Medium",
      resources: ["System Design Primer", "Grokking System Design", "YouTube Channels"]
    },
    {
      skill: "Redis",
      priority: "Medium",
      resources: ["Redis University", "Redis Documentation", "FreeCodeCamp Tutorial"]
    },
    {
      skill: "Testing",
      priority: "Low",
      resources: ["Jest Documentation", "Testing Library", "Kent C. Dodds Blog"]
    }
  ]
};

// Cover letter template
export const coverLetterData = {
  template: `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Frontend Engineer position at Google. With over 5 years of experience in software development and a proven track record of building scalable web applications, I am confident in my ability to contribute to your team's success.

In my current role as Senior Software Engineer at TechCorp Inc., I have led the development of microservices architecture that improved system performance by 40%. I have extensive experience with React.js, JavaScript, and TypeScript, which align perfectly with the requirements of this position.

Key achievements that make me an ideal candidate:
• Led a team of 5 developers in delivering a customer-facing application used by 1M+ users
• Implemented CI/CD pipelines that reduced deployment time by 60%
• Mentored junior developers and conducted technical interviews

I am particularly excited about this opportunity because of Google's commitment to innovation and the chance to work on products that impact billions of users. I am eager to bring my technical expertise and leadership skills to contribute to your team's mission.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to Google's continued success.

Best regards,
John Doe`
};

// Interview questions data
export const interviewQuestionsData = {
  technical: [
    {
      id: 1,
      question: "Explain the virtual DOM and how React uses it for performance optimization.",
      category: "React.js",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "What is the difference between == and === in JavaScript?",
      category: "JavaScript",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "Explain closures in JavaScript and provide a practical example.",
      category: "JavaScript",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "How would you optimize a React application for performance?",
      category: "React.js",
      difficulty: "Hard"
    },
    {
      id: 5,
      question: "Explain the event loop in Node.js.",
      category: "Node.js",
      difficulty: "Medium"
    }
  ],
  hr: [
    {
      id: 1,
      question: "Tell me about yourself and your career journey.",
      category: "Background",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "Describe a challenging project and how you overcame obstacles.",
      category: "Problem Solving",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "How do you handle conflicts with team members?",
      category: "Teamwork",
      difficulty: "Medium"
    },
    {
      id: 5,
      question: "Why are you looking to leave your current position?",
      category: "Motivation",
      difficulty: "Medium"
    }
  ],
  companySpecific: [
    {
      id: 1,
      question: "Why do you want to work at Google?",
      company: "Google",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "How would you improve Google Search?",
      company: "Google",
      difficulty: "Hard"
    },
    {
      id: 3,
      question: "Design a URL shortening service like bit.ly.",
      company: "Meta",
      difficulty: "Hard"
    },
    {
      id: 4,
      question: "How would you build a news feed algorithm?",
      company: "Meta",
      difficulty: "Hard"
    }
  ]
};

// Mock interview conversation
export const mockInterviewData = [
  {
    id: 1,
    type: "interviewer",
    message: "Hello! Welcome to your mock interview. I'm your AI interviewer today. Let's start with a warm-up question. Can you tell me about yourself and your background in software development?"
  },
  {
    id: 2,
    type: "user",
    message: "Hi! Thank you for having me. I'm a software engineer with 5 years of experience, primarily focused on frontend development with React.js and full-stack work with Node.js..."
  },
  {
    id: 3,
    type: "interviewer",
    message: "Great introduction! Now, let's dive into a technical question. Can you explain the concept of React hooks and when you would use useState vs useReducer?"
  }
];

// Team members for About page
export const teamMembers = [
  {
    name: "John Doe",
    role: "Project Lead & Backend Developer",
    image: null
  },
  {
    name: "Jane Smith",
    role: "Frontend Developer",
    image: null
  },
  {
    name: "Mike Johnson",
    role: "AI/ML Engineer",
    image: null
  },
  {
    name: "Sarah Williams",
    role: "UI/UX Designer",
    image: null
  }
];

// Features for landing page
export const features = [
  {
    title: "Automatic Job Discovery",
    description: "Our AI scans thousands of job listings daily to find opportunities that match your skills and preferences.",
    icon: "Search"
  },
  {
    title: "Resume Analysis",
    description: "Get detailed insights about your resume's strengths and areas for improvement with AI-powered analysis.",
    icon: "FileText"
  },
  {
    title: "AI Cover Letter Generation",
    description: "Generate personalized cover letters tailored to each job application automatically.",
    icon: "Edit"
  },
  {
    title: "Automated Job Application",
    description: "Apply to multiple jobs with a single click. Let our system handle the repetitive tasks.",
    icon: "Send"
  },
  {
    title: "Application Tracking",
    description: "Keep track of all your applications, interviews, and offers in one centralized dashboard.",
    icon: "ClipboardList"
  },
  {
    title: "Skill Gap Analysis",
    description: "Identify missing skills for your dream jobs and get personalized learning recommendations.",
    icon: "TrendingUp"
  },
  {
    title: "Mock Interviews",
    description: "Practice with AI-powered mock interviews and receive instant feedback on your responses.",
    icon: "MessageSquare"
  }
];
