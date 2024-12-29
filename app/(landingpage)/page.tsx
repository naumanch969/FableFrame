"use client"

import { HeroHighlight } from "@/components/aceternity/hero-highlight"
import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false })
const Hero = dynamic(() => import("./components/Hero"), { ssr: false })
const Features = dynamic(() => import("./components/Features"), { ssr: false })
const HowItWorks = dynamic(() => import("./components/HowItWorks"), { ssr: false })
const Testimonials = dynamic(() => import("./components/Testimonials"), { ssr: false })
const CTA = dynamic(() => import("./components/CTA"), { ssr: false })
const Pricing = dynamic(() => import("./components/Pricing"), { ssr: false })
const FAQ = dynamic(() => import("./components/FAQ"), { ssr: false })
const Contact = dynamic(() => import("./components/Contact"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })

export default function Home() {

  return (
    <div className="mx-auto">

      <HeroHighlight containerClassName="w-full h-fit" >
        <Navbar />
        <div className="flex justify-center" >
          <Hero />
        </div>
      </HeroHighlight>

      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Pricing />
      <FAQ />
      <Contact />
      <div className="max-w-screen-xl">
      </div>

      <Footer />
    </div>
  )
}
