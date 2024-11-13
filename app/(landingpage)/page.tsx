import Hero from "./components/Hero"
import Navbar from "./components/Navbar"

export default function Home() {
  return (
    <div className="flex justify-center" >
      <div className="min-h-screen">
        <Hero />
      </div>
    </div>
  )
}
