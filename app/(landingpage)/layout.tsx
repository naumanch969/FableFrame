"use client"

import React, { ReactNode } from 'react'

const LandingLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div className="">
            {children}
        </div>
    )
}

export default LandingLayout