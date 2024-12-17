import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const useCurrentProfile = () => {
    const data = useQuery(api.profile.get_current);

    const isLoading = data === undefined;

    return { data, isLoading };
};
