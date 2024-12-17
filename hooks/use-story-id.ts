import { Id } from "@/convex/_generated/dataModel"
import { useParams } from "next/navigation"

export const useStoryId = () => {
    const params = useParams()

    return params?._id as Id<"stories">  // TODO: ID of story as string
}