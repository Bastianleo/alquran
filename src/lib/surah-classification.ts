// Klasifikasi resmi Makkiyah & Madaniyah berdasarkan kesepakatan ulama tafsir
// Sumber: Tafsir Ibn Kathir, Al-Tabari, dan referensi tafsir Indonesia

// 28 Surat Madaniyah
const MADANIYAH = new Set([
  2,   // Al-Baqarah
  3,   // Ali Imran
  4,   // An-Nisa
  5,   // Al-Ma'idah
  8,   // Al-Anfal
  9,   // At-Tawbah
  13,  // Ar-Ra'd
  22,  // Al-Hajj
  24,  // An-Nur
  33,  // Al-Ahzab
  47,  // Muhammad
  48,  // Al-Fath
  49,  // Al-Hujurat
  55,  // Ar-Rahman
  57,  // Al-Hadid
  58,  // Al-Mujadilah
  59,  // Al-Hashr
  60,  // Al-Mumtahanah
  61,  // As-Saff
  62,  // Al-Jumu'ah
  63,  // Al-Munafiqun
  64,  // At-Taghabun
  65,  // At-Talaq
  66,  // At-Tahrim
  76,  // Al-Insan
  98,  // Al-Bayyinah
  99,  // Az-Zalzalah
  110, // An-Nasr
])

export function getTempatTurun(nomor: number): "mekah" | "madinah" {
  return MADANIYAH.has(nomor) ? "madinah" : "mekah"
}
