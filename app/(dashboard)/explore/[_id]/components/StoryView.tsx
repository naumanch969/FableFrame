import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Heart, Share2 } from "lucide-react";
import { useGetStory } from "@/features/story/api/useGetStory";
import { useStoryId } from "@/hooks/use-story-id";
import { Id } from "@/convex/_generated/dataModel";
import Loader from "@/components/Loader";
import { ContentPage, CoverPage, EndPage } from "./Page";
import Thumbnails from "./Thumbnails";
import HTMLFlipBook from "react-pageflip";
import Hint from "@/components/Hint";
import { useSelectedStory } from "@/hooks/use-selected-story";
import { useCreateShareModal } from "@/hooks/use-create-share-modal";
import { useLikeDislikeStory } from "@/features/like/api/useLikeDislikeStory";
import { useGetProfile } from "@/features/profile/api/useGetProfile"
import { Card } from "@/components/ui/card";
import CommentBox from "./CommentBox";
import { Badge } from "@/components/ui/badge";

const StoryView = () => {

    ////////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////////
    const id = useStoryId() as Id<"stories">;
    const flipBookRef = useRef(null);
    const { data: story, isLoading } = useGetStory({ id });
    const { mutate } = useLikeDislikeStory();
    const { data: profile } = useGetProfile();

    const [currentPage, setCurrentPage] = useState(0);
    const currentPageRef = useRef(currentPage); // to keep track of the current page without re-renders
    const [_openShareModal, setOpenShareModal] = useCreateShareModal();
    const [_story, setStory] = useSelectedStory();

    const chapters = story?.chapters || [];
    const totalPages = chapters.length;
    // @ts-ignore
    const isLiked = story?.likes?.includes(profile?._id!);

    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);

    ////////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////////
    const onFlip = (e: any) => {
        setCurrentPage(e?.data);
    };

    const onLike = async () => {
        await mutate({ story_id: story?._id! });
    };

    const onShare = () => {
        // @ts-ignore
        setStory(story!);
        setOpenShareModal(true);
    };

    const handleNext = () => {
        if (currentPage < totalPages + 1) {
            // @ts-ignore
            flipBookRef?.current?.pageFlip()?.flipNext();
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            // @ts-ignore
            flipBookRef.current?.pageFlip()?.flipPrev();
            setCurrentPage(currentPage - 1);
        }
    };

    const moveTo = (pageNumber: number) => {
        if (flipBookRef?.current) {
            // @ts-ignore
            flipBookRef.current?.pageFlip()?.flip(pageNumber);
            currentPageRef.current = pageNumber;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[90vh] flex justify-center items-center">
                <Loader src="/loader.gif" title="Loading story for you..." />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 relative py-6">
            <div className="flex flex-col items-center gap-4 w-full">
                {/* Heading */}
                <Card className="relative bg-card w-full rounded-lg flex justify-center items-center p-4">
                    <h2 className="font-bold text-3xl text-center text-foreground rounded-md">
                        {story?.title}
                    </h2>
                    <div className="absolute left-4 flex justify-end items-center gap-2 bg-background">
                        <Badge className='capitalize' >{story?.genre}</Badge>
                        <Badge className='capitalize' >{story?.age_category}</Badge>
                    </div>
                    <div className="absolute right-4 flex justify-end items-center gap-2 bg-background">
                        <Hint label='Like' >
                            <Button onClick={onLike} variant={isLiked ? "default" : "ghost"} size="icon" className="flex items-center justify-center">
                                <Heart className="w-6 h-6" />
                            </Button>
                        </Hint>
                        <Hint label='Share' >
                            <Button onClick={onShare} variant="ghost" size="icon" className="relative flex items-center justify-center">
                                {
                                    // @ts-ignore
                                    story?.shares?.length > 0 &&
                                    <span className="absolute -top-1 -right-1 bg-theme-gradient text-primary-foreground rounded-full flex justify-center items-center text-xs w-4 h-4 ">
                                        {/* @ts-ignore */}
                                        {story?.shares?.length}
                                    </span>
                                }
                                <Share2 className="w-6 h-6" />
                            </Button>
                        </Hint>
                    </div>
                </Card>


                <Card className="relative flex justify-center w-full rounded-lg">
                    {/* @ts-ignore */}
                    <HTMLFlipBook
                        width={1200}
                        height={1200}
                        size="stretch"
                        minWidth={315}
                        maxWidth={1200}
                        minHeight={400}
                        maxHeight={1200}
                        maxShadowOpacity={0.5}
                        // showCover={false} // Ensures the layout does not leave empty panes
                        mobileScrollSupport={true}
                        onFlip={onFlip}
                        className="shadow-lg w-full bg-card rounded-lg overflow-hidden"
                        disableFlipByClick={true}
                        ref={flipBookRef}
                    >
                        {/* Cover Page Duplicate (Right Pane) */}
                        <div className="page">
                            <CoverPage title={story?.title || ""} coverImage={story?.cover_image || "/sample_cover_image.jpeg"} />
                        </div>

                        {/* Content Pages */}
                        {chapters?.map((chapter: any, index: number) => (
                            <div key={index} className="page">
                                <ContentPage
                                    content={chapter?.text}
                                    image={chapter?.image?.url}
                                    pageNumber={index + 1}
                                    title={chapter?.title}
                                />
                            </div>
                        ))}

                        {/* End Page */}
                        <div className="page">
                            <EndPage />
                        </div>
                    </HTMLFlipBook>

                    {/* Left Arrow */}
                    {
                        currentPage > 0 &&
                        <button
                            title='Previous'
                            onClick={handlePrev}
                            disabled={currentPage === 0}
                            className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-surface rounded-full p-2"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    }

                    {/* Right Arrow */}
                    {
                        currentPage < totalPages &&
                        <button
                            title='Next'
                            onClick={handleNext}
                            disabled={currentPage >= totalPages + 1}
                            className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-surface rounded-full p-2"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    }

                </Card>

                <Card className="flex justify-center w-fit overflow-hidden">
                    <Thumbnails
                        story={story}
                        currentPage={currentPage}
                        moveTo={moveTo}
                    />
                </Card>

                <CommentBox />
            </div>
        </div>
    );
};

export default StoryView;
