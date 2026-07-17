import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border-manuscript bg-card">
      <div className="px-4 py-10 sm:px-6 md:px-8 md:py-14">
        <div className="flex flex-col items-center gap-1 border-t border-border-manuscript pt-6 text-center font-sans text-[11px] text-ink-soft md:flex-row md:justify-between md:text-xs">
          <p>&copy; {new Date().getFullYear()} Al-Qur'an Digital. Hak cipta teks milik Kemenag RI.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="h-3 w-3 fill-gold text-gold" /> untuk umat
          </p>
        </div>
      </div>
    </footer>
  )
}
