import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-manuscript bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 md:py-4">
        <Link to="/" className="flex items-center">
          <span className="flex flex-col leading-tight">
            <span className="font-sans text-sm font-semibold tracking-tight text-ink md:text-base">Al-Qur'an Digital</span>
            <span className="font-sans text-[11px] text-ink-soft md:text-xs">Bacaan, terjemah &amp; tafsir</span>
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
