import React, { useState } from "react"
import * as S from "./styles"
import AddIcon from "@/assets/icons/add.svg"
import RemoveIcon from "@/assets/icons/remove.svg"
import EditIcon from "@/assets/icons/edit.svg"
import SaveIcon from "@/assets/icons/save.svg"


interface QuantityInputProps {
  quantity: number
  minQuantity?: number
  maxQuantity?: number
  onUpdate: (newQuantity: number) => void
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, minQuantity = 1, maxQuantity = 99, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempQuantity, setTempQuantity] = useState(quantity)

  const handleSave = () => {
    setIsEditing(false)
    onUpdate(tempQuantity)
  }

  const handleDecrease = () => {
    if (tempQuantity > minQuantity) {
      setTempQuantity(tempQuantity - 1)
    }
  }

  const handleIncrease = () => {
    if (tempQuantity < maxQuantity) {
      setTempQuantity(tempQuantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10)
    if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
      setTempQuantity(newQuantity)
    }
  }

  return (
    <S.QuantityControl>
      {!isEditing && (
        <>
          <S.StaticQuantity>{quantity}</S.StaticQuantity>
          <S.EditButton onClick={() => setIsEditing(true)}> <img src={EditIcon} alt="editar" /> </S.EditButton>
        </>
      )}
      {isEditing && (
        <>
          <S.AddButton onClick={handleDecrease}>
            <img src={RemoveIcon} alt="Diminuir" />
          </S.AddButton>
          <S.QuantityField
            type="number"
            value={tempQuantity}
            onChange={handleInputChange}
          />
          <S.AddButton onClick={handleIncrease}>
            <img src={AddIcon} alt="Aumentar" />
          </S.AddButton>
          <S.EditButton onClick={handleSave}><img src={SaveIcon} alt="salvar" /></S.EditButton>
        </>
      )}
    </S.QuantityControl>
  )
}

export default QuantityInput
