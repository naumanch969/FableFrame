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
        <section className="grid grid-cols-1 md:grid-cols-2 items-center h-full px-12 bg-neutral ">
            <div className='' >
                <h2 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl leading-[1.4] text-primary font-extrabold">
                    <span className="">Craft Magical Stories for</span>
                    <br />
                    <span className="relative inline-block overflow-hidden bg-surface px-8 py-1 rounded-full ">
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
            </div>
            <div>
                <Image src="/hero.png" alt="Hero" width={700} height={400} className="lg:w-[700px] lg:h-[400px] md:w-[600px] md:h-[350px] sm:w-[500px] sm:h-[300px] " />
            </div>
        </section>
    );
};

export default HeroScrollComponent;
