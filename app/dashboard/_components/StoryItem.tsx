import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const StoryItem = ({ story }: { story: any }) => {
    return (
        <Link href={'/story/' + story?.id}>
            <Card className="w-full h-[300px] col-span-12 sm:col-span-5 hover:scale-105 transition-all cursor-pointer">
                <Image
                    alt="Cover"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src="https://nextui.org/images/card-example-6.jpeg"
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-xl">{story?.output?.story_cover?.title}</p>
                    </div>
                    <Button className="text-tiny" color="primary" size="sm">
                        Read Now
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default StoryItem