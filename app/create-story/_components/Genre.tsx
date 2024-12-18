"use client"

import { STORY_GENRES } from '@/constants'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Genre = ({ userSelection }: { userSelection: any }) => {


    const options = [
        {
            color: 'bg-purple-500',
            isFree: true
        },
        {
            color: 'bg-blue-500',
            isFree: true
        },
        {
            color: 'bg-green-500',
            isFree: true
        },
        {
            color: 'bg-yellow-500',
            isFree: true
        },
        {
            color: 'bg-pink-500',
            isFree: true
        },
        {
            color: 'bg-red-500',
            isFree: true
        },
    ].map((option, i) => ({
        ...option,
        label: STORY_GENRES[i].key
    }))

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            name: 'genre',
            value: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='' >

            <label htmlFor="" className="font-bold text-xl text-foreground">3. Genre</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {
                    options.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.label)}
                            key={index}
                            className={`${option.label == selectedOption ? 'grayscale-0 border-2 rounded-3xl border-primary ' : 'grayscale'} grayscale hover:grayscale-0 h-[120px] col-span-1 flex gap-4 p-1 relative cursor-pointer `}
                        >
                            <div className={`${option.color} object-cover rounded-[20px] w-full h-full"`}>
                                <h2 className="absolute bottom-1/2 transform translate-y-1/2 text-white text-center w-full text-lg capitalize ">{option.label}</h2>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Genre