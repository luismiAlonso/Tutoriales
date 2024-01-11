import React from "react"
import { useNavigation } from "./useNavigation" // Ajusta la ruta de importación según sea necesario
import CustomButton from "../button/ButtonComponent" // Ajusta la ruta de importación según sea necesario

// Añadir la prop useCustomOnClick a las props del componente
const BackButton: React.FC<{
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  useCustomOnClick?: boolean // Prop adicional para determinar si usar onClick personalizado
}> = ({ onClick, useCustomOnClick = false }) => {
  const { navigateBack } = useNavigation()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Usar onClick personalizado si useCustomOnClick es true y se proporciona onClick
    console.log(useCustomOnClick)
    if (useCustomOnClick && onClick) {
      onClick(e)
    } else {
      // De lo contrario, usar el comportamiento predeterminado de navigateBack
      e.preventDefault()
      navigateBack()
    }
  }

  return (
    <CustomButton
      buttonText="Atrás"
      onClick={handleClick}
      // Puedes añadir más props si tu CustomButton lo requiere
    />
  )
}

export default BackButton
