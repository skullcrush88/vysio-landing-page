'use client'

import { Upload, Scan, Code, Download } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/effects/ScrollReveal'

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Image',
    description: 'Upload your UI design, screenshot, or wireframe. Supports multiple formats.',
  },
  {
    icon: Scan,
    number: '02',
    title: 'AI Analyzes Layout',
    description: 'Our Vision Agent identifies components, structure, and design patterns.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Multi-Agent Generation',
    description: 'Specialized agents work together to generate clean HTML and CSS code.',
  },
  {
    icon: Download,
    number: '04',
    title: 'Export Code',
    description: 'Download production-ready code as a ZIP file. Ready to use immediately.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
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
              How It <span style={{ fontStyle: 'italic' }}>Works</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              Four simple steps to transform your designs into production-ready code
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <GlassCard hover className="h-full">
                <div className="flex flex-col items-center text-center">
                  {/* Number Badge */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-lg"
                    style={{
                      backgroundColor: '#0a0a0a',
                      color: '#ffffff',
                      fontWeight: 600
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                  >
                    <step.icon size={32} style={{ color: '#0a0a0a' }} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl mb-3"
                    style={{
                      fontFamily: 'var(--font-instrument)',
                      fontWeight: 400,
                      color: '#0a0a0a'
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Made with Bob
