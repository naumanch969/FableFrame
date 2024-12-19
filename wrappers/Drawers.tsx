"use client"

import NotificationDrawer from '@/components/drawers/notification-drawer'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import React, { use, useEffect, useState } from 'react'

const Drawers = () => {

    const { data: profile } = useCurrentProfile()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return
    if (!profile) return

    return (
        <>
            <NotificationDrawer />
        </>
    )
}

export default Drawers