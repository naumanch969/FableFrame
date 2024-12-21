import { Doc } from '@/convex/_generated/dataModel'
import UserCard from './UserCard'
import Image from 'next/image'

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
                            <div className='col-span-4 w-full flex flex-col justify-center items-center grayscale '>
                                <Image src={'/empty.png'} alt='Empty' width={384} height={384} className='grayscale ' />
                                <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                                <span className='text-muted-foreground text-center text-md ' >It's our fault, not yours.</span>
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