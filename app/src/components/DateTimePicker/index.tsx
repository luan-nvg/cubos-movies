// components/DateTimePicker.tsx
import React, { useRef } from "react"

import styled from "styled-components"
import { FiCalendar } from "react-icons/fi"

interface Props {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DateTimePickerComponent: React.FC<Props> = ({
  label,
  value,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = () => {
    inputRef.current?.showPicker?.() || inputRef.current?.focus()
  }

  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          ref={inputRef}
          type="datetime-local"
          value={value}
          onChange={onChange}
        />
        <Icon onClick={handleIconClick}>
          <FiCalendar size={15} />
        </Icon>
      </InputWrapper>
    </Wrapper>
  )
}

// Styled
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
`

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  color: #4a4a4a;
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 6px 32px 6px 0;
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  outline: none;

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    pointer-events: none;
  }
`
const Icon = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #333;
`
