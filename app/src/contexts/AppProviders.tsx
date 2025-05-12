import { AuthProvider } from "./AuthContext"
import { ProjectProvider } from "./ProjectContext"
import { TitleProvider } from "./TitleContext"
// Adicione outros provedores conforme necessário
import { ThemeProvider } from "./ThemeContext"

import { ReactNode } from "react"

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          <TitleProvider>{children}</TitleProvider>
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
export default AppProviders
