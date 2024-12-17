"use client"

import React from 'react';
import StoryView from './components/StoryView';
import RecommendedStories from './components/RecommendedStories';
import { useGetPublicStories } from '@/features/story/api/use-get-public-stories';
import Footer from '@/components/Footer';
import { useGetGenreStories } from '@/features/story/api/use-get-genre-stories';
import { useGetStory } from '@/features/story/api/use-get-story';
import { useStoryId } from '@/hooks/use-story-id';
import { Id } from '@/convex/_generated/dataModel';
import { useGetAgeCategoryStories } from '@/features/story/api/use-get-age-category-stories';
import { useGetPopularStories } from '@/features/story/api/use-get-popular-stories';
import { useGetUserRecommendedStories } from '@/features/story/api/use-get-user-recommended-stories';

const ViewStory = () => {

    const id = useStoryId() as Id<"stories">;
    const { data: story } = useGetStory({ id });

    const { data: publicStories, isLoading: publicStoriesLoading } = useGetPublicStories();
    const { data: genreStories, isLoading: genreStoriesLoading } = useGetGenreStories(story?.genre!);
    const { data: ageCategoryStories, isLoading: ageCategoryStoriesLoading } = useGetAgeCategoryStories(story?.age_category!);
    const { data: popularStories, isLoading: popularStoriesLoading } = useGetPopularStories();
    const { data: userRecommendedStories, isLoading: userRecommendedStoriesLoading } = useGetUserRecommendedStories();

    return (
        <div>
            <StoryView />
            <div className="scroll-container"> {/* Optional: Use a wrapper with controlled scroll */}
                <RecommendedStories
                    title='Explore Stories in the Same Genre'
                    stories={genreStories || []}
                    isLoading={genreStoriesLoading}
                />
                <RecommendedStories
                    title='Discover Stories for Your Age Group'
                    stories={ageCategoryStories || []}
                    isLoading={ageCategoryStoriesLoading}
                />
                <RecommendedStories
                    title='Tailored Recommendations for You'
                    stories={userRecommendedStories || []}
                    isLoading={userRecommendedStoriesLoading}
                />
                <RecommendedStories
                    title='Popular Stories You Must Read'
                    stories={popularStories || []}
                    isLoading={popularStoriesLoading}
                />
                <RecommendedStories
                    title='More Stories to Enjoy'
                    stories={publicStories || []}
                    isLoading={publicStoriesLoading}
                />
            </div>
            <Footer />
        </div>
    );
};

export default ViewStory;
