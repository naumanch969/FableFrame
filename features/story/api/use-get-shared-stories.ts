import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetSharedStories = () => {
    const data = useQuery(api.story.get_shared_stories)
    const isLoading = data == undefined

    return { data, isLoading }
}