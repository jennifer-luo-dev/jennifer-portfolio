import { motion } from "motion/react";

const technologies = [
  { name: "Next.js", category: "Frontend Framework" },
  { name: "React", category: "UI Library" },
  { name: "TypeScript", category: "Language" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Supabase", category: "Backend Platform" },
  { name: "Vercel", category: "Deployment" },
  { name: "Node.js", category: "Runtime" },
  { name: "Git", category: "Version Control" },
  { name: "WebSockets", category: "Real-time" },
  { name: "REST & GraphQL", category: "APIs" },
];

export function TechStack() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Tech Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern, production-tested technologies for building scalable
            applications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <div className="text-lg text-gray-900 mb-1">{tech.name}</div>
              <div className="text-sm text-gray-500">{tech.category}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            And many more tools and libraries as needed for your project
          </p>
        </motion.div>
      </div>
    </section>
  );
}
