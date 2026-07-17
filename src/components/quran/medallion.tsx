import { cn } from "@/lib/utils"

interface MedallionProps {
  number: number
  size?: number
  className?: string
}

/**
 * An eight-point rosette badge, echoing the small ayah-end ornaments used in
 * hand-copied Qur'an manuscripts to mark verse boundaries. Used consistently
 * as the numbering device throughout the app (surah cards, ayah markers).
 */
export function Medallion({ number, size = 34, className }: MedallionProps) {
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        className="absolute inset-0 text-gold"
        fill="none"
      >
        <g transform="translate(20,20)">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-16"
              y="-3.6"
              width="32"
              height="7.2"
              rx="2.4"
              fill="currentColor"
              opacity="0.9"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>
        <circle cx="20" cy="20" r="13.5" className="fill-[var(--paper-raised)]" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="relative font-sans text-[11px] font-semibold text-ink tabular-nums">
        {number}
      </span>
    </span>
  )
}
