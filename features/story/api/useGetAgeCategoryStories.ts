import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { STORY_AGE_CATEGORIES } from "@/constants";

export const useGetAgeCategoryStories = (age_category: typeof STORY_AGE_CATEGORIES[number]['key']) => {
    const data = useQuery(api.story.get_age_category_stories, { age_category })
    const isLoading = data == undefined

    return { data, isLoading }
}