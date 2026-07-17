import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/quran/header"
import Home from "@/pages/home"
import Surah from "@/pages/surah"

export default function App() {
  return (
    <ThemeProvider>
      <div id="top" className="manuscript-bg min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/surat/:nomor" element={<Surah />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

      </div>
    </ThemeProvider>
  )
}
