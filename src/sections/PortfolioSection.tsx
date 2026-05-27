import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Expand, Heart, Images } from 'lucide-react'
import PortfolioModal from '../components/PortfolioModal'
import {
  modelPhotos, hairstylePhotos, mehndiPhotos,
  skincarePhotos, haircarePhotos
} from '../constants/images'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'bridal', label: 'Bridal Makeup' },
  { id: 'hairstyle', label: 'Hairstyle' },
  { id: 'mehndi', label: 'Mehndi' },
  { id: 'saree', label: 'Saree Draping' },
  { id: 'skincare', label: 'Skin Care' },
  { id: 'haircare', label: 'Hair Care' },
]

interface GalleryItem {
  src: string
  category: string
  catImages: string[]
  catIndex: number
}

function buildGallery(): GalleryItem[] {
  const take = (arr: string[], n: number) => arr.slice(0, n).filter(Boolean)
  const bridal = take(modelPhotos, 8)
  const hairstyle = take(hairstylePhotos, 8)
  const mehndi = take(mehndiPhotos, 20)
  // HEIC files (sareePhotos) don't render cross-browser; use model photos for this category
  const saree = take(modelPhotos, 14).slice(8, 14)
  const skincare = take(skincarePhotos, 5)
  const haircare = take(haircarePhotos, 4)

  return [
    ...bridal.map((src, i) => ({ src, category: 'bridal', catImages: bridal, catIndex: i })),
    ...hairstyle.map((src, i) => ({ src, category: 'hairstyle', catImages: hairstyle, catIndex: i })),
    ...mehndi.map((src, i) => ({ src, category: 'mehndi', catImages: mehndi, catIndex: i })),
    ...saree.map((src, i) => ({ src, category: 'saree', catImages: saree, catIndex: i })),
    ...skincare.map((src, i) => ({ src, category: 'skincare', catImages: skincare, catIndex: i })),
    ...haircare.map((src, i) => ({ src, category: 'haircare', catImages: haircare, catIndex: i })),
  ]
}

const allGallery = buildGallery()

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [modal, setModal] = useState<{ images: string[]; index: number; category: string } | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = activeCategory === 'all'
    ? allGallery
    : allGallery.filter((g) => g.category === activeCategory)

  const openModal = (item: GalleryItem) => {
    setModal({ images: item.catImages, index: item.catIndex, category: item.category })
  }

  const closeModal = () => setModal(null)
  const prevImage = () => {
    if (!modal) return
    setModal({ ...modal, index: (modal.index - 1 + modal.images.length) % modal.images.length })
  }
  const nextImage = () => {
    if (!modal) return
    setModal({ ...modal, index: (modal.index + 1) % modal.images.length })
  }

  return (
    <section id="portfolio" ref={ref} className="py-24 lg:py-36 bg-[#FDFAF6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <Images size={13} className="text-[#C9A96E]" />
            <span className="section-label">Portfolio</span>
          </div>
          <h2 className="font-serif text-[42px] lg:text-[54px] text-[#2C1810] font-light leading-tight mb-4">
            Stories of
            <br />
            <em className="text-[#C9A96E]">Bridal Beauty</em>
          </h2>
          <p className="font-sans text-[15px] text-[#9E8E86] max-w-sm mx-auto font-light">
            Each image a testament to the unique elegance of every bride we have had the honour of adorning.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`font-sans text-[11px] tracking-[0.15em] uppercase px-5 py-2 rounded-sm border transition-all duration-300 cursor-pointer ${
                activeCategory === id
                  ? 'bg-[#C9A96E] text-[#FDFAF6] border-[#C9A96E]'
                  : 'bg-transparent text-[#6B5A52] border-[#E8D5B0] hover:border-[#C9A96E] hover:text-[#C9A96E]'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
          >
            {filtered.map((item, idx) => (
              <motion.div
                key={`${item.category}-${item.catIndex}-${idx}`}
                className="group relative break-inside-avoid overflow-hidden rounded-sm bg-[#F5EFE6] cursor-pointer mb-3"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                onClick={() => openModal(item)}
              >
                <img
                  src={item.src}
                  alt={
                    item.category === 'bridal' ? 'Bridal makeup by Raha Bridal Studio Trichy Tamil Nadu' :
                    item.category === 'hairstyle' ? 'Bridal hairstyle by Raha Bridal Studio Trichy' :
                    item.category === 'mehndi' ? 'Bridal mehndi design by Raha Bridal Studio Trichy' :
                    item.category === 'saree' ? 'Saree draping by Raha Bridal Studio Trichy Tamil Nadu' :
                    item.category === 'skincare' ? 'Pre-bridal skin care by Raha Bridal Studio Trichy' :
                    item.category === 'haircare' ? 'Bridal hair care treatment by Raha Bridal Studio Trichy' :
                    'Bridal beauty by Raha Bridal Studio Trichy Tamil Nadu'
                  }
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105 block"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-between p-3">
                  <Heart size={14} className="text-[#E8D5B0]" />
                  <div className="w-7 h-7 rounded-full bg-[#C9A96E]/80 flex items-center justify-center">
                    <Expand size={12} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="font-sans text-[13px] text-[#9E8E86] mb-5">
            See more of our work on Instagram
          </p>
          <a
            href="https://www.instagram.com/raha_bridalstudio_beautylounge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark"
          >
            <span className="sm:hidden">Follow on Instagram</span>
            <span className="hidden sm:inline">Follow @raha_bridalstudio_beautylounge</span>
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      {modal && (
        <PortfolioModal
          images={modal.images}
          currentIndex={modal.index}
          onClose={closeModal}
          onPrev={prevImage}
          onNext={nextImage}
          category={categories.find(c => c.id === modal.category)?.label || modal.category}
        />
      )}
    </section>
  )
}
