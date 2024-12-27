"use client"

import { useGetReports } from "@/features/report/api/useGetReports"
import { reportsColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import { useAlertModal } from "@/hooks/use-alert-modal"
import { useSelectedReport } from "@/hooks/use-selected-report"
import { useRemoveReport } from "@/features/report/api/useRemoveReport"
import AlertModal from "@/components/modals/alert-modal"
import { toast } from "sonner"

const StoryReports = () => {

  const { data } = useGetReports()
  const [open, setOpen] = useAlertModal()

  const [report, _setComment] = useSelectedReport()
  const { mutate: removeReport, isPending: isPending } = useRemoveReport()

  const onDelete = async () => {
    if (!report) return

    try {
      await removeReport({ id: report?._id! },
        {
          onSuccess: () => {
            toast.success('Report deleted successfully.', { position: 'top-right' })
            setOpen('')
          },
          onError: () => {
            toast.error('Failed to delete report.', { position: 'top-right' })
            setOpen('')
          }
        }
      )

    } catch (error) {
      console.log(error)
      toast.error("Failed to delete report", { position: 'top-right' })
    }
  }
  return (
    <>
      <AlertModal
        title={'Delete Report'}
        description={`Are you sure you want to delete the report "${report?.reason}" by ${report?.profile?.username}?`}
        onSubmit={onDelete}
        loading={isPending}
        open={open == 'delete-report'}
        onClose={() => setOpen('')}
      />

      <div className="container mx-auto">
        <DataTable
          // @ts-ignore
          columns={reportsColumns}
          data={data! || []}
          searchPlaceholder='Search reports'
          searchField="story.title"
        />
      </div>
    </>
  )
}

export default StoryReports