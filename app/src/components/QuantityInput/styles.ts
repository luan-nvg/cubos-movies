import styled from "styled-components"

export const QuantityControl = styled.div`
  display: flex;
  width: 108px;
`

export const StaticQuantity = styled.span`
display: flex;
  font-size: 1rem;
  align-self: center;
  width: 78px;
  justify-content: center;
`

export const QuantityField = styled.input`
  width: 30px; // Ajuste conforme necessário
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  font-size: 1rem;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const EditButton = styled.button`
display: flex;
  background: none;
  cursor: pointer;
  border: none;
  font-size: 14px;
  margin-left: 6px;

  img {
    align-self: center;
  }
`

export const AddButton = styled.button`
  background: none;
  cursor: pointer;
  border: none;

  &:hover {
    color: #007bff; // Altera a cor ao passar o mouse
  }
`
