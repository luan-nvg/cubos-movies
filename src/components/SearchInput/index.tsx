import React from "react"
import styled from "styled-components"
import { FiSearch } from "react-icons/fi"

interface Props {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FC<Props> = ({ placeholder, value, onChange }) => {
  return (
    <Wrapper>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
      <Icon>
        <FiSearch />
      </Icon>
    </Wrapper>
  )
}

// Styled
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 6px 32px 6px 0;
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  outline: none;
`

const Icon = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #333;
`

export default SearchInput
