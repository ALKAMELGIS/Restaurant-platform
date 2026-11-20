import { useEffect, useState } from "react"
import Demo from "@/components/sections/dish-orbit-demo"
import { cn } from "@/lib/utils"

// Shell around the Dish Orbit Carousel that exercises the two design rules
// the platform brief calls out for every screen: Arabic RTL next to English
// LTR, and a light/dark theme switch, on a clean, minimal SaaS chrome.
export default function App() {
  const [dark, setDark] = useState(false)
  const [rtl, setRtl] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr"
    document.documentElement.lang = rtl ? "ar" : "en"
  }, [rtl])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="container flex items-center justify-between py-5">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-primary" aria-hidden="true" />
          <span className="font-semibold tracking-tight">
            {rtl ? "لوحة المطعم" : "Restaurant Dashboard"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRtl((v) => !v)}
            className={cn(
              "rounded-full border border-border px-3 py-1.5 text-sm font-medium",
              "hover:bg-accent transition-colors",
            )}
          >
            {rtl ? "English" : "العربية"}
          </button>
          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            className={cn(
              "rounded-full border border-border px-3 py-1.5 text-sm font-medium",
              "hover:bg-accent transition-colors",
            )}
          >
            {dark ? (rtl ? "فاتح" : "Light") : rtl ? "داكن" : "Dark"}
          </button>
        </div>
      </header>

      <main>
        <Demo />
      </main>
    </div>
  )
}
