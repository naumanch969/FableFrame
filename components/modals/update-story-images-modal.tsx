import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { useUpdateStoryModal } from '@/hooks/use-update-story-modal'

import { useUpdateStory } from "@/features/story/api/useUpdateStory"
import { toast } from 'sonner'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'
import { generateImage } from '@/lib/utils'
import CustomLoader from '@/app/(dashboard)/create-story/_components/CustomLoader'

const UpdateStoryImagesModal = () => {

    const [story, _setStory] = useSelectedStory()
    const [open, setOpen] = useUpdateStoryModal()
    const { mutate } = useUpdateStory()
    const { mutate: generateUploadUrl } = useGenerateUploadUrl()

    const [loading, setLoading] = useState('')

    const onGenerate = async () => {
        if (!story) return
        try {
            setOpen(false)

            setLoading('Image generation start. Please wait...')
            const ai_output = story?.ai_output ? JSON.parse(story?.ai_output) : null
            if (!ai_output) return toast.error("Story not found", { position: 'top-right' })

            const coverImageStorageId = await generateImage(generateUploadUrl, ai_output?.coverImage?.prompt || 'Create a story cover image with title as ' + story?.title);
            setLoading('Cover image generated. Chapters generating...')

            let chapters = []

            let index = 1;
            for (const chapter of ai_output?.chapters) {
                setLoading(`Generating chapter ${index}...`)
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
            setLoading('Chapters generated. Saving story for you...')
            console.log('chapters', Boolean(chapters))

            await mutate({
                id: story?._id!,
                cover_image: coverImageStorageId,
                chapters,
            }, {
                onSuccess: (id: any) => {
                    toast.success('Story updated successfully.', { position: 'top-right' })
                    setLoading('')
                },
                onError: () => {
                    toast.error('Failed to save updated story.', { position: 'top-right' })
                    setLoading('')
                }
            })

        } catch (error) {
            console.log(error)
            toast.error("Failed to update story", { position: 'top-right' })
            setLoading('')
        }
    }

    return (
        <>
            <CustomLoader loading={loading} onClose={() => setLoading('')} />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle className="mt-5.5 pb-2 text-xl font-bold text-neutral-700 dark:text-white sm:text-2xl">
                        Update images for story
                    </DialogTitle>
                    <p className="mb-10 text-neutral-800 ">
                        Are you sure you want to update imaiges for this story <strong>{story?.title}</strong>?
                    </p>
                    <div className="-mx-3 flex flex-wrap gap-y-4">
                        <div className="w-1/2 px-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:bg-gray/75 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="w-1/2 px-3">
                            <button
                                onClick={onGenerate}
                                className="block w-full rounded border border-theme-gradient bg-theme-gradient disabled:bg-theme-gradient/80 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default UpdateStoryImagesModal

