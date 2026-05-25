import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, MapPin, MessageCircle } from 'lucide-react'
import { ranjaniPhotos, modelPhotos } from '../constants/images'

const highlights = [
  { number: '500+', label: 'Brides Adorned' },
  { number: '8+', label: 'Years of Artistry' },
  { number: 'Tamil Nadu', label: 'Wide Coverage' },
]

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const portrait1 = ranjaniPhotos[0] || modelPhotos[0]
  const portrait2 = ranjaniPhotos[1] || modelPhotos[3]
  const portrait3 = ranjaniPhotos[2] || modelPhotos[5]

  return (
    <section id="about" ref={ref} className="py-24 lg:py-36 bg-[#FDFAF6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image collage — left */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[520px] lg:h-[640px]">
              {/* Main portrait */}
              <div className="absolute inset-0 right-12 rounded-sm overflow-hidden shadow-[0_20px_60px_rgba(44,24,16,0.12)]">
                {portrait1 ? (
                  <img
                    src={portrait1}
                    alt="Bridal artistry"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E8D5B0]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/20 to-transparent" />
              </div>

              {/* Accent portrait - bottom right */}
              <div className="absolute bottom-0 right-0 w-48 h-64 rounded-sm overflow-hidden shadow-[0_12px_40px_rgba(44,24,16,0.15)] border-4 border-[#FDFAF6]">
                {portrait2 ? (
                  <img
                    src={portrait2}
                    alt="Bridal detail"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-[#C9A96E]/30" />
                )}
              </div>

              {/* Third portrait — top right overlap */}
              {portrait3 && (
                <div className="absolute top-12 right-6 w-32 h-40 rounded-sm overflow-hidden shadow-[0_8px_24px_rgba(44,24,16,0.12)] border-4 border-[#FDFAF6]">
                  <img
                    src={portrait3}
                    alt="Bridal portrait"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Gold accent frame */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#C9A96E]/30 rounded-sm pointer-events-none" />
              <div className="absolute -top-4 left-12 w-20 h-20 border border-[#C9A96E]/20 rounded-sm pointer-events-none" />
            </div>
          </motion.div>

          {/* Text content — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={14} className="text-[#C9A96E]" />
              <span className="section-label">Our Story</span>
            </div>

            <h2 className="font-serif text-[42px] lg:text-[52px] leading-[1.1] text-[#2C1810] font-light mb-6">
              Where Every Bride
              <br />
              <em className="text-[#C9A96E]">Blossoms</em> Into
              <br />
              Her Most Beautiful Self
            </h2>

            <p className="font-sans text-[15px] leading-[1.8] text-[#6B5A52] mb-5 font-light">
              At Raha Bridal Studio & Beauty Lounge, we believe your wedding day look
              should be an authentic expression of your inner beauty — not a mask,
              but a revelation. Every brushstroke, every curl, every draped fold
              of silk is placed with intention and love.
            </p>

            <p className="font-sans text-[15px] leading-[1.8] text-[#6B5A52] mb-8 font-light">
              Rooted in the rich traditions of South Indian bridal elegance and elevated
              by modern techniques, our studio crafts looks that photograph beautifully
              and feel even more stunning in person. Your comfort, confidence, and joy
              are our highest priority.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mb-10">
              <MapPin size={14} className="text-[#C9A96E] flex-shrink-0" />
              <span className="font-sans text-[13px] text-[#9E8E86] tracking-wide">
                Based in Trichy — Available across Tamil Nadu
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-[#E8D5B0]/60">
              {highlights.map(({ number, label }) => (
                <div key={label}>
                  <div className="font-serif text-[28px] text-[#C9A96E] font-medium mb-1">
                    {number}
                  </div>
                  <div className="font-sans text-[11px] tracking-[0.12em] uppercase text-[#9E8E86]">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/917598052653?text=Hi%2C%20I'd%20love%20to%20know%20more%20about%20your%20bridal%20services!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={14} />
              Start Your Bridal Journey
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
