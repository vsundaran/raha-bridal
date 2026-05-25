import { motion } from 'framer-motion'
import { Phone, MapPin, MessageCircle, Heart } from 'lucide-react'
import InstagramIcon from '../components/InstagramIcon'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function FooterSection() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1C0E09] text-[rgba(253,250,246,0.65)]">
      {/* Top band */}
      <div className="border-b border-[rgba(201,169,110,0.15)] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-5">
                <span className="font-serif text-3xl text-[#FDFAF6] font-light">Raha</span>
                <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mt-0.5">
                  Bridal Studio & Beauty Lounge
                </div>
              </div>
              <p className="font-serif text-[15px] italic text-[rgba(253,250,246,0.5)] leading-relaxed max-w-xs mb-6">
                "A bridal look that feels as beautiful and genuine as you are."
              </p>
              <a
                href="https://wa.me/917598052653?text=Hi%2C%20I'd%20love%20to%20book%20a%20bridal%20consultation!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#A8894F] text-[#FDFAF6] font-sans text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300"
              >
                <MessageCircle size={12} />
                Book Consultation
              </a>
            </div>

            {/* Quick links */}
            <div>
              <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] mb-5">
                Navigation
              </div>
              <ul className="space-y-2.5">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      className="font-sans text-[13px] hover:text-[#FDFAF6] transition-colors duration-200 cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] mb-5">
                Connect
              </div>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+917598052653"
                    className="flex items-center gap-3 hover:text-[#FDFAF6] transition-colors group"
                  >
                    <Phone size={13} className="text-[#C9A96E] flex-shrink-0" />
                    <span className="font-sans text-[13px]">+91 7598052653</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/raha_bridalstudio_beautylounge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-[#FDFAF6] transition-colors"
                  >
                    <InstagramIcon size={13} className="text-[#C9A96E] flex-shrink-0" />
                    <span className="font-sans text-[13px]">@raha_bridalstudio</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={13} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-sans text-[13px]">Trichy, Tamil Nadu</div>
                    <div className="font-sans text-[11px] text-[rgba(253,250,246,0.35)] mt-0.5">
                      Travel across Tamil Nadu
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-[rgba(253,250,246,0.3)]">
            © {new Date().getFullYear()} Raha Bridal Studio & Beauty Lounge. All rights reserved.
          </p>
          <motion.p
            className="font-sans text-[11px] text-[rgba(253,250,246,0.3)] flex items-center gap-1.5"
            whileHover={{ color: 'rgba(201,169,110,0.6)' }}
          >
            Made with <Heart size={10} className="text-[#C9A96E] fill-[#C9A96E]" /> for every Tamil bride
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
