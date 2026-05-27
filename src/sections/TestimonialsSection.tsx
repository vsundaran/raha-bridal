import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react'

const testimonials = [
  {
    name: 'Happy Bride',
    service: 'Bridal Makeup + Hairstyle',
    rating: 5,
    initial: '✦',
    text: 'Makeup romba pudichirunthathu! It was very neat, natural and suited me perfectly. My whole family loved the hairstyle — everyone kept complimenting it. Makeup stay romba nalla irunthuchu, natural and fresh ah! Thank you so much for making me look and feel so beautiful on my special day.',
  },
  {
    name: 'Happy Bride',
    service: 'Bridal Makeup · Marriage & Reception',
    rating: 5,
    initial: '✦',
    text: 'Makeup nice! Vandha ellarum "doll mari iruken" sonanga. Both marriage & reception look was good. Worth the money — than ellam sonanga. Everything was good, hair & makeup. Stay romba neram irunthuchu. Overall ellam super!',
  },
  {
    name: 'Happy Bride',
    service: 'Bridal Makeover',
    rating: 5,
    initial: '✦',
    text: "The best makeover I've ever had. Thank you!",
  },
  {
    name: 'Happy Bride',
    service: 'Full Makeover + Saree Pre-Pleating',
    rating: 5,
    initial: '✦',
    text: 'Unga work super! Naa enna expect pannenno adha vida romba supera irundhuchu. Especially eye makeup romba nalla irundhuchu. Saree pre-pleating, jewels ellame super — romba heavya illama, lighta illama, perfect makeover. You understood exactly what I wanted and did it right. Worth for money. You made my special day into something more special and unforgettable. Thank you so much!',
  },
  {
    name: 'Happy Bride',
    service: 'Bridal Makeup',
    rating: 5,
    initial: '✦',
    text: 'Thank you for making me look so beautiful on my wedding day. The makeup was exactly how I wanted it and it lasted the whole event. Really happy with your work!',
  },
  {
    name: 'Happy Bride',
    service: 'Bridal Makeup',
    rating: 5,
    initial: '✦',
    text: 'Makeup super! Ellarum "super ah iruku" nu sonanga. Photos kum supera iruku!',
  },
  {
    name: 'Happy Bride',
    service: 'Engagement + Nalungu + Wedding',
    rating: 5,
    initial: '✦',
    text: 'Thank you so much for making me look beautiful on all my wedding events. I really loved all my looks — engagement, nalungu, and wedding. I felt so happy and confident. Everyone in my family said I looked good. Thank you for being so friendly and making me comfortable.',
  },
  {
    name: 'Happy Bride',
    service: 'Bridal Makeover',
    rating: 5,
    initial: '✦',
    text: "Thank you so much for the amazing makeover! I've never really liked how my makeup looked in the past, but you did an incredible job and I absolutely loved it. Thanks again!",
  },
  {
    name: 'Happy Bride',
    service: 'Bridal Makeup · Simple & Neat',
    rating: 5,
    initial: '✦',
    text: 'Thank you so much, Ranjani — you really did a great job. You were very calm and well-settled throughout, and the makeup was truly amazing, simple and neat. Everyone kept asking me who did my makeup! My husband keeps saying "Book her again for our next function." Once again, thank you so much.',
  },
  {
    name: 'Happy Bride',
    service: 'Bridal Makeup',
    rating: 5,
    initial: '✦',
    text: 'My friend suggested I contact you first. I scrolled your page and thought it looked good — but after booking and seeing everything in person, it was even better than what I saw online. The way you approached me was so humble and sweet, you made me feel so comfortable from the beginning. The makeup was so settled, so neat, not over at all — exactly how I imagined for my big day. Everyone told me I was glowing. Thank you so much for making me feel so beautiful.',
  },
]

// Desktop shows 3 per page → 4 pages total; mobile shows 1 per slide → 10 slides
const DESKTOP_PER_PAGE = 3
const desktopPages = Math.ceil(testimonials.length / DESKTOP_PER_PAGE)

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {Array(rating).fill(0).map((_, i) => (
        <Star key={i} size={11} className="text-[#C9A96E] fill-[#C9A96E]" />
      ))}
    </div>
  )
}

function Avatar({ initial, name, service }: { initial: string; name: string; service: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/30 flex items-center justify-center text-[12px] text-[#C9A96E] flex-shrink-0">
        {initial}
      </div>
      <div>
        <div className="font-sans text-[13px] text-[#FDFAF6] font-medium">{name}</div>
        <div className="font-sans text-[11px] text-[rgba(253,250,246,0.4)]">{service}</div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)

  // Separate states so desktop and mobile never interfere
  const [desktopPage, setDesktopPage] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goPrevDesktop = () => {
    setDirection(-1)
    setDesktopPage((p) => (p - 1 + desktopPages) % desktopPages)
  }
  const goNextDesktop = () => {
    setDirection(1)
    setDesktopPage((p) => (p + 1) % desktopPages)
  }
  const goPrevMobile = () => {
    setDirection(-1)
    setMobileIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }
  const goNextMobile = () => {
    setDirection(1)
    setMobileIndex((i) => (i + 1) % testimonials.length)
  }

  // 3 cards for the current desktop page
  const desktopCards = testimonials.slice(
    desktopPage * DESKTOP_PER_PAGE,
    desktopPage * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE
  )

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2C1810 0%, #3A1F14 50%, #4A2C20 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header — always visible, no inView dependency */}
        <div className="text-center mb-16">
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
        </div>

        {/* ── Desktop: 3 cards per page ──────────────────────────── */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`desktop-page-${desktopPage}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-3 gap-6 mb-10"
            >
              {desktopCards.map((t, i) => (
                <div
                  key={`desktop-${desktopPage}-${i}`}
                  className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,169,110,0.15)] rounded-sm p-7 flex flex-col"
                  style={{ minHeight: '280px' }}
                >
                  <Quote size={28} className="text-[#C9A96E]/40 mb-5 flex-shrink-0" />
                  <p className="font-serif text-[15px] text-[rgba(253,250,246,0.85)] leading-[1.75] font-light italic flex-1 mb-6">
                    "{t.text}"
                  </p>
                  <div className="mt-auto">
                    <StarRow rating={t.rating} />
                    <Avatar initial={t.initial} name={t.name} service={t.service} />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Desktop controls — page dots */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={goPrevDesktop} className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.3)] text-[#C9A96E] flex items-center justify-center hover:bg-[rgba(201,169,110,0.1)] transition-colors cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {Array(desktopPages).fill(0).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > desktopPage ? 1 : -1); setDesktopPage(i) }}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === desktopPage ? 'w-6 h-1.5 bg-[#C9A96E]' : 'w-1.5 h-1.5 bg-[rgba(201,169,110,0.3)] hover:bg-[rgba(201,169,110,0.5)]'
                  }`}
                />
              ))}
            </div>
            <button onClick={goNextDesktop} className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.3)] text-[#C9A96E] flex items-center justify-center hover:bg-[rgba(201,169,110,0.1)] transition-colors cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Mobile: 1 card at a time ───────────────────────────── */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`mobile-${mobileIndex}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,169,110,0.15)] rounded-sm p-7 flex flex-col"
            >
              <Quote size={24} className="text-[#C9A96E]/40 mb-5 flex-shrink-0" />
              <p className="font-serif text-[16px] text-[rgba(253,250,246,0.85)] leading-[1.75] font-light italic flex-1 mb-6">
                "{testimonials[mobileIndex].text}"
              </p>
              <div className="mt-auto pt-2">
                <StarRow rating={testimonials[mobileIndex].rating} />
                <Avatar initial={testimonials[mobileIndex].initial} name={testimonials[mobileIndex].name} service={testimonials[mobileIndex].service} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile controls — individual dots */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button onClick={goPrevMobile} className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.3)] text-[#C9A96E] flex items-center justify-center hover:bg-[rgba(201,169,110,0.1)] transition-colors cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2 flex-wrap justify-center max-w-[180px]">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > mobileIndex ? 1 : -1); setMobileIndex(i) }}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === mobileIndex ? 'w-6 h-1.5 bg-[#C9A96E]' : 'w-1.5 h-1.5 bg-[rgba(201,169,110,0.3)] hover:bg-[rgba(201,169,110,0.5)]'
                  }`}
                />
              ))}
            </div>
            <button onClick={goNextMobile} className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.3)] text-[#C9A96E] flex items-center justify-center hover:bg-[rgba(201,169,110,0.1)] transition-colors cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
