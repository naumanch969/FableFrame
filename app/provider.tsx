"use client"

import ThemeProvider from '@/wrappers/ThemeProvider'
import React, { ReactNode, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from './(landingpage)/components/Navbar'
import { db } from '@/config/db'
import { User } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from './_context/UserDetailContext'

const Provider = ({ children }: { children: ReactNode }) => {

    const { user } = useUser()
    const [userDetail, setUserDetail] = useState<any>(null)

    useEffect(() => {
        if (user) {
            saveUser(user)
        }
    }, [user])

    const saveUser = async (user: any) => {
        // check if user exists
        const result = await db
            .select()
            .from(User)
            // .where(eq(User.userEmail, user.primaryEmailAddress?.emailAddress ?? ""))

        if (result.length === 0) {
            // const newUser = await db.insert(User).values({
            //     userName: user.fullName,
            //     userEmail: user.primaryEmailAddress?.emailAddress,
            //     userImage: user?.userImage
            // })
            //     .returning({
            //         userEmail: User.userEmail,
            //         userName: User.userName,
            //         userImage: User.userImage,
            //         credit: User.credit,
            //     })

            // setUserDetail(newUser)
        }
        else {
            setUserDetail(result[0])
        }
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }} >
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
            >
                <ToastContainer />
                <div className="bg-[#cad3ff]">
                    <div className="max-w-7xl mx-auto">
                        <div className="min-h-screen">
                            <Navbar />
                            {children}
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </UserDetailContext.Provider>
    )
}

export default Provider