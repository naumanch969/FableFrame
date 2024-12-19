/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Doc } from '@/convex/_generated/dataModel';
import FriendButton from './FriendButton';
import { useRouter } from 'next/navigation';

const UserCard = ({ user }: { user: Doc<"profiles">, type: string }) => {

    //////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////
    const router = useRouter();

    //////////////////////////////////////////////////////// RENDERE ////////////////////////////////////////////////////////////
    return (
        <div className="bg-background p-4 shadow-md rounded-md flex justify-between">
            <div
                onClick={() => router.push(`/user/${user._id}`)}
                className="cursor-pointer w-full flex items-center gap-4"
            >
                <Avatar className="bg-slate-400">
                    <AvatarImage src={user?.profile_picture_url} className="object-cover" />
                    <AvatarFallback className="capitalize">
                        {user?.username?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start items-start">
                    <p className="hover:underline hover:text-green text-center text-sm font-medium text-dark-slate-blue-darken capitalize">
                        {user?.username}
                    </p>
                    <p>{user.username}</p>
                </div>
                <p className="text-cool-gray text-xs">
                    ({Number(1) > 0 ? `${0} Mutual Friends` : 'No Mutual Friends'})
                </p>
            </div>
            <FriendButton profile={user} />
        </div>
    );
};

UserCard.Skeleton = function () {
    return (
        <div className="bg-background p-4 shadow-md rounded-md flex justify-between animate-pulse">
            <div className="w-full flex items-center gap-4">
                <Avatar className="bg-slate-400">
                    <AvatarFallback className="capitalize"></AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2 justify-start items-start">
                    <p className="w-32 h-4 bg-gray-400 rounded" />
                    <p className="w-20 h-4 bg-gray-300 rounded" />
                </div>
            </div>
            <div>
                <Button className="bg-gray-300 hover:bg-gray-300 px-12" />
            </div>
        </div>
    );
};

export default UserCard;
