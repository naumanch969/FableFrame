import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

export const useGetMySubscription = (profile_id?: Id<"profiles">) => {
    const data = useQuery(api.subscription.get_subscription_by_profile_id, { profile_id })

    const isLoading = data == undefined

    return { data, isLoading }

}