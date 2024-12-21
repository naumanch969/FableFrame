"use client"

import { ChangeEvent, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UserSidebar from './components/UserSidebar';
import Users from './components/Users';
import { useGetProfiles } from '@/features/profile/api/useGetProfiles';
import { useGetMyFriends } from '@/features/friend/api/useGetMyFriends';
import { Doc } from '@/convex/_generated/dataModel';
import { useGetReceivedRequests } from '@/features/friend_requests/api/useGetReceivedRequests';
import { useGetSendRequests } from '@/features/friend_requests/api/useGetSendRequests';
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile';

const UsersPage = () => {

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [activeMenuItem, setActiveMenuItem] = useState<'find' | 'friends' | 'suggested' | 'received' | 'sent'>('find');
    const [searchValue, setSearchValue] = useState('')

    ////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const pageSize = 20;
    const maxLength = 20;
    const totalPages = Math.ceil(maxLength / pageSize);
    const { data: profile } = useCurrentProfile()
    const { data: users, isLoading: usersLoading } = useGetProfiles()
    const { data: friends, isLoading: friendsLoading } = useGetMyFriends()
    const { data: sendRequests, isLoading: sendRequestsLoading } = useGetSendRequests()
    const { data: receivedRequests, isLoading: receivedRequestsLoading } = useGetReceivedRequests()

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [docs, setDocs] = useState<Doc<"profiles">[]>([])

    useEffect(() => {
        setDocs(toggleProfiles())
    }, [activeMenuItem, users, friends, sendRequests, receivedRequests])

    ////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const toggleProfiles = () => {
        return activeMenuItem == 'find' ? users?.filter(p => p?._id != profile?._id)!
            : activeMenuItem == 'friends' ? friends! as Doc<"profiles">[]
                : activeMenuItem == 'received' ? receivedRequests! as Doc<"profiles">[]
                    : activeMenuItem == 'sent' ? sendRequests! as Doc<"profiles">[]
                        : users?.filter(p => p?._id != profile?._id)!   // it should not contain any sent/received requests or friends
    }
    const onSearch = () => {
        const docsToFilter = toggleProfiles()

        setDocs(docsToFilter.filter(p =>
            p.username.toLowerCase().includes(searchValue.toLowerCase())
            || p.email.toLowerCase().includes(searchValue.toLowerCase())
        ))

    }


    return (
        <div className="p-6 flex flex-col gap-4 w-full ">

            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-dark-slate-blue " >
                    Friends
                </h1>
                <div className="relative w-1/3 ">
                    <Input
                        placeholder="Search Friends..."
                        value={searchValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        className="w-full px-4 py-2"
                        onKeyUp={onSearch}
                    />
                    <button title='Search' onClick={onSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <Search />
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-4">
                <div className="col-span-1 flex justify-center items-center w-full ">
                    <UserSidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
                </div>
                <div className="col-span-3 w-full px-4 ">
                    <Users
                        data={docs}
                        isLoading={
                            activeMenuItem == 'find' ? usersLoading!
                                : activeMenuItem == 'friends' ? friendsLoading!
                                    : activeMenuItem == 'received' ? receivedRequestsLoading!
                                        : activeMenuItem == 'sent' ? sendRequestsLoading!
                                            : usersLoading!
                        }
                    />
                </div>
            </div>



        </div>
    );
};

export default UsersPage;
