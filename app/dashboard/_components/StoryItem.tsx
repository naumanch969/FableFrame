import React from 'react';
import {
    Card,
    CardFooter,
} from "@/components/ui/card";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StoryItem = ({ story }: { story: any }) => {
    return (
        <Link href={'/story/' + story?.id}>
            <Card className="w-full h-[300px] col-span-12 sm:col-span-5 hover:scale-105 transition-all cursor-pointer relative">
                {/* Conditionally render image and author details if story is public */}
                {story?.isPublic && (
                    <div className="absolute top-4 left-4 z-10 text-white bg-black/50 p-2 rounded-lg">
                        <Image
                            src={story?.coverImage || "https://via.placeholder.com/150"}
                            alt={`${story?.title || 'Story'} cover`}
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                        />
                        <p className="mt-2 text-sm font-semibold">{story?.authorName || 'Unknown Author'}</p>
                    </div>
                )}
                <Image
                    alt="Cover"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={story?.coverImage || "https://nextui.org/images/card-example-6.jpeg"}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-xl">{story?.title || 'Untitled Story'}</p>
                    </div>
                    <Button className="text-tiny" color="primary" size="sm">
                        Read Now
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default StoryItem;
