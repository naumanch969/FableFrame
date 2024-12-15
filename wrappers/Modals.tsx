"use client"

import CreateReportModal from '@/components/modals/create-report-modal'
import React, { useEffect, useState } from 'react'

const Modals = () => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return

    return (
        <>
            <CreateReportModal />
        </>
    )
}

export default Modals