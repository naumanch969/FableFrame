import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { LANGUAGES, THEMES } from '@/constants'
import { useUpdateStoryModal } from '@/hooks/use-update-story-modal'
import { useGetPreference } from '@/features/preference/api/useGetPreferences'
import { useUpdatePreference } from '@/features/preference/api/useUpdatePreferences'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from "@/components/ui/switch"
import { Label } from '../ui/label'

const EditStoryModal = () => {

    const { mutate, isPending } = useUpdatePreference()
    const { data: preferences } = useGetPreference()

    const [open, setOpen] = useUpdateStoryModal()

    const [theme, setTheme] = useState<string>(preferences?.theme!)
    const [language, setLanguage] = useState<string>(preferences?.language!)
    const [notifications, setNotifications] = useState<{ likes: boolean, shares: boolean, new_features: boolean, story: boolean, friends: boolean, account: boolean }>(preferences?.notifications!)

    useEffect(() => {
        setTheme(preferences?.theme!)
        setLanguage(preferences?.language!)
        setNotifications(preferences?.notifications!)
    }, [preferences])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate({
            formData: {
                theme,
                language,
                notifications,
            }
        }, {
            onSuccess() {
                toast.success('Preferences updated successfully.', { position: 'top-right' })
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
                    <DialogTitle>Update Story</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>

                     

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button disabled={isPending} type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditStoryModal
