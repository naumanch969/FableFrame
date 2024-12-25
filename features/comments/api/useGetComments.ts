import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetComments = () => {
    const data = useQuery(api.comment.get)

    const isLoading = data == undefined

    return { data, isLoading }

}