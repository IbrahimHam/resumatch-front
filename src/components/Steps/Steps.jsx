import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Cpu, Download } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    {
      icon: FileText,
      title: "1. Choose a Free Resume Template",
      description: "You've got plenty of formatting and style options.",
    },
    {
      icon: Cpu,
      title: "2. Customize the Design",
      description: "Make your own resume easily and stand out.",
    },
    {
      icon: Download,
      title: "3. Share as PDF or Web",
      description: "Download your resume or share online via resume website.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section ref={ref} className="mb-16">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="grid grid-cols-1 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border-none
                ${
                  index === activeStep &&
                  "bg-blue-400 dark:bg-blue-600 text-white"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <motion.div
                    className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
                      index === activeStep
                        ? "bg-blue-600 dark:bg-blue-500 text-white"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index === activeStep ? (
                      <span className="text-2xl font-bold">{index + 1}</span>
                    ) : (
                      <step.icon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                    )}
                  </motion.div>
                  <h3
                    className={`text-xl font-semibold mb-2 text-slate-900 dark:text-white
                    ${index === activeStep && "text-white"}`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-slate-600 dark:text-slate-300 text-sm
                    ${index === activeStep && "text-gray-100"}`}
                  >
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="flex flex-col justify-center items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h2
            className="text-5xl font-bold mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            3 STEPS & 5 MINUTES
          </motion.h2>
          <motion.p
            className="text-center mb-8 text-slate-600 dark:text-slate-300"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.9 }}
          >
            Getting that dream job can seem like an insurmountable task. We're
            here to change that. Give yourself a nice advantage with the best
            online resume maker: created by experts, improved by data, trusted
            by millions of professionals.
          </motion.p>
          <motion.div
            className="text-center mt-8"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Create Resume Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;
