import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

export const useGetCommentsByStory = (story_id: Id<"stories">) => {
    const data = useQuery(api.comment.get_by_story, { story_id })

    const isLoading = data == undefined

    return { data, isLoading }

}