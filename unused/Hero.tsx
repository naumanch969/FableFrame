"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const HeroScrollComponent: FC = () => {

    const words = ['yourself', 'kids', 'teens', 'everyone'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const wordsDelay = 3500;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentWordIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex < words.length) {
                    console.log(nextIndex);
                    return nextIndex;
                }
                return prevIndex;
            });
        }, wordsDelay);

        return () => clearTimeout(timeout);
    }, [currentWordIndex]);

    return (
        <section className="py-24 grid grid-cols-1 md:grid-cols-2">
            <div>
                <h2 className="text-[70px] leading-[1.4] text-primary font-extrabold pt-10 pb-4">
                    <span className="">Craft Magical Stories for</span>
                    <br />
                    <span className="relative inline-block overflow-hidden bg-white px-8 py-1 rounded-full ">
                        <span
                            key={words[currentWordIndex]}
                            className={`${currentWordIndex == (words.length - 1) ? 'animate-slide-from-up' : 'animate-slide-down'} block text-[64px] bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent`}
                        >
                            {words[currentWordIndex]}
                        </span>
                    </span>
                    <br />
                    <span className="relative -top-4">in Minutes</span>
                </h2>
                <p className="text-2xl text-primary font-light">
                    Create fun and personalized stories that bring your child's adventures
                    to life and spark their passion for reading. It only takes a few
                    seconds!
                </p>
                <Link href="/create-story">
                    <Button size="xl" className="mt-5">
                        Create Story
                    </Button>
                </Link>
            </div>
            <div>
                <Image src="/hero.png" alt="Hero" width={700} height={400} />
            </div>
        </section>
    );
};

export default HeroScrollComponent;
