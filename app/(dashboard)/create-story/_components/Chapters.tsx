"use client"

import React from 'react'
import { Slider } from "@/components/ui/slider"


const Chapters = ({ userSelection, value }: { userSelection: any, value: number }) => {

    return (
        <div className='space-y-3 col-span-1' >
            <label htmlFor="" className="font-bold text-xl text-surface-foreground mt-3 ">6. Chapters</label>
            <div className='bg-surface h-12 flex items-center rounded-full px-4 py-2 ' >
                <Slider
                    defaultValue={[5]}
                    value={[value]}
                    onValueChange={(v) => userSelection({ name: 'chapters', value: v })}
                    min={1}
                    max={12}
                    step={1}
                />
                <span className='relative -right-2 flex justify-center items-center rounded-full bg-theme-gradient text-white shadow-lg w-8 h-8 ' >{value}</span>
            </div>
        </div>
    )
}

export default Chapters