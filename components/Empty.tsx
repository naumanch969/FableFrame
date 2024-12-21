import Image from 'next/image'
import React from 'react'

const Empty = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center grayscale '>
            <Image src={'/empty.png'} alt='Empty' width={384} height={384} className='grayscale ' />
            <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
            <span className='text-muted-foreground text-center text-md ' >It's our fault, not yours.</span>
        </div>
    )
}

export default Empty