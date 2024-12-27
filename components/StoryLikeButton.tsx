import React from 'react'
import Hint from './Hint'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import { Story } from '@/types'
import { useLikeDislikeStory } from '@/features/like/api/useLikeDislikeStory'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'

const StoryLikeButton = ({ story }: { story: Story }) => {

    const { mutate } = useLikeDislikeStory()
    const { data: profile } = useCurrentProfile()

    const isLiked = story?.likes?.includes(profile?._id!)

    const onLike = async () => {
        await mutate({ story_id: story?._id })
    }

    return (
        <Hint label='Like' >
            <Button
                onClick={onLike} variant={isLiked ? "gradient" : "ghost"}
                size="icon"
                className={`${isLiked ? '' : 'bg-transparent'} flex items-center justify-center`}
            >
                <Heart className="w-4 h-4" />
            </Button>
        </Hint>
    )
}

export default StoryLikeButton