"use client";

import React, { useEffect } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';

import { useGetAIStories } from '@/features/story/api/useGetMyAIStories';
import Stories from '@/components/Stories';
import { useProfileId } from '@/hooks/use-profile-id';
import { useGetProfile } from '@/features/profile/api/useGetProfile'
import { redirect } from 'next/navigation';

const ProfilePage: React.FC = () => {

    const profile_id = useProfileId()

    const { data: profile } = useGetProfile()
    const { data: myAIStories, isLoading } = useGetAIStories(profile_id)

    useEffect(() => {
        if (profile_id == profile?._id)
            redirect('/profile')
    }, [])

    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            <div className="col-span-1">
                <ProfileSidebar />
            </div>
            <div className="col-span-3 w-full space-y-4 ">
                <Stories
                    data={myAIStories}
                    isLoading={isLoading}
                    showTitle={false}
                    gridCols={{ sm: 1, md: 2, lg: 2, xl: 3 }}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
