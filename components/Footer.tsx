"use client"
import HydrationWrapper from "@/wrappers/HydrationWrapper";
import { FacebookIcon, TwitterIcon, InstagramIcon, MailIcon, PhoneIcon } from "lucide-react"; // Replace with icons of your choice
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stories', path: '/explore' },
    { name: 'Create', path: '/create-story' },
    { name: 'Pricing', path: '/billing' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <HydrationWrapper>
      <div className='w-full flex justify-center' >
        <footer className="flex flex-col items-center py-8 mt-8 max-w-7xl mx-auto " >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Section 1: About */}
            <div className="space-y-4" >
              <Logo />
              <p className="mt-2 text-md text-muted-foreground">
                FableFrame is an AI-powered storytelling platform where users can generate, save, and share creative stories. Join us and turn your imagination into compelling narratives.
              </p>
            </div>

            {/* Section 2: Quick Links */}
            <div className='space-y-2' >
              <h4 className="font-bold text-xl text-foreground">Quick Links</h4>
              <ul className="mt-2 space-y-2">
                {
                  quickLinks.map((link, index) => (
                    <li key={index} >
                      <Link href={link.path} className="text-muted-foreground hover:underline">{link.name}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>

            {/* Section 3: Contact Us */}
            <div className="flex flex-col gap-4" >
              <div className="space-y-2">
                <h4 className="font-bold text-xl text-foreground">Contact Us</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MailIcon className="w-6 h-6 text-muted-foreground" />
                    <Link href="mailto:support@fableframe.com" className="text-lg text-muted-foreground hover:text-accent">support@fableframe.com</Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneIcon className="w-6 h-6 text-muted-foreground" />
                    <span className="text-lg text-muted-foreground " >+1 (555) 123-4567</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xl text-foreground">Socials</h4>
                <div className="flex justify-start gap-4" >
                  <div className="bg-accent p-3 rounded-lg ">
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      <FacebookIcon className="w-8 h-8 text-primary-foreground " />
                    </Link>
                  </div>
                  <div className="bg-accent p-3 rounded-lg ">
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      <TwitterIcon className="w-8 h-8 text-primary-foreground " />
                    </Link>
                  </div>
                  <div className="bg-accent p-3 rounded-lg ">
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      <InstagramIcon className="w-8 h-8 text-primary-foreground " />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-foreground" >
            © {new Date().getFullYear()} FableFrame. All rights reserved.
          </div>
        </footer>
      </div>
    </HydrationWrapper >
  );
}

export default Footer;