import { ReactNode } from "react"

export interface OptionItem {
  label: string
  action: () => void
}

export interface MoreOptionProps {
  options: OptionItem[]
  children?: ReactNode
}

export interface DropdownToggleProps {
  hovered: boolean
}
