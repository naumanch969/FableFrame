import { useNotificationDrawer } from '@/hooks/use-notification-drawer';
import React from 'react';
import { useGetProfile } from '@/features/profile/api/useGetProfile'
import { useGetNotifications } from '@/features/notification/api/useGetNotifications';
import Drawer from '@/components/Drawer';
import { Loader } from 'lucide-react';
import { Doc } from '@/convex/_generated/dataModel';
import { Card } from '../ui/card';

const NotificationDrawer = () => {
    const [open, setOpen] = useNotificationDrawer();
    const { data: profile } = useGetProfile();
    const { data: notifications, isLoading } = useGetNotifications(profile?._id!);

    const NotificationItem = ({ notification }: { notification: Doc<"notifications"> }) => {
        const timeAgo = new Date(notification?._creationTime).toLocaleString();

        const handleMarkAsRead = () => {
            // Here you can implement marking the notification as read logic
            console.log(`Notification ${notification?._id} marked as read`);
        };

        return (
            <Card className="bg-card flex items-center space-x-4 p-4 border-b border-gray-200">
                <div className="flex-grow">
                    <p className="text-gray-700">{notification?.content}</p>
                    <p className="text-sm text-gray-500">Sent at: {timeAgo}</p>
                </div>

                <div className="flex-shrink-0">
                    <button
                        className="text-primary hover:text-primary-700"
                        onClick={handleMarkAsRead}
                        aria-label="Mark as Read"
                    >
                        Mark as Read
                    </button>
                </div>
            </Card>
        );
    };

    return (
        <Drawer
            title='Notifications'
            open={open}
            setOpen={setOpen}
            description='Here you can see all your notifications.'
            link='/notifications'
        >
            <div className="space-y-4 mt-4 ">
                {/* Loading Spinner */}
                {isLoading ? (
                    <div className="w-full flex justify-center items-center">
                        <Loader className="animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Empty State */}
                        {notifications?.length === 0 ? (
                            <p className="text-gray-500">You have no notifications yet.</p>
                        ) : (
                            // Render Notifications
                            <div className="space-y-2">
                                {notifications?.map((notification, index) => (
                                    <NotificationItem key={index} notification={notification} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Drawer>
    );
};

export default NotificationDrawer;
