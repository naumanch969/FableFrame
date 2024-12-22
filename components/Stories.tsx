"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Story } from "@/types";
import { Card } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search } from "lucide-react";
import Heading from "./Heading";
import ActiveStory from "./ActiveStory";
import StoryLikeButton from "./StoryLikeButton";
import StoryShareButton from "./StoryShareButton";
import Empty from "./Empty";

const Stories = ({ data }: { data: Story[] }) => {

    ///////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    ///////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
    const [stories, setStories] = useState(data);
    const [active, setActive] = useState<Story | null>(null);
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    ///////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
    useEffect(() => {
        onSearch()
    }, [data, searchQuery])
    ///////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
    const onSearch = () => {
        if (searchQuery) {
            const filtered = data?.filter(story =>
                story?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                story?.author?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
            )
            setStories(filtered)
        } else {
            setStories(data)
        }
    }

    ///////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
    return (
        <>
            <ActiveStory
                story={active}
                id={id}
                ref={ref}
            />

            <div className="flex flex-col gap-4">

                {/* Search */}
                <div className="flex justify-between items-end gap-2">
                    <Heading title="Stories" size="large" />
                    <div className="flex justify-end items-center gap-2">
                        <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="sticky">
                            <input
                                type="text"
                                className="w-96 rounded-xl border border-stroke py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                                placeholder="Search stories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyUp={(e) => { e.preventDefault(); onSearch(); }}
                            />
                            <button type="button" title="Search" className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Search />
                            </button>
                        </form>

                        {/* <div className="flex justify-end items-center gap-1">
                            <Button variant='ghost' size='icon' ><Grid /></Button>
                        </div> */}
                    </div>
                </div>

                <ul className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
                    {
                        stories?.length == 0 &&
                        <div className="col-span-3 pt-12">
                            <Empty />
                        </div>
                    }
                    {
                        stories?.map((story, index) => (
                            <Card key={index} className="bg-card p-4 flex flex-col justify-between gap-1.5 h-full hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl" >

                                <motion.div
                                    layoutId={`card-${story.title}-${id}`}
                                    onClick={() => setActive(story)}
                                    className="flex flex-col gap-4 justify-between cursor-pointer"
                                >
                                    <div className="flex gap-1 flex-col justify-start w-full">
                                        <motion.div layoutId={`image-${story.title}-${id}`}>
                                            <Image
                                                width={100}
                                                height={100}
                                                src={story?.cover_image || "/sample_cover_image.jpeg"}
                                                alt={story.title}
                                                className="h-60 w-full  rounded-lg object-cover object-top"
                                            />
                                        </motion.div>
                                        <div className="flex justify-start items-start flex-col">
                                            <motion.h3
                                                layoutId={`title-${story.title}-${id}`}
                                                className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                                            >
                                                {story.title}
                                            </motion.h3>
                                            <motion.p
                                                layoutId={`description-${story?.chapters?.[0]?.title}-${id}`}
                                                className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-xs"
                                            >
                                                <span className="">{story?.chapters?.length} chapters</span>
                                                <span className="font-bold px-1">.</span>
                                                <span className="">{story?.reading_time} mins read</span>
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="w-full flex justify-between items-center">
                                    <Link href='/profile' className="flex items-center gap-2 rounded-lg z-10">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage src={story?.author?.profile_picture_url} alt={story?.author?.username} />
                                            <AvatarFallback className="capitalize text-md" >{story?.author?.username?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs font-medium capitalize">{story?.author?.username || 'Unknown Author'}</p>
                                    </Link>
                                    <div className="flex justify-end items-center gap-1 bg-background">
                                        <StoryLikeButton story={story} />
                                        <StoryShareButton story={story} />

                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                </ul>

            </div>
        </>
    );
}
export default Stories