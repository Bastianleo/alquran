import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import {
  fetchSurahDetail,
  fetchTafsir,
  firstAudioUrl,
  type SurahDetail,
  type TafsirDetail,
} from "@/lib/quran-api"
import { decodeSurat, encodeSurat } from "@/lib/url-encode"
import { AyahCard } from "@/components/quran/ayah-card"
import { Medallion } from "@/components/quran/medallion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Surah() {
  const { nomor } = useParams<{ nomor: string }>()
  const surahNomor = decodeSurat(nomor ?? "")

  const [detail, setDetail] = useState<SurahDetail | null>(null)
  const [tafsir, setTafsir] = useState<TafsirDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [playingAyat, setPlayingAyat] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setDetail(null)
    setTafsir(null)
    setError(null)
    setPlayingAyat(null)
    audioRef.current?.pause()

    if (!Number.isFinite(surahNomor) || surahNomor < 1 || surahNomor > 114) {
      setError("Nomor surat tidak valid.")
      return
    }

    let cancelled = false
    Promise.all([fetchSurahDetail(surahNomor), fetchTafsir(surahNomor)])
      .then(([d, t]) => {
        if (cancelled) return
        setDetail(d)
        setTafsir(t)
      })
      .catch(() => {
        if (!cancelled) setError("Gagal memuat surat ini. Periksa koneksi internet Anda dan coba lagi.")
      })
    return () => {
      cancelled = true
    }
  }, [surahNomor])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const tafsirByAyat = useMemo(() => {
    const map = new Map<number, string>()
    tafsir?.tafsir.forEach((t) => map.set(t.ayat, t.teks))
    return map
  }, [tafsir])

  function togglePlay(ayatNumber: number, url?: string) {
    if (!url) return
    if (playingAyat === ayatNumber) {
      audioRef.current?.pause()
      setPlayingAyat(null)
      return
    }
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener("ended", () => setPlayingAyat(null))
    }
    audioRef.current.src = url
    audioRef.current.play().catch(() => setPlayingAyat(null))
    setPlayingAyat(ayatNumber)
  }

  const showBismillah = detail && detail.nomor !== 1 && detail.nomor !== 9

  return (
    <div className="px-4 pb-16 pt-6 sm:px-6 md:px-8 md:pt-10">
      <Link
        to="/"
        className="mb-5 inline-flex items-center gap-1.5 font-sans text-sm text-ink-soft hover:text-primary md:mb-7 md:text-base"
      >
        <ArrowLeft className="h-4 w-4" />
        Semua surat
      </Link>

      {error && (
        <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger md:text-base">
          {error}
        </div>
      )}

      {!detail && !error && (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full rounded-3xl md:h-40" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl md:h-48" />
          ))}
        </div>
      )}

      {detail && (
        <>
          <section className="mb-8 rounded-3xl border border-border-manuscript bg-card px-5 py-7 text-center md:mb-10 md:px-10 md:py-10">
            <div className="mb-3 flex items-center justify-center md:mb-4">
              <Medallion number={detail.nomor} size={40} />
            </div>
            <p
              className="mb-1.5 text-4xl leading-relaxed text-primary md:mb-3 md:text-5xl md:leading-normal"
              style={{ fontFamily: "var(--font-arabic)" }}
            >
              {detail.nama}
            </p>
            <h1 className="font-sans text-lg font-semibold text-ink md:text-2xl">{detail.namaLatin}</h1>
            <p className="mt-1 text-sm text-ink-soft md:mt-1.5 md:text-base">{detail.arti}</p>
            <div className="mt-3 flex items-center justify-center gap-2 md:mt-4">
              <Badge>{detail.tempatTurun === "mekah" ? "Makkiyah" : "Madaniyah"}</Badge>
              <Badge variant="outline">{detail.jumlahAyat} ayat</Badge>
            </div>
            {detail.deskripsi && (
              <p
                className="mx-auto mt-4 max-w-xl text-left text-[13px] leading-relaxed text-ink-soft md:mt-6 md:max-w-2xl md:text-sm [&_a]:text-primary [&_sup]:hidden"
                dangerouslySetInnerHTML={{ __html: detail.deskripsi }}
              />
            )}
          </section>

          {showBismillah && (
            <p
              className="mb-8 text-center text-3xl leading-relaxed text-primary md:mb-10 md:text-4xl md:leading-normal"
              style={{ fontFamily: "var(--font-arabic)" }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          )}

          <div className="space-y-4 md:space-y-5">
            {detail.ayat.map((a) => (
              <AyahCard
                key={a.nomorAyat}
                ayat={a}
                tafsirText={tafsirByAyat.get(a.nomorAyat)}
                isPlaying={playingAyat === a.nomorAyat}
                onTogglePlay={() => togglePlay(a.nomorAyat, firstAudioUrl(a.audio))}
              />
            ))}
          </div>

          <nav className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:gap-4">
            {detail.suratSebelumnya ? (
              <Link
                to={`/surat/${encodeSurat(detail.suratSebelumnya.nomor)}`}
                className="flex items-center gap-2 rounded-2xl border border-border-manuscript bg-card px-4 py-3 text-sm text-ink hover:border-gold/60 md:px-5 md:py-4 md:text-base"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 text-ink-soft" />
                <span className="min-w-0">
                  <span className="block text-[11px] text-ink-soft md:text-xs">Sebelumnya</span>
                  <span className="block truncate font-medium">{detail.suratSebelumnya.namaLatin}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {detail.suratSelanjutnya ? (
              <Link
                to={`/surat/${encodeSurat(detail.suratSelanjutnya.nomor)}`}
                className="flex items-center justify-end gap-2 rounded-2xl border border-border-manuscript bg-card px-4 py-3 text-right text-sm text-ink hover:border-gold/60 md:px-5 md:py-4 md:text-base"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] text-ink-soft md:text-xs">Selanjutnya</span>
                  <span className="block truncate font-medium">{detail.suratSelanjutnya.namaLatin}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-ink-soft" />
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <div className="mt-6 flex justify-center md:mt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ChevronLeft className="h-3.5 w-3.5 rotate-90" />
              Kembali ke atas
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
