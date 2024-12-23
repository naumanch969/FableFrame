"use client"

import { ReactNode } from 'react';
import AdminSidebar from './components/AdminSidebar'
const UsersPage = ({ children }: { children: ReactNode }) => {


    return (
        <div className="p-6 flex flex-col gap-4 w-full ">

            <div className="grid grid-cols-4">
                <div className="col-span-1 flex justify-center items-center w-full ">
                    <AdminSidebar />
                </div>
                <div className="col-span-3 w-full px-4 ">
                    {children}
                </div>
            </div>



        </div>
    );
};

export default UsersPage;
