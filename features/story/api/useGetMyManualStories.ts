import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetMyManualStories = () => {
    const data = useQuery(api.story.get_my_manual_stories)
    const isLoading = data == undefined

    return { data, isLoading }
}