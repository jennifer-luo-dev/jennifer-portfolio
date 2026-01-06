import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import ImageWithFallback from "./images/ImageWithFallback";

interface ProjectsProps {
  onViewCaseStudy: (projectId: string) => void;
}

const projects = [
  {
    id: "inventory-platform",
    title: "Internal Inventory & Search Platform",
    problem:
      "English at Large relied on manual tracking of books for their volunteer tutors, making it difficult to manage availability and user activity.",
    solution:
      "Built a full-stack dashboard with advanced search, user authentication, borrowing workflows, and filtering tools, streamlining book management and improving accessibility for volunteers.",
    features: [
      "Real-time inventory tracking",
      "Advanced filtering and search",
      "Role-based permissions",
      "Assignment workflows",
      "Activity logging",
      "User management",
    ],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS", "React"],
    image:
      "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY3Mzc4MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "white-collaborative-editor",
    title: "Real-time Collaborative Editor",
    problem:
      "Many teams need a fast, reliable way to collaborate on documents in real time without conflicts or data loss.",
    solution:
      "Built a Google Docs–style collaborative editor using CRDTs and WebSockets to enable seamless, conflict-free editing across multiple users.",
    features: [
      "Real-time multi-user collaboration",
      "Conflict-free editing using CRDTs",
      "Live cursor and presence indicators",
      "Persistent document storage",
      "Authentication and access control",
      "Rich text editing with structured formatting",
    ],
    techStack: [
      "Next.js",
      "Yjs (CRDTs)",
      "WebSockets",
      "Node.js / Express",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Clerk Auth",
      "Supabase Storage",
    ],
    image:
      "https://images.unsplash.com/photo-1664943861653-609134fb6b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWJvcmF0aXZlJTIwd29ya3NwYWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njc0NjY4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Projects({ onViewCaseStudy }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-world solutions built for fast-growing startups
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl text-gray-900 mb-4">{project.title}</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Problem</p>
                    <p className="text-gray-700">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Solution</p>
                    <p className="text-gray-700">{project.solution}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-3">Key Features</p>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.slice(0, 4).map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onViewCaseStudy(project.id)}
                  className="group flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  View Case Study
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
