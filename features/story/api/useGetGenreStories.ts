import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { STORY_GENRES } from "@/constants";

export const useGetGenreStories = (genre: typeof STORY_GENRES[number]['key']) => {
    const data = useQuery(api.story.get_genre_stories, { genre })
    const isLoading = data == undefined

    return { data, isLoading }
}