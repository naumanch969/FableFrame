import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useCurrentUser = () => {
    const data = useQuery(api.services.user.current)

    const isLoading = data == undefined

    return {data, isLoading}

}