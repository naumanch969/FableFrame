"use client"

import { useGetStories } from "@/features/story/api/useGetStories"
import { storyColumns } from "../components/columns"
import { DataTable } from "../components/data-table"

const Stories = () => {

  const { data } = useGetStories()

  return (
    <div className="container mx-auto">
      <DataTable
        columns={storyColumns}
        data={data! || []}
        searchPlaceholder='Search stories'
        searchField="title"
      />
    </div>
  )
}

export default Stories