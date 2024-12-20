import { Id } from "@/convex/_generated/dataModel"
import { useSearchParams } from "next/navigation"

export const useChatId = () => {

    const searchParams = useSearchParams()
    const lastChatId = localStorage.getItem('lastChatId') as Id<"chats">
    const chatId = (searchParams.get('id') || lastChatId) as Id<"chats">

    return chatId as Id<"chats">
}