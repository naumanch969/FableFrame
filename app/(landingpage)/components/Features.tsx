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
        title: "Divergent",
        link: "http://localhost:3000/explore/k57ezzycbqbsmwbxkj5dtp24d176t7rg",
        thumbnail: "/stories/divergent.png",
    },
    {
        title: "Ice Age Adventure",
        link: "http://localhost:3000/explore/k573h54qa10nqwqcn4q0w46a4d773dff",
        thumbnail: "/stories/ice_age_adventure.webp",
    },
    {
        title: "The Banshee's Cry",
        link: "http://localhost:3000/explore/k575vhytghw39wmjqrj9ycvhss77cm30",
        thumbnail: "/stories/the_banshees_cry.png",
    },

    {
        title: "Whispers of the Forgotten Star",
        link: "http://localhost:3000/explore/k576ywt2gh3hf85k06refz1s2576zprs",
        thumbnail: "/stories/whispers_of_the_forgotten_stars.png",
    },
    {
        title: "Madagascar: The Crystal Cave",
        link: "http://localhost:3000/explore/k5768hd6dc1ejqaebpt8y0t5n57731wj",
        thumbnail: "/stories/madagascar.webp",
    },
    {
        title: "Horrific Murder",
        link: "http://localhost:3000/explore/k57abx25wexbnr5jrkweevqzvx76pnn9",
        thumbnail: "/stories/horrific_murder.png",
    },
    {
        title: "Inception",
        link: "http://localhost:3000/explore/k57311hkzgbx7176mtyfzk7zyd76qy79",
        thumbnail: "/stories/inception.png",
    },
    {
        title: "Pirates of the Caribbean: The Sunken Kingdom",
        link: "http://localhost:3000/explore/k57cpbr5mdgmjmwkgm6ey5x8s576qpmh",
        thumbnail: "/stories/pirates_of_the_caribbean.png",
    },
    {
        title: "The Whispering Woods and the Lost City of Eldoria",
        link: "http://localhost:3000/explore/k57cbk4heg8k8q992wgdyzs16976kswd",
        thumbnail: "/stories/the_lost_city_eldorida.png",
    },
    {
        title: "Chocolate Land",
        link: "http://localhost:3000/explore/k575yxg5w39v5351jn5d6dne7s76kqj0",
        thumbnail: "/stories/chocolate_land.png",
    },
    {
        title: "Strike the Zither",
        link: "http://localhost:3000/explore/k57aczvhwt1ragyks4njg10mys76tshn",
        thumbnail: "/stories/strike_the_zither.png",
    },

    {
        title: "Muslim Conquest of Persia",
        link: "http://localhost:3000/explore/k5762a3k3m5nka9rdk67e9911976w017",
        thumbnail: "/stories/muslim_conquest_of_persia.png",
    },
    {
        title: "Only You and Me",
        link: "http://localhost:3000/explore/k57cgbyg5ngp2r3hakf1gejse576yybg",
        thumbnail: "/stories/only_you_and_me.png",
    },
    {
        title: "Lost Mystery",
        link: "http://localhost:3000/explore/k57111zb26vvbar40wa3sytpk176k37n",
        thumbnail: "/stories/lost_mystery.png",
    },
    {
        title: "Mystery Land",
        link: "http://localhost:3000/explore/k573kzk1q1cbhf231r7wj0hp3d76mdwb",
        thumbnail: "/stories/mystery_land.webp",
    },
];
