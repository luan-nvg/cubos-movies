import React, { createContext, useContext, useEffect, useState } from 'react'

interface ProjectContextType {
  projectId: string | null
  setProjectId: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [projectId, setProjectId] = useState<string | null>(() => {
    const storedProjectId = localStorage.getItem('projectId')
    return storedProjectId ? storedProjectId : null
  })

  useEffect(() => {
    if (projectId) {
      localStorage.setItem('projectId', projectId)
    } else {
      localStorage.removeItem('projectId')
    }
  }, [projectId])

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  )
}

// Hook para acessar o contexto
export const useProjectContext = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error(
      'useProjectContext deve ser usado dentro de um ProjectProvider'
    )
  }
  return context
}
