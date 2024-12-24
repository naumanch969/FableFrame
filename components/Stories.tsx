"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Story } from "@/types";
import { Card } from "./ui/card";
import { Search } from "lucide-react";
import StoryLikeButton from "./StoryLikeButton";
import StoryShareButton from "./StoryShareButton";
import Empty from "./Empty";
import ActiveStoryModal from './ActiveStoryModal'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Link from 'next/link'
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select'
import { STORY_AGE_CATEGORIES, STORY_GENRES } from '@/constants'

const Stories = ({ data }: { data: Story[] }) => {

    ///////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    ///////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
    const [stories, setStories] = useState(data);
    const [searchQuery, setSearchQuery] = useState('')
    const [genre, setGenre] = useState('')
    const [ageCategory, setAgeCategory] = useState('')

    ///////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
    useEffect(() => {
        onSearch();
    }, [data, searchQuery, genre, ageCategory]);

    ///////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
    const onSearch = () => {
        if (data) {
            const filtered = data.filter(story => {
                const matchesSearchQuery = searchQuery
                    ? story?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    story?.author?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    story?.genre?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    story?.age_category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
                    : true;

                const matchesGenre = genre != 'all' ? story?.genre?.toLowerCase() === genre?.toLowerCase() : true;
                const matchesAgeCategory = ageCategory != 'all'
                    ? story?.age_category?.toLowerCase() === ageCategory?.toLowerCase()
                    : true;

                return matchesSearchQuery && matchesGenre && matchesAgeCategory;
            });
            setStories(filtered);
        } else {
            setStories([]);
        }
    };


    ///////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
    return (
        <>
            <div className="flex flex-col gap-4">

                {/* Search */}
                <div className="flex justify-between items-end gap-2">
                    <h2 className="text-xl md:text-4xl font-bold text-neutral-700 dark:text-neutral-200 font-sans">
                        Story pickups for {searchQuery ? `"${searchQuery}"` : 'you'}
                    </h2>
                    <div className="flex justify-end items-center gap-2">
                        <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="sticky">
                            <input
                                type="text"
                                className="w-96 rounded-xl border border-stroke py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                                placeholder="Search stories by title, genre, age-category"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyUp={(e) => { e.preventDefault(); onSearch(); }}
                            />
                            <button type="button" title="Search" className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Search />
                            </button>
                        </form>
                        <Select value={genre} onValueChange={setGenre} >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"all"}>All</SelectItem>
                                {STORY_GENRES.map((genres) => (
                                    <SelectItem key={genres.key} value={genres.key}>
                                        {genres.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={ageCategory} onValueChange={setAgeCategory} >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by age" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"all"}>All</SelectItem>
                                {STORY_AGE_CATEGORIES.map((category) => (
                                    <SelectItem key={category.key} value={category.key}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {
                    stories?.length == 0 &&
                    <div className="col-span-3 pt-12">
                        <Empty />
                    </div>
                }
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 900: 4 }}>
                    <Masonry gutter={'8px'} >

                        {
                            stories?.slice()?.reverse()?.map((story, index) => (
                                <Card key={index} className=" relative mx-1 bg-card p-1 flex flex-col justify-between gap-1 w-full h-fit hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl" >

                                    <ActiveStoryModal story={story} >
                                        <motion.div
                                            layoutId={`card-${story.title}-${id}`}
                                            className="group relative w-full flex flex-col gap-4 justify-between cursor-pointer"
                                        >
                                            <Image
                                                width={100}
                                                height={100}
                                                src={story?.cover_image || "/sample_cover_image.jpeg"}
                                                alt={story.title}
                                                className="h-full w-full rounded-lg object-cover object-top"
                                            />
                                            <div className="p-4 hidden group-hover:flex absolute top-0 left-0 rounded-lg bg-black bg-opacity-40 w-full h-full ">
                                                <div className='w-full flex justify-end items-start flex-col h-full relative' >
                                                    <div className='absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2' >
                                                        <p className='text-white/90 font-bold text-xl  ' >Open</p>
                                                    </div>
                                                    <motion.p className="text-neutral-300 text-center md:text-left text-base">
                                                        <span className="">{story?.chapters?.length} chapters</span>
                                                        <span className="font-bold px-1">.</span>
                                                        <span className="">{story?.reading_time} mins read</span>
                                                    </motion.p>
                                                </div>
                                            </div>

                                        </motion.div>
                                    </ActiveStoryModal>

                                    <div className='flex justify-between items-center' >
                                        <Link
                                            href={`/explore/${story?._id}`}
                                            className="cursor-pointer hover:underline font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                                        >
                                            {story.title}
                                        </Link>
                                        <div className='flex gap-1' >
                                            <StoryLikeButton story={story} />
                                            <StoryShareButton story={story} />
                                        </div>
                                    </div>

                                </Card>
                            ))
                        }
                    </Masonry>
                </ResponsiveMasonry>

            </div>
        </>
    );
}
export default Stories

{/* <Card key={index} className="bg-card p-4 flex flex-col justify-between gap-1.5 h-full hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl" >

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
</Card> */}