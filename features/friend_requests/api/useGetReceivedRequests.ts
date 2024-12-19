import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetReceivedRequests = () => {
    const data = useQuery(api.friend_request.get_received_requests)

    const isLoading = data == undefined

    return { data, isLoading }

}