import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/aceternity/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { SHARE_RESTRICTIONS } from '@/constants'
import { useCreateShare } from '@/features/share/api/use-create-share'
import { useCreateShareModal } from '@/hooks/use-create-share-modal'
import { Id } from '@/convex/_generated/dataModel'
import { useGetProfiles } from '@/features/profile/api/useGetProfiles'
import { Profile } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import { useGetMyFriends } from '@/features/friend/api/useGetMyFriends'

const CreateShareModal = () => {

    ////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
    const { data: profile } = useCurrentProfile()
    const { data: profiles } = useGetMyFriends()
    const { mutate, isPending } = useCreateShare()

    const [story, setStory] = useSelectedStory()
    const [open, setOpen] = useCreateShareModal()

    ////////////////////////////////////////////////// STATES ///////////////////////////////////////////////
    const [toIds, setToIds] = useState<Id<"profiles">[]>([])
    const [message, setMessage] = useState<string>("")
    const [restriction, setRestriction] = useState<typeof SHARE_RESTRICTIONS[number]['key']>("full-access")

    ////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (toIds?.length == 0) {
            toast.error('Please select a user to share with', { position: 'top-right' })
            return false
        }

        const input = {
            from_id: profile?._id!,
            to_id: toIds!,
            story_id: story?._id!,
            shared_at: new Date().toISOString(),
            restriction,
            message,
            expires_at: new Date(Date.now() + 90).toISOString(),
        }

        mutate({ formData: input }, {
            onSuccess(id) {
                toast.success('Story shared successfully.', { position: 'top-right' })
                onClose()
            },
            onError() {
                toast.error('Failed to share the story.', { position: 'top-right' })
            }
        })
    }

    const onClose = () => {
        setOpen(false)
        setStory(null)
    }

    ////////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
    const ProfileItem = ({ profile }: { profile: Profile }) => {

        const isExist = toIds.includes(profile?._id!)

        const onAdd = () => {
            if (isExist) {
                setToIds(pre => pre.filter(id => id != profile?._id))
            }
            else {
                setToIds([...toIds, profile?._id!])
            }
        }

        return (
            <div
                onClick={onAdd}
                className={`${isExist ? 'bg-theme-gradient text-white' : 'bg-surface'} hover:bg-theme-gradient mb-2 col-span-1 rounded-lg flex flex-col justify-center cursor-pointer items-center gap-1 p-2 aspect-[1/1]`}
            >
                <Avatar>
                    <AvatarImage src={profile?.profile_picture_url} />
                    <AvatarFallback className='text-surface-foreground capitalize'>
                        {profile?.username?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <h5 className="text-xs font-medium truncate w-full text-center">
                    {profile?.username}
                </h5>
            </div>

        );
    };

    ////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] overflow-y-auto transition-all ">
                <DialogHeader>
                    <DialogTitle>Share Story</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4 w-full transition-all">
                    <div className="grid grid-cols-5 gap-2 w-full">
                        {profiles?.map((profile, index) => (
                            <ProfileItem key={index} profile={profile!} />
                        ))}
                    </div>

                    {toIds?.length > 0 && (
                        <>
                            <motion.div
                                className="flex flex-col gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <label htmlFor="reason" className="block text-sm font-medium">
                                    Message
                                </label>
                                <Input
                                    disabled={isPending}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message"
                                    type="text"
                                />
                            </motion.div>

                            <motion.div
                                className="flex justify-end"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button disabled={isPending} type="submit">
                                    Submit Report
                                </Button>
                            </motion.div>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateShareModal
