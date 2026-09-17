export const bio = {
  name: "Jennifer Luo",
  tagline: "CS @ Tufts '27 · Software Researcher · Incoming SWE Intern @ AWS",
  summary:
    "Rising senior in Computer Science at Tufts University (Class of 2027), GPA 3.73. Currently a software researcher at the Nemitz Lab building a self-driving lab system for soft robotics research. Starting a Software Development Engineer internship at AWS (Transit Gateway team) in Santa Clara, CA in August 2026.",
  nowBuilding:
    "Implementing BGP Graceful Restart and routing reliability features on AWS Transit Gateway",
};

export const about = {
  paragraph:
    "I'm a rising senior studying Computer Science at Tufts, currently working \
    as a software researcher in the Nemitz Lab, where I build EvoFab—a self-driving \
    lab interface that automates soft robotic actuator fabrication. What excites \
    me most about software engineering is how it opens the door to learning across \
    disciplines. I enjoy seeking out diverse experiences that challenge me to \
    understand new fields, whether that's building robotics systems at the lab \
    or spending last summer tending to patients at Yale New Haven Hospital. This\
     fall, I'll be joining AWS as a Software Development\
     Engineer Intern on the Transit Gateway team, where I'm excited to continue\
     learning at scale.",
  photoSrc: "/about/jennifer.jpg",
  photoAlt: "Jennifer Luo, Software Engineer",
};

export const contact = {
  email: "jennifer.luo@tufts.edu",
  github: "https://github.com/jennifer-luo-dev",
  githubHandle: "github.com/jennifer-luo-dev",
  site: "jenniferluo.org",
  resumeHref: "/resume.pdf",
};

export type ExperienceEntry = {
  slug: string;
  role: string;
  org: string;
  dates: string;
  location: string;
  bullets: string[];
  tech: string[];
  upcoming?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    slug: "aws",
    role: "Software Development Engineer Intern",
    org: "AWS — Transit Gateway",
    dates: "Sept 2026 - Present",
    location: "Santa Clara, CA",
    bullets: [
      "Implementing BGP Graceful Restart (RFC 4724) on Transit Gateway's routing plane to eliminate traffic blackholes when customer BGP sessions drop despite a healthy data plane, addressing a real production failure mode.",
      "Designing stale-route retention and route-hold coordination across a distributed, multi-tenant BGP architecture serving live customer traffic at scale.",
      "Building CloudWatch metrics/alarms to validate correctness pre-launch and gate a feature-flagged, staged rollout across a large multi-tenant fleet.",
      "Shipping changes in Python and Scala across a large existing codebase under full design-review, code-review, and CI/CD discipline.",
    ],
    tech: [
      "AWS",
      "CI/CD",
      "Python",
      "Scala",
      "EC2",
      "VPC",
      "Network Infrastructure",
    ],
    upcoming: false,
  },
  {
    slug: "nemitz-lab",
    role: "Software Researcher",
    org: "Nemitz Lab, Tufts University",
    dates: "Jan 2026 – Present",
    location: "Somerville, MA",
    bullets: [
      "Developed a full-stack self-driving lab interface to automate soft robotic actuator fabrication and characterization.",
      "Designed a PostgreSQL schema for experiment tracking and built a computer vision pipeline (OpenCV, RGB-D camera) for shadow-invariant actuator segmentation and curvature regression.",
      "Integrated a UR7e robot arm and Robotiq Hand-E gripper for automated fabrication handoff, including RTDE register-based remote control and REST API program triggering.",
    ],
    tech: [
      "Next.js",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "OpenCV",
    ],
  },
  {
    slug: "jumbocode",
    role: "Head of Project Management, Full-Stack Developer",
    org: "JumboCode",
    dates: "Oct 2023 – Present",
    location: "Medford, MA",
    bullets: [
      "Led two 14-member development teams delivering a full-stack library web app for non-profits (React, Next.js, TypeScript, Prisma, PostgreSQL).",
      "Engineered RBAC and audit logging for multi-role data access compliance.",
      "Managed 12 project teams as Head of PM, coaching PMs on agile system design.",
      "Built backend infrastructure for nonprofit HomeStart (MongoDB, Prisma, Node.js).",
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "Node.js",
    ],
  },
  {
    slug: "tufts-ta",
    role: "CS Teaching Assistant",
    org: "Tufts University",
    dates: "Jan 2024 – Present",
    location: "Medford, MA",
    bullets: [
      "Ran weekly labs for 20+ students on algorithmic concepts (dynamic programming, graphs), improving average exam scores by 4%.",
      "Evaluated 40+ student algorithm implementations weekly for correctness and complexity.",
    ],
    tech: [],
  },
];

export type ProjectStatus = "in progress" | "shipped";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  flagship?: boolean;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "evofab-sdl-interface",
    title: "EvoFab SDL Interface",
    summary:
      "Full-stack self-driving lab system automating soft robotic actuator fabrication, robot arm handoff, pneumatic testing, and ML-based curvature characterization.",
    description:
      "EvoFab is a full-stack self-driving lab (SDL) system built at the Nemitz Lab to automate soft robotic actuator fabrication. It coordinates fabrication, robot arm handoff, pneumatic testing, and ML-based curvature characterization into a single closed-loop pipeline — reducing the manual overhead of iterating on actuator designs. The system integrates a UR7e robot arm and Robotiq Hand-E gripper for automated handoff, a PostgreSQL schema for experiment tracking, and a computer vision pipeline for shadow-invariant actuator segmentation and curvature regression.",
    tech: [
      "Next.js",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "OpenCV",
    ],
    status: "shipped",
    flagship: true,
  },
  {
    slug: "applyshift",
    title: "ApplyShift",
    summary:
      "Resume tailoring web app using the Anthropic API and pdf-lib for PDF generation, built around Harvard resume template formatting.",
    description:
      "ApplyShift is a resume tailoring web app that uses the Anthropic API to rewrite resume content against a target job description, then renders the result with pdf-lib into a Harvard resume template layout — keeping formatting consistent while the content adapts per application.",
    tech: ["Next.js", "TypeScript", "Anthropic API", "pdf-lib"],
    status: "shipped",
  },
  {
    slug: "hackmit-ai-assistant",
    title: 'HackMIT "AI Assistant"',
    summary:
      "Smart-glasses aid for dementia patients combining YOLOv3 computer vision, LLM reasoning, and speech, with a knowledge-graph feedback loop.",
    description:
      "A smart-glasses assistant built for dementia patients at HackMIT, combining YOLOv3 computer vision, LLM reasoning, and speech into a single assistive loop. A knowledge-graph feedback loop improved prompt accuracy across 25+ test cases by grounding the assistant's responses in accumulated context about the patient's environment and routines.",
    tech: ["YOLOv3", "Python", "LLM", "Speech"],
    status: "shipped",
  },
  {
    slug: "white",
    title: "White",
    summary:
      "Full-stack text editor with Clerk authentication and Notion-style block editing.",
    description:
      "White is a full-stack text editor with Clerk authentication and Notion-style block editing, built on React and Next.js with a Prisma/PostgreSQL backend hosted on AWS RDS.",
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "AWS RDS",
      "Tailwind CSS",
    ],
    status: "shipped",
  },
  {
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    summary:
      "Recommendation system using SGD and a latent-factor/collaborative-filtering model, achieving 0.934 RMSE on the validation set.",
    description:
      "A movie recommendation system built around a latent-factor, collaborative-filtering model trained with stochastic gradient descent, achieving 0.934 RMSE on the validation set.",
    tech: ["Python", "scikit-learn"],
    status: "shipped",
  },
  {
    slug: "file-compression",
    title: "File Compression",
    summary:
      "Image file compressor/decompressor in C using color-space transforms and lossy compression, reducing file size by 50% while maintaining visual fidelity.",
    description:
      "An image file compressor/decompressor written in C using color-space transforms and lossy compression techniques, reducing file size by 50% while maintaining visual fidelity.",
    tech: ["C"],
    status: "shipped",
  },
];

export const featuredProjectSlugs = [
  "evofab-sdl-interface",
  "applyshift",
  "white",
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "C++",
      "C",
      "TypeScript",
      "JavaScript",
      "Java",
      "MATLAB",
      "HTML/CSS",
    ],
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js (Express)",
      "Three.js",
      "scikit-learn",
      "Prisma",
      "YOLOv3",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "Firebase", "MongoDB", "Supabase", "NeonTech"],
  },
  {
    label: "Cloud & Deploy",
    items: ["AWS", "Vercel"],
  },
  {
    label: "Tools",
    items: ["Git", "Linux", "Linear", "Clerk", "Wireshark"],
  },
];

export const research = {
  title: "Self-Driving Labs for Soft Robotics",
  status: "Shipped — unpublished",
  motivation:
    "Developing new soft robotic actuators is slow because fabrication, testing, and characterization are largely manual: a researcher casts an actuator, waits for it to cure, mounts it by hand, runs pneumatic tests, and manually estimates curvature from video or photos before deciding on the next design iteration. That loop limits how much of the design space researchers can actually explore.",
  contribution:
    "As a software researcher on this project at the Nemitz Lab, I'm building the software system — EvoFab — that closes this loop. My contribution spans the full stack: a PostgreSQL/Supabase schema for tracking experiments and design iterations, a FastAPI backend that coordinates fabrication and testing steps, integration with a UR7e robot arm and Robotiq Hand-E gripper for automated fabrication handoff, and a computer vision pipeline (OpenCV, RGB-D camera) for shadow-invariant actuator segmentation and curvature regression — replacing manual measurement with automated characterization.",
  status_detail:
    "The system is actively being developed and used in the lab for real fabrication and testing cycles. A paper describing the system and its results is in progress and has not yet been submitted or published.",
};
