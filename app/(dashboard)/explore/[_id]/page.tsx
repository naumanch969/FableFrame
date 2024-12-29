"use client"

import React from 'react';
import StoryView from './components/StoryView';
import { useGetPublicStories } from '@/features/story/api/useGetPublicStories';
import Footer from '@/components/Footer';
import { useGetGenreStories } from '@/features/story/api/useGetGenreStories';
import { useGetStory } from '@/features/story/api/useGetStory';
import { useStoryId } from '@/hooks/use-story-id';
import { Id } from '@/convex/_generated/dataModel';
import { useGetAgeCategoryStories } from '@/features/story/api/useGetAgeCategoryStories';
import { useGetPopularStories } from '@/features/story/api/useGetPopularStories';
import { useGetUserRecommendedStories } from '@/features/story/api/useGetUserRecommendedStories';
import Stories from '@/components/Stories'

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

                <div className="py-6">
                    <h2 className="text-2xl font-bold text-center mb-4 text-foreground ">Explore Stories in the Same Genre</h2>
                    <Stories
                        data={genreStories}
                        isLoading={genreStoriesLoading}
                        showHeader={false}
                    />
                </div>
                <div className="py-6">
                    <h2 className="text-2xl font-bold text-center mb-4 text-foreground ">Discover Stories for Your Age Group</h2>
                    <Stories
                        data={ageCategoryStories}
                        isLoading={ageCategoryStoriesLoading}
                        showHeader={false}
                    />
                </div>
                {
                    userRecommendedStories?.length > 0 &&
                    <div className="py-6">
                        <h2 className="text-2xl font-bold text-center mb-4 text-foreground ">Tailored Recommendations for You</h2>
                        <Stories
                            data={userRecommendedStories}
                            isLoading={userRecommendedStoriesLoading}
                            showHeader={false}
                        />
                    </div>
                }
                <div className="py-6">
                    <h2 className="text-2xl font-bold text-center mb-4 text-foreground ">Popular Stories You Must Read</h2>
                    <Stories
                        data={popularStories}
                        isLoading={popularStoriesLoading}
                        showHeader={false}
                    />
                </div>
                <div className="py-6">
                    <h2 className="text-2xl font-bold text-center mb-4 text-foreground ">More Stories to Enjoy</h2>
                    <Stories
                        data={publicStories}
                        isLoading={publicStoriesLoading}
                        showHeader={false}
                    />
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ViewStory;
