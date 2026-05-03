'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, ImagePlus } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { uploadRequest } from '@/lib/features/upload/uploadSlice'
import { RootState } from '@/lib/store'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state: RootState) => state.upload)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleAddImage = () => {
    if (urlInput.trim()) {
      // Dispatch URL upload
      dispatch(uploadRequest(urlInput.trim()))
      setUrlInput('')
    } else {
      // Trigger file input
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      dispatch(uploadRequest(file))
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10 container-custom pt-52 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl mb-6 leading-[1.1]"
            style={{
              fontFamily: 'var(--font-instrument)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#0a0a0a',
              marginTop: '-1.25rem'
            }}
          >
            Turn images into<br />
            <span style={{ fontStyle: 'italic' }}>production-ready</span> UI
          </motion.h1>

          {/* Context Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
            style={{
              color: '#334155',
              fontWeight: 400,
              lineHeight: '1.6',
              marginTop: '-1.25rem'
            }}
          >
            From pixels to code — instantly using multi-agent intelligence
          </motion.p>

          {/* Input Field */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
            style={{ marginTop: '1.25rem' }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Input
              placeholder={isMobile ? '' : 'Upload an image or paste a link...'}
              customPlaceholder={
                isMobile ? (
                  <div className="animate-marquee whitespace-nowrap">
                    Upload an image or paste a link...
                  </div>
                ) : undefined
              }
              icon={<Upload size={20} />}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              button={
                <button
                  onClick={handleAddImage}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#0a0a0a',
                    color: '#ffffff'
                  }}
                >
                  <ImagePlus size={18} />
                  {loading ? 'Uploading...' : 'Add Image'}
                </button>
              }
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  )
}

// Made with Bob
