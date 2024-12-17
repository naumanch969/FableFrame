import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useGetDraftStories = () => {
    const data = useQuery(api.story.get_draft_stories)
    const isLoading = data == undefined

    return { data, isLoading }
}