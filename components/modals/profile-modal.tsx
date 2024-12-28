import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/aceternity/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { SHARE_RESTRICTIONS } from '@/constants'
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select'
import { Id } from '@/convex/_generated/dataModel'
import { useGetProfiles } from '@/features/profile/api/useGetProfiles'
import Required from '../Required'
import { useProfileModal } from '@/hooks/use-profile-modal'
import { useUpdateProfile } from '@/features/profile/api/useUpdateProfile'
import { Textarea } from '../ui/textarea'

const ProfileModal = () => {

    const { data: profile } = useCurrentProfile()
    const { data: profiles } = useGetProfiles()
    const { mutate, isPending } = useUpdateProfile()

    const [open, setOpen] = useProfileModal()

    const [toId, setToId] = useState<Id<"profiles"> | "">("")
    const [username, setUsername] = useState<string>(profile?.username!)
    const [location, setLocation] = useState<string>(profile?.location!)
    const [DOB, setDOB] = useState<string>(profile?.date_of_birth!)
    const [bio, setBio] = useState<string>(profile?.bio!)
    const [restriction, setRestriction] = useState<typeof SHARE_RESTRICTIONS[number]['key']>("full-access")

    useEffect(() => {
        setUsername(profile?.username!)
        setLocation(profile?.location!)
        setDOB(profile?.date_of_birth!)
        setBio(profile?.bio!)
    }, [profile])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate({
            formData: {
                profile_id: profile?._id!,
                username,
                location,
                date_of_birth: DOB,
                bio,
            }
        }, {
            onSuccess() {
                toast.success('Profile updated successfully.', { position: 'top-right' })
                onClose()
            },
            onError() {
                toast.error('Failed to submit report', { position: 'top-right' })
            }
        })
    }

    const onClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>

                    <div className='flex flex-col gap-2' >
                        <label htmlFor="username" className="block text-sm font-medium">Username</label>
                        <Input
                            disabled={isPending}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
                            type='text'
                        />
                    </div>

                    <div className='flex flex-col gap-2' >
                        <label htmlFor="location" className="block text-sm font-medium">Location</label>
                        <Input
                            disabled={isPending}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder='Location'
                            type='text'
                        />
                    </div>

                    <div className='flex flex-col gap-2' >
                        <label htmlFor="dob" className="block text-sm font-medium">Date of Birth</label>
                        <Input
                            disabled={isPending}
                            value={DOB}
                            onChange={(e) => setDOB(e.target.value)}
                            placeholder='Date of Birth'
                            type='date'
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className='flex flex-col gap-2' >
                        <label htmlFor="bio" className="block text-sm font-medium">Bio</label>
                        <Textarea
                            rows={3}
                            disabled={isPending}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder='A little description about yourself...'
                        />
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

export default ProfileModal
