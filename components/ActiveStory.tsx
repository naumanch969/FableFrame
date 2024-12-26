"use client";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Story } from "@/types";
import { Carousel } from "./aceternity/apple-cards-carousel";
import StoryLikeButton from "./StoryLikeButton";
import StoryShareButton from "./StoryShareButton";


export const ActiveStory = ({ story, ref, id }: { story: Story | null, ref: any, id: any }) => {

    if (!story) return null

    const chapters = (story as Story)?.chapters?.map((chapter, index) => (
        <Chapter key={index} chapter={chapter} />
    ))

    const cards = [
        // @ts-ignore
        <CoverCard story={story} id={id} />,
        ...chapters,
        <EndCard />
    ]

    return (
        <>
            <AnimatePresence>
                {story && typeof story === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                <div className="fixed inset-0 grid place-items-center z-[100]">
                    <motion.div
                        layoutId={`card-${story?.title}-${id}`}
                        ref={ref}
                        className="w-full max-w-3xl h-full md:h-fit md:max-h-[90%] pb-6 flex flex-col bg-surface dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                    >
                        <Carousel items={cards} />
                    </motion.div>
                </div>
            </AnimatePresence>
        </>
    )
}

export default ActiveStory;

export const CoverCard = ({ story, id }: { story: Story, id: any }) => {

    return (
        <motion.div layoutId={undefined} className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] overflow-y-auto md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"  >

            <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

            <Image
                priority
                width={200}
                height={200}
                src={story?.cover_image || '/sample_cover_image.jpeg'}
                alt={story?.title}
                className="w-full h-80 lg:h-96 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
            />

            <div className="flex flex-col justify-between items-start p-4 w-full">

                <div className="">
                    <motion.h3
                        layoutId={`title-${story?.title}-${id}`}
                        className="font-medium text-neutral-800 dark:text-neutral-200 text-xl"
                    >
                        {story?.title}
                    </motion.h3>
                    <motion.p
                        layoutId={`description-${story?.chapters?.[0]?.title}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                        <span className="">{story?.chapters?.length} chapters</span>
                        <span className="font-bold px-1">.</span>
                        <span className="">{story?.reading_time} mins read</span>

                    </motion.p>
                </div>

                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between gap-1 mt-4 mb-6 w-full"
                >
                    {
                        story?.chapters?.map((chapter, index) => (
                            <div key={index} className="flex gap-1">
                                <motion.div
                                    layout
                                    className="flex items-center justify-center w-6 h-6 rounded-full text-sm bg-gray-200 dark:bg-neutral-800"
                                >
                                    {index + 1}
                                </motion.div>
                                {chapter?.title}
                            </div>
                        ))
                    }
                </motion.div>

                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-1">
                        <StoryLikeButton story={story} />
                        <StoryShareButton story={story} />
                    </div>

                    <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={'/explore/' + story?._id}
                        target="_blank"
                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-surface-foreground"
                    >
                        Explore
                    </motion.a>
                </div>
            </div>

        </motion.div>
    );
};


export const EndCard = () => {

    return (
        <>
            <motion.div layoutId={undefined} className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] overflow-y-auto md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10"  >
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

                <div className="relative z-40 p-8 flex justify-center items-center ">
                    <h2 className="text-4xl font-bold text-neutral-700">The End</h2>
                </div>

            </motion.div>
        </>
    );
};

export const Chapter = ({ chapter }: { chapter: { title: string, text: string, image: string }; }) => {

    return (
        <motion.div className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] overflow-y-auto md:w-96 flex flex-col items-start justify-start relative z-10">

            <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

            <div className="relative z-40 p-8 w-full ">
                <motion.div layoutId={`image-${chapter?.image}-${chapter?.title}`}>
                    <Image
                        priority
                        width={200}
                        height={200}
                        src={'/sample_cover_image.jpeg'}
                        alt={chapter?.title}
                        className="w-full h-80 lg:h-64 rounded-2xl object-cover object-top"
                    />
                </motion.div>
                <motion.p className="text-neutral-700 text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-3">
                    {chapter?.title}
                </motion.p>
                <motion.p className="text-neutral-700 text-base font-light text-left mt-2">
                    {chapter?.text} {chapter?.text} {chapter?.text}
                </motion.p>
            </div>

        </motion.div>
    );
};
