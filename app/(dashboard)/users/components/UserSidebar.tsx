/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";

const UserSidebar = ({ activeMenuItem, setActiveMenuItem }: { activeMenuItem: any, setActiveMenuItem: any }) => {
    const menuItems = [
        { label: 'All Users', value: 'Find' },
        { label: 'Your Friends', value: 'Friends' },
        { label: 'Suggested For You', value: 'Suggested' },
        { label: 'Friend Requests', value: 'Received' },
        { label: 'Sent Invitations', value: 'Sent' },
    ];

    return (
        <div className="flex justify-start items-start w-full h-full mt-4 ">
            <Card className="bg-card shadow-md rounded-lg flex flex-col overflow-hidden w-full h-fit ">
                {menuItems.map(item => (
                    <button
                        key={item.value}
                        className={`text-startyy py-2 px-4 ${activeMenuItem.toLowerCase() === item?.value?.toLowerCase()
                            ? 'bg-theme-gradient text-primary-foreground hover:bg-theme-gradient '
                            : 'text-cool-gray hover:bg-muted hover:text-muted-foreground'
                            } transition-all duration-200 focus:outline-none`}
                        onClick={() => setActiveMenuItem(item?.value?.toLowerCase())}
                    >
                        {item.label}
                    </button>
                ))}
            </Card>
        </div>
    );
};

export default UserSidebar;
