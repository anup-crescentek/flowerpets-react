import { PHONE_INTL } from '../data/breeds.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE_INTL}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="animate-pulse-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 hover:bg-[#1ebe5d]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
