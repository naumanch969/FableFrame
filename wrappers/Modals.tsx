"use client"

import CreateChatModal from '@/components/modals/create-chat-modal'
import CreateReportModal from '@/components/modals/create-report-modal'
import CreateShareModal from '@/components/modals/create-share-modal'
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
        </>
    )
}

export default Modals