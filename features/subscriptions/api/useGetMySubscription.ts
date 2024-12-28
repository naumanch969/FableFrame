import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetMySubscription = () => {
    const data = useQuery(api.subscription.get_my_subscription)

    const isLoading = data == undefined

    return { data, isLoading }

}