import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetUsers = () => {
    const data = useQuery(api.user.get_users)

    const isLoading = data == undefined

    return { data, isLoading }

}