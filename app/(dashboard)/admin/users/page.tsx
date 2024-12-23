"use client"

import { userColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import { useGetProfiles } from "@/features/profile/api/useGetProfiles"

const Users = () => {

  const { data } = useGetProfiles()

  return (
    <div className="container mx-auto">
      <DataTable
        columns={userColumns}
        data={data! || []}
        searchPlaceholder='Search profiles'
        searchField="email"
      />
    </div>
  )
}

export default Users