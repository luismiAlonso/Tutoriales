import React from "react"
import { useNavigateBack } from "./useNavigateBack" // Asegúrate de ajustar la ruta de importación
import CustomButton from "../button/ButtonComponent" // Asegúrate de ajustar la ruta de importación

const BackButton: React.FC = () => {
  const navigateBack = useNavigateBack()

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
