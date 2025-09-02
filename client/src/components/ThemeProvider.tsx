import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeProviderContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("guardiao-theme")
    return (savedTheme as Theme) || "light"
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    
    localStorage.setItem("guardiao-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light")
  }

  const value: ThemeProviderContextType = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider")
  }
  
  return context
}