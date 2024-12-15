import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { STORY_AGE_CATEGORIES, STORY_GENRES, STORY_IMAGE_STYLES, STORY_STATUSES, STORY_TYPES } from "@/constants";

type RequestType = {
    formData: {
        title: string;
        prompt: string;
        genre: typeof STORY_GENRES[number]['key'];
        image_style: typeof STORY_IMAGE_STYLES[number]['key'];
        age_category: typeof STORY_AGE_CATEGORIES[number]['key'];
        type: typeof STORY_TYPES[number]['key'];
        is_public: boolean;
        status: typeof STORY_STATUSES[number]['key'];
        ai_output: any;
        cover_image: string,
        chapters: any[]
    }
}
type ResponseType = Id<"stories"> | null

type Options = {
    onSuccess?: (data: ResponseType) => void
    onError?: (error: Error) => void
    onSettled?: () => void
    throwError?: Boolean
}

export const useCreateStory = () => {

    const [data, setData] = useState<ResponseType>(null)
    const [error, setError] = useState<Error | null>(null)
    const [state, setState] = useState<"success" | "error" | "settled" | "pending" | null>(null)

    const mutation = useMutation(api.story.create_ai)

    const isPending = useMemo(() => state == 'pending', [state])
    const isSuccess = useMemo(() => state == 'success', [state])
    const isError = useMemo(() => state == 'error', [state])
    const isSettled = useMemo(() => state == 'settled', [state])

    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {

            setData(null)
            setError(null)
            setState('pending')

            const response = await mutation(values.formData)
            options?.onSuccess?.(response)
        }
        catch (error) {
            setState("error")
            options?.onError?.(error as Error)
            if (options?.throwError) throw error;
        }
        finally {
            setState('settled')
            options?.onSettled?.()
        }
    }, [mutation])

    return { mutate, data, error, isSuccess, isPending, isSettled, isError }

}