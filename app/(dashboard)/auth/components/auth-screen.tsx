"use client"

import React, { useState } from 'react'
import SignInCard from './sign-in-card'
import SignUpCard from './sign-up-card'
import Image from 'next/image'
import { SignInFlow } from '@/types'

const AuthScreen = () => {

    const [state, setState] = useState<SignInFlow>("signIn")

    return (
        <div style={{ height: 'calc(100vh - 8rem)' }} className='flex flex-col justify-center items-center gap-6' >

            <div className="flex justify-start items-center gap-4">
                <div className="w-16 h-16 relative ">
                    <Image
                        src='/logo.svg'
                        alt='Logo'
                        layout='fill'
                        className=''
                    />
                </div>
                <h2 className="font-bold text-3xl text-primary">StoryBot</h2>
            </div>
            <div className="md:h-auto md:w-[420px] ">
                {
                    state == 'signIn'
                        ?
                        <SignInCard setState={setState} />
                        :
                        <SignUpCard setState={setState} />
                }
            </div>
        </div>
    )
}

export default AuthScreen
