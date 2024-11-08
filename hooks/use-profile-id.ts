import { Id } from "@/convex/_generated/dataModel"
import { useParams } from "next/navigation"

export const useProfileId = () => {
    const params = useParams()

    return params?._id as Id<"profiles">
}