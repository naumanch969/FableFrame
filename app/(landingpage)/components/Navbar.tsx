"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import { usePathname } from "next/navigation";
import ProfileButton from "@/components/ProfileButton";

export default function Navbar() {

    const { data } = useCurrentUser()
    const isSignedIn = Boolean(data)
    const pathname = usePathname()

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Create Story', path: '/create-story' },
        { name: 'Explore Story', path: '/explore' },
        { name: 'Contact Us', path: '/contact' },
    ]

    return (
        <nav className="px-8 py-6 flex justify-center">

            <div className="w-full flex items-center justify-between ">
                {/* Left: Logo */}
                <div className="text-primary-foreground font-bold text-lg">
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
                                <Link
                                    href={menu.path}
                                    key={index}
                                    className="text-lg text-primary font-medium hover:underline "
                                >{menu.name}</Link>
                            ))
                        }
                    </div>
                }

                {/* Right: Theme Toggle, and Profile Dropdown */}
                <div className="flex items-center gap-6">
                    {/* <ModeToggle /> */}
                    {
                        isSignedIn
                            ?
                            <ProfileButton />
                            :
                            <Link href='/explore' >
                                <Button size='lg' >Get Started</Button>
                            </Link>
                    }
                </div>
            </div>
        </nav>
    );
}
