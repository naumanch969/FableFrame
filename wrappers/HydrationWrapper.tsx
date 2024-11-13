"use client"
import React, { ReactNode, useEffect, useState } from 'react'

const HydrationWrapper = ({ children }: { children: ReactNode }) => {

    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) return null
    return (
        <>{children}</>
    )
}

export default HydrationWrapper