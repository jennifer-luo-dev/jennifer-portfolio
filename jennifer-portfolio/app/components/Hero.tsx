import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onNavigate: (section: string) => void;
}
export function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight text-gray-900 mb-6">
              I build MVP dashboards and internal tools for startups
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Fast, scalable web applications with clean UX. Ship your product
            faster with production-ready code from day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => onNavigate("contact")}
              className="group px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30"
            >
              Work With Me
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className="px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              View Projects
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">
              Trusted by early-stage startups
            </p>
            {/* <div className="flex flex-wrap justify-center gap-8 opacity-60">
              <div className="px-6 py-2 bg-gray-100 rounded text-sm">
                Startup A
              </div>
              <div className="px-6 py-2 bg-gray-100 rounded text-sm">
                Startup B
              </div>
              <div className="px-6 py-2 bg-gray-100 rounded text-sm">
                Startup C
              </div>
              <div className="px-6 py-2 bg-gray-100 rounded text-sm">
                Startup D
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
