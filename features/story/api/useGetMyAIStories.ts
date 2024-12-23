import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetMyAIStories = () => {
    const data = useQuery(api.story.get_my_ai_stories)
    const isLoading = data == undefined

    return { data, isLoading }
}