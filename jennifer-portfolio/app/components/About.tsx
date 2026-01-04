import { motion } from "motion/react";
import ImageWithFallback from "./images/ImageWithFallback";

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581374820531-029275791beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY3NDI0Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl text-gray-900 mb-6">
              Building products that help startups ship faster
            </h2>

            <div className="space-y-4 text-gray-700 mb-8">
              <p>
                I'm a full-stack developer specializing in rapid MVP development
                for early-stage startups. With 3+ years of experience, I've
                helped over multiple companies go from idea to production.
              </p>

              <p>
                My focus is on building scalable, production-ready applications
                that balance speed with quality. I understand the startup
                mindset — ship fast, iterate, and scale when you need to.
              </p>

              <p>
                I combine strong technical skills with product thinking to
                deliver solutions that solve real business problems, not just
                write code. Whether you need an admin dashboard, internal tool,
                or customer-facing app, I bring the experience to make it
                happen.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div>
                <div className="text-3xl text-indigo-600 mb-1">35+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl text-indigo-600 mb-1">2</div>
                <div className="text-sm text-gray-600">
                  Full-stack Websites Built for Nonprofits
                </div>
              </div>
              {/* <div>
                <div className="text-3xl text-indigo-600 mb-1">3+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl text-indigo-600 mb-1">2+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl text-indigo-600 mb-1">2+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
