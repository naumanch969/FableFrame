"use client"

import NotificationDrawer from '@/components/drawers/notification-drawer'
import React, { useEffect, useState } from 'react'

const Drawers = () => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return

    return (
        <>
            <NotificationDrawer />
        </>
    )
}

export default Drawers