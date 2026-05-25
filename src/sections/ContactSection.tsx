import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, MapPin, MessageCircle, Send, Loader2, CalendarDays } from 'lucide-react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import InstagramIcon from '../components/InstagramIcon'

const services = [
  'Airbrush Makeover',
  'HD Skin Finish Makeup',
  'Hairstyling',
  'Saree Draping',
  'Saree Pre-Pleating',
  'Skin Care',
  'Hair Care',
  'Mehndi',
  'Full Bridal Package',
]

interface FormData {
  brideName: string
  phone: string
  location: string
  service: string
  message: string
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState<FormData>({
    brideName: '', phone: '', location: '', service: '', message: '',
  })
  const [weddingDate, setWeddingDate] = useState<Date | null>(null)
  const [sending, setSending] = useState(false)

  const update = (k: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const dateStr = weddingDate ? format(weddingDate, 'dd MMM yyyy') : 'To be confirmed'
    const lines = [
      `Hi! I am ${form.brideName || 'interested in booking a consultation'}.`,
      '',
      `Name         : ${form.brideName || '-'}`,
      `Phone        : ${form.phone}`,
      `Wedding Date : ${dateStr}`,
      `Location     : ${form.location || '-'}`,
      `Service      : ${form.service || '-'}`,
      '',
      form.message ? `Message: ${form.message}` : '',
    ].filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))

    const text = encodeURIComponent(lines.join('\n').trim())
    setTimeout(() => {
      window.open(`https://wa.me/917598052653?text=${text}`, '_blank')
      setSending(false)
    }, 600)
  }

  const fieldClass =
    'w-full bg-[#FAF6F1] border border-[#E8D5B0] rounded-sm px-4 py-3 font-sans text-[14px] text-[#2C1810] placeholder-[#C4B0A8] focus:border-[#C9A96E] focus:bg-white transition-all duration-200'

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-36 bg-[#FDFAF6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <Send size={13} className="text-[#C9A96E]" />
            <span className="section-label">Get In Touch</span>
          </div>
          <h2 className="font-serif text-[42px] lg:text-[54px] text-[#2C1810] font-light leading-tight mb-4">
            Begin Your
            <br />
            <em className="text-[#C9A96E]">Bridal Journey</em>
          </h2>
          <p className="font-sans text-[15px] text-[#9E8E86] max-w-sm mx-auto font-light">
            Fill in your details and we'll reach out personally to craft your perfect bridal look.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Contact info + map */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-7 mb-10">
              <a href="tel:+917598052653" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-[#F5EFE6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A96E] transition-colors duration-300">
                  <Phone size={16} className="text-[#C9A96E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-0.5">Phone</div>
                  <div className="font-sans text-[15px] text-[#2C1810] group-hover:text-[#C9A96E] transition-colors">+91 7598052653</div>
                </div>
              </a>

              <a
                href="https://wa.me/917598052653"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-sm bg-[#F5EFE6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                  <MessageCircle size={16} className="text-[#C9A96E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-0.5">WhatsApp</div>
                  <div className="font-sans text-[15px] text-[#2C1810] group-hover:text-[#25D366] transition-colors">Chat with us directly</div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/raha_bridalstudio_beautylounge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-sm bg-[#F5EFE6] flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#e6683c] group-hover:to-[#dc2743] transition-all duration-300">
                  <InstagramIcon size={16} className="text-[#C9A96E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-0.5">Instagram</div>
                  <div className="font-sans text-[15px] text-[#2C1810] group-hover:text-[#C9A96E] transition-colors">@raha_bridalstudio_beautylounge</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#F5EFE6] flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#C9A96E]" />
                </div>
                <div>
                  <div className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-0.5">Location</div>
                  <div className="font-sans text-[15px] text-[#2C1810]">Trichy, Tamil Nadu</div>
                  <div className="font-sans text-[12px] text-[#9E8E86] mt-0.5">Available to travel across Tamil Nadu</div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={12} className="text-[#C9A96E]" />
                <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86]">Serving Brides Across Tamil Nadu</span>
              </div>
              <div className="rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(44,24,16,0.08)]" style={{ height: '220px' }}>
                <iframe
                  title="Raha Bridal Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125380.20879831966!2d78.61489875!3d10.7904823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff1e49feb%3A0xd0f727e37fcf6e2c!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%) sepia(10%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Inquiry form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-2">
                    Bride's Name
                  </label>
                  <input
                    type="text"
                    value={form.brideName}
                    onChange={update('brideName')}
                    placeholder="Your beautiful name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Luxury date picker */}
                <div>
                  <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-2">
                    Wedding Date
                  </label>
                  <div className="relative raha-datepicker-wrapper">
                    <DatePicker
                      selected={weddingDate}
                      onChange={(date: Date | null) => setWeddingDate(date)}
                      minDate={new Date()}
                      placeholderText="Select your wedding date"
                      dateFormat="dd MMM yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      popperClassName="raha-datepicker-popper"
                      popperPlacement="bottom-start"
                    />
                    <CalendarDays
                      size={15}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C9A96E] pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-2">
                    Wedding Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={update('location')}
                    placeholder="City, Venue"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-2">
                  Service Required
                </label>
                <select
                  value={form.service}
                  onChange={update('service')}
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-[#9E8E86] mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us about your vision, any special requests, or questions..."
                  rows={4}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full justify-center disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={14} />
                      Send via WhatsApp
                    </>
                  )}
                </button>
                <p className="font-sans text-[11px] text-[#C4B0A8] text-center mt-3">
                  Your enquiry will open directly in WhatsApp for a personal response.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
