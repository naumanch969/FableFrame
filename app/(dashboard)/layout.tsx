"use client"

import React, { ReactNode } from 'react'
import Navbar from '../(landingpage)/components/Navbar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className="max-w-screen-xl px-6 mx-auto">
            <div className="min-h-screen pb-12 ">
                <Navbar />
                <div className='pt-6' >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout