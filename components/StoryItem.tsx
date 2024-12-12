import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Share, Flag, Heart } from 'lucide-react';
import { FcLike } from 'react-icons/fc';

const StoryItem = ({ story }: { story: any }) => {
    return (
        <Link href={'/explore/' + story?._id} className='block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <Card className="relative w-full flex flex-col justify-between h-full bg-white p-2 ">

                <div className='' >
                    {story?.is_public && (
                        <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/60 text-white py-1 px-2 rounded-lg z-10">
                            <Image
                                src={story?.authorImage || "/sample_author_image.jpeg"}
                                alt={story?.authorName || 'Author'}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                            <p className="text-xs font-medium">{story?.authorName || 'Unknown Author'}</p>
                        </div>
                    )}
                    <Image
                        src={story?.coverImage || "/sample_cover_image.jpeg"}
                        alt={story?.title || 'Story Cover'}
                        className="w-full object-cover rounded-lg "
                        width={300}
                        height={300}
                    />

                    <h2 className="w-full flex flex-col justify-between items-start gap-1 z-10 p-1 ">
                        <p className="text-primary text-md text-start ">{story?.title || 'Untitled Story'}</p>
                        <p className="flex text-xs text-muted-foreground space-x-1 ">
                            <span className="">{story?.chapters?.length} chapters</span>
                            <span className="font-bold">.</span>
                            <span className="">{story?.reading_time} mins read</span>
                        </p>
                    </h2>
                </div>

                <div className="flex justify-end items-center gap-1 bg-white">
                    <Button variant="ghost" size="icon" className="flex items-center justify-center">
                        <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="flex items-center justify-center">
                        <Share className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="flex items-center justify-center">
                        <Flag className="w-4 h-4" />
                    </Button>
                </div>
            </Card>
        </Link>
    );
};

export default StoryItem;

StoryItem.Skeleton = () => {
    return (
        <div className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Card className="relative w-full flex flex-col justify-between h-full bg-white p-2">
                {/* Author info placeholder */}
                <div className="absolute top-2 left-2 flex items-center gap-2 bg-gray-300 text-transparent py-1 px-2 rounded-lg z-10 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-400" />
                    <div className="w-20 h-4 bg-gray-400 rounded"></div>
                </div>

                {/* Cover image placeholder */}
                <div className="w-full h-48 bg-gray-300 rounded-lg animate-pulse">
                    {/* Placeholder for Image */}
                </div>

                {/* Title and info placeholders */}
                <h2 className="w-full flex flex-col justify-between items-start gap-1 z-10 p-1 animate-pulse">
                    <div className="w-2/3 h-4 bg-gray-400 rounded"></div>
                    <div className="flex text-xs space-x-1">
                        <div className="w-1/4 h-3 bg-gray-400 rounded"></div>
                        <div className="w-1/12 h-3 bg-gray-400 rounded"></div>
                        <div className="w-1/4 h-3 bg-gray-400 rounded"></div>
                    </div>
                </h2>

                {/* Buttons placeholder */}
                <div className="flex justify-end items-center gap-1 bg-white animate-pulse">
                    <Button variant="ghost" size="icon" className="flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </Button>
                    <Button variant="ghost" size="icon" className="flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </Button>
                    <Button variant="ghost" size="icon" className="flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </Button>
                </div>
            </Card>
        </div>
    );
};
