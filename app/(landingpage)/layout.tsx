"use client"

import React, { ReactNode } from 'react'
import Footer from '../../components/Footer'

const LandingLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className='flex flex-col '>
            {children}
            <Footer />
        </div>
    )
}

export default LandingLayout