import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { FONT_TYPE, GENDERS, LENGTH, PROFILE_VISIBILITY, STORY_AGE_CATEGORIES, STORY_GENRES, THEMES } from "@/constants";

type RequestType = {
    formData: {
        theme?: typeof THEMES[number]['key'];
        language?: string,
        font_size?: typeof LENGTH[number]['key'];
        notifications?: {
            likes: boolean,
            shares: boolean,
            new_features: boolean,
            story: boolean,
            friends: boolean,
            account: boolean,
        },
        story_preferences?: {
            genres: (typeof STORY_GENRES[number]['key'])[],
            age_category: (typeof STORY_AGE_CATEGORIES[number]['key'])[],
            preferred_length: (typeof LENGTH[number]['key'])[],
            content_filter: boolean,
        }
        accessibility?: {
            text_to_speech: {
                voice: typeof GENDERS[number]['key'],
                pitch: number,
                speed: number,
            },
            font_type: typeof FONT_TYPE[number]['key'],
            auto_narration: boolean
        },
        profile_visibility?: typeof PROFILE_VISIBILITY[number]['key'],
        genre_frequency?: { genre: typeof STORY_GENRES[number]['key'], frequency: number }[],
        category_frequency?: { category: typeof STORY_AGE_CATEGORIES[number]['key'], frequency: number }[],
    }
}

type ResponseType = Id<"preferences"> | null

type Options = {
    onSuccess?: (data: ResponseType) => void
    onError?: (error: Error) => void
    onSettled?: () => void
    throwError?: Boolean
}

export const useUpdatePreference = () => {

    const [data, setData] = useState<ResponseType>(null)
    const [error, setError] = useState<Error | null>(null)
    const [state, setState] = useState<"success" | "error" | "settled" | "pending" | null>(null)

    const mutation = useMutation(api.preferences.update_preferences)

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