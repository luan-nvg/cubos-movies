import React from 'react'

export type LabelProps = {
  htmlFor?: string
  text?: string
  fontweight?: string
  fontfamily?: string
  color?: string
  fontsize?: string
  marginbottom?: string
} & React.LabelHTMLAttributes<HTMLLabelElement>
