'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Home() {
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      // GSAP animation timeline
      const tl = gsap.timeline({ repeat: -1, yoyo: true })

      tl.from(textRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      })
      .to(textRef.current, {
        color: '#8b5cf6',
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(textRef.current, {
        scale: 1.1,
        duration: 1,
        ease: 'power2.inOut',
      })
      .to(textRef.current, {
        color: '#06b6d4',
        letterSpacing: '0.2em',
        duration: 2,
        ease: 'power2.inOut',
      })
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <h1
        ref={textRef}
        className="text-8xl font-bold tracking-tight text-white"
      >
        developer
      </h1>
    </main>
  )
}
