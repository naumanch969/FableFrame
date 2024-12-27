"use client"

import React, { useState } from "react"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetNotifications } from "@/features/notification/api/useGetNotifications"
import { useCurrentProfile } from "@/features/profile/api/useCurrentProfile"
import { Doc } from "@/convex/_generated/dataModel"
import { useNotificationDrawer } from "@/hooks/use-notification-drawer"
import { getRelativeTime } from "@/lib/utils"
import Hint from '@/components/Hint'

function NotificationMenu() {

    const [openNotificationMenu, setOpenNotificationMenu] = React.useState(false)
    const { data: profile } = useCurrentProfile()
    const { data: notifications } = useGetNotifications(profile?._id!)
    const [_openNotificationDrawer, setOpenNotificationDrawer] = useNotificationDrawer()


    const NotificationItem = ({ notification }: { notification: Doc<"notifications"> }) => {

        const formattedTime = getRelativeTime(new Date(notification?._creationTime))

        return (
            <DropdownMenuItem onClick={() => setOpenNotificationMenu(false)} className="flex items-start gap-2 p-2">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">{formattedTime}</span>
                    <span className="text-sm text-surface-foreground">{notification?.content}</span>
                </div>
            </DropdownMenuItem>
        );
    }
    return (
        <DropdownMenu open={openNotificationMenu} onOpenChange={setOpenNotificationMenu} >
            <Hint label='Notifications' >
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                </DropdownMenuTrigger>
            </Hint>
            <DropdownMenuContent align="end">
                {
                    // TODO: sort based on priority
                    notifications?.slice(0, 4)?.map((notification, index) => (
                        <NotificationItem key={index} notification={notification} />
                    ))
                }
                {
                    notifications?.length! > 4 &&
                    <DropdownMenuItem onClick={() => { setOpenNotificationDrawer(true); setOpenNotificationMenu(false) }} className="cursor-pointer flex justify-center p-2 w-full ">
                        <span>Show More</span>
                    </DropdownMenuItem>
                }
                {
                    notifications?.length == 0 &&
                    <div className="flex justify-center items-center py-2 px-2 ">
                        <span className="text-sm w-full ">
                            No notifications as per now.
                        </span>
                    </div>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationMenu