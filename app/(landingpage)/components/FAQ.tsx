"use client";

import { SparklesCore } from "@/components/aceternity/sparkles";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

const FAQ = () => {
  return (
    <div className="w-full relative bg-surface font-sans md:px-10 py-40 flex flex-col items-center">

      <div className="max-w-7xl w-full pb-20 md:px-8">
        <h2 className="text-2xl md:text-7xl font-bold text-surface-foreground dark:text-surface-foreground">
          Frequently Asked Questions
        </h2>
        <p className="max-w-2xl text-base md:text-xl mt-8 text-surface-foreground ">
          Have questions about FableFrame? We’ve got answers! Check out some of the most common questions below.
        </p>
      </div>

      <div className="max-w-7xl w-full h-fit rounded-md flex flex-col antialiased dark:bg-neutral items-center justify-center relative overflow-hidden">
        <Accordion type="single" collapsible className="w-full" >
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index} w-full`}>
              <AccordionTrigger className="text-lg md:text-xl font-medium text-surface-foreground dark:text-surface-foreground py-4 px-8 rounded-md">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-neutral-foreground py-4 px-8">
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
    question: "Is FableFrame suitable for all ages?",
    answer: "Absolutely! Whether you’re a child, parent, teacher, or aspiring writer, FableFrame caters to all ages and skill levels, offering both fun and educational experiences."
  },
  {
    question: "Can I share my stories with others?",
    answer: "Yes! FableFrame allows you to share your stories with friends, family, or colleagues. Shared stories will appear in the chat of the respective user, making it easy to collaborate and enjoy together."
  },
  {
    question: "What are the available plans for FableFrame?",
    answer: "FableFrame offers Pro and Unlimited plans. The Pro plan gives access to advanced features, while the Unlimited plan allows you to create and explore as many stories as you want without limits."
  },
  {
    question: "What genres of stories can I create?",
    answer: "FableFrame supports a wide range of genres, including fantasy, adventure, romance, mystery, horror, and more. Choose the genre that inspires you and start creating!"
  },
  {
    question: "What makes FableFrame unique?",
    answer: "FableFrame combines AI-driven creativity with user input, enabling you to craft personalized and meaningful stories quickly. It’s designed to be intuitive, versatile, and enjoyable for all users."
  },
  // {
  //   question: "How does story sharing work?",
  //   answer: "When you share a story, it appears directly in the chat of the user you shared it with. They can view, comment, and even collaborate on the story with you!"
  // },
  // {
  //   question: "Can I edit a story after it's created?",
  //   answer: "Yes! After generating a story, you can edit the content to make it more personal or fine-tune the details before saving or sharing it."
  // },
];
