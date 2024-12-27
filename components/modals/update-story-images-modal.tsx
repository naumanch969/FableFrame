import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { useUpdateStoryModal } from '@/hooks/use-update-story-modal'

import { useUpdateStory } from "@/features/story/api/useUpdateStory"
import { toast } from 'sonner'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'
import { generateImage } from '@/lib/utils'
import CustomLoader from '@/app/(dashboard)/create-story/_components/CustomLoader'
import { useSnackbar } from '@/hooks/use-snackbar'
import { Button } from '../ui/button'

const UpdateStoryImagesModal = () => {

    const [story, _setStory] = useSelectedStory()
    const [open, setOpen] = useUpdateStoryModal()
    const [snackbarText, setSnackbarText] = useSnackbar()
    const { mutate } = useUpdateStory()
    const { mutate: generateUploadUrl } = useGenerateUploadUrl()

    const onGenerate = async () => {
        if (!story) return
        try {
            setOpen(false)

            setSnackbarText('Image generation start. Please wait...')
            const ai_output = story?.ai_output ? JSON.parse(story?.ai_output) : null
            if (!ai_output) return toast.error("Story not found", { position: 'top-right' })

            const coverImageStorageId = await generateImage(generateUploadUrl, ai_output?.coverImage?.prompt || 'Create a story cover image with title as ' + story?.title);
            setSnackbarText('Cover image generated. Chapters generating...')

            let chapters = []

            let index = 1;
            for (const chapter of ai_output?.chapters) {
                setSnackbarText(`Generating chapter ${index}...`)
                const chapterImagePrompt = chapter?.image?.prompt || 'Create a chapter cover image with title as ' + chapter?.title
                const chapterImageStorageId = await generateImage(generateUploadUrl, chapterImagePrompt + ` - ImageStyle: ${chapter?.image?.style}`);

                chapters.push({
                    ...chapter,
                    image: {
                        prompt: chapterImagePrompt,
                        style: chapter?.image?.style,
                        url: chapterImageStorageId
                    }
                })

                index++;
            }

            // TODO: save the state at each step
            setSnackbarText('Chapters generated. Saving story for you...')
            console.log('chapters', Boolean(chapters))

            await mutate({
                id: story?._id!,
                cover_image: coverImageStorageId,
                chapters,
            }, {
                onSuccess: (id: any) => {
                    toast.success('Story updated successfully.', { position: 'top-right' })
                    console.log('saved', true)
                    setSnackbarText('')
                },
                onError: () => {
                    console.log('saved', false)
                    toast.error('Failed to save updated story.', { position: 'top-right' })
                    setSnackbarText('')
                }
            })

        } catch (error) {
            console.log(error)
            toast.error("Failed to update story", { position: 'top-right' })
            setSnackbarText('')
        }
    }

    return (
        <>

            {/* <CustomLoader loading={loading} onClose={() => setLoading('')} /> */}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle className="mt-5.5 pb-2 text-xl font-bold text-surface-foreground dark:text-surface-foreground sm:text-2xl">
                        Update images for story
                    </DialogTitle>
                    <p className="mb-10 text-surface-foreground ">
                        Are you sure you want to update imaiges for this story <strong>{story?.title}</strong>?
                    </p>
                    <div className="flex justify-end gap-2 w-full">
                        <Button
                            variant='secondary'
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='gradient'
                            onClick={onGenerate}
                        >
                            Update
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default UpdateStoryImagesModal

