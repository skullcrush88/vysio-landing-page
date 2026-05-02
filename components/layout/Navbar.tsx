'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Cpu, Wrench, DollarSign, X, ChevronRight } from 'lucide-react'

// Smooth scroll handler with 0.2s duration
const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  const targetId = href.replace('#', '')
  const targetElement = document.getElementById(targetId)
  
  if (targetElement) {
    const targetPosition = targetElement.offsetTop
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 700 // 0.7s in milliseconds
    let start: number | null = null
    
    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Easing function for smooth animation
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      
      window.scrollTo(0, startPosition + distance * ease)
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }
    
    requestAnimationFrame(animation)
  }
}

const navItems = [
  { icon: Home, label: 'HOME', href: '#' },
  { icon: User, label: 'ABOUT', href: '#features' },
  { icon: Cpu, label: 'AGENTS', href: '#agents' },
  { icon: Wrench, label: 'HOW', href: '#how-it-works' },
  { icon: DollarSign, label: 'PRICING', href: '#pricing' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>('#')

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for navbar height

      // Check if at top of page
      if (scrollPosition < 300) {
        setActiveSection('#')
        return
      }

      // Check each section
      const sections = ['features', 'agents', 'how-it-works', 'pricing']
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${sectionId}`)
            return
          }
        }
      }
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-6"
      >
        <div className="flex items-center justify-between py-3 px-6 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className="text-xl tracking-tight"
              style={{
                fontFamily: 'var(--font-instrument)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#0a0a0a'
              }}
            >
              Vysio
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, '#features')}
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              How It Works
            </a>
            <a
              href="#agents"
              onClick={(e) => handleSmoothScroll(e, '#agents')}
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              Agents
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, '#pricing')}
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              Pricing
            </a>
          </div>

          {/* CTA Button */}
          <button
            className="px-5 py-2 text-sm rounded-full hover:opacity-90 transition-all duration-200"
            style={{
              backgroundColor: '#0a0a0a',
              color: '#ffffff',
              fontWeight: 500
            }}
          >
            Get Early Access
          </button>
        </div>
      </motion.nav>

      {/* Mobile Hamburger Button - Half Circle on Left Edge */}
      <AnimatePresence>
        {!isMobileMenuOpen && (
          <motion.button
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-24 bg-white shadow-lg flex items-center justify-end pr-2 hover:pr-1 transition-all"
            style={{
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderLeft: 'none',
              borderTopRightRadius: '9999px',
              borderBottomRightRadius: '9999px',
            }}
          >
            <ChevronRight size={24} style={{ color: '#0a0a0a' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay & Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />

            {/* Sidebar - Slides from left wall */}
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              exit={{ x: -200 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.3
              }}
              className="md:hidden fixed left-6 top-1/2 -translate-y-1/2 z-[70]"
            >
              <div className="relative">
                {/* Main Sidebar Pill */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="w-20 bg-white rounded-full shadow-2xl py-6 flex flex-col items-center gap-6"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} style={{ color: '#0a0a0a' }} />
                  </button>

                  {/* Divider */}
                  <div className="w-8 h-px bg-gray-200" />

                  {/* Navigation Items */}
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.href
                    
                    return (
                      <motion.a
                        key={index}
                        href={item.href}
                        onClick={(e) => {
                          handleSmoothScroll(e, item.href)
                          setIsMobileMenuOpen(false)
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          backgroundColor: isActive ? '#0a0a0a' : 'transparent',
                          color: isActive ? '#ffffff' : '#64748b'
                        }}
                      >
                        <Icon size={20} />
                      </motion.a>
                    )
                  })}
                </motion.div>

                {/* Labels that appear on hover */}
                <AnimatePresence>
                  {hoveredIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-24 pointer-events-none"
                      style={{
                        // py-6 (24px) + close button (48px) + gap-6 (24px) + gap-6 (24px) + (index * 72px)
                        // = 120px + (index * 72px) for center of first icon
                        top: `${120 + hoveredIndex * 72}px`,
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <div
                        className="px-4 py-2 rounded-lg bg-white shadow-lg whitespace-nowrap"
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#0a0a0a',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {navItems[hoveredIndex].label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Made with Bob
