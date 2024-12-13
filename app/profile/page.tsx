// ProfilePage.tsx
"use client";
import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import ProfileForm from './components/ProfileForm';
import { useConfirm } from '@/hooks/use-confirm';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileMenubar from './components/ProfileMenubar';
import { useGetPublicStories } from '@/features/story/api/use-get-public-stories';
import StoryItem from '@/components/StoryItem';

const ProfilePage: React.FC = () => {

    const { data } = useGetPublicStories()

    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            <div className="col-span-1">
                <ProfileSidebar />
            </div>
            <div className="col-span-3 w-full space-y-4 ">
                <ProfileMenubar />
                <div className="grid grid-cols-3 w-full gap-4 ">
                    {
                        data?.map((story: any, index: number) => (
                            <StoryItem story={story} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
