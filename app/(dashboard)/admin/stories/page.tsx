"use client"

import { useGetStories } from "@/features/story/api/useGetStories"
import { storyColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import AlertModal from "@/components/modals/alert-modal"
import { useUpdateStory } from "@/features/story/api/useUpdateStory"
import { useRemoveStory } from "@/features/story/api/useRemoveStory"
import { useAlertModal } from "@/hooks/use-alert-modal"
import { useSelectedStory } from "@/hooks/use-selected-story"
import { toast } from 'sonner'
import LoadingScreen from "@/components/LoadingScreen"

const Stories = () => {

  const { data, isLoading } = useGetStories()
  const [open, setOpen] = useAlertModal()

  const [story, _setStory] = useSelectedStory()
  const { mutate: updateStatus, isPending: updatePending } = useUpdateStory()
  const { mutate: removeStory, isPending: removePending } = useRemoveStory()

  const onHide = async () => {
    if (!story) return

    const isHidden = story?.status == "hidden"

    try {
      if (isHidden) {
        await removeStory({ id: story?._id! },
          {
            onSuccess: () => {
              toast.success('Story removed successfully.', { position: 'top-right' })
              setOpen('')
            },
            onError: () => {
              toast.error('Failed to remove story.', { position: 'top-right' })
              setOpen('')
            }
          }
        )
      }
      else {
        await updateStatus({
          id: story?._id!,
          status: "hidden"
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
      }

    } catch (error) {
      console.log(error)
      toast.error("Failed to hide story", { position: 'top-right' })
    }
  }



  return (
    <>

      <AlertModal
        title={story?.status == 'hidden' ? 'Delete story' : 'Hide story'}
        description={`Are you sure you want to ${story?.status == 'hidden' ? 'delete' : 'hide'} this story? (${story?.title})`}
        onSubmit={onHide}
        loading={updatePending || removePending}
        open={open == 'delete-story'}
        onClose={() => setOpen('')}
      />

      <div className="container mx-auto">
        {
          isLoading
            ?
            <LoadingScreen className='w-full' />
            :
            <DataTable
              columns={storyColumns}
              data={data! || []}
              searchPlaceholder='Search stories'
              searchField="title"
            />
        }
      </div>

    </>
  )
}

export default Stories