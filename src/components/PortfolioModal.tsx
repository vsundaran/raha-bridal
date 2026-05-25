import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  category: string
}

export default function PortfolioModal({
  images, currentIndex, onClose, onPrev, onNext, category
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#100A07]/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Image container */}
        <motion.div
          className="relative max-w-4xl max-h-[90vh] w-full mx-4"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`${category} portfolio`}
            className="w-full max-h-[85vh] object-contain rounded-sm"
          />

          {/* Category label */}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-[#E8D5B0] font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
            {category}
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-14 bg-black/40 backdrop-blur-sm text-white/70 font-sans text-[11px] px-3 py-1.5 rounded-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white hover:text-[#E8D5B0] p-2 rounded-sm transition-colors"
          >
            <X size={18} />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white hover:text-[#E8D5B0] p-2.5 rounded-sm transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white hover:text-[#E8D5B0] p-2.5 rounded-sm transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
