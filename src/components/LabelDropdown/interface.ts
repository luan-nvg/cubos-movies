import { DropdownProps, LabelProps } from "@/components/Shared"

export interface LabelDropdownProps {
  labeldropdown?: LabelDropdownComponentProps
}

interface LabelDropdownComponentProps {
  label?: LabelProps
  dropdown?: DropdownProps
}
