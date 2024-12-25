import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetContacts = () => {
    const data = useQuery(api.contact.get)

    const isLoading = data == undefined

    return { data, isLoading }

}