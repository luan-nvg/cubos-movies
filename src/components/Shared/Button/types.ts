import { ReactNode, ButtonHTMLAttributes } from "react"

export type ButtonProps = {
  fontweightbutton?: string
  textbutton?: string
  textcolor?: string
  textcolorhover?: string
  textdecoration?: string
  bgcolor?: string
  hoverbgcolor?: string
  boxshadowbutton?: string
  borderbutton?: string
  paddingbutton?: string
  widthbutton?: string
  heightbutton?: string
  isblock?: boolean
  onClick?: () => void
  icon?: ReactNode
  iconRight?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
