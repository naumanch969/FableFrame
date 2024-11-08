"use client";
import React, { ReactNode } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger, } from "./aceternity/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { Story } from "@/types";
import { Carousel } from "./aceternity/apple-cards-carousel";
import StoryLikeButton from "./StoryLikeButton";
import StoryShareButton from "./StoryShareButton";


const ActiveStoryModal = ({ story, children }: { story: Story | null, children: ReactNode }) => {


    if (!story) return null

    const chapters = (story as Story)?.chapters?.map((chapter, index) => (
        <Chapter key={index} chapter={chapter} />
    ))

    const cards = [
        // @ts-ignore
        <CoverCard story={story} />,
        ...chapters,
        <EndCard />
    ]

    return (
        <Modal>
            <ModalTrigger className='text-surface-foreground w-full text-left' >
                {children}
            </ModalTrigger>
            <ModalBody>
                <ModalContent className='' >

                    <Carousel items={cards} />

                </ModalContent>
            </ModalBody>
        </Modal>
    );
}

export default ActiveStoryModal;

export const CoverCard = ({ story }: { story: Story }) => {

    return (
        <motion.div layoutId={undefined} className="rounded-3xl bg-popover h-80 w-56 md:h-[33rem] overflow-y-auto md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"  >

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
                    <motion.h3 className="font-semibold text-surface-foreground dark:text-neutral-200 text-2xl" >
                        {story?.title}
                    </motion.h3>
                    <motion.p className="text-neutral-600 dark:text-neutral-400 text-sm">
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
                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
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
            <motion.div layoutId={undefined} className="rounded-3xl bg-popover h-80 w-56 md:h-[33rem] overflow-y-auto md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10"  >
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

                <div className="relative z-40 p-8 flex justify-center items-center ">
                    <h2 className="text-4xl font-bold text-surface-foreground">The End</h2>
                </div>

            </motion.div>
        </>
    );
};

export const Chapter = ({ chapter }: { chapter: { title: string, text: string, image: { url: string, style: string, prompt: string } }; }) => {

    return (
        <motion.div className="rounded-3xl bg-popover h-80 w-56 md:h-[33rem] overflow-y-auto md:w-96 flex flex-col items-start justify-start relative z-10">

            <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

            <div className="relative z-40 p-8 w-full ">
                <motion.div layoutId={`image-${chapter?.image}-${chapter?.title}`}>
                    <Image
                        priority
                        width={200}
                        height={200}
                        src={chapter?.image?.url || '/sample_cover_image.jpeg'}
                        alt={chapter?.title}
                        className="w-full h-80 lg:h-64 rounded-2xl object-cover object-top"
                    />
                </motion.div>
                <motion.p className="text-surface-foreground text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-3">
                    {chapter?.title}
                </motion.p>
                <motion.p className="text-surface-foreground text-base font-light text-left mt-2">
                    {chapter?.text} {chapter?.text} {chapter?.text}
                </motion.p>
            </div>

        </motion.div>
    );
};
