import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

export const useGetChat = (id: Id<"chats">) => {
    const data = useQuery(api.chat.get_by_id, { chat_id: id })

    const isLoading = data == undefined

    return { data, isLoading }

}