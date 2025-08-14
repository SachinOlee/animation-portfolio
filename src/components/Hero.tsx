import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="container mx-auto px-6 pt-16 pb-20">
      <div className="max-w-3xl">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          Crafting playful, performant interfaces.
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        >
          I design and build immersive web experiences with motion, interaction, and storytelling.
        </motion.p>
        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <a href="#work" className="px-5 py-3 rounded-lg bg-white text-gray-900 font-medium hover:opacity-90 transition-opacity">View work</a>
          <a href="#contact" className="px-5 py-3 rounded-lg ring-1 ring-white/20 text-white font-medium hover:bg-white/5 transition-colors">Contact</a>
        </motion.div>
      </div>
    </section>
  )
}


