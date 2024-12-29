import Logo from '@/components/Logo'
import { cn } from '@/lib/utils'
import React from 'react'

const LoadingScreen = ({ text, className }: { text?: string, className?: string }) => {
    return (
        <div className={cn(
            'w-screen h-screen flex flex-col justify-center items-center gap-1 ',
            className
        )} >
            <div className='animate-pulse' >
                <Logo size='large' />
            </div>
            <p className='text-md font-semibold text-gray-800' >
                {text}
            </p>
        </div>
    )
}

export default LoadingScreen