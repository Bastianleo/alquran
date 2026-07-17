// Client for the free, keyless EQuran.id v2 API (data source: Kemenag RI)
// Docs: https://equran.id/apidev/v2
const BASE_URL = "https://equran.id/api/v2"

export interface SurahListItem {
  nomor: number
  nama: string // Arabic name
  namaLatin: string
  jumlahAyat: number
  tempatTurun: "mekah" | "madinah" | string
  arti: string // meaning in Indonesian
  deskripsi: string // description / explanation of the surah
  audioFull?: Record<string, string>
}

export interface Ayat {
  nomorAyat: number
  teksArab: string
  teksLatin: string
  teksIndonesia: string
  audio?: Record<string, string>
}

export interface SurahDetail extends SurahListItem {
  ayat: Ayat[]
  suratSelanjutnya: SurahListItem | false | null
  suratSebelumnya: SurahListItem | false | null
}

export interface TafsirAyat {
  ayat: number
  teks: string
}

export interface TafsirDetail {
  nomor: number
  nama: string
  namaLatin: string
  tafsir: TafsirAyat[]
}

interface ApiEnvelope<T> {
  code: number
  message: string
  data: T
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Gagal memuat data (status ${res.status})`)
  }
  const json = (await res.json()) as ApiEnvelope<T> | T
  // normalize: some deployments return the payload directly, others wrap it
  if (json && typeof json === "object" && "data" in (json as Record<string, unknown>)) {
    return (json as ApiEnvelope<T>).data
  }
  return json as T
}

const listCache = new Map<string, SurahListItem[]>()
const detailCache = new Map<number, SurahDetail>()
const tafsirCache = new Map<number, TafsirDetail>()

export async function fetchSurahList(): Promise<SurahListItem[]> {
  const cached = listCache.get("all")
  if (cached) return cached
  const data = await getJson<SurahListItem[]>(`${BASE_URL}/surat`)
  listCache.set("all", data)
  return data
}

export async function fetchSurahDetail(nomor: number): Promise<SurahDetail> {
  const cached = detailCache.get(nomor)
  if (cached) return cached
  const data = await getJson<SurahDetail>(`${BASE_URL}/surat/${nomor}`)
  detailCache.set(nomor, data)
  return data
}

export async function fetchTafsir(nomor: number): Promise<TafsirDetail> {
  const cached = tafsirCache.get(nomor)
  if (cached) return cached
  const data = await getJson<TafsirDetail>(`${BASE_URL}/tafsir/${nomor}`)
  tafsirCache.set(nomor, data)
  return data
}

export function firstAudioUrl(audio?: Record<string, string>): string | undefined {
  if (!audio) return undefined
  const values = Object.values(audio)
  return values.length > 0 ? values[0] : undefined
}
