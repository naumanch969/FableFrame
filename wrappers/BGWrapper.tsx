"use client"
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const BGWrapper = ({ children }: { children: ReactNode }) => {

    const pathname = usePathname()

    return (
        <div className={`${pathname == '/' ? 'bg-[#cad3ff]' : 'bg-background'} `}>
            {children}
        </div>
    )
}

export default BGWrapper