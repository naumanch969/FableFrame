"use client";

import { db } from '@/config/db';
import { Story } from '@/config/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import BookCoverPage from './_components/BookCoverPage';
import StoryPages from './_components/StoryPages';
import LastPage from './_components/LastPage';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ViewStory = ({ params }: { params: any }) => {

    const storyId = params.storyId
    const bookRef = useRef(null)

    const [story, setStory] = useState<any>(null)
    const [mounted, setMounted] = useState(false)
    const [page, setPage] = useState(0)

    useEffect(() => {
        setMounted(true)
        console.log('here')
        const call = async () => {
            const result = await db
                .select()
                .from(Story)
                .where(eq(Story.id, storyId))

            setStory(result[0]!)
        }
        call()

    }, [])

  
    if (!mounted) return null
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
                        <BookCoverPage imageUrl={story?.coverImage} />
                    </div>

                    {
                        [...Array(story?.output?.chapters?.length)]?.map((_, index) => (
                            <div key={index} className='bg-white p-20 border' >
                                <StoryPages chapter={story?.output?.chapters?.[index]} />
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