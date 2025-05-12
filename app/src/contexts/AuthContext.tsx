import React, { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Verifica o token no localStorage ao carregar a aplicação
    return !!localStorage.getItem("access_token")
  })

  const login = (token: string) => {
    localStorage.setItem("access_token", token) // Armazena o token
    console.log("Token armazenado:", token)
    setIsAuthenticated(true) // Atualiza o estado de autenticação
  }

  const logout = () => {
    localStorage.removeItem("access_token") // Remove o token
    setIsAuthenticated(false) // Atualiza o estado de autenticação
  }

  useEffect(() => {
    // Atualiza `isAuthenticated` caso o token no localStorage mude
    const token = localStorage.getItem("access_token")
    setIsAuthenticated(!!token)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
