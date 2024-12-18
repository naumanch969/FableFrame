"use client"

import { STORY_AGE_CATEGORIES } from '@/constants'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const AgeGroup = ({ userSelection }: { userSelection: any }) => {


    const options = [
        {
            imageUrl: '/02Years.png',
            isFree: true
        },
        {
            imageUrl: '/35Years.png',
            isFree: true
        },
        {
            imageUrl: '/58Years.png',
            isFree: true
        },
    ].map((option, i) => ({
        ...option,
        label: STORY_AGE_CATEGORIES[i].key
    }))

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            name: 'ageCategory',
            value: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='' >

            <label htmlFor="" className="font-bold text-xl text-foreground">4. Age Group</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {
                    options.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.label)}
                            key={index}
                            className={`${option.label == selectedOption ? 'grayscale-0 border-2 rounded-3xl border-primary ' : 'grayscale'} flex gap-4 p-1 relative grayscale hover:grayscale-0 cursor-pointer`}
                        >
                            <h2 className="absolute bottom-5 text-white text-center w-full text-lg capitalize ">{option.label}</h2>
                            <Image
                                src={option.imageUrl}
                                alt={option.label}
                                width={300} height={500}
                                className='object-cover h-[260px] rounded-3xl'
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default AgeGroup