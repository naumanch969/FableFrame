"use client"

import Footer from '@/components/Footer'
import React, { ReactNode } from 'react'
import Navbar from '../(landingpage)/components/Navbar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className="max-w-screen-xl px-6 mx-auto">
            <div className="min-h-screen">
                <Navbar />
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default DashboardLayout