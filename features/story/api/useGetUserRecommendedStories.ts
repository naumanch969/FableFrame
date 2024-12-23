import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetUserRecommendedStories = () => {
    const data = useQuery(api.story.get_user_recommended_stories)
    const isLoading = data == undefined

    return { data, isLoading }
}