const MAP = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
const BASE = MAP.length
const KEY = 0x5A
const PREFIX = "kQ9xTm"
const SUFFIX = "mTx9Qk"

export function encodeSurat(nomor: number): string {
  let val = (nomor ^ KEY) >>> 0
  let digits = ""
  do {
    digits += MAP[val % BASE]
    val = Math.floor(val / BASE)
  } while (val > 0)

  const pad1 = MAP[(nomor * 7 + 3) % BASE] + MAP[(nomor * 13 + 5) % BASE]
  const pad2 = MAP[(nomor * 11 + 2) % BASE] + MAP[(nomor * 17 + 9) % BASE]
  const pad3 = MAP[(nomor * 19 + 4) % BASE] + MAP[(nomor * 23 + 1) % BASE]

  return PREFIX + pad1 + digits + pad2 + pad3 + SUFFIX
}

export function decodeSurat(encoded: string): number {
  try {
    const core = encoded.slice(PREFIX.length, encoded.length - SUFFIX.length)
    if (core.length < 6) return NaN

    const digits = core.slice(2, core.length - 4)
    if (digits.length === 0) return NaN

    let val = 0
    for (let i = digits.length - 1; i >= 0; i--) {
      const idx = MAP.indexOf(digits[i])
      if (idx < 0) return NaN
      val = val * BASE + idx
    }
    return (val ^ KEY) >>> 0
  } catch {
    return NaN
  }
}
