import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link'

const AdminSidebar = () => {

    const pathname = usePathname()

    const menuItems = [
        { label: 'users', value: 'Users' },
        { label: 'stories', value: 'Stories' },
        { label: 'reports', value: 'Reports' },
        { label: 'comments', value: 'Comments' },
        { label: 'contacts', value: 'Contacts' },
        { label: 'feedbacks', value: 'Feedback' },
        { label: 'images', value: 'Images' },
    ];

    return (
        <div className="flex justify-start items-start w-full h-full ">
            <Card className="bg-card shadow-md rounded-lg flex flex-col overflow-hidden w-full h-fit ">
                {menuItems.map(item => (
                    <Link
                        href={`/admin/${item?.label?.toLowerCase()}`}
                        key={item.value}
                        className={`text-start py-2 px-4 ${pathname.includes(item?.label?.toLowerCase())
                            ? 'bg-theme-gradient text-primary-foreground hover:bg-muted '
                            : 'text-cool-gray hover:bg-muted hover:text-muted-foreground'
                            } transition-all duration-200 focus:outline-none`}
                    >
                        {item.value}
                    </Link>
                ))}
            </Card>
        </div>
    );
};

export default AdminSidebar;