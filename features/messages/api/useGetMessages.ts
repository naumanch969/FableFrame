import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

export const useGetMessages = (chat_id: Id<"chats">) => {

    if (!chat_id) return { data: [], isLoading: false }

    const data = useQuery(api.message.get_messages, { chat_id })

    const isLoading = data == undefined

    return { data, isLoading }
}