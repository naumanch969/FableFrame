import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useAction, useQuery } from "convex/react"

export const useGetPreference = () => {
    const data = useQuery(api.preferences.get_preferences)

    const isLoading = data == undefined

    return { data, isLoading }

}