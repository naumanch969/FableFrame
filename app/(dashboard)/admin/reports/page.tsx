"use client"

import { useGetReports } from "@/features/report/api/useGetReports"
import { reportsColumns } from "../components/columns"
import { DataTable } from "../components/data-table"

const StoryReports = () => {

  const { data } = useGetReports()

  return (
    <div className="container mx-auto">
      <DataTable
        // @ts-ignore
        columns={reportsColumns}
        data={data! || []}
        searchPlaceholder='Search reports'
        searchField="story.title"
      />
    </div>
  )
}

export default StoryReports