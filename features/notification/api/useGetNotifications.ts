import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

export const useGetNotifications = (profile_id: Id<"profiles">) => {
    const data = useQuery(api.notification.get_notifications, { profile_id })

    const isLoading = data == undefined

    return { data, isLoading }

}