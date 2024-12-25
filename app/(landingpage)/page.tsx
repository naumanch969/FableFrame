"use client"

import Footer from "@/components/Footer"
import Hero from "./components/Hero"
import Navbar from "@/components/Navbar"
import { HeroHighlight } from "@/components/aceternity/hero-highlight"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Testimonials from "./components/Testimonials"
import CTA from "./components/CTA"
import Pricing from "./components/Pricing"
import FAQ from "./components/FAQ"
import Contact from "./components/Contact"

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
