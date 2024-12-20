import { useEffect, useRef, useState } from 'react';
import { Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetChat } from '@/features/chat/api/useGetChat';
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useSendMessage } from '@/features/messages/api/useSendMessage';
import { getRelativeTime } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useGetMyChats } from '@/features/chat/api/useGetMyChats';
import { useGetMessages } from '@/features/messages/api/useGetMessages';
import { Card } from '@/components/ui/card';
import { Profile } from '@/types';

export const ChatBox = () => {
    ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const scrollRef = useRef(null);
    const lastChatId = localStorage.getItem('lastChatId') as Id<"chats">
    const searchParams = useSearchParams()
    const chatId = (searchParams.get('id') || lastChatId) as Id<"chats">
    const { data: fetchedMessages } = useGetMessages(chatId!)
    const { data: chat } = useGetChat(chatId!)
    const { data: chats } = useGetMyChats()
    const { data: profile } = useCurrentProfile()
    const otherUser: Doc<"profiles"> | undefined | null = chat?.participant_profiles?.find(p => String(p?._id!) != String(profile?._id))
    const { mutate: sendMessage } = useSendMessage()

    ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('')
    const [messages, setMessages] = useState(fetchedMessages)

    ///////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
    useEffect(() => {
        setTimeout(() => { scrollToBottom(); }, 100);
    }, [chat]);

    useEffect(() => {
        setMessages(fetchedMessages)
    }, [fetchedMessages]);

    ///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
    const onSendMessage = () => {
        if (messageInput.trim() == '') return;

        const receiver = otherUser! as Profile

        sendMessage({
            formData: {
                chat_id: chat?._id!,
                receiver_id: receiver?._id!,
                text: messageInput,
            }
        })

        scrollToBottom();
        setMessageInput('');
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            // TODO
            const scrollContainer = scrollRef.current;
            setTimeout(() => {
                // @ts-ignore
                scrollContainer?.scroll({ top: scrollContainer?.scrollHeight - scrollContainer?.clientHeight, behavior: 'smooth', });
            }, 20);
        }
    };

    const onSearch = () => {
        setMessages(fetchedMessages?.filter(message =>
            message?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        ))
    };

    ///////////////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////
    const MessageComponent = ({ message }: { message: Doc<"messages"> }) => {

        const msg = message.text
        const time = getRelativeTime(new Date(message._creationTime))
        const isMe = message?.sender_id == String(profile?._id)

        return (
            <div className={`w-fit ${isMe ? 'ml-auto max-w-[70%]' : 'max-w-[70%]'}`}>
                <div className={`mb-1 rounded-2xl px-5 py-3 bg-muted ${isMe ? 'rounded-br-none bg-primary text-white' : 'rounded-tl-none'} `}>
                    <p>{msg}</p>
                </div>
                <p className={`text-xs ${isMe ? 'text-end' : 'text-start'}`}>{time}</p>
            </div>
        );
    };


    return (
        <>
            {
                chats?.length == 0
                    ?
                    (
                        <Card className="bg-card flex h-full w-full col-span-3 items-center justify-center">
                            <p className="text-3xl font-semibold text-muted-foreground ">No current conversation</p>
                        </Card>
                    )
                    :
                    !chat?._id
                        ?
                        (
                            <Card className="bg-card flex h-full w-full col-span-3 items-center justify-center">
                                <p className="text-3xl font-semibold text-muted-foreground ">Select a conversation</p>
                            </Card>
                        )
                        : (
                            <div className="space-y-2 col-span-3 w-full h-[820px]">
                                <Card className="bg-background p-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2 ">
                                        <Avatar className='w-10 h-10 bg-black text-white ' >
                                            <AvatarImage src={otherUser?.profile_picture_url} />
                                            <AvatarFallback className='capitalize bg-inherit' >{otherUser?.username?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h5 className="w-max font-medium capitalize text-black ">
                                            {otherUser?.username}
                                        </h5>
                                    </div>
                                    <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="sticky">
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary "
                                            placeholder="Search messages..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyUp={(e) => { e.preventDefault(); onSearch(); }}
                                        />
                                        <button type="button" title="Search" className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <Search />
                                        </button>
                                    </form>
                                </Card>
                                <Card style={{ height: 'calc(100% - 68px)' }} className="bg-card p-1 relative flex justify-between flex-col ">

                                    <div ref={scrollRef} className="h-full pb-[56px] flex flex-col gap-2 overflow-y-auto px-1 py-4 ">
                                        {messages?.map((message, index) => (
                                            <MessageComponent
                                                key={index}
                                                message={message}
                                            />
                                        ))}
                                    </div>

                                    <div className="rounded-lg overflow-hidden h-[50px] absolute left-0 bottom-1 w-full p-1">
                                        <form className="relative flex items-center justify-between gap-2 h-full ">
                                            <input
                                                type="text"
                                                placeholder={"Type your message"}
                                                value={messageInput}
                                                className="w-full rounded-lg border border-stroke bg-gray-2 py-3.5 pl-5 pr-10 text-sm outline-none focus:border-primary "
                                                onChange={(e) => setMessageInput(e.target.value)}
                                                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSendMessage(); } }}
                                            />
                                            <Button className='absolute right-1 top-1/2 transform -translate-y-1/2 h-[95%]' onClick={(e) => { e.preventDefault(); onSendMessage(); }}>
                                                <Send />
                                            </Button>
                                        </form>
                                    </div>

                                </Card>
                            </div>
                        )}
        </>
    );
};
