"use client"

import { commentColumns } from "../components/columns"
import { DataTable } from "../components/data-table"
import { useGetComments } from "@/features/comments/api/useGetComments"

const StoryReports = () => {

  const { data } = useGetComments()

  return (
    <div className="container mx-auto">
      <DataTable
        // @ts-ignore
        columns={commentColumns}
        data={data! || []}
        searchPlaceholder='Search comments'
        searchField="story.title"
      />
    </div>
  )
}

export default StoryReports