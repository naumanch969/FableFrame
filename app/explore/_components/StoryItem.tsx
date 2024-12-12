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
        <Link href={'/story/' + story?._id}>
            <Card className="w-full h-[300px] col-span-12 sm:col-span-5 hover:scale-105 transition-all cursor-pointer relative rounded-lg overflow-hidden">
                {/* Conditionally render image and author details if story is public */}
                {story?.is_public && (
                    <div className="absolute top-2 left-2 flex items-center justify-start gap-1 z-10 text-white bg-black/50 py-1 px-2 rounded-lg">
                        <Image
                            src={"/sample_author_image.jpeg"}
                            alt={`${story?.title || 'Story'} cover`}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <p className="text-xs">{story?.authorName || 'Unknown Author'}</p>
                    </div>
                )}
                <Image
                    alt="Cover"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={"/sample_cover_image.jpeg"}
                    width={50}
                    height={50}
                />
                <CardFooter className="p-4 w-full flex justify-between items-center gap-1 absolute bg-white/20 bottom-0 border-t-1 border-zinc-100/50 z-10">
                    <p className="text-white text-md">{story?.title || 'Untitled Story'}</p>
                    <span className='text-xs text-white' >({story?.reading_time} mins read)</span>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default StoryItem;
