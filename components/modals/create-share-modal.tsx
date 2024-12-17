import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { SHARE_RESTRICTIONS } from '@/constants'
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select'
import { useCreateShare } from '@/features/share/api/use-create-share'
import { useCreateShareModal } from '@/hooks/use-create-share-modal'
import { Id } from '@/convex/_generated/dataModel'
import { useGetProfiles } from '@/features/profile/api/useGetProfiles'
import Required from '../Required'

const CreateShareModal = () => {

    const router = useRouter()
    const { data: profile } = useCurrentProfile()
    const { data: profiles } = useGetProfiles()
    const { mutate, isPending } = useCreateShare()

    const [story, setStory] = useSelectedStory()
    const [open, setOpen] = useCreateShareModal()

    const [toId, setToId] = useState<Id<"profiles"> | "">("")
    const [message, setMessage] = useState<string>("")
    const [restriction, setRestriction] = useState<typeof SHARE_RESTRICTIONS[number]['key']>("full-access")

    useEffect(() => {
        if (message) {
            // Here you can set 'type' based on 'reason' if needed in future
        }
    }, [message])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!toId) {
            toast.error('Please select a user to share with')
            return false
        }

        const input = {
            from_id: profile?._id!,
            to_id: toId!,
            story_id: story?._id!,
            shared_at: new Date().toISOString(),
            restriction,
            message,
            expires_at: new Date(Date.now() + 90).toISOString(),
        }

        console.log('input', input)

        mutate({ formData: input }, {
            onSuccess(id) {
                toast.success('Story shared successfully.')
                onClose()
            },
            onError() {
                toast.error('Failed to submit report')
            }
        })
    }

    const onClose = () => {
        setOpen(false)
        setStory(null)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Report a Story</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>

                    {/* ToId */}
                    <div className='flex flex-col gap-2' >
                        <label htmlFor="reason" className="block text-sm font-medium">To <Required /></label>
                        <Select
                            value={toId}
                            onValueChange={(e: Id<"profiles">) => setToId(e)}
                            disabled={isPending}
                            required={true}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a profile" />
                            </SelectTrigger>
                            <SelectContent>
                                {profiles?.filter(p => p?._id != profile?._id)?.map((p) => (
                                    <SelectItem key={p?._id} value={p?._id}>
                                        {p?.username} ({p?.email})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reason Select */}
                    <div className='flex flex-col gap-2' >
                        <label htmlFor="reason" className="block text-sm font-medium">Message</label>
                        <Input
                            disabled={isPending}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Reason'
                            type='text'
                        />
                    </div>

                    {/* Reason Select */}
                    <div className='flex flex-col gap-2' >
                        <label htmlFor="reason" className="block text-sm font-medium">Restriction</label>
                        <Select
                            value={restriction}
                            onValueChange={setRestriction}
                            disabled={isPending}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                {SHARE_RESTRICTIONS.map((restriction) => (
                                    <SelectItem key={restriction.key} value={restriction.key}>
                                        {restriction.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button disabled={isPending} type="submit">
                            Submit Report
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateShareModal
