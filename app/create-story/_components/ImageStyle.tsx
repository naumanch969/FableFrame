"use client"

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
    ]

    const [selectedOption, setSelectedOption] = useState<string>('')

    useEffect(() => {
        userSelection({
            fieldName: 'imageStyle',
            fieldValue: selectedOption
        })
    }, [selectedOption])

    return (
        <div className='' >

            <label htmlFor="" className="font-bold text-4xl text-primary">4. Image Style</label>
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