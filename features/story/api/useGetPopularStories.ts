import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetPopularStories = () => {
    const data = useQuery(api.story.get_popular_stories)
    const isLoading = data == undefined

    return { data, isLoading }
}