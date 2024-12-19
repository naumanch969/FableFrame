import React, { ReactNode } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface DrawerProps {
    open: boolean;
    title: string;
    description: string;
    children: ReactNode;
    setOpen: any;
    link?: string;
}

const Drawer: React.FC<DrawerProps> = ({
    open,
    title,
    description,
    setOpen,
    link,
    children
}) => {

    const router = useRouter()

    const onNavigation = () => {
        setOpen(false)
        router.push(link!)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetContent className='' >
                <SheetHeader>
                    <SheetTitle className='flex items-center gap-1' >{title} {link && <Navigation className='w-4 h-4 cursor-pointer' onClick={onNavigation} />}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                <div className="h-[90vh] overflow-y-auto px-6 pb-4 ">
                    {children}
                </div>
            </SheetContent>
        </Sheet>

    );
};

export default Drawer;
