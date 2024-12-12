import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetPublicStories = () => {
    const data = useQuery(api.story.get_public)
    const isLoading = data == undefined

    return { data, isLoading }
}