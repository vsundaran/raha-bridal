import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            className="flex flex-col items-start cursor-pointer"
          >
            <span
              className={`font-serif text-2xl font-semibold tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-[#2C1810]' : 'text-[#FDFAF6]'
              }`}
            >
              Raha
            </span>
            <span
              className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-[#C9A96E]' : 'text-[#E8D5B0]'
              }`}
            >
              Bridal Studio & Beauty Lounge
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1)
              return (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className={`font-sans text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 relative group cursor-pointer ${
                    scrolled
                      ? isActive ? 'text-[#C9A96E]' : 'text-[#6B5A52] hover:text-[#2C1810]'
                      : isActive ? 'text-[#E8D5B0]' : 'text-[rgba(253,250,246,0.75)] hover:text-[#FDFAF6]'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://wa.me/917598052653?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20bridal%20consultation%20at%20Raha%20Bridal%20Studio."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#A8894F] text-[#FDFAF6] font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_8px_24px_rgba(201,169,110,0.4)]"
          >
            <MessageCircle size={13} />
            Book via WhatsApp
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              scrolled ? 'text-[#2C1810]' : 'text-[#FDFAF6]'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-0 right-0 h-full w-72 bg-[#FDFAF6] shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8D5B0]/40">
                <span className="font-serif text-xl text-[#2C1810]">Raha</span>
                <button onClick={() => setMobileOpen(false)} className="text-[#6B5A52]">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {navLinks.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    onClick={() => handleNav(href)}
                    className="text-left font-sans text-[13px] tracking-[0.15em] uppercase text-[#4A2C20] py-3 border-b border-[#E8D5B0]/30 hover:text-[#C9A96E] transition-colors duration-200 cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </nav>
              <div className="px-6 pb-8">
                <a
                  href="https://wa.me/917598052653?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20bridal%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#C9A96E] text-[#FDFAF6] font-sans text-[11px] tracking-[0.18em] uppercase py-3.5 rounded-sm w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle size={13} />
                  Book via WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
