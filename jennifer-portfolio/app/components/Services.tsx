import { Zap, Boxes, Lock } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Zap,
    title: "MVP & Dashboard Development",
    description:
      "Ship your product faster with production-ready dashboards built on Next.js and PostgreSQL. From concept to launch in weeks, not months.",
    features: [
      "Data visualization",
      "Real-time updates",
      "Responsive design",
      "Performance optimized",
    ],
  },
  {
    icon: Boxes,
    title: "Admin Panels & Internal Tools",
    description:
      "Powerful admin interfaces that scale with your team. Streamline operations with custom tools built for your exact workflow.",
    features: [
      "CRUD operations",
      "Role-based access",
      "Bulk actions",
      "CSV exports",
    ],
  },
  {
    icon: Lock,
    title: "Auth, CRUD & Database-Backed Apps",
    description:
      "Secure, scalable applications with robust authentication, complex filtering, and database architecture designed for growth.",
    features: [
      "User authentication",
      "Advanced filtering",
      "Database optimization",
      "API integration",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            What I Build
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Full-stack solutions designed to help startups move fast and scale
            smart
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
