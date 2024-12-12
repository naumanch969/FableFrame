"use client";

import React, { useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BookCoverPage from '../../view-story/[storyId]/_components/BookCoverPage';
import StoryPages from '../../view-story/[storyId]/_components/StoryPages';
import LastPage from '../../view-story/[storyId]/_components/LastPage';
import { useGetStory } from '@/features/story/api/use-get-story';
import { useStoryId } from '@/hooks/use-story-id';
import { Id } from '@/convex/_generated/dataModel';

const ViewStory = ({ params }: { params: any }) => {


    const storyId = params.storyId
    const id = useStoryId() as Id<"stories">
    const bookRef = useRef(null)
    const { data: story } = useGetStory({ id })

    const [page, setPage] = useState(0)


    return (
        <div className='flex items-center justify-center flex-col relative' >

            <h2 className="font-bold text-4xl text-center p-10 bg-primary text-white rounded-md">
                {story?.title}
            </h2>

            <div className="flex flex-col gap-6">
                {/* @ts-ignore */}
                <HTMLFlipBook
                    showCover={true}
                    useMouseEvents={false}
                    width={500}
                    height={500}
                    className='mt-10'
                    ref={bookRef}
                >
                    <div className="">
                        <BookCoverPage imageUrl={story?.cover_image!} />
                    </div>

                    {
                        [...Array(story?.chapters?.length)]?.map((_, index) => (
                            <div key={index} className='bg-white p-20 border' >
                                <StoryPages chapter={story?.chapters?.[index]} />
                            </div>
                        ))
                    }

                    <div className="">
                        <LastPage />
                    </div>

                </HTMLFlipBook>
                <div className="w-full flex justify-end items-center">
                    {/* @ts-ignore */}
                    {page > 0 && <Button onClick={() => { bookRef?.current && bookRef?.current?.pageFlip()?.flipPrev(); setPage(pre => pre - 1) }} ><ArrowLeft /></Button>}
                    {/* @ts-ignore */}
                    {page < story?.output?.chapters?.length && <Button onClick={() => { bookRef?.current && bookRef?.current?.pageFlip()?.flipNext(); setPage(pre => pre + 1) }} ><ArrowRight /></Button>}
                </div>
            </div>

        </div>
    )
}

export default ViewStory