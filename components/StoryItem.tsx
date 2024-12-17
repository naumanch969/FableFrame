import React from 'react';
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Share, Flag, Heart, Share2, Haze, Ellipsis } from 'lucide-react';
import Hint from './Hint';
import { useLikeDislikeStory } from '@/features/like/api/use-like-dislike-story';
import { user } from '@nextui-org/react';
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useCreateReportModal } from '@/hooks/use-create-report-modal';
import { useSelectedStory } from '@/hooks/use-selected-story';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useCreateShareModal } from '@/hooks/use-create-share-modal';

interface Props {
    story: Doc<"stories"> & {
        author: Doc<"profiles">,
        likes: (Id<"profiles">)[],
        shares: (Id<"shares">)[],
        reports: (Id<"profiles">)[],
    }
}
const StoryItem = ({ story }: Props) => {

    const { mutate } = useLikeDislikeStory()
    const { data: profile } = useCurrentProfile()

    const [_openReportModal, setOpenReportModal] = useCreateReportModal()
    const [_openShareModal, setOpenShareModal] = useCreateShareModal()
    const [_story, setStory] = useSelectedStory()

    const isLiked = story?.likes?.includes(profile?._id!)
    const isReported = story?.reports?.includes(profile?._id!)

    const onLike = async () => {
        await mutate({ story_id: story?._id })
    }

    const onReport = () => {
        setStory(story)
        setOpenReportModal(true)
    }

    const onShare = () => {
        setStory(story)
        setOpenShareModal(true)
    }

    return (
        <div className='block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <Card className="relative w-full flex flex-col justify-between h-full bg-white p-2 ">
                <div className="absolute top-2 right-2 py-1.5 px-1.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size='icon' variant='ghost' >
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-24">
                            <DropdownMenuItem>
                                <button
                                    onClick={onReport}
                                    className="flex items-center gap-1 w-full text-left cursor-pointer "
                                >
                                    <Flag className="w-4 h-4" /> Report
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Image
                    src={story?.cover_image || "/sample_cover_image.jpeg"}
                    alt={story?.title || 'Story Cover'}
                    className="w-full object-cover rounded-lg "
                    width={300}
                    height={300}
                />

                <Link href={'/explore/' + story?._id}>
                    <h2 className="w-full flex flex-col justify-between items-start gap-1 z-10 p-1 ">
                        <p className="text-primary text-md text-start ">{story?.title || 'Untitled Story'}</p>
                        <p className="flex text-xs text-muted-foreground space-x-1 ">
                            <span className="">{story?.chapters?.length} chapters</span>
                            <span className="font-bold">.</span>
                            <span className="">{story?.reading_time} mins read</span>
                        </p>
                    </h2>
                </Link>

                <div className="w-full flex justify-between items-center">
                    <Link href='/profile' className="flex items-center gap-2 rounded-lg z-10">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={story?.author?.profile_picture_url} alt={story?.author?.username} />
                            <AvatarFallback className="capitalize text-md" >{story?.author?.username?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium capitalize">{story?.author?.username || 'Unknown Author'}</p>
                    </Link>
                    <div className="flex justify-end items-center gap-1 bg-white">
                        <Hint label='Like' >
                            <Button onClick={onLike} variant={isLiked ? "default" : "ghost"} size="icon" className="flex items-center justify-center">
                                <Heart className="w-4 h-4" />
                            </Button>
                        </Hint>
                        <Hint label='Share' >
                            <Button onClick={onShare} variant="ghost" size="icon" className="relative flex items-center justify-center">
                                {
                                    story?.shares?.length > 0 &&
                                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full flex justify-center items-center text-xs w-4 h-4 ">
                                        {story?.shares?.length}
                                    </span>
                                }
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </Hint>
                    </div>
                </div>
            </Card>
        </div>
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
