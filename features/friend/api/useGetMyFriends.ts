import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetMyFriends = () => {
    const data = useQuery(api.friend.get)

    const isLoading = data == undefined

    return { data, isLoading }

}