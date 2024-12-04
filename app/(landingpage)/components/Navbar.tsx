"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {

    const isSignedIn = false

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Create Story', path: '/create-story' },
        { name: 'Explore Story', path: '/explore' },
        { name: 'Contact Us', path: '/contact-us' },
    ]

    return (
        <nav className="py-6 flex justify-center">

            <div className="w-full flex items-center justify-between ">
                {/* Left: Logo */}
                <div className="text-primary-foreground font-bold text-lg">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src='/logo_mini.svg' alt='Logo' height={32} width={32} />
                        <h2 className="font-bold text-2xl text-primary">Constellation</h2>
                        {/* <Image src='/logo.svg' alt='Logo' height={40} width={160} /> */}
                    </Link>
                </div>

                <div className="hidden md:flex gap-8 text-primary-foreground">
                    {
                        menus.map((menu, index) => (
                            <Link
                                href={menu.path}
                                key={index}
                                className=" text-xl text-primary font-medium hover:underline "
                            >{menu.name}</Link>
                        ))
                    }
                </div>

                {/* Right: Theme Toggle, and Profile Dropdown */}
                <div className="flex items-center gap-6">
                    {/* <ModeToggle /> */}
                    <Link href='/dashboard' >
                        <Button size='lg' className='' >{isSignedIn ? 'Dashboard' : 'Get Started'}</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
