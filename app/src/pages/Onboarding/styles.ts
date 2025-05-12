import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import LabelDropdown from "@/components/LabelDropdown"
import { FormOneColumn } from "@/layout/Forms/OneColumn"
import { FormTwoColumns } from "@/layout/Forms/TwoColumns"
import { Typography } from "@/components/Shared"
import styled from "styled-components"

export const FormWrapper = styled(FormTwoColumns)``
export const FormSections = styled(FormOneColumn)``
export const FormItem = styled(Input)``
export const FormDropdown = styled(LabelDropdown)`
  label {
    font-size: var(--md);
    font-weight: var(--semibold);
  }
`
export const SendButton = styled(Button)`
  padding: 1.2rem;
`

export const Subtitle = styled(Typography)`
  font-size: var(--sm);
`

export const FormSectionTitle = styled(Typography)`
  font-size: var(--lg);
  font-weight: var(--bold);
`
