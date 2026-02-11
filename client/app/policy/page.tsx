"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiShield,
  FiCpu,
  FiDatabase,
  FiEye,
  FiLock,
  FiGlobe,
  FiAlertTriangle,
} from "react-icons/fi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain } from "react-icons/tb";

const TermsAndPrivacy = () => {
  const [activeSection, setActiveSection] = useState<"terms" | "privacy">(
    "terms",
  );
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "ai-learning",
  );

  const sections = [
    {
      id: "ai-learning",
      title: "AI Learning & Model Training",
      icon: <TbBrain className="text-xl" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <GiArtificialIntelligence className="text-yellow-400 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">
                  Important Notice: AI Training Data
                </h4>
                <p className="text-sm">
                  XBLT&apos;s AI models continuously learn from user
                  interactions and website creation processes to improve
                  performance and accuracy.
                </p>
              </div>
            </div>
          </div>

          <p>
            <strong>By using XBLT, you acknowledge and agree that:</strong>
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Anonymized Data Collection:</strong> Your website design
                choices, layout patterns, content structures, and user
                interactions may be collected in anonymized, aggregated form for
                AI training purposes.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Pattern Recognition:</strong> Our AI systems analyze
                design patterns, color schemes, typography choices, and user
                preferences to improve future website recommendations and
                generation quality.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Mistake Analysis:</strong> When AI makes errors in
                website generation or suggestions, these instances are studied
                to enhance model accuracy. This includes analyzing incorrect
                design placements, layout inconsistencies, and suboptimal code
                generation.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Model Improvement:</strong> Your interactions help train
                Large Language Models (LLMs) and neural networks to better
                understand web design principles, user intent, and aesthetic
                preferences.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Feature Development:</strong> Usage patterns inform new
                feature development and optimization of existing tools within
                the XBLT platform.
              </span>
            </li>
          </ul>

          <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-300 mb-2">
              What We Don&apos;t Collect:
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FiLock className="text-green-400" />
                <span>
                  Personal identifiable information (PII) in training data
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiLock className="text-green-400" />
                <span>Sensitive website content or private user data</span>
              </li>
              <li className="flex items-center gap-2">
                <FiLock className="text-green-400" />
                <span>Client or customer information from your websites</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "data-usage",
      title: "Data Usage & Processing",
      icon: <FiDatabase className="text-xl" />,
      content: (
        <div className="space-y-4">
          <p>
            XBLT processes data through multiple AI systems to provide our
            services:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-3">
                AI Systems Used
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Computer Vision Models (Layout analysis)</li>
                <li>• Natural Language Processing (Content generation)</li>
                <li>• Generative Adversarial Networks (Design creation)</li>
                <li>• Reinforcement Learning (Optimization)</li>
                <li>• Transformers (Code generation)</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-3">
                Data Processing
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Real-time design suggestions</li>
                <li>• Pattern recognition algorithms</li>
                <li>• Predictive modeling</li>
                <li>• Quality assessment</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
          </div>

          <p>
            All AI processing occurs in secure cloud environments with
            encryption and access controls. Training data is periodically
            refreshed and outdated models are deprecated.
          </p>
        </div>
      ),
    },
    {
      id: "user-rights",
      title: "Your Rights & Controls",
      icon: <FiShield className="text-xl" />,
      content: (
        <div className="space-y-4">
          <p>You maintain control over your data and AI interactions:</p>

          <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <h4 className="font-semibold text-yellow-400 mb-3">
              Control Options
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Opt-out of AI training data collection</span>
                <div className="w-10 h-6 bg-gray-700 rounded-full relative">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full absolute top-1 right-1"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Request data deletion from training sets</span>
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Request
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Export your anonymized training contributions</span>
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Export
                </button>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Control settings can be adjusted in your account dashboard under
            &quot;AI Preferences&quot; section.
          </p>
        </div>
      ),
    },
    {
      id: "transparency",
      title: "Transparency & Disclosure",
      icon: <FiEye className="text-xl" />,
      content: (
        <div className="space-y-4">
          <p>XBLT is committed to transparency about our AI systems:</p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Model Cards:</strong> We provide documentation on AI
                model capabilities, limitations, and intended uses.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Bias Disclosure:</strong> We acknowledge that AI systems
                may inherit biases from training data and actively work to
                mitigate them.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Error Reporting:</strong> Users can report AI errors,
                which are reviewed for model improvement.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <span>
                <strong>Regular Audits:</strong> Our AI systems undergo regular
                ethical and performance audits.
              </span>
            </li>
          </ul>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="text-yellow-400 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-400 mb-1">
                  AI Limitations
                </h4>
                <p className="text-sm">
                  While our AI is powerful, it may occasionally produce errors.
                  Always review generated content and code before publishing.
                  XBLT is not liable for AI-generated content that violates laws
                  or regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "compliance",
      title: "Compliance & Security",
      icon: <FiGlobe className="text-xl" />,
      content: (
        <div className="space-y-4">
          <p>XBLT complies with major data protection regulations:</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Compliance</div>
              <div className="font-semibold text-yellow-400">GDPR</div>
            </div>
            <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Compliance</div>
              <div className="font-semibold text-yellow-400">CCPA</div>
            </div>
            <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Compliance</div>
              <div className="font-semibold text-yellow-400">PIPEDA</div>
            </div>
            <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Standard</div>
              <div className="font-semibold text-yellow-400">ISO 27001</div>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Our AI training processes incorporate Privacy by Design principles
            and data minimization strategies. All training data is pseudonymized
            and aggregated to prevent individual identification.
          </p>
        </div>
      ),
    },
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-black via-black-900/20 to-black"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

        {/* Animated AI Nodes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-yellow-500 to-yellow-300 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">X</span>
              </div>
              <h1 className="text-5xl font-bold bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent tracking-wider">
                XBLT
              </h1>
            </div>
            <p className="text-gray-400 text-lg mb-2">
              AI-Powered Website Builder
            </p>
            <h2 className="text-3xl font-bold text-white">
              AI Transparency & Data Policies
            </h2>
            <p className="text-yellow-500/80 text-sm mt-2 font-mono">
              Building Trust Through Transparency
            </p>
          </motion.div>

          {/* Toggle Section */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-gray-900/50 border border-gray-700 p-1">
              <button
                onClick={() => setActiveSection("terms")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === "terms"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveSection("privacy")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === "privacy"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-gray-900/30 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-6 md:p-8">
            {/* AI Learning Banner */}
            <div className="mb-8 p-6 bg-linear-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-4">
                <GiArtificialIntelligence className="text-3xl text-yellow-400 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">
                    AI Learning Disclosure
                  </h3>
                  <p className="text-gray-300">
                    XBLT&apos;s artificial intelligence systems learn from
                    aggregated, anonymized user interactions to improve website
                    generation quality. This includes analysis of successful
                    designs, common patterns, and correction of errors to
                    enhance future performance.
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Anonymized Data Only
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Opt-out Available
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      GDPR Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={false}
                  className="border border-gray-700 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full p-6 text-left flex items-center justify-between bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-yellow-400">{section.icon}</div>
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                    </div>
                    <motion.div
                      animate={{
                        rotate: openAccordion === section.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openAccordion === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0">
                          <div className="pt-6 border-t border-gray-700">
                            {section.content}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* LLM Specific Disclosure */}
            <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FiCpu />
                Large Language Model (LLM) Operations
              </h3>
              <div className="space-y-4">
                <p>
                  XBLT utilizes advanced LLMs for content generation, code
                  creation, and design suggestions. These models operate under
                  the following principles:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">
                      Training Phase
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Models learn from vast web design datasets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Continuous fine-tuning with user feedback</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>
                          Error correction through reinforcement learning
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">
                      Inference Phase
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Real-time website generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Context-aware design suggestions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Adaptive learning from user preferences</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">
                    Important Notice
                  </h4>
                  <p className="text-sm">
                    LLMs may occasionally generate inaccurate or inappropriate
                    content. All AI-generated output should be reviewed by
                    humans before deployment. XBLT implements content filters
                    and safety measures, but ultimate responsibility for
                    published content lies with the user.
                  </p>
                </div>
              </div>
            </div>

            {/* Acceptance Section */}
            <div className="mt-8 p-6 bg-linear-to-r from-black via-gray-900 to-black border border-yellow-500/30 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Acceptance of Terms
                  </h3>
                  <p className="text-gray-400 text-sm">
                    By using XBLT, you acknowledge our AI learning practices and
                    data policies
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors">
                    Download PDF
                  </button>
                  <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors">
                    I Understand
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500">
                <p>Last Updated: {new Date().toLocaleDateString()}</p>
                <p>Version: 2.1 | AI Transparency Framework Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
