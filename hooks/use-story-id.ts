import { useParams } from "next/navigation"

export const useStoryId = () => {
    const params = useParams()

    return params?._id as string  // TODO: ID of story as string
}