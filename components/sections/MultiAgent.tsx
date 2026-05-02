'use client'

import { Eye, Layout, Palette, Zap } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/effects/ScrollReveal'

const agents = [
  {
    icon: Eye,
    name: 'Vision Agent',
    description: 'Analyzes images to identify UI components, layout structure, and design patterns.',
  },
  {
    icon: Layout,
    name: 'Layout Agent',
    description: 'Converts visual structure into semantic HTML with proper hierarchy and accessibility.',
  },
  {
    icon: Palette,
    name: 'Styling Agent',
    description: 'Generates modern CSS with responsive design, animations, and best practices.',
  },
  {
    icon: Zap,
    name: 'Optimization Agent',
    description: 'Refines code for performance, readability, and production-ready standards.',
  },
]

export default function MultiAgent() {
  return (
    <section id="agents" className="section-padding">
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
              Multi-Agent <span style={{ fontStyle: 'italic' }}>Intelligence</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              Four specialized AI agents work together to deliver perfect results
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {agents.map((agent, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <GlassCard hover className="h-full group">
                <div className="flex flex-col">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#0a0a0a' }}
                  >
                    <agent.icon size={32} style={{ color: '#ffffff' }} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl mb-3"
                    style={{
                      fontFamily: 'var(--font-instrument)',
                      fontWeight: 400,
                      color: '#0a0a0a'
                    }}
                  >
                    {agent.name}
                  </h3>
                  <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.9375rem' }}>
                    {agent.description}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Connection Lines Visualization */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 flex justify-center">
            <div
              className="w-full max-w-md flex flex-col gap-4 px-8 py-6 rounded-3xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#0a0a0a' }} />
                <span className="text-base" style={{ color: '#334155', fontWeight: 500 }}>Agents Collaborate</span>
              </div>
              <div className="w-full h-px" style={{ backgroundColor: '#cbd5e1' }} />
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full animate-pulse animation-delay-200" style={{ backgroundColor: '#0a0a0a' }} />
                <span className="text-base" style={{ color: '#334155', fontWeight: 500 }}>Real-time Processing</span>
              </div>
              <div className="w-full h-px" style={{ backgroundColor: '#cbd5e1' }} />
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full animate-pulse animation-delay-400" style={{ backgroundColor: '#0a0a0a' }} />
                <span className="text-base" style={{ color: '#334155', fontWeight: 500 }}>Instant Results</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// Made with Bob
