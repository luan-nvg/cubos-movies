import styled from "styled-components"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Tooltip as BaseTooltip } from "@/components/WaterMonitoring/Tooltip"

export const Subtitle = styled.div`
  display: flex;
  justify-content: right;
`

export const NewProjectButton = styled(Button)`
  width: fit-content;
  padding: 1.2rem 2.4rem;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  z-index: 10;
  min-height: fit-content;
`

export const SectionSubtitle = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputWrapper = styled.div`
  display: flex;
  justify-content: right;
  width: 20rem;
  margin-left: auto;
`

export const SearchInput = styled(Input)`
  label {
    display: none;
  }

  input {
    background-color: var(--white);
    border: 1px solid var(--bg-disabled);

    &::placeholder {
      color: var(--disabled);
    }
  }
`

export const OptionsButton = styled(Button)`
  padding: 0.8rem 1.6rem;
  height: 32px;
  width: 32px;
  color: var(--light-primary);
`

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
`

export const OptionButton = styled.button`
  background-color: "#E2E8F0";
  color: "#020617";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0564b1;
    color: #f1f5f9;
  }
`

// Styles migrated from pasted_content.txt (the main component file)
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TooltipRow = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`

export const StyledReservoirTooltip = styled(BaseTooltip)`
  width: 200px;
`

export const TooltipTextSpan = styled.span`
  margin-left: 5px;
  flex: 1;
`

export const SvgQuestionContainer = styled.span`
  cursor: pointer;
  margin-left: 5px;
`
