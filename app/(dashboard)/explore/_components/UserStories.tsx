"use client"

import React, { useState } from 'react'
import StoryItem from '@/components/StoryItem'
import { useGetPublicStories } from '@/features/story/api/useGetPublicStories'

const UserStories = () => {

    const { data: stories, isLoading } = useGetPublicStories()


    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-6 mt-10">
                {
                    stories?.length === 0
                        ?
                        <div className="text-center">No stories found for this user.</div>
                        :
                        stories?.map((story: any, index: number) => (
                            <StoryItem story={story} key={index} />
                        ))
                }
                {
                    isLoading &&
                    Array.from({ length: 12 }).map((_, index) => (
                        <StoryItem.Skeleton key={index} />
                    ))
                }
            </div>

        </div>
    )
}

export default UserStories