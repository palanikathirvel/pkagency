import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappLink } from "../config/agencyConfig";

/**
 * Floating "Chat With Us" WhatsApp button.
 * Number + pre-filled message configured in src/config/agencyConfig.ts
 */
export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={reduced ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed right-5 bottom-5 z-[60] flex items-center gap-0 sm:right-7 sm:bottom-7"
    >
      {/* label pill */}
      <span
        className={`pointer-events-none mr-3 hidden items-center rounded-full border border-wa/30 bg-ink-900/95 px-4 py-2 text-xs font-bold whitespace-nowrap text-mist shadow-xl backdrop-blur transition-all duration-300 sm:flex ${
          hovered ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
      >
        Chat With Us
        <span className="ml-2 h-1.5 w-1.5 animate-pulse rounded-full bg-wa" />
      </span>

      {/* button */}
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span
          className="absolute inset-0 animate-pulse-ring rounded-full bg-wa/40 motion-reduce:hidden"
          aria-hidden="true"
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-wa text-ink-950 shadow-[0_10px_36px_-8px_rgba(37,211,102,0.55)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88zm8.42-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.32-1.66a11.9 11.9 0 0 0 5.67 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.4z" />
          </svg>
        </span>
      </span>
    </motion.a>
  );
}
