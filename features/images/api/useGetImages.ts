import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetImages = () => {
    const data = useQuery(api.image.get_all_images)

    const isLoading = data == undefined

    return { data, isLoading }

}