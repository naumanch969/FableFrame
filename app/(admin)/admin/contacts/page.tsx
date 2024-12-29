"use client"

import { useGetContacts } from "@/features/contact/api/useGetContacts"
import { contactColumns } from "../components/columns"
import { DataTable } from "../components/data-table"

const StoryReports = () => {

  const { data } = useGetContacts()

  return (
    <div className="container mx-auto">
      <DataTable
        // @ts-ignore
        columns={contactColumns}
        data={data! || []}
        searchPlaceholder='Search contact'
        searchField="email"
      />
    </div>
  )
}

export default StoryReports