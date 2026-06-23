import { siteConfig } from '../config/content'

export default function WhatsAppFloatButton() {
  const url = `https://wa.me/${siteConfig.whatsappNumber}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="white"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.01.99 4.32L2 22l6.01-1.98C9.33 21.6 10.65 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.13 0-2.2-.26-3.14-.74l-.22-.12-2.3.76.78-2.27-.14-.23C4.5 14.28 4 13.17 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.64-4.77c-.25-.12-1.47-.73-1.7-.81-.23-.09-.4-.12-.56.12-.17.24-.65.82-.8.98-.15.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.1-.1.23-.26.35-.39.12-.13.16-.22.25-.37.09-.15.045-.28-.02-.37-.065-.09-.56-1.37-.77-1.87-.2-.48-.4-.42-.56-.42-.14 0-.3-.01-.47-.01-.16 0-.43.06-.65.31-.22.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.16 1.77 2.73 4.3 3.82.6.26 1.07.41 1.43.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-.99.15-1.08-.07-.08-.23-.14-.48-.25z"/>
      </svg>
    </a>
  )
}
