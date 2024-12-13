"use client"

import React, { useState } from 'react'
import StoryItem from '@/components/StoryItem'
import CustomLoader from '@/app/create-story/_components/CustomLoader'
import { useGetPublicStories } from '@/features/story/api/use-get-public-stories'

const UserStories = () => {

    const { data: stories } = useGetPublicStories()

    const [loading, setLoading] = useState(false)

    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-6 mt-10">
                {
                    !loading &&
                        stories?.length === 0
                        ?
                        <div className="text-center">No stories found for this user.</div>
                        :
                        stories?.map((story, index) => (
                            <StoryItem story={story} key={index} />
                        ))
                }
            </div>

            {loading && <CustomLoader onClose={() => setLoading(false)} open={loading} />}

        </div>
    )
}

export default UserStories