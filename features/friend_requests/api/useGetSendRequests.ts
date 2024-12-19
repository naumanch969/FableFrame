import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetSendRequests = () => {
    const data = useQuery(api.friend_request.get_send_requests)

    const isLoading = data == undefined

    return { data, isLoading }

}