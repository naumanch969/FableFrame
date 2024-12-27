import { LOGO, LOGO_MINI } from '@/constants/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({ mini = false, size = 'normal' }: { mini?: boolean, size?: 'normal' | 'large' }) => {
    return (

        mini
            ?
            <Link href="/" className="">
                <Image src={LOGO_MINI} alt='Logo' height={32} width={32} />
            </Link>
            :
            <Link href="/" className="flex items-center gap-0.5">
                <Image src={LOGO_MINI} alt='Logo' height={size == 'normal' ? 32 : 48} width={size == 'normal' ? 32 : 48} />
                <span
                    style={{ fontFamily: 'Montserrat' }}
                    className={`${size == 'normal' ? 'text-2xl' : 'text-3xl'} font-bold text-primary`}
                >FableFrame</span>
            </Link>
    )
}

export default Logo