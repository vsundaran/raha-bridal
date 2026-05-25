import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle, Images } from 'lucide-react'
import { modelPhotos, ranjaniPhotos } from '../constants/images'

const heroImages = [
  ...modelPhotos.slice(0, 6),
  ...ranjaniPhotos.slice(0, 2),
].filter(Boolean)

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (heroImages.length < 2) return
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const scrollToPortfolio = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {heroImages[current] ? (
            <img
              src={heroImages[current]}
              alt="Bridal portrait"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2C1810] to-[#4A2C20]" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#100A07]/80 via-[#100A07]/30 to-[#100A07]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#100A07]/50 via-transparent to-transparent" />

      {/* Slide indicators */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-20 right-8 flex flex-col gap-1.5 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-0.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === current ? 'h-8 bg-[#C9A96E]' : 'h-3 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-16">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="section-label text-[#E8D5B0]">
              Trichy · Tamil Nadu
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-serif text-[52px] sm:text-[68px] lg:text-[82px] leading-[1.05] text-[#FDFAF6] font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            Luxury Bridal
            <br />
            <em className="text-[#E8D5B0]">Makeovers</em>
            <br />
            Crafted With
            <br />
            <span className="gold-shimmer">Elegance</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-sans text-[15px] leading-relaxed text-[rgba(253,250,246,0.75)] max-w-md mb-10 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            Bridal makeup, hairstyles, saree draping, and beauty services
            designed to make every bride feel timeless and confident.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            <a
              href="https://wa.me/917598052653?text=Hi%2C%20I'd%20love%20to%20book%20a%20bridal%20consultation%20at%20Raha%20Bridal%20Studio!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={14} />
              Book via WhatsApp
            </a>
            <button onClick={scrollToPortfolio} className="btn-outline">
              <Images size={14} />
              View Portfolio
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[rgba(253,250,246,0.5)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-[rgba(253,250,246,0.5)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
