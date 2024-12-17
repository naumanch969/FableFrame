import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetProfiles = () => {
    const data = useQuery(api.profile.get)

    const isLoading = data == undefined

    return { data, isLoading }

}