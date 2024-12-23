import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
    id: Id<"stories">
}

export const useGetStory = ({ id }: Props) => {
    const data = useQuery(api.story.get_story_by_id, { id })
    const isLoading = data == undefined

    return { data, isLoading }
}