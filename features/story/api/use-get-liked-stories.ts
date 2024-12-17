import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetLikedStories = () => {
    const data = useQuery(api.story.get_liked_stories)
    const isLoading = data == undefined

    return { data, isLoading }
}