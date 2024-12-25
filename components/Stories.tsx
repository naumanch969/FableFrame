"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
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
import StoryItem from "./StoryItem";

const Stories = ({ title, data, isLoading, showTitle = true }: { title?: string, data: Story[], isLoading: boolean, showTitle?: boolean }) => {

    ///////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    ///////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
    const [stories, setStories] = useState(data);
    const [searchQuery, setSearchQuery] = useState('')
    const [genre, setGenre] = useState('all')
    const [ageCategory, setAgeCategory] = useState('all')

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
            <div className="flex flex-col gap-4 w-full">

                {/* Search */}
                <div className="flex justify-between items-end gap-2">
                    <h2 className="text-xl md:text-3xl font-bold text-neutral-700 dark:text-neutral-200 font-sans">
                        {showTitle && (title || `Story pickups for ${searchQuery ? searchQuery : 'you'}`)}
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
                            <SelectTrigger className='bg-white py-2.5 '>
                                <SelectValue placeholder="Filter by genre" />
                            </SelectTrigger>
                            <SelectContent className='bg-white '>
                                <SelectItem value={"all"}>Filter by genre</SelectItem>
                                {STORY_GENRES.map((genres) => (
                                    <SelectItem key={genres.key} value={genres.key}>
                                        {genres.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={ageCategory} onValueChange={setAgeCategory}   >
                            <SelectTrigger className='bg-white py-2.5 ' >
                                <SelectValue placeholder="Filter by age" />
                            </SelectTrigger>
                            <SelectContent className='bg-white '>
                                <SelectItem value={"all"}>Filter by age</SelectItem>
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
                    !isLoading && stories?.length == 0 &&
                    <div className="col-span-3 pt-12">
                        <Empty />
                    </div>
                }

                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 900: 4 }}>
                    <Masonry gutter={'8px'} >
                        {
                            isLoading
                                ?
                                Array.from({ length: 12 }).map((_, index) => (
                                    <StoryItem.Skeleton key={index} />
                                ))
                                :
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
