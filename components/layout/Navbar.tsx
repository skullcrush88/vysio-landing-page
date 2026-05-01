'use client'

import { motion } from 'framer-motion'

export default function Navbar() {
  return (
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
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: '#334155', fontWeight: 400 }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: '#334155', fontWeight: 400 }}
          >
            How It Works
          </a>
          <a
            href="#agents"
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: '#334155', fontWeight: 400 }}
          >
            Agents
          </a>
          <a
            href="#pricing"
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
  )
}

// Made with Bob
