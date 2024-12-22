"use client"

import { STORY_AGE_CATEGORIES } from '@/constants'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const AgeGroup = ({ userSelection }: { userSelection: any }) => {

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            name: 'ageCategory',
            value: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='' >

            <label htmlFor="" className="font-bold text-xl text-foreground">3. Age Group</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {
                    STORY_AGE_CATEGORIES.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.key)}
                            key={index}
                            className={`${option.key == selectedOption ? 'grayscale-0 border-2 rounded-3xl border-primary ' : 'grayscale'} flex gap-4 p-1 relative grayscale hover:grayscale-0 cursor-pointer`}
                        >
                            <h2 className="absolute bottom-5 text-white text-center w-full text-lg capitalize ">{option.label}</h2>
                            <Image
                                src={option.image}
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