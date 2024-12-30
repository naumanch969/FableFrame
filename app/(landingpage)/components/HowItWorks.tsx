import { Timeline } from "@/components/aceternity/timeline";
import Image from "next/image";
import React from "react";

const HowItWorks = () => {

    const data = [
        {
            title: "Sign Up",
            content: (
                <div>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Sign Up and Create Your Profile
                    </p>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Get started by creating an account. Save your stories and track your progress.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/how_it_works/signin.png"
                            alt="Sign In Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-fit w-full shadow-[...]"
                        />
                        <Image
                            src="/how_it_works/signup.png"
                            alt="Sign Up Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-fit w-full shadow-[...]"
                        />
                    </div>
                </div>
            ),
            description: "Create an account and set up your profile to get started. This step unlocks all features, letting you save your stories and monitor progress."
        },
        {
            title: "Explore Stories",
            content: (
                <div>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        You can explore some of our unique stories.
                    </p>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Browse a diverse range of stories crafted to inspire and entertain. Discover stories tailored to various interests and genres.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/how_it_works/explore.png"
                            alt="Hero Section Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
                            />
                        <Image
                            src="/how_it_works/explore2.png"
                            alt="Feature Section Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
                        />
                    </div>
                </div>
            ),
            description: ""
        },
        {
            title: "Create",
            content: (
                <div>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Let the AI Create Your Story
                    </p>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Customize your story by selecting your preferences, and let our AI bring your ideas to life in minutes.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/how_it_works/create.png"
                            alt="Create Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover w-full shadow-[...]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Read",
            content: (
                <div>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Read and enjoy your personalized stories or dive into ones shared by the community.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/how_it_works/read.png"
                            alt="Read Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
                        />
                        <Image
                            src="/how_it_works/read2.png"
                            alt="Read Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Share or Save",
            content: (
                <div>
                    <p className="text-surface-foreground dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Share your masterpiece with the world or save it privately to revisit whenever you want.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Image
                            src="/how_it_works/share.png"
                            alt="Share Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-fit w-full shadow-[...]"
                        />
                        <Image
                            src="/how_it_works/share2.png"
                            alt="Save Template"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover h-fit w-full shadow-[...]"
                        />
                    </div>
                </div>
            )
        },
    ];


    return (
        <div className="w-full py-20 ">
            <Timeline
                titleComponent={
                    <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                        <h2 className="text-2xl md:text-7xl font-bold text-surface-foreground dark:text-surface-foreground">
                            How It Works
                        </h2>
                        <p className="max-w-2xl text-base md:text-xl mt-8 text-surface-foreground dark:text-neutral-200">
                            Creating your personalized story is easy and fun. Just follow these steps!
                        </p>
                    </div>
                }
                data={data}
            />
        </div>
    );
}

export default HowItWorks;