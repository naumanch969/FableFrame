"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Boxes } from "@/components/aceternity/background-boxes";
import GradientText from "@/components/GradientText";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

const CTA = () => {

    const router = useRouter()

    return (
        <div className="h-[45rem] relative w-full overflow-hidden bg-neutral flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-neutral z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />

            <h2 className={cn("md:text-6xl text-2xl font-medium text-surface-foreground relative z-20")}>
                <span className="mb-2" >Ready to Start Your</span>
                <br />
                <GradientText className="mt-1" >Magical Adventure?</GradientText>
            </h2>
            <p className="text-center my-8 text-neutral-900 relative z-20 max-w-4xl ">
                Join thousands of others in creating personalized stories in minutes. Sign up now to begin your adventure with FableFrame, and let your creativity soar.
            </p>

            <Button
                variant='gradient'
                size='cta'
                className="w-fit z-30 "
                onClick={() => router.push('/explore')}
            >
                Let's Start
            </Button>

        </div>
    );
}

export default CTA;