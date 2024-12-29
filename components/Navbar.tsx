"use client"

import React from "react";
import Link from "next/link";
import ProfileButton from "@/components/ProfileButton";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import ModeToggle from "@/components/ModeToggle";
import NotificationMenu from "@/components/NotificationMenu";
import { useGetProfile } from "@/features/profile/api/useGetProfile";
import ChatMenu from "@/components/ChatMenu";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import GradientText from "./GradientText";
import { useSnackbar } from "@/hooks/use-snackbar";
import { Button } from "./ui/button";

export default function Navbar() {

    const { data: user } = useCurrentUser()
    const { data: profile } = useGetProfile()
    const pathname = usePathname()
    const router = useRouter()
    const [snackbarText, _setText] = useSnackbar()
    const isSignedIn = Boolean(user)

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Friends', path: '/users' },
        { name: 'Create', path: '/create-story' },
        { name: 'Pricing', path: '/billing' },
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
                                isSignedIn
                                    ? <ProfileButton />
                                    : <Button
                                        variant='gradient'
                                        onClick={() => router.push('/explore')}
                                        className="w-fit rounded-full"
                                    >
                                        Get Started
                                    </Button>
                            }
                        </div>
                    </div>
                </div>

                {
                    snackbarText &&
                    <div className="w-full py-2 px-8 bg-alert text-primary text-center rounded-lg ">
                        {snackbarText}
                    </div>
                }
            </nav>
        </>
    );
}