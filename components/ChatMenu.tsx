"use client"

import React, { useState } from "react"
import { MessagesSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useGetMyChats } from "@/features/chat/api/useGetMyChats"
import { Chat } from "@/types"
import { getRelativeTime } from "@/lib/utils"
import { useCurrentProfile } from "@/features/profile/api/useCurrentProfile"
import { useRouter } from "next/navigation"

function ChatMenu() {

    const [openChatMenu, setOpenChatMenu] = React.useState(false)
    const { data: chats } = useGetMyChats()
    const { data: profile } = useCurrentProfile()

    const ChatItem = ({ chat }: { chat: Chat }) => {

        const otherUser = chat?.participant_profiles?.find(p => String(p?._id) != String(profile?._id))

        const formattedTime = getRelativeTime(new Date(chat?.last_message_timestamp!))

        return (
            <DropdownMenuItem onClick={() => setOpenChatMenu(false)} className="flex flex-col items-start gap-2 p-2">
                <Link href={'/chats?id=' + chat?._id} className="cursor-pointer flex flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                        <span className="text-xs text-primary">{otherUser?.username}</span>
                        <span className="text-xs text-gray-500">{formattedTime}</span>
                    </div>
                    <span className="text-sm text-gray-700">{chat?.last_message}</span>
                </Link>
            </DropdownMenuItem>
        );
    }

    return (
        <DropdownMenu open={openChatMenu} onOpenChange={setOpenChatMenu} >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MessagesSquare className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <span className="sr-only">Messages</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[300px]" >
                {
                    // TODO: sort
                    chats?.slice(0, 4)?.map((chat, index) => (
                        // @ts-ignore
                        <ChatItem key={index} chat={chat!} />
                    ))
                }
                {
                    chats?.length! > 4 &&
                    <DropdownMenuItem className="cursor-pointer flex justify-center p-2 w-full ">
                        <Link href='/chats' >Show More</Link>
                    </DropdownMenuItem>
                }
                {
                    chats?.length == 0 &&
                    <div className="flex justify-center items-center py-2 px-2 ">
                        <span className="text-sm w-full ">
                            No messages as per now.
                        </span>
                    </div>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ChatMenu