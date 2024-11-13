"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const AgeGroup = ({ userSelection }: { userSelection: any }) => {


    const options = [
        {
            label: '0-2 Years',
            imageUrl: '/02Years.png',
            isFree: true
        },
        {
            label: '3-5 Years',
            imageUrl: '/35Years.png',
            isFree: true
        },
        {
            label: '5-8 Years',
            imageUrl: '/58Years.png',
            isFree: true
        },
    ]

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            fieldName: 'ageGroup',
            fieldValue: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='' >

            <label htmlFor="" className="font-bold text-4xl text-primary">3. Age Group</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {
                    options.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.label)}
                            key={index}
                            className={`${option.label == selectedOption ? 'grayscale-0 border-2 rounded-3xl border-primary ' : 'grayscale'} flex gap-4 py-4 relative grayscale hover:grayscale-0 cursor-pointer p-1 `}
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

export default AgeGroup