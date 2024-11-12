"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const Hero: FC = () => {
    return (
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2">

            <div className="">
                <h2 className='text-[70px] text-primary font-extrabold py-10 ' >Craft Magical Stories for kids in Minutes</h2>
                <p className="text-2xl text-primary font-light ">Create fun and personalized stories that bring your child's adventures to life and spark their passion for reading. It only takes a few seconds!</p>
                <Link href='/create-story' >
                    <Button size='xl' className='mt-5' >Create Story</Button>
                </Link>
            </div>
            <div className="">
                <Image src='/hero.png' alt='Hero' width={700} height={400} />
            </div>

        </section>
    )
}

export default Hero
