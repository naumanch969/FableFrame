import React from 'react'
import Hint from './Hint'
import { Button } from './ui/button'
import { Story } from '@/types'
import { useCreateShareModal } from '@/hooks/use-create-share-modal'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { Share2 } from 'lucide-react'

const StoryShareButton = ({ story }: { story: Story }) => {

    const [_openShareModal, setOpenShareModal] = useCreateShareModal()
    const [_story, setStory] = useSelectedStory()

    const onShare = () => {
        setStory(story)
        setOpenShareModal(true)
    }

    return (
        <Hint label='Share' >
            <Button onClick={onShare} variant="ghost" size="icon" className="bg-transparent relative flex items-center justify-center ">
                {
                    story?.shares?.length > 0 &&
                    <span className="absolute -top-1 -right-1 bg-theme-gradient text-primary-foreground rounded-full flex justify-center items-center text-xs w-4 h-4 ">
                        {story?.shares?.length}
                    </span>
                }
                <Share2 className="w-4 h-4" />
            </Button>
        </Hint>
    )
}

export default StoryShareButton