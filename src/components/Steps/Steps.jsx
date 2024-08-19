import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Cpu, Download } from "lucide-react";

const Steps = () => {
  return (
    <section className="mb-16">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 gap-4">
          {[
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
              description:
                "Download your resume or share online via resume website.",
            },
          ].map((step, index) => (
            <Card
              key={index}
              className={`bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border-none
                      ${
                        index === 0 && "bg-blue-400 dark:bg-blue-600 text-white"
                      }`}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full mb-4 ${
                    index === 0
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                >
                  {index === 0 ? (
                    <span className="text-2xl font-bold">{index + 1}</span>
                  ) : (
                    <step.icon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                  )}
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 text-slate-900 dark:text-white
                        ${index === 0 && "text-white"}`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-slate-600 dark:text-slate-300 text-sm
                        ${index === 0 && "text-gray-200"}`}
                >
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-5xl font-bold mb-8 text-center">
            3 STEPS & 5 MINUTES
          </h2>
          <p className="text-center mb-8 text-slate-600 dark:text-slate-300">
            Getting that dream job can seem like an insurmountable task. We're
            here to change that. Give yourself a nice advantage with the best
            online resume maker: created by experts, improved by data, trusted
            by millions of professionals.
          </p>
          <div className="text-center mt-8">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Create Resume Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
