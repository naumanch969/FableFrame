import Image from 'next/image'
import React from 'react'
import { Card } from './ui/card'

const Loader = ({ src, title }: { src?: string, title?: string }) => {
    return (
        <Card className="w-fit flex flex-col justify-center items-center bg-card py-10 px-16 rounded-3xl ">
            <Image
                src={src || '/loader.gif'}
                alt='Loading...'
                width={100}
                height={100}
                className='h-[200px] w-[200px]'
            />
            {
                title
                &&
                <div className="text-center text-lg font-bold text-gray-600 mt-4">
                {title}
                </div>
            }

        </Card>
    )
}

export default Loader