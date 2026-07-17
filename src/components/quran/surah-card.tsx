import { Link } from "react-router-dom"
import type { SurahListItem } from "@/lib/quran-api"
import { encodeSurat } from "@/lib/url-encode"
import { Medallion } from "@/components/quran/medallion"
import { Badge } from "@/components/ui/badge"

export function SurahCard({ surah, index }: { surah: SurahListItem; index: number }) {
  return (
    <Link
      to={`/surat/${encodeSurat(surah.nomor)}`}
      className="group flex animate-fade-up items-center gap-4 rounded-2xl border border-border-manuscript bg-card px-4 py-3.5 transition-colors hover:border-gold/60 hover:bg-gold-soft/25 md:gap-5 md:px-5 md:py-4"
      style={{ animationDelay: `${Math.min(index, 20) * 22}ms` }}
    >
      <Medallion number={surah.nomor} size={38} />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h2 className="truncate font-sans text-[15px] font-semibold text-ink md:text-base">
            {surah.namaLatin}
          </h2>
          <span className="text-xs text-ink-soft md:text-sm">· {surah.arti}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-[11px] font-sans text-ink-soft md:text-xs">
          <Badge variant="outline" className="px-2 py-0.5 normal-case">
            {surah.tempatTurun === "mekah" ? "Makkiyah" : "Madaniyah"}
          </Badge>
          <span>{surah.jumlahAyat} ayat</span>
        </div>
      </div>

      <span
        className="shrink-0 font-arabic text-xl text-primary opacity-90 transition-transform group-hover:-translate-x-0.5 md:text-2xl"
        style={{ fontFamily: "var(--font-arabic)" }}
      >
        {surah.nama}
      </span>
    </Link>
  )
}
