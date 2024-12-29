"use client"

import { useRemoveProfile } from "@/features/profile/api/useRemoveProfile"
import { userColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import { useGetProfiles } from "@/features/profile/api/useGetProfiles"
import { useSelectedProfile } from "@/hooks/use-selected-profile"
import { useAlertModal } from "@/hooks/use-alert-modal"
import { toast } from "sonner"
import AlertModal from "@/components/modals/alert-modal"

const Users = () => {

  const { data } = useGetProfiles()
  const [open, setOpen] = useAlertModal()

  const [profile, _setProfile] = useSelectedProfile()
  const { mutate: removeProfile, isPending: isPending } = useRemoveProfile()

  const onDelete = async () => {
    if (!profile) return

    try {
      await removeProfile({ user_id: profile?.user_id! },
        {
          onSuccess: () => {
            toast.success('Profile deleted successfully.', { position: 'top-right' })
            setOpen('')
          },
          onError: () => {
            toast.error('Failed to delete profile.', { position: 'top-right' })
            setOpen('')
          }
        }
      )

    } catch (error) {
      console.log(error)
      toast.error("Failed to delete profile", { position: 'top-right' })
    }
  }

  return (
    <>

      <AlertModal
        title={'Delete Account'}
        description={`Are you sure you want to delete the account "${profile?.username}" of email ${profile?.email}?`}
        onSubmit={onDelete}
        loading={isPending}
        open={open == 'delete-account'}
        onClose={() => setOpen('')}
      />

      <div className="container mx-auto">
        <DataTable
          columns={userColumns}
          data={data! || []}
          searchPlaceholder='Search profiles'
          searchField="email"
        />
      </div>
    </>
  )
}

export default Users