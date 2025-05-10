import React from "react"
import styled from "styled-components"
import { useTheme } from "../../hooks/useTheme"

const ToggleContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background-color: var(--bg-default);
  position: relative;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary);
  }
`

const ToggleIndicator = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  top: 2px;
  left: ${props => (props.isDarkMode ? "26px" : "2px")};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--black);
  transition: left 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-toggle-icon);
`

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <ToggleContainer onClick={toggleTheme} aria-label="Toggle theme">
      <ToggleIndicator isDarkMode={isDarkMode}>
        {isDarkMode ? "🌙" : "☀️"}
      </ToggleIndicator>
    </ToggleContainer>
  )
}

export default ThemeToggle
