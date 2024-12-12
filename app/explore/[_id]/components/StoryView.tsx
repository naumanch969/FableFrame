"use client";

import React, { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useGetStory } from '@/features/story/api/use-get-story';
import { useStoryId } from '@/hooks/use-story-id';
import { Id } from '@/convex/_generated/dataModel';
import Loader from '@/components/Loader';
import { ContentPage, CoverPage, EndPage } from './Page';
import Thumbnails from './Thumbnails';


const StoryView = () => {
    const id = useStoryId() as Id<"stories">;
    const { data: story, isLoading } = useGetStory({ id });

    const [currentPage, setCurrentPage] = useState(0);

    const chapters = story?.chapters || [];
    const totalPages = chapters.length;

    const handleNext = () => {
        if (currentPage < totalPages + 1) {
            setCurrentPage((prev) => prev + 1);
        } else {
            console.log('Already at the end page');
        }
    };

    const handlePrev = () => {
        console.log('currentPage, curr', currentPage)
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        } else {
            console.log('Already at the cover page');
        }
    };


    if (isLoading) {
        return <div className='min-h-[90vh] flex justify-center items-center' >
            <Loader src='/loader_book.gif' title='Loading story for you...' />
        </div>;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 relative py-6">

            <div className="flex flex-col items-center gap-4 w-full ">
                <div className="bg-white w-full rounded-lg flex justify-center items-center p-4">
                    <h2 className="font-bold text-3xl text-center text-primary rounded-md">
                        {story?.title}
                    </h2>
                </div>

                <div className="flex items-center justify-between gap-4 w-full">
                    <Button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="flex items-center justify-center"
                    >
                        <ArrowLeft />
                    </Button>

                    <div className="flex gap-4 bg-white shadow-md w-full h-[600px] rounded-md overflow-hidden">
                        {/* Left Page */}
                        <div className="flex-1 border-r">
                            {currentPage === 0 ? (
                                <CoverPage title={story?.title || ""} coverImage='/sample_cover_image.jpeg' />
                            ) : (
                                <ContentPage
                                    title={chapters[currentPage - 1]?.title}
                                    content={chapters[currentPage - 1]?.text}
                                    pageNumber={currentPage}
                                />
                            )}
                        </div>
                        {/* Right Page */}
                        <div className="flex-1">
                            {currentPage === totalPages ? (
                                <EndPage />
                            ) : (
                                <ContentPage
                                    title={chapters[currentPage]?.title}
                                    content={chapters[currentPage]?.text}
                                    pageNumber={currentPage + 1}
                                />
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={handleNext}
                        disabled={currentPage >= totalPages}
                        className="flex items-center justify-center"
                    >
                        <ArrowRight />
                    </Button>
                </div>

                <div className="flex justify-center w-full">
                    <Thumbnails
                        story={story}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

            </div>

        </div>
    );
};

export default StoryView;