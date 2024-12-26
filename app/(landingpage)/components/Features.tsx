"use client";
import { HeroParallax } from "@/components/aceternity/hero-parallax";
import GradientText from "@/components/GradientText";
import React from "react";

const Features = () => {

    const Header = () => {
        return (
            <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
                <h1 className="text-2xl md:text-7xl font-bold text-surface-foreground dark:text-surface-foreground">
                    Some of Our <br /> Magical Stories
                </h1>
                <p className="max-w-2xl text-base md:text-xl mt-8 text-surface-foreground dark:text-neutral-200">
                    Dive into a world of magical stories crafted to inspire and entertain.
                    From enchanting tales for children to captivating adventures for adults,
                    our platform lets you bring <GradientText>your imagination to life.</GradientText>
                </p>
            </div>
        );
    };

    return (
        <div className="">
            <HeroParallax
                products={products}
                titleComponent={<Header />}
            />;
        </div>
    )
}
export default Features;

export const products = [
    {
        title: "Moonbeam",
        link: "https://gomoonbeam.com",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Cursor",
        link: "https://cursor.so",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Rogue",
        link: "https://userogue.com",
        thumbnail: "/watercolor.png",
    },

    {
        title: "Editorially",
        link: "https://editorially.org",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Editrix AI",
        link: "https://editrix.ai",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Pixel Perfect",
        link: "https://app.pixelperfect.quest",
        thumbnail: "/watercolor.png",
    },

    {
        title: "Algochurn",
        link: "https://algochurn.com",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Aceternity UI",
        link: "https://ui.aceternity.com",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Tailwind Master Kit",
        link: "https://tailwindmasterkit.com",
        thumbnail: "/watercolor.png",
    },
    {
        title: "SmartBridge",
        link: "https://smartbridgetech.com",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Renderwork Studio",
        link: "https://renderwork.studio",
        thumbnail: "/watercolor.png",
    },

    {
        title: "Creme Digital",
        link: "https://cremedigital.com",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Golden Bells Academy",
        link: "https://goldenbellsacademy.com",
        thumbnail: "/watercolor.png",
    },
    {
        title: "Invoker Labs",
        link: "https://invoker.lol",
        thumbnail: "/watercolor.png",
    },
    {
        title: "E Free Invoice",
        link: "https://efreeinvoice.com",
        thumbnail: "/watercolor.png",
    },
];
