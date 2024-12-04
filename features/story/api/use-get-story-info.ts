import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
    id: Id<"workspaces">
}

export const useGetStoryInfo = ({ id }: Props) => {
    const data = useQuery(api.services.story.getInfoById, { id })
    const isLoading = data == undefined

    return { data, isLoading }
}