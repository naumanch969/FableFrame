import React, { ReactNode } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"


interface DrawerProps {
    open: boolean;
    title: string;
    description: string;
    children: ReactNode;
    setOpen: any
}

const Drawer: React.FC<DrawerProps> = ({
    open,
    title,
    description,
    setOpen,
    children
}) => {

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetContent className='' >
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
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
