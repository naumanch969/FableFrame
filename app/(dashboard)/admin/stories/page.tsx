"use client"

import { useGetStories } from "@/features/story/api/useGetStories"
import { storyColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import AlertModal from "@/components/modals/alert-modal"
import { useUpdateStory } from "@/features/story/api/useUpdateStory"
import { useAlertModal } from "@/hooks/use-alert-modal"
import { useSelectedStory } from "@/hooks/use-selected-story"
import { toast } from 'sonner'

const Stories = () => {

  const { data } = useGetStories()
  const [open, setOpen] = useAlertModal()

  const [story, _setStory] = useSelectedStory()
  const { mutate, isPending } = useUpdateStory()

  const onHide = async () => {
    if (!story) return
    try {
      await mutate({
        id: story?._id!,
        status: "deleted"
      },
        {
          onSuccess: () => {
            toast.success('Story hidden successfully.', { position: 'top-right' })
            setOpen('')
          },
          onError: () => {
            toast.error('Failed to save updated story.', { position: 'top-right' })
            setOpen('')
          }
        })

    } catch (error) {
      console.log(error)
      toast.error("Failed to hide story", { position: 'top-right' })
    }
  }



  return (
    <>

      <AlertModal
        title='Hide story'
        description='Are you sure you want to hide this story?'
        onSubmit={onHide}
        loading={isPending}
        open={open == 'delete-story'}
        onClose={() => setOpen('')}
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