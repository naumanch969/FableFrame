"use client"

import { HeroHighlight } from "@/components/aceternity/hero-highlight"
import Plans from "@/components/Plans"

import Navbar from '@/components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from '@/components/Footer'

export default function Home() {

  return (
    <div className="mx-auto">

      <HeroHighlight containerClassName="w-full h-fit" >
        <Navbar />
        <div className="flex justify-center" >
          {/* <Hero /> */}
        </div>
      </HeroHighlight>

      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Plans />
      <FAQ />
      <Contact />
      <div className="max-w-screen-xl">
      </div>

      <Footer />
    </div>
  )
}
