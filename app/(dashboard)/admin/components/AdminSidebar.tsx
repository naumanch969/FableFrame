import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";

const AdminSidebar = () => {

    const router = useRouter()
    const pathname = usePathname()

    const menuItems = [
        { label: 'users', value: 'Users' },
        { label: 'stories', value: 'Stories' },
        { label: 'reports', value: 'Reports' },
        { label: 'comments', value: 'Comments' },
        { label: 'contacts', value: 'Contacts' },
        { label: 'feedback', value: 'Feedback' },
    ];

    return (
        <div className="flex justify-start items-start w-full h-full ">
            <Card className="bg-card shadow-md rounded-lg flex flex-col overflow-hidden w-full h-fit ">
                {menuItems.map(item => (
                    <button
                        key={item.value}
                        className={`text-start py-2 px-4 ${pathname.includes(item?.label?.toLowerCase())
                            ? 'bg-theme-gradient text-primary-foreground hover:bg-primary '
                            : 'text-cool-gray hover:bg-muted hover:text-muted-foreground'
                            } transition-all duration-200 focus:outline-none`}
                        onClick={() => router.push(`/admin/${item?.label?.toLowerCase()}`)}
                    >
                        {item.value}
                    </button>
                ))}
            </Card>
        </div>
    );
};

export default AdminSidebar;