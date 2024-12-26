"use client";

import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import React from "react";

const Testimonials = () => {
    return (
        <div className="w-full bg-background dark:bg-neutral-950 font-sans md:px-10 py-20 pb-72 " >

            <div className="max-w-7xl mx-auto py-20 md:px-8">
                <h2 className="text-2xl md:text-7xl font-bold text-surface-foreground dark:text-surface-foreground">
                    What Our Users Are Saying
                </h2>
                <p className="max-w-2xl text-base md:text-xl mt-8 text-surface-foreground dark:text-neutral-200">
                    Don’t just take our word for it! See how FableFrame is helping people from all walks of life create magical stories. Hear from our happy users and their experiences
                </p>
            </div>

            <div className="h-fit rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    );
}

export default Testimonials;

const testimonials = [
    {
        quote: "FableFrame has been a game-changer for my classroom! The personalized stories have helped engage my students, making reading fun and interactive. I love how easy it is to use and the stories are always a hit!",
        name: "Sarah L.",
        title: "Educator",
    },
    {
        quote: "I can't believe how quickly my kids are able to create their own stories! FableFrame lets them explore their imagination and share their creations with family. It's been a fantastic tool for both fun and learning.",
        name: "John M.",
        title: "Parent",
    },
    {
        quote: "I’ve always loved writing but never had the time to start. FableFrame made it easy to create short stories quickly, and it’s been an amazing tool for my creative process!",
        name: "Emma P.",
        title: "Aspiring Author",
    },
    {
        quote: "As a professional writer, FableFrame has been an invaluable resource. The platform's intuitive design and rich features have significantly enhanced my productivity and creativity.",
        name: "Michael B.",
        title: "Professional Writer",
    },
    {
        quote: "FableFrame is a wonderful tool for anyone looking to dive into storytelling. The user-friendly interface and diverse story templates have made it my go-to app for writing.",
        name: "Lisa K.",
        title: "Story Enthusiast",
    }
];
