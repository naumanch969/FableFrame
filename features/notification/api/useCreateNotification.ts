import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { NOTIFICATION_PRIORITIES, NOTIFICATION_TYPES } from "@/constants";

type RequestType = {
    formData: {
        profile_id: Id<"profiles">,
        type: typeof NOTIFICATION_TYPES[number]['key'],
        content: string,
        is_read: boolean,
        related_entity_id?: string,
        entity_type?: string,
        priority: typeof NOTIFICATION_PRIORITIES[number]['key'],
        is_dismissed: boolean
    }
}

type ResponseType = Id<"notifications"> | null

type Options = {
    onSuccess?: (data: ResponseType) => void
    onError?: (error: Error) => void
    onSettled?: () => void
    throwError?: Boolean
}

export const useCreateNotification = () => {

    const [data, setData] = useState<ResponseType>(null)
    const [error, setError] = useState<Error | null>(null)
    const [state, setState] = useState<"success" | "error" | "settled" | "pending" | null>(null)

    const mutation = useMutation(api.notification.create_notification)

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