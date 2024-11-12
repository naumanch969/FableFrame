import Hero from "./components/Hero"
import Navbar from "./components/Navbar"

export default function Home() {
  return (
    <div className="bg-[#cad3ff] flex justify-center" >
      <div className="max-w-7xl">
        <div className="min-h-screen">
          <Navbar />
          <Hero />
        </div>
      </div>
    </div>
  )
}
