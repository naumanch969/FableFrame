import { LOGO, LOGO_MINI } from '@/constants/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({ mini, size = 'normal' }: { mini?: boolean, size?: 'normal' | 'large' }) => {
    return (
        <Link href="/" className="flex items-center gap-2">
            {
                mini
                    ?
                    <>
                        <Image src={LOGO_MINI} alt='Logo' height={32} width={32} />
                    </>
                    :
                    <img src={LOGO} alt='Logo' style={{ height: size == 'normal' ? '32px' : '48px' }} />
            }
        </Link>
    )
}

export default Logo