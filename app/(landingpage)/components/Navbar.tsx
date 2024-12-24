"use client"

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/aceternity/navbar-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

export default function Navbar() {

    const { data: user } = useCurrentUser()
    const { data: profile } = useCurrentProfile()
    const isSignedIn = Boolean(user)

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Users', path: '/users' },
        { name: 'Create', path: '/create-story' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav className="sticky bg-white rounded-full px-8 py-3 top-2 border inset-x-0 max-w-7xl mx-auto z-50">

            <div className="w-full flex items-center justify-between ">
                {/* Left: Logo */}
                <div className="">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src='/logo_mini.svg' alt='Logo' height={32} width={32} />
                        <h2 className="font-bold text-2xl text-primary">StoryBot</h2>
                        {/* <Image src='/logo.svg' alt='Logo' height={40} width={160} /> */}
                    </Link>
                </div>

                {
                    isSignedIn &&
                    <div className="hidden md:flex gap-8 text-primary-foreground">
                        {
                            menus.map((menu, index) => (

                                <HoveredLink key={index} href={menu.path}>{menu.name}</HoveredLink>

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



function Navbar2({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-7xl mx-auto z-50", className)}
        >

            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>

        </div>
    );
}
