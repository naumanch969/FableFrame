import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCreateReport } from '@/features/report/api/use-create-report'
import { useCreateReportModal } from '@/hooks/use-create-report-modal'
import { useCurrentUser } from '@/features/auth/api/useCurrentUser'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { REPORT_REASONS } from '@/constants'
import { Select, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'

const CreateReportModal = () => {
    
    const router = useRouter()
    const { data: profile } = useCurrentUser()
    const { mutate, isPending } = useCreateReport()
    
    const [story, setStory] = useSelectedStory()
    const [open, setOpen] = useCreateReportModal()

    const [reason, setReason] = useState<string>("")
    const [type, setType] = useState<typeof REPORT_REASONS[number]['key']>("")

    useEffect(() => {
        if (reason) {
            // Here you can set 'type' based on 'reason' if needed in future
        }
    }, [reason])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!reason || !type) {
            toast.error('Please select a reason and type')
            return
        }

        const input = {
            profile_id: profile?._id!,
            story_id: story?._id!,
            reason,
            type,
            status: 'pending',
            created_at: new Date().toISOString()
        }

        mutate({ formData: input }, {
            onSuccess(id) {
                toast.success('Report submitted successfully')
                router.push(`/workspace/${id}`)
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
                    {/* Reason Select */}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium">Reason</label>
                        <Select
                            value={reason}
                            onValueChange={setReason}
                            disabled={isPending}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectItem value="">Select a reason</SelectItem>
                            {REPORT_REASONS.map((reasonItem) => (
                                <SelectItem key={reasonItem.key} value={reasonItem.key}>
                                    {reasonItem.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    {/* Type Select */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium">Type</label>
                        <Select
                            value={type}
                            onValueChange={setType}
                            disabled={isPending || !reason}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectItem value="">Select a type</SelectItem>
                            {/* You can add dynamic type filtering logic here */}
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

export default CreateReportModal
