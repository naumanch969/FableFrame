import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const useGetAIStories = (profile_id?: Id<"profiles">) => {
    const data = useQuery(api.story.get_ai_stories, { profile_id })
    const isLoading = data == undefined

    return { data, isLoading }
}