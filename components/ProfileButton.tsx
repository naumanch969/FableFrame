import React from "react";
import { useCurrentProfile } from "@/features/profile/api/useCurrentProfile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from 'sonner'

const ProfileButton: React.FC = () => {

    const { data } = useCurrentProfile();
    const { signOut } = useAuthActions()

    const onLogout = async () => {
        signOut()
            .then(() => {
                toast.success("Logout successfully.")
            })
            .catch(() => {
                toast.error("Failed to logout.", { position: "top-right" })
            })
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer rounded-md flex items-center gap-2 px-3 py-1">
                    <span className="hidden sm:block font-medium text-md capitalize ">
                        {data?.username || "User"}
                    </span>
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={data?.profile_picture_url} alt={data?.username} />
                        <AvatarFallback className="capitalize text-2xl" >{data?.username?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                    <Link href="/profile" className="w-full text-left py-1 px-1 ">
                        View Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/settings" className="w-full text-left py-1 px-1 ">
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button
                        onClick={onLogout}
                        className="w-full text-left py-1 px-1 "
                    >
                        Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;
