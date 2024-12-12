import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useUserStories = () => {
    const data = useQuery(api.story.get_user)
    const isLoading = data == undefined

    return { data, isLoading }
}