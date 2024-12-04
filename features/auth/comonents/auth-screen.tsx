"use client"

import React, { useState } from 'react'
import { SignInFlow } from '../types'
import SignInCard from './sign-in-card'
import SignUpCard from './sign-up-card'

const AuthScreen = () => {

    const [state, setState] = useState<SignInFlow>("signIn")

    return (
        <div className='grid grid-cols-1 md:grid-cols-2' >
            <div className="col-span-1">
                <img src='/login.png' alt='Login' className='max-h-screen w-full' />
            </div>
            <div className="col-span-1 flex justify-center items-center h-full order-first md:order-last">
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
