'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
}

export default function ParallaxImage({ src, alt }: ParallaxImageProps) {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return
      const scrolled = window.scrollY
      const parallaxSpeed = 0.5
      imageRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 border-4 border-red-500">
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
    </div>
  )
}

// Made with Bob
