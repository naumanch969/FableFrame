import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { REPORT_REASONS, STORY_REPORT_STATUSES } from "@/constants";

type RequestType = {
    formData: {
        story_id: Id<"stories">,
        profile_id: Id<"profiles">,
        reason?: string,
        type: typeof REPORT_REASONS[number]['key'];
        status: typeof STORY_REPORT_STATUSES[number]['key'];
        created_at: string
    }
}
type ResponseType = Id<"story_reports"> | null

type Options = {
    onSuccess?: (data: ResponseType) => void
    onError?: (error: Error) => void
    onSettled?: () => void
    throwError?: Boolean
}

export const useCreateReport = () => {

    const [data, setData] = useState<ResponseType>(null)
    const [error, setError] = useState<Error | null>(null)
    const [state, setState] = useState<"success" | "error" | "settled" | "pending" | null>(null)

    const mutation = useMutation(api.report.create)

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