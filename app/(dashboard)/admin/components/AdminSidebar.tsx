import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";

const AdminSidebar = () => {

    const router = useRouter()
    const pathname = usePathname()

    const menuItems = [
        { label: 'users', value: 'Users' },
        { label: 'stories', value: 'Stories' },
        { label: 'reports', value: 'Reports' },
    ];

    return (
        <div className="flex justify-start items-start w-full h-full mt-4 ">
            <Card className="bg-card shadow-md rounded-lg flex flex-col overflow-hidden w-full h-fit ">
                {menuItems.map(item => (
                    <button
                        key={item.value}
                        className={`text-startyy py-2 px-4 ${pathname.includes(item?.value?.toLowerCase())
                            ? 'bg-primary text-primary-foreground'
                            : 'text-cool-gray'
                            } hover:bg-primary hover:text-white transition-all duration-200 focus:outline-none`}
                        onClick={() => router.push(`/admin/${item?.value?.toLowerCase()}`)}
                    >
                        {item.label}
                    </button>
                ))}
            </Card>
        </div>
    );
};

export default AdminSidebar;