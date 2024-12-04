"use client"

import { db } from '@/config/db'
import { Story } from '@/config/schemas/Story'
import { User } from '@/config/schemas/User'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItem from './StoryItem'
import CustomLoader from '@/app/create-story/_components/CustomLoader'

const UserStories = () => {

    const user = null

    const [stories, setStories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && getUserStories()
    }, [user])

    const getUserStories = async () => {
        setLoading(true)
        const result = await db
            .select()
            .from(Story)
            .innerJoin(User, eq(User.id, Story.id))
            .where(eq(User.email, user?.primaryEmailAddress?.emailAddress ?? ""))
            .orderBy(desc(Story.id))

        console.log(result)
        setLoading(false)
        setStories(result)
    }


    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
                {
                    !loading &&
                        stories.length === 0
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