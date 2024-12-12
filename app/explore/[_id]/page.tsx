"use client"

import React, { useEffect } from 'react';
import StoryView from './components/StoryView';
import RecommendedStories from './components/RecommendedStories';
import { useGetPublicStories } from '@/features/story/api/use-get-public-stories';

const ViewStory = () => {
    const { data, isLoading } = useGetPublicStories();

    return (
        <div>
            <StoryView />
            <div className="scroll-container"> {/* Optional: Use a wrapper with controlled scroll */}
                <RecommendedStories
                    title='Explore Stories in the Same Genre'
                    stories={data || []}
                    isLoading={isLoading}
                />
                <RecommendedStories
                    title='Discover Stories for Your Age Group'
                    stories={data || []}
                    isLoading={isLoading}
                />
                <RecommendedStories
                    title='Tailored Recommendations for You'
                    stories={data || []}
                    isLoading={isLoading}
                />
                <RecommendedStories
                    title='Popular Stories You Must Read'
                    stories={data || []}
                    isLoading={isLoading}
                />
                <RecommendedStories
                    title='More Stories to Enjoy'
                    stories={data || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default ViewStory;
