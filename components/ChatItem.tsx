import { useGetChat } from "@/features/chat/api/useGetChat";
import { useCurrentProfile } from "@/features/profile/api/useCurrentProfile";
import { useChatId } from "@/hooks/use-chat-id";
import { getRelativeTime } from "@/lib/utils";
import { Chat } from "@/types";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatItem = ({ chat }: { chat: Chat }) => {

    const chatId = useChatId()
    const router = useRouter()
    const { data: currentChat } = useGetChat(chatId)
    const { data: profile } = useCurrentProfile()

    const lastMessage = chat.last_message?.slice(0, 30) || 'No messages yet';
    const lastMessageTimestamp = getRelativeTime(new Date(chat?.last_message_timestamp!))
    const unreadCount = 0;

    const otherUser = chat?.participant_profiles?.find(p => String(p?._id) != String(profile?._id))


    const onChatClick = (chat: Chat) => {
        localStorage.setItem('lastChat', String(chat?._id));
        router.push(`/chats?id=${chat?._id}`)
    };

    return (
        <div
            onClick={() => onChatClick(chat)}
            className={`${currentChat?._id == chat?._id ? 'bg-primary text-primary-foreground' : 'bg-surface'} rounded-lg flex justify-between cursor-pointer items-start gap-1 p-2 hover:bg-primary hover:text-surface-foreground `}
        >
            <div className="flex justify-between items-center gap-2">
                <Avatar>
                    <AvatarImage src={otherUser?.profile_picture_url} />
                    <AvatarFallback className='text-neutral-700 capitalize' >{otherUser?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex w-fit flex-col ">
                    <h5 className="text-md font-medium truncate ">
                        {otherUser?.username}
                        {unreadCount > 0 && (
                            <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-surface-foreground">
                                {unreadCount}
                            </span>
                        )}
                    </h5>
                    <p className="text-xs truncate ">{lastMessage}</p>
                </div>
            </div>
            <span className="text-[10px] truncate mt-2">{lastMessageTimestamp}</span>
        </div>
    );
};

export default ChatItem