import React from "react"
import { useTheme } from "../../hooks/useTheme"
import { ThemeButtonContainer } from "./styles"

const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <ThemeButtonContainer
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      textbutton={isDarkMode ? "🌙" : "☀️"}
    ></ThemeButtonContainer>
  )
}

export default ThemeButton
