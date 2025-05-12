// types.ts

export type Option = {
  label: string
  value: string
}

export type Section = {
  titlelabel?: string
  options: Option[]
}

export type DropdownProps = {
  sections?: Section[]
  onSelect: (value: string) => void
  titledropdown?: string
  icon?: React.ReactNode
  bgcolor?: string
  hoverbgcolor?: string
  textcolor?: string
  widthbutton?: string
  heightbutton?: string
  borderbutton?: string
  paddingbutton?: string
  fontweightbutton?: string
  fontweightsection?: string
  bgcolormenu?: string
  fontfamily?: string
  bordermenu?: string
  marginmenu?: string
  borderradiusmenu?: string
  widthmenu?: string
  paddingmenu?: string
  borderradiusitem?: string
  hoverbgcoloritem?: string
  paddingitem?: string
  boxshadowbutton?: string
  selectedValue?: any
}

// Tipos para estilização individual
export type DropdownMenuStyleProps = Pick<
  DropdownProps,
  | "bgcolormenu"
  | "borderradiusmenu"
  | "bordermenu"
  | "widthmenu"
  | "paddingmenu"
  | "marginmenu"
  | "fontfamily"
>

export type DropdownItemStyleProps = Pick<
  DropdownProps,
  "paddingitem" | "borderradiusitem" | "hoverbgcoloritem"
>

export type DropdownTitleStyleProps = Pick<DropdownProps, "fontweightsection">
