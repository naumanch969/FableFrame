import Logo from '@/components/Logo'
import React from 'react'

const Loading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center ' >
            <div className='animate-pulse' >
                <Logo size='large' />
            </div>
        </div>
    )
}

export default Loading
