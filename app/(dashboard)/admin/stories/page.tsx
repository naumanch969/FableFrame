"use client"

import { useGetStories } from "@/features/story/api/useGetStories"
import { storyColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import AlertModal from "@/components/modals/alert-modal"
import { useUpdateStoryModal } from '@/hooks/use-update-story-modal'
import { useSelectedStory } from '@/hooks/use-selected-story'
import { useState } from 'react'
import { generateImage } from '@/lib/utils'

import { useRouter } from "next/navigation"
import { useUpdateStory } from "@/features/story/api/useUpdateStory"
import { toast } from 'sonner'
import CustomLoader from "../../create-story/_components/CustomLoader"
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'


const Stories = () => {

  const router = useRouter()
  const { data } = useGetStories()
  const [open, setOpen] = useUpdateStoryModal()
  const [story, _setSelected] = useSelectedStory()
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
        onError: ()=>{
          toast.error('Failed to save updated story.', { position: 'top-right' })
          setLoading('')
        }
      })

    } catch (error) {
      console.log(error)
      toast.error("Failed to generate story", { position: 'top-right' })
      setLoading('')
    }
  }

  return (
    <>

      <CustomLoader loading={loading} onClose={() => setLoading('')} />

      <AlertModal
        open={open}
        setOpen={setOpen}
        title="Update Images"
        message={`Are you sure you want to update imaiges for this story (${story?.title})?`}
        onSubmit={onGenerate}
        loading={false}
      />

      <div className="container mx-auto">
        <DataTable
          columns={storyColumns}
          data={data! || []}
          searchPlaceholder='Search stories'
          searchField="title"
        />
      </div>

    </>
  )
}

export default Stories