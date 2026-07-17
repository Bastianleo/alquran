import { useState } from "react"
import { BookOpenText, Pause, Play } from "lucide-react"
import type { Ayat } from "@/lib/quran-api"
import { firstAudioUrl } from "@/lib/quran-api"
import { Medallion } from "@/components/quran/medallion"
import { Button } from "@/components/ui/button"

interface AyahCardProps {
  ayat: Ayat
  tafsirText?: string
  isPlaying: boolean
  onTogglePlay: () => void
}

export function AyahCard({ ayat, tafsirText, isPlaying, onTogglePlay }: AyahCardProps) {
  const [showTafsir, setShowTafsir] = useState(false)
  const hasAudio = Boolean(firstAudioUrl(ayat.audio))

  return (
    <article
      id={`ayat-${ayat.nomorAyat}`}
      className="scroll-mt-20 rounded-2xl border border-border-manuscript bg-card px-4 py-5 sm:px-6 md:px-8 md:py-6"
    >
      <div className="mb-4 flex items-center justify-between md:mb-5">
        <Medallion number={ayat.nomorAyat} />
        {hasAudio && (
          <Button
            variant="outline"
            size="icon"
            aria-label={isPlaying ? "Jeda audio ayat" : "Putar audio ayat"}
            onClick={onTogglePlay}
            className="h-9 w-9 md:h-10 md:w-10"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <p
        dir="rtl"
        lang="ar"
        className="mb-4 text-right text-[28px] leading-[2.1] text-ink sm:text-[32px] md:mb-5 md:text-[36px]"
        style={{ fontFamily: "var(--font-arabic)" }}
      >
        {ayat.teksArab}
      </p>

      <p className="mb-2 font-sans text-[13px] italic leading-relaxed text-ink-soft md:mb-3 md:text-sm">
        {ayat.teksLatin}
      </p>

      <p className="font-serif text-[15px] leading-relaxed text-ink md:text-base md:leading-loose">{ayat.teksIndonesia}</p>

      {tafsirText && (
        <div className="mt-4 border-t border-border-manuscript pt-3 md:mt-5 md:pt-4">
          <button
            onClick={() => setShowTafsir((v) => !v)}
            className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-primary hover:opacity-80 md:text-sm"
            aria-expanded={showTafsir}
          >
            <BookOpenText className="h-3.5 w-3.5" />
            {showTafsir ? "Sembunyikan tafsir" : "Lihat tafsir"}
          </button>

          {showTafsir && (
            <p className="animate-unfurl mt-3 rounded-xl bg-gold-soft/30 px-4 py-3 font-serif text-sm leading-relaxed text-ink md:mt-4 md:px-5 md:py-4 md:text-[15px]">
              {tafsirText}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
