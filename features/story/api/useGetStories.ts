import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetStories = () => {
    const data = useQuery(api.story.get)
    const isLoading = data == undefined

    return { data, isLoading }
}