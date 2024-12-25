/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Doc } from '@/convex/_generated/dataModel';
import { useCreateChat } from '@/features/chat/api/useCreateChat';
import { useGetMyChats } from '@/features/chat/api/useGetMyChats';
import { useGetMyFriends } from '@/features/friend/api/useGetMyFriends';
import { useAcceptRequest } from '@/features/friend_requests/api/useAcceptRequest';
import { useDeleteRequest } from '@/features/friend_requests/api/useDeleteRequest';
import { useGetReceivedRequests } from '@/features/friend_requests/api/useGetReceivedRequests';
import { useGetSendRequests } from '@/features/friend_requests/api/useGetSendRequests';
import { useRejectRequest } from '@/features/friend_requests/api/useRejectRequest';
import { useSendRequest } from '@/features/friend_requests/api/useSendRequest';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Profile = Doc<"profiles">


const FriendButton = ({ profile: thisProfile }: { profile: Profile }) => {

    //////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////
    const router = useRouter();
    const pathname = usePathname()
    const isProfilePage = pathname == '/profile'

    const { data: friends } = useGetMyFriends()
    const { data: sentRequests } = useGetSendRequests()
    const { data: receivedRequests } = useGetReceivedRequests()
    const { data: chats } = useGetMyChats()

    const { mutate: createChat, isPending: creatingChat } = useCreateChat()
    const { mutate: addFriend, isPending: addingFriend } = useSendRequest()
    const { mutate: acceptRequeset, isPending: acceptingRequest } = useAcceptRequest()
    const { mutate: rejectRequest, isPending: rejectingRequest } = useRejectRequest()
    const { mutate: deleteRequest, isPending: deletingRequest } = useDeleteRequest()

    const isFriend = friends?.some(f_profile => f_profile?._id == thisProfile?._id)
    const isFriendRequestSent = sentRequests?.some(receiver_profile => receiver_profile?._id == thisProfile?._id)
    const isFriendRequestReceived = receivedRequests?.some(sender_profile => sender_profile?._id == thisProfile?._id)

    //////////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////
    const handleSendFriendRequest = () => {
        addFriend({ formData: { receiver_id: thisProfile?._id } }, {
            onSuccess: () => toast.success('Request sent successfully.', { position: 'top-right' })
        })
    };

    const handleAcceptFriendRequest = () => {
        acceptRequeset({ formData: { sender_id: thisProfile?._id } }, {
            onSuccess: () => toast.success(`Congratulations! You and ${thisProfile.username} are friends now.`, { position: 'top-right' })
        })
    };

    const handleRejectFriendRequest = () => {
        rejectRequest({ formData: { sender_id: thisProfile?._id } }, {
            onSuccess: () => toast.success('Request rejected successfully.', { position: 'top-right' })
        })
    };

    const handleRemoveFriendRequest = () => {
        deleteRequest({ formData: { receiver_id: thisProfile?._id } }, {
            onSuccess: () => toast.success('Friend request removed.', { position: 'top-right' })
        })
    };

    const onCreateChat = () => {

        const existingChat = chats?.find((chat: any) => chat?.participants?.includes(thisProfile._id));

        if (existingChat) {
            localStorage.setItem('lastChat', existingChat?._id);
            router.push('/chats?id=' + existingChat?._id);
        }
        else {
            createChat({ formData: { other_profile_id: thisProfile?._id } }, {
                onSuccess: (chatId) => {
                    localStorage.setItem('lastChat', chatId!);
                    router.push('/chats?id=' + chatId);
                }
            })
        }

    }

    return (
        <div>
            {isFriend && !isProfilePage && (
                <div className='flex gap-4' >
                    <Button variant='secondary' className="" onClick={onCreateChat}>
                        {creatingChat ? 'Loading' : 'Message'}
                    </Button>
                    <Button className="bg-black hover:bg-black/80 text-white" onClick={() => router.push(`/user/${thisProfile?._id}`)}>
                        View Profile
                    </Button>
                </div>
            )}
            {isFriendRequestSent && (
                <Button variant='destructive' disabled={deletingRequest} onClick={handleRemoveFriendRequest}>
                    {deletingRequest ? 'Loading' : 'Remove Request'}
                </Button>
            )}
            {isFriendRequestReceived && (
                <div className="flex justify-between gap-2 mt-1">
                    <Button
                        disabled={rejectingRequest}
                        variant="destructive"
                        onClick={handleRejectFriendRequest}
                    >
                        {rejectingRequest ? 'Loading' : 'Reject'}
                    </Button>
                    <Button
                        disabled={acceptingRequest}
                        onClick={handleAcceptFriendRequest}
                    >
                        {acceptingRequest ? 'Loading' : 'Accept Request'}
                    </Button>
                </div>
            )}
            {!isFriend && !isFriendRequestSent && !isFriendRequestReceived && (
                <div className="flex justify-between gap-2 mt-1">
                    <Button variant='gradient' disabled={addingFriend} onClick={handleSendFriendRequest}>
                        {addingFriend ? 'Loading' : 'Add Friend'}
                    </Button>
                    {
                        !isProfilePage &&
                        <Button
                            className="bg-black hover:bg-black/80 text-white"
                            onClick={() => router.push(`/profile/${thisProfile?._id}`)}
                        >
                            View Profile
                        </Button>
                    }
                </div>
            )}
        </div>
    )
}

export default FriendButton