import React from "react";
import Steps from "@/components/Steps/Steps";
import FaqAccordion from "@/components/Accordion/FaqAccordion";
import ReviewCards from "@/components/Cards/ReviewCards";

const Home = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-8 mt-16">
        <Steps />
        <ReviewCards />
        <FaqAccordion />
      </main>
    </>
  );
};

export default Home;
