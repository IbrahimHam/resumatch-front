import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const ResumePreview = ({ name, title, skills }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full relative overflow-hidden">
    <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg">
      Preview
    </div>
    <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-2">
      {name}
    </h2>
    <h3 className="text-xl text-blue-700 dark:text-gray-200 mb-4">{title}</h3>
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
        Skills
      </h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-100 text-blue-800 dark:text-gray-200 dark:bg-blue-600 px-2 py-1 rounded text-sm flex items-center"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  </div>
);

const FeatureItem = ({ icon, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center space-x-2 text-gray-800 dark:text-white"
  >
    {icon}
    <span>{text}</span>
  </motion.div>
);

export default function Hero() {
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Software Engineer");
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [isSparklesVisible, setIsSparklesVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSparklesVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  return (
    <section className="flex items-center justify-center pt-6 pb-10 mb-20 px-4">
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
              Build Your Dream Resume
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-blue-400">
              with Resumatch
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-300 mb-8"
          >
            Create, customize, and perfect your resume in real-time
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg text-blue-900 shadow-lg border border-gray-500/25 dark:text-white dark:bg-slate-700 focus:outline-none"
              aria-label="Your Name"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Title"
              className="w-full px-4 py-2 rounded-lg text-blue-900 shadow-lg border border-gray-500/25 dark:text-white dark:bg-slate-700 focus:outline-none"
              aria-label="Your Title"
            />
            <form onSubmit={addSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-grow px-4 py-2 rounded-lg text-blue-900 border border-gray-500/25 shadow-lg dark:text-white dark:bg-slate-700 focus:outline-none"
                aria-label="Add a skill"
              />
              <button
                type="submit"
                className="bg-white dark:bg-blue-500 text-blue-600 dark:text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition duration-300 flex items-center shadow-lg"
              >
                Add <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 space-y-2"
          >
            <FeatureItem
              icon={<CheckCircle className="w-5 h-5 text-green-300" />}
              text="Professional Templates"
            />
            <FeatureItem
              icon={<CheckCircle className="w-5 h-5 text-green-300" />}
              text="Real-time Preview"
            />
          </motion.div>
          <AnimatePresence>
            {isSparklesVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 right-0 text-yellow-300"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${name}-${title}-${skills.join(",")}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ResumePreview name={name} title={title} skills={skills} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
