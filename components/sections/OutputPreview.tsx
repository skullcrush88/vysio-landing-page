'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, Code2 } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/effects/ScrollReveal'
import { useDispatch, useSelector } from 'react-redux'
import { generateRequest } from '@/lib/features/generate/generateSlice'
import { RootState } from '@/lib/store'

export default function OutputPreview() {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html')
  const dispatch = useDispatch()
  const uploadState = useSelector((state: RootState) => state.upload)
  const generateState = useSelector((state: RootState) => state.generate)

  // Auto-dispatch generateRequest after successful upload
  useEffect(() => {
    if (uploadState.data?.fileId && !generateState.loading && !generateState.data) {
      dispatch(generateRequest({ fileId: uploadState.data.fileId }))
    }
  }, [uploadState.data, generateState.loading, generateState.data, dispatch])

  const htmlCode = `<div class="hero-section">
  <div class="container">
    <h1 class="title">
      Welcome to Our Platform
    </h1>
    <p class="subtitle">
      Build amazing experiences
    </p>
    <button class="cta-button">
      Get Started
    </button>
  </div>
</div>`

  const cssCode = `.hero-section {
  display: flex;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #dbeafe,
    #ffffff
  );
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #0f172a;
  margin-bottom: 1rem;
}

.cta-button {
  padding: 1rem 2rem;
  background: #3b82f6;
  color: white;
  border-radius: 9999px;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: scale(1.05);
}`

  return (
    <section className="section-padding">
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
              Preview & <span style={{ fontStyle: 'italic' }}>Export</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#334155', fontWeight: 400 }}
            >
              See your generated code in real-time with instant preview
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: Image Input */}
          <ScrollReveal delay={0.1}>
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <ImageIcon size={20} style={{ color: '#0a0a0a' }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-instrument)',
                      fontWeight: 400,
                      color: '#0a0a0a',
                      fontSize: '1.125rem'
                    }}
                  >
                    Input Design
                  </h3>
                  <p className="text-sm" style={{ color: '#64748b' }}>Your uploaded image</p>
                </div>
              </div>
              
              <div
                className="aspect-video rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="text-center p-8">
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <ImageIcon size={40} style={{ color: '#0a0a0a' }} />
                  </div>
                  <p
                    className="font-medium mb-2"
                    style={{ color: '#0a0a0a' }}
                  >
                    Design Preview
                  </p>
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    Your UI screenshot appears here
                  </p>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Right: Code Output */}
          <ScrollReveal delay={0.2}>
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                  >
                    <Code2 size={20} style={{ color: '#0a0a0a' }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-instrument)',
                        fontWeight: 400,
                        color: '#0a0a0a',
                        fontSize: '1.125rem'
                      }}
                    >
                      Generated Code
                    </h3>
                    <p className="text-sm" style={{ color: '#64748b' }}>Production-ready output</p>
                  </div>
                </div>

                {/* Toggle Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('html')}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
                    style={{
                      backgroundColor: activeTab === 'html' ? '#0a0a0a' : 'rgba(0, 0, 0, 0.05)',
                      color: activeTab === 'html' ? '#ffffff' : '#475569'
                    }}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
                    style={{
                      backgroundColor: activeTab === 'css' ? '#0a0a0a' : 'rgba(0, 0, 0, 0.05)',
                      color: activeTab === 'css' ? '#ffffff' : '#475569'
                    }}
                  >
                    CSS
                  </button>
                </div>
              </div>

              {/* Code Display */}
              <div
                className="rounded-2xl p-6 overflow-auto max-h-96"
                style={{ backgroundColor: '#0a0a0a' }}
              >
                <pre className="text-sm font-mono leading-relaxed" style={{ color: '#e2e8f0' }}>
                  <code>{activeTab === 'html' ? htmlCode : cssCode}</code>
                </pre>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// Made with Bob
