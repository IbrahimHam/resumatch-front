import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqAccordion = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg"
      >
        {[
          {
            question: "How do I get started?",
            answer:
              "Simply click on the 'Build My Resume' button and follow the easy steps to create your professional resume.",
          },
          {
            question: "Is it really free?",
            answer:
              "Yes, our basic service is completely free. We also offer premium features for those who want even more from their resume.",
          },
          {
            question: "Can I update my resume later?",
            answer:
              "Absolutely! You can log in anytime to update your resume with new experiences or skills.",
          },
          {
            question: "What formats can I download my resume in?",
            answer:
              "We offer downloads in PDF, DOCX, and plain text formats to suit all your application needs.",
          },
        ].map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 px-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-300 px-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqAccordion;
