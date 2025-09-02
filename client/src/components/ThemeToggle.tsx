import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 bg-card border border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      data-testid="button-theme-toggle"
      aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
    >
      <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"} text-lg text-foreground`}></i>
    </button>
  )
}