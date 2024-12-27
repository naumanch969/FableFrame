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
import { useSnackbar } from "@/hooks/use-snackbar";

export default function Navbar() {

    const { data: user } = useCurrentUser()
    const { data: profile } = useCurrentProfile()
    const pathname = usePathname()
    const [text, _setText] = useSnackbar()
    const isSignedIn = Boolean(user)

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Friends', path: '/users' },
        { name: 'Create', path: '/create-story' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <>
            <nav className="sticky space-y-1 top-2 inset-x-0 max-w-7xl mx-auto z-50">
                <div className="bg-surface rounded-full px-3 py-3 top-2 border">
                    <div className="w-full flex items-center justify-between pl-1 ">
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
                </div>

                {
                    text &&
                    <div className="w-full py-2 px-8 bg-alert text-white text-center rounded-lg ">
                        {text}
                    </div>
                }
            </nav>
        </>
    );
}