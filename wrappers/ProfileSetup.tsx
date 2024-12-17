"use client"
import { useCreateProfile } from '@/features/profile/api/useCreateProfile'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import { useCurrentUser } from '@/features/users/api/useCurrentUser'
import React, { useEffect } from 'react'

const ProfileSetup = () => {
    const { data: user } = useCurrentUser()
    const { data: profile } = useCurrentProfile()
    const { mutate } = useCreateProfile()

    useEffect(() => {
        if (user && !profile) {
            const input = {
                user_id: user?._id!,
                username: user?.name!,
                email: user?.email!,
                role: "user",
                profile_picture_url: user?.image || "",
                bio: "",
                date_of_birth: "",
                is_verified: true,
                preferences: "",
                notification_settings: "",
                location: "",
            }
            mutate({ formData: input }, {
                onSuccess: (payload) => {
                    console.log('payload', payload)
                }
            })
        }
    }, [user])
    return (
        <></>
    )
}

export default ProfileSetup