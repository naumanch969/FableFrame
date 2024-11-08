import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useGetProfile = (profile_id?: Id<"profiles">) => {
    const data = useQuery(api.profile.get_by_id, { profile_id });

    const isLoading = data === undefined;

    return { data, isLoading };
};
