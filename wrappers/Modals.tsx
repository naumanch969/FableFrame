"use client"

import CreateChatModal from '@/components/modals/create-chat-modal'
import CreateReportModal from '@/components/modals/create-report-modal'
import CreateShareModal from '@/components/modals/create-share-modal'
import PreferencesModal from '@/components/modals/preferences-modal'
import ProfileModal from '@/components/modals/profile-modal'
import UpdateStoryImagesModal from '@/components/modals/update-story-images-modal'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import React, { useEffect, useState } from 'react'

const Modals = () => {

    const [mounted, setMounted] = useState(false)
    const { data: profile } = useCurrentProfile()

    useEffect(() => setMounted(true), [])

    if (!mounted) return
    if (!profile) return

    return (
        <>
            <CreateReportModal />
            <CreateShareModal />
            <CreateChatModal />
            <ProfileModal />
            <PreferencesModal />
            <UpdateStoryImagesModal />
        </>
    )
}

export default Modals