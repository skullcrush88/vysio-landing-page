'use client'

import { useLenis } from '@/lib/lenis'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import MultiAgent from '@/components/sections/MultiAgent'
import OutputPreview from '@/components/sections/OutputPreview'
import Export from '@/components/sections/Export'
import FutureFeatures from '@/components/sections/FutureFeatures'
import MouseGlow from '@/components/effects/MouseGlow'

export default function Home() {
  // Initialize Lenis smooth scrolling
  useLenis()

  return (
    <main className="relative page-bg">
      {/* Mouse Glow Effect */}
      <MouseGlow />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Multi-Agent System */}
      <MultiAgent />

      {/* Output Preview */}
      <OutputPreview />

      {/* Export Section */}
      <Export />

      {/* Future Features */}
      <FutureFeatures />

      {/* Footer */}
      <Footer />
    </main>
  )
}

// Made with Bob
