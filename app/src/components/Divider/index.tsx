// Divider/index.tsx
import React from 'react'
import { StyledDivider } from './styles'

interface DividerProps {
  width?: string // Prop opcional para definir a largura do Divider
  margin?: string
}

export const Divider: React.FC<DividerProps> = ({
  width = '100%',
  margin = '0'
}) => {
  return <StyledDivider width={width} margin={margin} />
}
