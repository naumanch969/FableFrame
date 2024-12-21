import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import Image from 'next/image'
import React, { useContext } from 'react'

const DashboardHeader = () => {

    const { data } = useCurrentProfile()

    return (
        <div className='bg-primary flex justify-between items-center p-10 rounded-md' >

            <h2 className='font-bold text-3xl' >My Stories</h2>
            <div className="flex justify-end items-center gap-3">
                <Image
                    src='/coin.png'
                    alt='coin'
                    width={60}
                    height={60}
                    className=''
                />
                <span className="">{data?.credit} Credits Left</span>
            </div>

        </div>
    )
}

export default DashboardHeader