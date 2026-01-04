import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-xl text-white mb-4">Jennifer Luo</div>
            <p className="text-sm">
              Full-stack developer building MVPs and internal tools for
              startups.
            </p>
          </div>

          <div>
            <div className="text-white mb-4">Quick Links</div>
            <div className="space-y-2 text-sm">
              <div>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </div>
              <div>
                <a
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </a>
              </div>
              <div>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </div>
              <div>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="text-white mb-4">Connect</div>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-center">
          <p>© 2026 Jennifer Luo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
