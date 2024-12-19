import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetMyChats = () => {
    const data = useQuery(api.chat.get)

    const isLoading = data == undefined

    return { data, isLoading }

}