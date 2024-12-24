"use client"

import { STORY_GENRES } from '@/constants'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Genre = ({ userSelection }: { userSelection: any }) => {

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            name: 'genre',
            value: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='col-span-2'>
            <label htmlFor="" className="font-bold text-xl text-primary">4. Genre</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-3">
                {
                    STORY_GENRES.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.key)}
                            key={index}
                            className={`${
                                option.key === selectedOption
                                    ? 'border-2 border-transparent bg-clip-border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-3xl'
                                    : 'grayscale'
                            } flex gap-4 p-1 relative cursor-pointer`}
                        >
                            <h2 className="absolute bottom-5 text-white text-center w-full text-lg">{option.label}</h2>
                            <Image
                                src={option.image}
                                alt={option.label}
                                width={300} height={500}
                                className='object-cover h-[120px] rounded-[21px]'
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Genre
