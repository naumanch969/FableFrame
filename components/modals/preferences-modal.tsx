import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { LANGUAGES, THEMES } from '@/constants'
import { usePreferencesModal } from '@/hooks/use-preferences-modal'
import { useGetPreference } from '@/features/preference/api/useGetPreferences'
import { useUpdatePreference } from '@/features/preference/api/useUpdatePreferences'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from "@/components/ui/switch"
import { Label } from '../ui/label'

const PreferencesModal = () => {

    const { mutate, isPending } = useUpdatePreference()
    const { data: preferences } = useGetPreference()

    const [open, setOpen] = usePreferencesModal()

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
                    <DialogTitle>Update Preferences</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>


                    <div className='flex flex-col gap-2' >
                        <label htmlFor="theme" className="block text-sm font-medium">Themes</label>
                        <Select
                            value={theme}
                            onValueChange={setTheme}
                            disabled={isPending}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                {THEMES.map((theme) => (
                                    <SelectItem key={theme.key} value={theme.key}>
                                        {theme.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='flex flex-col gap-2' >
                        <label htmlFor="language" className="block text-sm font-medium">Language</label>
                        <Select
                            value={language}
                            onValueChange={setLanguage}
                            disabled={isPending}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                {LANGUAGES.map((language) => (
                                    <SelectItem key={language.key} value={language.key}>
                                        {language.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='flex flex-col gap-2' >
                        <label htmlFor="language" className="block text-sm font-medium">Notifications</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <Switch id="likes" checked={notifications.likes} onCheckedChange={(value) => setNotifications(p => ({ ...p, likes: value }))} />
                                <Label htmlFor="likes">Likes Notifications</Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Switch id="account" checked={notifications.account} onCheckedChange={(value) => setNotifications(p => ({ ...p, account: value }))} />
                                <Label htmlFor="account">Account Notifications</Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Switch id="friends" checked={notifications.friends} onCheckedChange={(value) => setNotifications(p => ({ ...p, friends: value }))} />
                                <Label htmlFor="friends">Friends Notifications</Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Switch id="new_features" checked={notifications.new_features} onCheckedChange={(value) => setNotifications(p => ({ ...p, new_features: value }))} />
                                <Label htmlFor="new_features">New Features Notifications</Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Switch id="shares" checked={notifications.shares} onCheckedChange={(value) => setNotifications(p => ({ ...p, shares: value }))} />
                                <Label htmlFor="shares">Shares Notifications</Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Switch id="story" checked={notifications.story} onCheckedChange={(value) => setNotifications(p => ({ ...p, story: value }))} />
                                <Label htmlFor="story">Story Notifications</Label>
                            </div>
                        </div>
                    </div>


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

export default PreferencesModal
