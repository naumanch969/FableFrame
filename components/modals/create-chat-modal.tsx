import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useGetMyFriends } from '@/features/friend/api/useGetMyFriends'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Id } from '@/convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import { useCreateChat } from '@/features/chat/api/useCreateChat'
import { Profile } from '@/types'
import { useCreateChatModal } from '@/hooks/use-create-chat-modal'
import { Search } from 'lucide-react'

const CreateChatModal = () => {

    const router = useRouter()
    const { mutate, isPending } = useCreateChat()
    const { data: fetchedFriends } = useGetMyFriends()

    const [open, setOpen] = useCreateChatModal()

    const [friends, setFriends] = useState(fetchedFriends)
    const [searchQuery, setSearchQuery] = useState('')
    const [friendId, setFriendId] = useState('')

    useEffect(() => {
        setFriends(fetchedFriends)
    }, [fetchedFriends])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!friendId) {
            toast.error('Please select a friend.', { position: 'top-right' })
            return false
        }

        mutate({ formData: { other_profile_id: friendId as Id<"profiles"> } }, {
            onSuccess(id) {
                toast.success('Chat created successfully.', { position: 'top-right' })
                router.push('/chats?id=' + id)
                onClose()
            },
            onError() {
                toast.error('Failed to submit report', { position: 'top-right' })
            }
        })
    }

    const onSearch = () => {
        setFriends(fetchedFriends?.filter((friend) =>
            friend?.username.toLowerCase().includes(searchQuery.toLowerCase())
            || friend?.email.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    }

    const onClose = () => {
        setOpen(false)
    }

    //////////////////////////////////////////////// COMPONENTS //////////////////////////////////////////////////////////
    const ProfileItem = ({ profile }: { profile: Profile }) => {

        return (
            <div
                onClick={() => setFriendId(profile?._id)}
                className={`${profile?._id == friendId ? 'bg-primary text-primary-foreground' : 'bg-white'} rounded-lg flex justify-between cursor-pointer items-start gap-1 p-2 hover:bg-primary hover:text-white `}
            >
                <div className="flex justify-between items-center gap-2">
                    <Avatar>
                        <AvatarImage src={profile?.profile_picture_url} />
                        <AvatarFallback className='text-neutral-700 capitalize' >{profile?.username?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex w-fit flex-col ">
                        <h5 className="text-md font-medium truncate ">
                            {profile?.username}
                        </h5>
                        <p className="text-xs truncate ">{profile?.email}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Chat</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>

                    <div className="flex flex-col gap-4">
                        <div className='flex flex-col gap-2 relative' >
                            <input
                                disabled={isPending}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search friend...'
                                type='text'
                                className="w-full rounded-xl border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                                onKeyUp={onSearch}
                            />
                            <button type="button" title="Search" className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Search />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 max-h-[22rem] overflow-y-auto ">
                            {friends?.map((friend, index) => (
                                <ProfileItem key={index} profile={friend!} />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button disabled={isPending} type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChatModal
