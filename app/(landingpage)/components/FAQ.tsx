"use client";

import { SparklesCore } from "@/components/aceternity/sparkles";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

const FAQ = () => {
  return (
    <div className="w-full relative bg-neutral-100 dark:bg-neutral-950 font-sans md:px-10 py-40 flex flex-col items-center">

      <div className="max-w-7xl w-full pb-20 md:px-8">
        <h2 className="text-2xl md:text-7xl font-bold text-neutral-700 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-700 dark:text-neutral-200">
          Have questions about FableFrame? We’ve got answers! Check out some of the most common questions below.
        </p>
      </div>

      <div className="max-w-7xl w-full h-fit rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <Accordion type="single" collapsible className="w-full" >
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index} w-full`}>
              <AccordionTrigger className="text-lg md:text-xl font-medium text-neutral-700 dark:text-white py-4 px-8 rounded-md">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 py-4 px-8">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;

const faqItems = [
  {
    question: "What is FableFrame?",
    answer: "FableFrame is an AI-driven storytelling platform designed to help individuals of all ages craft magical and personalized stories quickly. It’s a fun and engaging tool that allows you to create stories in minutes."
  },
  {
    question: "How do I create a story?",
    answer: "To create a story, simply input a description, choose a genre, and let FableFrame generate a unique story for you. You can edit, save, and share your stories with friends and family!"
  },
  {
    question: "Can I customize the stories?",
    answer: "Yes! FableFrame allows you to customize various aspects of your story, including character names, settings, and plot elements to suit your preferences."
  },
  {
    question: "Is FableFrame suitable for all ages?",
    answer: "Absolutely! Whether you’re a child, parent, teacher, or aspiring writer, FableFrame caters to all ages and skill levels, offering both fun and educational experiences."
  },
  {
    question: "How can I share my stories?",
    answer: "You can easily share your stories by generating a unique link, sending it to others, or posting it on social media. FableFrame also allows you to save your stories to your profile for later editing or sharing."
  }
];
