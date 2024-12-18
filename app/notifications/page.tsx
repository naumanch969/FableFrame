"use client";

import React from 'react';
import { useGetNotifications } from '@/features/notification/api/useGetNotifications';
import { useCurrentProfile } from '@/features/profile/api/useCurrentProfile';
import { Doc } from '@/convex/_generated/dataModel';
import Heading from '@/components/Heading';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const Notifications = () => {

  const { data: profile } = useCurrentProfile();
  const { data: notifications } = useGetNotifications(profile?._id!);
  const [open, setOpen] = React.useState(false);
  const NotificationItem = ({ notification }: { notification: Doc<"notifications"> }) => {
    const timeAgo = new Date(notification?._creationTime).toLocaleString();

    return (
      <div className="bg-card p-4 border border-gray-200 rounded-lg shadow-md">
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700">{notification?.content}</p>
          <p className="text-sm text-gray-500">Sent at: {timeAgo}</p>
        </div>
        <button className="text-primary hover:text-primary-700 mt-2">Mark as Read</button>
      </div>
    );
  };

  return (
    <div className="">

      <div onClick={() => setOpen(true)} className="w-full flex justify-start">
        <Heading title="Notifications" size="large" />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>


      {/* Display if no notifications are available */}
      {notifications && notifications.length === 0 ? (
        <div className="text-center text-gray-500">You have no notifications yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Render the list of notifications in a grid */}
          {notifications?.map((notification, index) => (
            <NotificationItem key={index} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
