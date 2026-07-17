import { useEffect, useMemo, useState } from "react"
import { Search, BookOpen } from "lucide-react"
import { fetchSurahList, type SurahListItem } from "@/lib/quran-api"
import { SurahCard } from "@/components/quran/surah-card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [surahs, setSurahs] = useState<SurahListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    let cancelled = false
    fetchSurahList()
      .then((data) => {
        if (!cancelled) setSurahs(data)
      })
      .catch(() => {
        if (!cancelled) setError("Gagal memuat daftar surat. Periksa koneksi internet Anda dan coba lagi.")
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    if (!surahs) return null
    const q = query.trim().toLowerCase()
    if (!q) return surahs
    return surahs.filter(
      (s) =>
        s.namaLatin.toLowerCase().includes(q) ||
        s.arti.toLowerCase().includes(q) ||
        String(s.nomor) === q
    )
  }, [surahs, query])

  return (
    <div className="px-4 pb-16 pt-6 sm:px-6 md:px-8 md:pt-10">
      <section className="mb-8 rounded-3xl border border-border-manuscript bg-card px-5 py-7 text-center sm:py-9 md:mb-10 md:px-12 md:py-14">
        <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gold md:text-xs">
          114 Surat &middot; 30 Juz
        </p>
        <h1 className="font-serif text-lg font-semibold text-ink sm:text-xl md:text-2xl">
          Baca Al-Qur'an lengkap dengan terjemah dan tafsir
        </h1>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-soft md:mt-2.5 md:max-w-lg md:text-base">
          Pilih surat untuk mulai membaca. Setiap ayat dilengkapi teks Arab, transliterasi,
          terjemahan, dan penjelasan (tafsir).
        </p>
      </section>

      <div className="relative mb-6 md:mb-8">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft md:left-4 md:h-5 md:w-5" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama surat, arti, atau nomor…"
          className="pl-10 md:py-5 md:text-base md:placeholder:text-base"
          aria-label="Cari surat"
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger md:text-base">
          {error}
        </div>
      )}

      {!surahs && !error && (
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3" aria-busy="true" aria-label="Memuat daftar surat">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[70px] w-full rounded-2xl md:h-[76px]" />
          ))}
        </div>
      )}

      {filtered && filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-14 text-center text-ink-soft">
          <BookOpen className="h-6 w-6 md:h-8 md:w-8" />
          <p className="text-sm md:text-base">Surat tidak ditemukan untuk &ldquo;{query}&rdquo;.</p>
        </div>
      )}

      {filtered && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
          {filtered.map((s, i) => (
            <SurahCard key={s.nomor} surah={s} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
