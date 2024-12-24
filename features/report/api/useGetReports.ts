import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const useGetReports = () => {
    const data = useQuery(api.report.get)

    const isLoading = data == undefined

    return { data, isLoading }

}