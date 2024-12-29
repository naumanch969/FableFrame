"use client";
import React from "react";
import { ContainerScroll } from "@/components/aceternity/container-scroll-animation";
import HeroScrollComponent from "./HeroScrollComponent";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {

    const router = useRouter()


    return (
        <div className="flex flex-col overflow-hidden">


            <ContainerScroll
                cardClassname="max-w-6xl h-[30rem] md:h-[45rem] "
                titleComponent={
                    <div className="flex flex-col items-center gap-2" >
                        <Button
                            variant='gradient'
                            size='cta'
                            onClick={() => router.push('/explore')}
                            className="w-fit"
                        >
                            Start Creating
                        </Button>
                        <Heading />
                        <br />
                    </div>
                }
            >
                <HeroScrollComponent />
            </ContainerScroll>
        </div>
    );
}



export function Heading() {
    return (
        <motion.h1
            initial={{ opacity: 0, y: 20, }}
            animate={{ opacity: 1, y: [20, -5, 0], }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], }}
            className="text-4xl font-semibold text-surface-foreground dark:text-surface-foreground px-4 md:text-4xl lg:text-5xl max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
            Unleash the power of <br />
            <span className="text-4xl lg:text-[6rem] md:text-[4.5rem] font-bold mt-2 leading-none">
                Your Imagination
            </span>
            {/* <Highlight className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-4xl md:text-[6rem] font-bold mt-2 leading-none">
                Your Imagination
            </Highlight> */}
        </motion.h1>
    );
}
export default Hero;

