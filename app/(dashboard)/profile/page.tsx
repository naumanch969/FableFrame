"use client";

import React, { useEffect, useState } from 'react';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileMenubar from './components/ProfileMenubar';

import { useGetLikedStories } from '@/features/story/api/useGetLikedStories';
import { useGetSharedStories } from '@/features/story/api/useGetSharedStories';
import { useGetAIStories } from '@/features/story/api/useGetMyAIStories';
import { useGetMyManualStories } from '@/features/story/api/useGetMyManualStories';
import { useGetDraftStories } from '@/features/story/api/useGetDraftStories';
import Stories from '@/components/Stories';

const ProfilePage: React.FC = () => {

    const [activeItem, setActiveItem] = useState<"your" | "ai" | "draft" | "shared" | "liked">("ai");

    const { data: likedStories, isLoading: likedStoriesLoading } = useGetLikedStories()
    const { data: sharedStories, isLoading: sharedStoriesLoading } = useGetSharedStories()
    const { data: draftStories, isLoading: draftStoriesLoading } = useGetDraftStories()
    const { data: myAIStories, isLoading: myAIStoriesLoading } = useGetAIStories()
    const { data: myManualStories, isLoading: myManualStoriesLoading } = useGetMyManualStories()

    const menuItems = [
        { label: "AI Stories", key: "ai" },
        // { label: "Manual Stories", key: "your" },
        { label: "Draft Stories", key: "draft" },
        { label: "Liked Stories", key: "liked" },
        { label: "Shared Stories", key: "shared" },
    ];

    const toggleStories = () => {
        const stories =
            activeItem == "your" ? myManualStories
                : activeItem == "ai" ? myAIStories
                    : activeItem == "draft" ? draftStories
                        : activeItem == "shared" ? sharedStories
                            : likedStories
        return stories
    }
    const [stories, setStories] = useState(myAIStories)

    useEffect(() => {
        setStories(toggleStories())
    }, [activeItem, likedStories, sharedStories, draftStories, myAIStories, myManualStories])


    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            <div className="col-span-1">
                <ProfileSidebar />
            </div>
            <div className="col-span-3 w-full space-y-4 ">
                <ProfileMenubar menuItems={menuItems} activeItem={activeItem} setActiveItem={setActiveItem} />
                <Stories
                    data={stories}
                    isLoading={
                        (activeItem == "your" && myManualStoriesLoading)
                        || (activeItem == "ai" && myAIStoriesLoading)
                        || (activeItem == "draft" && draftStoriesLoading)
                        || (activeItem == "liked" && likedStoriesLoading)
                        || (activeItem == "shared" && sharedStoriesLoading)
                    }
                    showTitle={false}
                    gridCols={{ sm: 1, md: 2, lg: 2, xl: 3 }}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
