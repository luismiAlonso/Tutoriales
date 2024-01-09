import React from "react"
import { useNavigation } from "./useNavigation" // Asegúrate de ajustar la ruta de importación
import CustomButton from "../button/ButtonComponent" // Asegúrate de ajustar la ruta de importación

const BackButton: React.FC = () => {
  const {navigateBack} = useNavigation()

  return (
    <CustomButton
      buttonText="Atrás"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigateBack()
      }}
      // Puedes añadir más props si tu CustomButton lo requiere
    />
  )
}

export default BackButton
