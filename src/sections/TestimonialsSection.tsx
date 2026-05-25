import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Krishnamoorthi',
    location: 'Trichy',
    text: 'Raha made me feel like the most beautiful version of myself on my wedding day. The HD makeup lasted through all the ceremonies — tears, heat, dancing — everything. I felt genuinely cared for, not just like a client.',
    service: 'Bridal Makeup + Hairstyle',
    rating: 5,
    initial: 'P',
  },
  {
    name: 'Divya Sundaram',
    location: 'Chennai',
    text: "The airbrush makeup was absolutely flawless. My photographer couldn't stop complimenting how beautifully the lighting caught my skin. The saree draping was perfect — I could dance, sit, do everything without worry.",
    service: 'Airbrush Makeup + Saree Draping',
    rating: 5,
    initial: 'D',
  },
  {
    name: 'Kavitha Ramalingam',
    location: 'Madurai',
    text: 'From the first consultation to my muhurtham, the Raha team was warm, professional and genuinely invested in my happiness. The mehndi was breathtaking — my guests were in awe. Highly recommend for any Tamil bride.',
    service: 'Full Bridal Package + Mehndi',
    rating: 5,
    initial: 'K',
  },
  {
    name: 'Ananya Venkatesh',
    location: 'Coimbatore',
    text: 'The pre-bridal skin care package transformed my skin in just 3 sessions. I was glowing naturally before even a drop of makeup. On the wedding day, the look lasted 16+ hours. Worth every penny and more.',
    service: 'Pre-Bridal Skin Care + Makeup',
    rating: 5,
    initial: 'A',
  },
  {
    name: 'Nithya Balasubramanian',
    location: 'Thanjavur',
    text: 'I was nervous about finding an artist who understood our traditional Tamil wedding aesthetics while keeping it modern. Raha understood immediately. The half-saree look for my engagement was stunning — perfectly balanced.',
    service: 'Engagement Makeup + Hairstyle',
    rating: 5,
    initial: 'N',
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((i) => (i + 1) % testimonials.length)

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ]

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 lg:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #3A1F14 50%, #4A2C20 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <Heart size={13} className="text-[#C9A96E]" />
            <span className="section-label text-[#E8D5B0]">Love Notes</span>
          </div>
          <h2 className="font-serif text-[42px] lg:text-[54px] text-[#FDFAF6] font-light leading-tight mb-4">
            Words From Our
            <br />
            <em className="text-[#E8D5B0]">Beautiful Brides</em>
          </h2>
          <p className="font-sans text-[15px] text-[rgba(253,250,246,0.5)] font-light">
            Real stories. Real transformations. Real love.
          </p>
        </motion.div>

        {/* Desktop: 3-card layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <motion.div
              key={`${t.name}-${current}`}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,169,110,0.15)] rounded-sm p-7 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Quote size={28} className="text-[#C9A96E]/40 mb-5" />
              <p className="font-serif text-[16px] text-[rgba(253,250,246,0.85)] leading-[1.75] font-light italic flex-1 mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, si) => (
                  <Star key={si} size={11} className="text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/30 flex items-center justify-center font-serif text-[14px] text-[#C9A96E]">
                  {t.initial}
                </div>
                <div>
                  <div className="font-sans text-[13px] text-[#FDFAF6] font-medium">{t.name}</div>
                  <div className="font-sans text-[11px] text-[rgba(253,250,246,0.4)]">{t.service} · {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="lg:hidden mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,169,110,0.15)] rounded-sm p-7"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <Quote size={24} className="text-[#C9A96E]/40 mb-5" />
              <p className="font-serif text-[16px] text-[rgba(253,250,246,0.85)] leading-[1.75] font-light italic mb-6">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array(testimonials[current].rating).fill(0).map((_, si) => (
                  <Star key={si} size={11} className="text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/30 flex items-center justify-center font-serif text-[14px] text-[#C9A96E]">
                  {testimonials[current].initial}
                </div>
                <div>
                  <div className="font-sans text-[13px] text-[#FDFAF6] font-medium">{testimonials[current].name}</div>
                  <div className="font-sans text-[11px] text-[rgba(253,250,246,0.4)]">{testimonials[current].service} · {testimonials[current].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.3)] text-[#C9A96E] flex items-center justify-center hover:bg-[rgba(201,169,110,0.1)] transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? 'w-6 h-1.5 bg-[#C9A96E]' : 'w-1.5 h-1.5 bg-[rgba(201,169,110,0.3)] hover:bg-[rgba(201,169,110,0.5)]'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.3)] text-[#C9A96E] flex items-center justify-center hover:bg-[rgba(201,169,110,0.1)] transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
