"use client"

import { STORY_IMAGE_STYLES } from '@/constants'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ImageStyle = ({ userSelection }: { userSelection: any }) => {


    const options = [
        {
            label: '3D Cartoon',
            imageUrl: '/3D.png',
            isFree: true
        },
        {
            label: 'Paper Cut',
            imageUrl: '/paperCut.png',
            isFree: true
        },
        {
            label: 'Water Color',
            imageUrl: '/waterColor.png',
            isFree: true
        },
        {
            label: 'Pixel Style',
            imageUrl: '/pixel.png',
            isFree: true
        },
    ].map((option, i) => ({
        ...option,
        label: STORY_IMAGE_STYLES[i].key
    }))

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            name: 'imageStyle',
            value: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='' >

            <label htmlFor="" className="font-bold text-xl text-primary">5. Image Style</label>
            <div className="grid grid-cols-3 gap-5 mt-3">
                {
                    options.map((option, index) => (
                        <div
                            onClick={() => setSelectedOption(option.label)}
                            key={index}
                            className={`${option.label == selectedOption ? 'grayscale-0 border-2 rounded-3xl border-primary ' : 'grayscale'} flex gap-4 p-1 relative grayscale hover:grayscale-0 cursor-pointer `}
                        >
                            <h2 className="absolute bottom-5 text-white text-center w-full text-lg ">{option.label}</h2>
                            <Image
                                src={option.imageUrl}
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

export default ImageStyle