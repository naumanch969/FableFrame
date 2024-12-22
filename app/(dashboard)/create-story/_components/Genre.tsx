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
        <div className='col-span-2' >

            <label htmlFor="" className="font-bold text-xl text-foreground">4. Genre</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-3">
                {
                    STORY_GENRES.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.key)}
                            key={index}
                            className={`${option.key == selectedOption ? 'grayscale-0 border-2 rounded-3xl border-primary ' : 'grayscale'} flex gap-4 p-1 relative grayscale hover:grayscale-0 cursor-pointer `}
                        >
                            <h2 className="absolute bottom-5 text-white text-center w-full text-lg ">{option.label}</h2>
                            <Image
                                src={option.image}
                                alt={option.label}
                                width={300} height={500}
                                className='object-cover h-[120px] rounded-3xl'
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Genre