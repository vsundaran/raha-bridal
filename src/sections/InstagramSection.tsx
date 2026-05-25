import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, ExternalLink } from 'lucide-react'
import InstagramIcon from '../components/InstagramIcon'
import { modelPhotos, hairstylePhotos, mehndiPhotos, ranjaniPhotos } from '../constants/images'

export default function InstagramSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const feed = [
    modelPhotos[0], hairstylePhotos[1], mehndiPhotos[0], modelPhotos[2],
    ranjaniPhotos[0], hairstylePhotos[3], mehndiPhotos[4], modelPhotos[5],
    hairstylePhotos[5], mehndiPhotos[2],
  ].filter(Boolean)

  return (
    <section ref={ref} className="py-24 lg:py-36 bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <InstagramIcon size={14} className="text-[#C9A96E]" />
              <span className="section-label">Instagram</span>
            </div>
            <h2 className="font-serif text-[38px] lg:text-[48px] text-[#2C1810] font-light leading-tight">
              A Glimpse Into
              <br />
              <em className="text-[#C9A96E]">Our World</em>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/raha_bridalstudio_beautylounge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark flex-shrink-0"
          >
            <ExternalLink size={13} />
            @raha_bridalstudio_beautylounge
          </a>
        </motion.div>

        {/* Feed grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {feed.map((src, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/raha_bridalstudio_beautylounge"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-[#F5EFE6] block"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.04 + 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-[#E8D5B0]/40" />
              )}
              <div className="absolute inset-0 bg-[#2C1810]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-1.5">
                  <Heart size={18} className="text-white fill-white" />
                  <InstagramIcon size={14} className="text-white" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          className="text-center mt-10 sm:hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://www.instagram.com/raha_bridalstudio_beautylounge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark"
          >
            <InstagramIcon size={13} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
