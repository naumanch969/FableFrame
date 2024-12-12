"use client"

import React from 'react'
import { ContentPage, CoverPage, EndPage } from './Page';

const Thumbnails = ({ currentPage, setCurrentPage, story }: { currentPage: number, setCurrentPage: any, story: any }) => {

    const totalPages = story?.chapters?.length

    const handlePageClick = (index: number) => {
        console.log('index', index)
        setCurrentPage(index);
    };

    return (
        <div className="flex gap-3 overflow-x-scroll bg-white/80 p-2 rounded-md w-fit max-w-full">
            {/* Cover Page */}
            <div
                onClick={() => handlePageClick(0)}
                className={`w-20 h-28 min-w-20 border cursor-pointer flex items-center justify-center text-sm hover:scale-105 transition-all rounded-lg overflow-hidden  ${currentPage === 0 ? 'border-primary' : 'border-gray-300'}`}
            >
                <CoverPage.Mini
                    title={story?.title || ""}
                    coverImage='/sample_cover_image.jpeg'
                />
            </div>

            {/* Chapter Pages */}
            {story?.chapters.map((chapter: any, index: number) => (
                <div
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={`w-20 h-28 min-w-20 border cursor-pointer flex items-center justify-center text-sm hover:scale-105 transition-all rounded-lg overflow-hidden 
    ${index + 1 === currentPage ? 'border-primary' : 'border-gray-300'}`}
                    ref={(el) => {
                        if (index + 1 === currentPage && el) {
                            el.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                        }
                    }}
                >
                    <ContentPage.Mini
                        title={chapter?.title}
                        content={chapter?.title}
                        pageNumber={index + 1}
                    />
                </div>
            ))}

            {/* End Page */}
            <div
                onClick={() => handlePageClick(totalPages)}
                className={`w-20 h-28 min-w-20 border cursor-pointer flex items-center justify-center text-sm hover:scale-105 transition-all rounded-lg overflow-hidden 
${currentPage === totalPages ? 'border-primary' : 'border-gray-300'}`}
            >
                <EndPage.Mini />
            </div>
        </div>
    )
}

export default Thumbnails