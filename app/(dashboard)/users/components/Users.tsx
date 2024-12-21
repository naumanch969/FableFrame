import { Doc } from '@/convex/_generated/dataModel'
import UserCard from './UserCard'
import Image from 'next/image'
import Empty from '@/components/Empty'

const Users = ({ data, isLoading }: { data: Doc<"profiles">[], isLoading: boolean }) => {


    return (
        <div className='flex flex-col gap-y-8 w-full' >
            <div className='w-full flex flex-col gap-4 '>
                {
                    isLoading
                        ?
                        Array(6).fill("").map((_, index) => (
                            <UserCard.Skeleton key={index} />
                        ))
                        :
                        data?.length == 0
                            ?
                            <div className='col-span-4'>
                                <Empty />
                            </div>
                            :
                            data?.map((friend, index) => (
                                <UserCard key={index} user={friend} type={'friend'} />
                            ))
                }
            </div>


        </div>
    )
}

export default Users