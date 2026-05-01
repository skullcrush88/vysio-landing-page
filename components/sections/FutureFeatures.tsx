'use client'

import { Rocket, Component, Palette, Zap, Globe, Shield } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/effects/ScrollReveal'

const features = [
  {
    icon: Component,
    title: 'React Components',
    description: 'Export as reusable React components with TypeScript support and proper prop types.',
  },
  {
    icon: Palette,
    title: 'Design Tokens',
    description: 'Automatic extraction of colors, spacing, and typography into design system tokens.',
  },
  {
    icon: Zap,
    title: 'Framework Support',
    description: 'Generate code for Vue, Angular, Svelte, and other popular frameworks.',
  },
  {
    icon: Globe,
    title: 'Responsive Variants',
    description: 'AI-generated responsive breakpoints and mobile-optimized layouts automatically.',
  },
  {
    icon: Shield,
    title: 'Accessibility',
    description: 'Built-in WCAG compliance with semantic HTML and ARIA attributes.',
  },
  {
    icon: Rocket,
    title: 'Version Control',
    description: 'Track changes, compare versions, and collaborate with your team seamlessly.',
  },
]

export default function FutureFeatures() {
  return (
    <section id="features" className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2
              className="text-5xl md:text-6xl mb-6"
              style={{
                fontFamily: 'var(--font-instrument)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#0a0a0a'
              }}
            >
              Coming <span style={{ fontStyle: 'italic' }}>Soon</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              We're constantly improving Vysio with powerful new features
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <GlassCard hover className="h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <feature.icon size={28} style={{ color: '#0a0a0a' }} />
                </div>

                <h3
                  className="text-xl mb-3"
                  style={{
                    fontFamily: 'var(--font-instrument)',
                    fontWeight: 400,
                    color: '#0a0a0a'
                  }}
                >
                  {feature.title}
                </h3>

                <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.9375rem' }}>
                  {feature.description}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="mt-20 text-center">
            <p
              className="text-lg mb-6"
              style={{ color: '#475569' }}
            >
              Want to be notified when these features launch?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="max-w-md px-6 py-3 rounded-full outline-none transition-all"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#0a0a0a'
                }}
              />
              <button
                className="whitespace-nowrap px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: '#0a0a0a',
                  color: '#ffffff',
                  fontWeight: 500
                }}
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// Made with Bob
