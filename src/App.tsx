import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Hero from './components/Hero'

export default function App() {
  const appRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!appRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power2.out' }
      )
    }, appRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={appRef} className="min-h-dvh">
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight">My Motion</a>
        <nav className="flex gap-6 text-sm text-gray-300">
          <a className="hover:text-white transition-colors" href="#work">Work</a>
          <a className="hover:text-white transition-colors" href="#about">About</a>
          <a className="hover:text-white transition-colors" href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <Hero />
        <section id="work" className="container mx-auto px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map((i) => (
            <motion.div
              key={i}
              className="fade-in rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 ring-1 ring-white/10 p-6"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <div className="aspect-video rounded-lg bg-black/30 ring-1 ring-white/10 mb-4" />
              <h3 className="font-medium">Project {i}</h3>
              <p className="text-sm text-gray-400 mt-1">Short description of the project and what makes it special.</p>
            </motion.div>
          ))}
        </section>
      </main>
      <footer className="container mx-auto px-6 py-10 text-sm text-gray-400">© {new Date().getFullYear()} Your Name</footer>
    </div>
  )
}


