"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileButton from "@/components/ProfileButton";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { Bell } from "lucide-react";
import Hint from "@/components/Hint";
import ModeToggle from "@/components/ModeToggle";
import NotificationMenu from "@/components/NotificationMenu";
import { useCurrentProfile } from "@/features/profile/api/useCurrentProfile";
import ChatMenu from "@/components/ChatMenu";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import GradientText from "./GradientText";

export default function Navbar() {

    const { data: user } = useCurrentUser()
    const { data: profile } = useCurrentProfile()
    const pathname = usePathname()
    const isSignedIn = Boolean(user)

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Users', path: '/users' },
        { name: 'Create', path: '/create-story' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav className="sticky bg-surface dark:bg-black rounded-full px-3 py-3 top-2 border inset-x-0 max-w-7xl mx-auto z-50">

            <div className="w-full flex items-center justify-between ">
                {/* Left: Logo */}
                <Logo />

                {
                    isSignedIn &&
                    <div className="hidden md:flex items-end gap-6 text-primary-foreground">
                        {
                            menus.map((menu, index) => (
                                pathname == menu.path
                                    ?
                                    <GradientText key={index} >
                                        <Link
                                            href={menu.path}
                                            className={`scale-110 hover:scale-110 font-medium text-xl`}
                                        >
                                            {menu.name}
                                        </Link>
                                    </GradientText>
                                    :
                                    <Link
                                        key={index}
                                        href={menu.path}
                                        className={`hover:scale-110 font-medium text-surface-foreground transition-all`}
                                    >
                                        {menu.name}
                                    </Link>
                            ))
                        }
                    </div>
                }

                {/* Right: Theme Toggle, and Profile Dropdown */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <ModeToggle />
                        {
                            Boolean(profile) &&
                            <>
                                <NotificationMenu />
                                <ChatMenu />
                            </>
                        }
                    </div>
                    {
                        isSignedIn && <ProfileButton />
                    }
                </div>
            </div>
        </nav>
    );
}