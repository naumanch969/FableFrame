import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Id } from '@/convex/_generated/dataModel';
import { useGetMyChats } from '@/features/chat/api/useGetMyChats';
import { useGetChat } from '@/features/chat/api/useGetChat';
import { useGetProfile } from '@/features/profile/api/useGetProfile'
import { Chat } from '@/types';
import { Card } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import { useChatId } from '@/hooks/use-chat-id';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getRelativeTime } from '@/lib/utils';
import { useCreateChatModal } from '@/hooks/use-create-chat-modal';
import ChatItem from '@/components/ChatItem';
import { Input } from '@/components/aceternity/input';

export const ChatList = () => {

    //////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
    const { data: fetchedChats } = useGetMyChats()
     const [_openChatModal, setOpenChatModal] = useCreateChatModal()

    //////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState(fetchedChats)

    //////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
    useEffect(() => {
        setChats(fetchedChats)
    }, [fetchedChats]);

    //////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
    const onSearch = () => {
        setChats(fetchedChats?.filter(chat =>
            Boolean(chat?.participant_profiles?.find(p =>
                p?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
                || p?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase())
            ))
        ))
    };


    //////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
    return (
        <div className="h-[80vh] col-span-1 flex flex-col gap-2 relative ">

            <Button onClick={() => setOpenChatModal(true)} variant='secondary' size='icon' className='bg-black text-primary-foreground absolute bottom-2 right-2 rounded-lg w-10 h-10 ' ><Plus /></Button>

            <Card className="bg-card w-full space-y-2 overflow-hidden p-1 h-[52px] ">
                <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="sticky">
                    <Input
                        type="text"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={(e) => { e.preventDefault(); onSearch(); }}
                    />
                    <button type="button" title="Search" className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Search />
                    </button>
                </form>
            </Card>

            <Card style={{ height: 'calc(100% - 60px)' }} className="bg-card flex flex-col gap-y-1 p-1 overflow-y-auto">

                {chats?.length == 0 && (
                    <span className="block w-full text-center tex-xs text-muted-foreground mt-2 px-2 ">
                        {searchQuery?.length > 0 ? 'No chat matches your search query.' : 'No conversation found.'}
                    </span>
                )}
                {chats?.map((chat, index) => (
                    // @ts-ignore
                    <ChatItem key={index} chat={chat} />
                ))}
            </Card>

        </div>
    );
};
