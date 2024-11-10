import { useParams } from "next/navigation"

export const useChannelId = () => {
    const params = useParams()

    return params?.channelId as string  // TODO: ID of story as string
}