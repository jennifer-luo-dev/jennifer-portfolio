import { Mail, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<null | "sending" | "ok" | "error">(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setClientError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.company
            ? `Company: ${formData.company}\n\n${formData.message}`
            : formData.message,
        }),
      });
      if (res.ok) {
        setStatus("ok");
        setClientError(null);
        setFormData({ name: "", email: "", company: "", message: "" });
        setShowPopup(true);
      } else {
        let err = "Error sending — try again later.";
        try {
          const body = await res.json();
          if (body?.error) err = String(body.error);
          else if (body?.detail) err = String(body.detail);
        } catch (e) {
          err = res.statusText || err;
        }
        console.error("Contact form error response:", res.status, err);
        setStatus(null);
        setClientError(err);
      }
    } catch {
      setStatus(null);
      setClientError("Error sending — try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              className="absolute top-4 right-4 mr-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-xl font-bold"
              aria-label="Close"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span className="font-semibold">Sent — thank you!</span>
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Your message was sent successfully. I'll get back to you soon!
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm mb-4">
            ✓ Available for new projects
          </div>
          <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help you ship
            faster.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl text-gray-900 mb-6">Get in touch</h3>

            <div className="space-y-6 mb-8">
              <a
                href="mailto:jennifer.luo@tufts.edu"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-gray-900 group-hover:text-indigo-600 transition-colors">
                    jennifer.luo@tufts.edu
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Schedule a call</div>
                  <div className="text-gray-900">Book a 30-min intro call</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <h4 className="text-lg text-gray-900 mb-2">What to expect</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Free initial consultation to discuss your project</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Detailed proposal with timeline and pricing</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Project details *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 disabled:opacity-60"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                {clientError && (
                  <div className="text-sm text-red-600 text-center">
                    {clientError}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
