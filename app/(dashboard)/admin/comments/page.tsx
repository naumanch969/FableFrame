"use client"

import AlertModal from "@/components/modals/alert-modal"
import { commentColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import { useGetComments } from "@/features/comments/api/useGetComments"
import { useSelectedComment } from "@/hooks/use-selected-comment"
import { useAlertModal } from "@/hooks/use-alert-modal"
import { useRemoveComment } from "@/features/comments/api/useRemoveComment"
import { toast } from "sonner"

const StoryReports = () => {

  const { data } = useGetComments()
  const [open, setOpen] = useAlertModal()

  const [comment, _setComment] = useSelectedComment()
  const { mutate: removeComment, isPending: isPending } = useRemoveComment()

  const onDelete = async () => {
    if (!comment) return

    try {
      await removeComment({ id: comment?._id!, is_permanent: true },
        {
          onSuccess: () => {
            toast.success('Comment deleted successfully.', { position: 'top-right' })
            setOpen('')
          },
          onError: () => {
            toast.error('Failed to delete comment.', { position: 'top-right' })
            setOpen('')
          }
        }
      )

    } catch (error) {
      console.log(error)
      toast.error("Failed to delete comment", { position: 'top-right' })
    }
  }

  return (
    <>

      <AlertModal
        title={'Delete Comment'}
        description={`Are you sure you want to delete the comment "${comment?.content}" by ${comment?.profile?.username}?`}
        onSubmit={onDelete}
        loading={isPending}
        open={open == 'delete-comment'}
        onClose={() => setOpen('')}
      />


      <div className="container mx-auto">
        <DataTable
          // @ts-ignore
          columns={commentColumns}
          data={data! || []}
          searchPlaceholder='Search comments'
          searchField="story.title"
        />
      </div>
    </>
  )
}

export default StoryReports