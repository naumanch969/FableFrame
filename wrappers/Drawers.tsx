"use client"

import NotificationDrawer from '@/components/drawers/notification-drawer'
import { useGetProfile } from '@/features/profile/api/useGetProfile'
import React, { use, useEffect, useState } from 'react'

const Drawers = () => {

    const { data: profile } = useGetProfile()
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