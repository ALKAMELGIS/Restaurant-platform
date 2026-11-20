import { useEffect, useState } from "react"
import { Globe, Moon, Sun } from "lucide-react"
import Demo from "@/components/sections/dish-orbit-demo"
import { cn } from "@/lib/utils"

// No separate header bar: the language and theme switches sit as one small
// floating control on top of the page itself, where a premium SaaS surface
// would place a settings affordance — not as chrome that competes with it.
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
      <div
        className={cn(
          "fixed top-4 z-50 flex items-center gap-1 rounded-full border border-border/60",
          "bg-card/70 p-1 shadow-lg shadow-black/5 backdrop-blur-md",
          rtl ? "left-4" : "right-4",
        )}
      >
        <button
          type="button"
          onClick={() => setRtl((v) => !v)}
          aria-label={rtl ? "Switch to English" : "التبديل إلى العربية"}
          title={rtl ? "English" : "العربية"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Globe className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => setDark((v) => !v)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? (rtl ? "فاتح" : "Light") : rtl ? "داكن" : "Dark"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {dark ? <Sun className="h-4 w-4" strokeWidth={1.75} /> : <Moon className="h-4 w-4" strokeWidth={1.75} />}
        </button>
      </div>

      <main>
        <Demo />
      </main>
    </div>
  )
}
