"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const StoryType = ({ userSelection }: { userSelection: any }) => {


    const options = [
        {
            label: 'Story Book',
            imageUrl: '/story.png',
            isFree: true
        },
        {
            label: 'Bed Story',
            imageUrl: '/bedstory.png',
            isFree: true
        },
        {
            label: 'Educational',
            imageUrl: '/educational.png',
            isFree: true
        },
    ]

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            fieldName: 'storyType',
            fieldValue: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='' >

            <label htmlFor="" className="font-bold text-4xl text-primary">2. Story Type</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {
                    options.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.label)}
                            key={index}
                            className={`${option.label == selectedOption ? 'grayscale-0 border-2 rounded-3xl border-primary ' : 'grayscale'} flex gap-4 p-1 relative grayscale hover:grayscale-0 cursor-pointer `}
                        >
                            <h2 className="absolute bottom-5 text-white text-center w-full text-2xl ">{option.label}</h2>
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

export default StoryType