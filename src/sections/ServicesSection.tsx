import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles, Wand2, Wind, Scissors, Star,
  Flower2, Heart, Droplets, Feather
} from 'lucide-react'
import {
  modelPhotos, hairstylePhotos,
  skincarePhotos, haircarePhotos, mehndiPhotos
} from '../constants/images'

const services = [
  {
    icon: <Wind size={20} />,
    title: 'Airbrush Makeover',
    description: 'Flawless, featherlight coverage that photographs beautifully and lasts through every emotional moment of your day.',
    image: modelPhotos[1],
    accent: '#E8D5B0',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'HD Skin Finish',
    description: 'High-definition makeup that captures the luminous, camera-ready glow every bride deserves in every frame.',
    image: modelPhotos[4],
    accent: '#F5E6E0',
  },
  {
    icon: <Wand2 size={20} />,
    title: 'Hairstyling',
    description: 'From traditional jada settu to modern loose waves — hairstyles that complement your look and last all day.',
    image: hairstylePhotos[0],
    accent: '#E8D5B0',
  },
  {
    icon: <Feather size={20} />,
    title: 'Saree Draping',
    description: 'Expert saree draping in Nivi, Tamilian, Madisar and more — draped elegantly to move gracefully with you.',
    image: modelPhotos[6],
    accent: '#F5E6E0',
  },
  {
    icon: <Star size={20} />,
    title: 'Saree Pre-Pleating',
    description: 'Precisely pre-pleated sarees for effortless wear on your big day — a time-saving luxury built for brides.',
    image: modelPhotos[9],
    accent: '#E8D5B0',
  },
  {
    icon: <Droplets size={20} />,
    title: 'Skin Care',
    description: 'Pre-bridal skin prep treatments for a radiant, well-rested glow that shows through even under lights and lenses.',
    image: skincarePhotos[0],
    accent: '#F5E6E0',
  },
  {
    icon: <Scissors size={20} />,
    title: 'Hair Care',
    description: 'Nourishing hair treatments to bring out natural shine and strength — your crowning glory, perfected.',
    image: haircarePhotos[3],
    accent: '#E8D5B0',
  },
  {
    icon: <Flower2 size={20} />,
    title: 'Mehndi',
    description: 'Intricate bridal mehndi designs that tell your love story — from classic Tamil motifs to contemporary patterns.',
    image: mehndiPhotos[0],
    accent: '#F5E6E0',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 lg:py-36 bg-[#FAF6F1]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <Heart size={13} className="text-[#C9A96E]" />
            <span className="section-label">Our Services</span>
            <Heart size={13} className="text-[#C9A96E]" />
          </div>
          <h2 className="font-serif text-[42px] lg:text-[54px] text-[#2C1810] font-light leading-tight mb-4">
            Every Service Crafted
            <br />
            <em className="text-[#C9A96E]">For You</em>
          </h2>
          <p className="font-sans text-[15px] text-[#9E8E86] max-w-md mx-auto font-light">
            A complete suite of luxury bridal beauty services — each one thoughtfully designed
            to make your wedding day effortless and extraordinary.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="group luxury-card cursor-default"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] sm:aspect-auto sm:h-64 lg:h-56 overflow-hidden bg-[#F5EFE6]">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={`${s.title} by Raha Bridal Studio, Trichy`}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: s.accent }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 w-9 h-9 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#FDFAF6] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {s.icon}
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#C9A96E]">{s.icon}</span>
                  <h3 className="font-serif text-[17px] text-[#2C1810] font-medium">
                    {s.title}
                  </h3>
                </div>
                <p className="font-sans text-[13px] text-[#9E8E86] leading-relaxed font-light">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="font-sans text-[13px] text-[#9E8E86] mb-5 font-light">
            Interested in multiple services? We offer tailored bridal packages.
          </p>
          <a
            href="https://wa.me/917598052653?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20bridal%20packages."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark"
          >
            Enquire About Packages
          </a>
        </motion.div>
      </div>
    </section>
  )
}
