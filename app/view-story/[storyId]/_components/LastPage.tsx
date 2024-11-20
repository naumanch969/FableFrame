"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

const LastPage = () => {
    return (
        <div className='bg-primary p-10 h-full w-full ' >
            <h2 className="text-2xl text-center font-bold text-white">The End</h2>
            <div className="flex items-center justify-center">
                <Button>Share</Button>
            </div>
        </div>
    )
}

export default LastPage