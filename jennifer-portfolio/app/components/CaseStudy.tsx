import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import ImageWithFallback from "./images/ImageWithFallback";

interface CaseStudyProps {
  projectId: string;
  onBack: () => void;
  onNavigate: (section: string) => void;
}

const projectData: Record<string, any> = {
  "inventory-platform": {
    title: "Internal Inventory & Search Platform",
    client: "English at Large",
    timeline: "8 weeks",
    role: "Full-Stack Developer",
    overview:
      "Built a full-stack dashboard with advanced search, user authentication, borrowing workflows, and filtering tools, streamlining book management and improving accessibility for volunteers.",
    problem: {
      title: "The Challenge",
      description:
        "The client relied on manual tracking of books for their volunteer tutors, making it difficult to manage availability and user activity. This resulted in:",
      points: [
        "Frequent inventory discrepancies and stockouts",
        "No real-time visibility into available resources",
        "Manual, time-consuming search processes",
        "Difficulty providing user-specific resources",
        "No way of keeping track of current inventory ownership",
      ],
    },
    solution: {
      title: "The Solution",
      description:
        "Built a full-stack web app to simplify resource management with:",
      points: [
        "Real-time inventory tracking across users",
        "Advanced search and filtering by category, status, and attributes",
        "Role-based permissions for admins and contributors",
        "User management for team organization",
        "Streamlined borrowing and assignment workflows",
        "Activity logging to track usage and maintain accountability",
      ],
    },
    features: [
      {
        title: "Advanced Search & Filtering",
        description:
          "Designed a search interface with multi-criteria filters, enabling users to quickly find books by category, availability, or reading level.",
      },
      {
        title: "Efficient Bulk Actions",
        description:
          "Allowed admins to manage multiple books and user records at once, simplifying inventory updates and volunteer management.",
      },
      {
        title: "Real-time Updates",
        description:
          "Implemented live syncing so all users see the latest book availability and borrowing activity instantly.",
      },
      {
        title: "Role-based Permissions",
        description:
          "Built a flexible permissions system giving admins, tutors, and volunteers the appropriate access to manage resources and workflows.",
      },
    ],
    techStack: [
      { name: "Next.js", description: "App Router, Server Components" },
      {
        name: "PostgreSQL",
        description: "Primary database with optimized indexes",
      },
      { name: "Prisma", description: "Type-safe ORM with migrations" },
      { name: "Tailwind CSS", description: "Utility-first styling" },
      { name: "React Query", description: "Server state management" },
      { name: "Zod", description: "Schema validation" },
    ],
    results: [
      {
        metric: "85%",
        description: "Reduction in time spent searching for items",
      },
      { metric: "60%", description: "Fewer inventory discrepancies" },
      { metric: "3x", description: "Faster onboarding for new team members" },
      { metric: "100%", description: "Audit trail coverage for compliance" },
    ],
    images: [
      "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY3Mzc4MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY3Mzc4MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  "collaborative-editor": {
    title: "Real-time Collaborative Editor",
    client: "SaaS Platform (Seed Stage)",
    timeline: "10 weeks",
    role: "Full-Stack Developer",
    overview:
      "Developed a Google Docs-style collaborative editing experience for a product documentation platform with conflict-free real-time collaboration.",
    problem: {
      title: "The Challenge",
      description:
        "The client needed a collaborative editing solution for their documentation platform that would allow multiple team members to work simultaneously without conflicts. Key challenges included:",
      points: [
        "Prevent editing conflicts when multiple users edit the same document",
        "Provide real-time updates with minimal latency",
        "Show user presence and cursor positions",
        "Maintain complete version history",
        "Support rich text formatting and comments",
        "Scale to handle hundreds of concurrent users",
      ],
    },
    solution: {
      title: "The Solution",
      description:
        "Implemented a real-time collaborative editor using CRDTs (Conflict-free Replicated Data Types) and WebSockets:",
      points: [
        "Yjs for CRDT-based conflict-free collaboration",
        "WebSocket server for real-time synchronization",
        "Custom rich text editor built on ProseMirror",
        "User presence system with cursor tracking",
        "Complete version history with diff visualization",
        "Comment threads with real-time notifications",
        "Optimized for 100+ concurrent users per document",
      ],
    },
    features: [
      {
        title: "Conflict-free Collaboration",
        description:
          "Using CRDTs (Yjs), multiple users can edit simultaneously without conflicts or the need for locking mechanisms.",
      },
      {
        title: "Real-time Presence",
        description:
          "See who's viewing and editing in real-time with live cursor positions and user avatars.",
      },
      {
        title: "Version History",
        description:
          "Complete revision history with the ability to view, compare, and restore previous versions.",
      },
      {
        title: "Rich Commenting",
        description:
          "Thread-based comments with mentions, real-time notifications, and resolve/unresolve functionality.",
      },
    ],
    techStack: [
      { name: "Next.js 14", description: "Frontend and API routes" },
      { name: "WebSockets", description: "Real-time communication" },
      { name: "Yjs", description: "CRDT library for conflict resolution" },
      { name: "ProseMirror", description: "Rich text editing framework" },
      { name: "PostgreSQL", description: "Document storage and history" },
      { name: "Tailwind CSS", description: "UI styling" },
    ],
    results: [
      { metric: "<100ms", description: "Average synchronization latency" },
      { metric: "0", description: "Edit conflicts reported" },
      { metric: "5x", description: "Faster document collaboration" },
      {
        metric: "100+",
        description: "Concurrent users supported per document",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1664943861653-609134fb6b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWJvcmF0aXZlJTIwd29ya3NwYWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njc0NjY4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1664943861653-609134fb6b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWJvcmF0aXZlJTIwd29ya3NwYWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njc0NjY4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
};

export function CaseStudy({ projectId, onBack, onNavigate }: CaseStudyProps) {
  const project = projectData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Project not found</h2>
          <button
            onClick={onBack}
            className="text-indigo-600 hover:text-indigo-700"
          >
            ← Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to projects
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl text-gray-900 mt-10 mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{project.overview}</p>
            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
              <div>
                <div className="text-sm text-gray-500 mb-1">Client</div>
                <div className="text-gray-900">{project.client}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Timeline</div>
                <div className="text-gray-900">{project.timeline}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Role</div>
                <div className="text-gray-900">{project.role}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-gray-900 mb-4">
            {project.problem.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {project.problem.description}
          </p>
          <ul className="space-y-3">
            {project.problem.points.map((point: string) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-gray-900 mb-4">
            {project.solution.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {project.solution.description}
          </p>
          <ul className="space-y-3">
            {project.solution.points.map((point: string) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-gray-900 mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.features.map((feature: any) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
              >
                <h3 className="text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-gray-900 mb-8">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.techStack.map((tech: any) => (
              <div
                key={tech.name}
                className="p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="text-lg text-gray-900 mb-1">{tech.name}</div>
                <div className="text-sm text-gray-600">{tech.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-white mb-12 text-center">Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.results.map((result: any) => (
              <div key={result.description} className="text-center">
                <div className="text-5xl text-white mb-2">{result.metric}</div>
                <div className="text-indigo-100">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl text-gray-900 mb-6">
            Ready to build something similar?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how I can help bring your project to life
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="group px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30"
          >
            Start a Project
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>
    </div>
  );
}
