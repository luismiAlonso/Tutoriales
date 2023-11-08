import React, { useEffect, useState } from "react"
import { Itext } from "./Itext"

const CustomTextInput: React.FC<Itext> = ({
  value,
  defaultValue,
  onChange,
  idInput,
  type,
  placeholder = "",
  readOnly,
  additionalStyles = "",
  shouldReset // Agrega una nueva prop para decidir cuándo resetear al defaultValue
}) => {
  // Estado local que puede ser tanto string como number
  const [inputValue, setInputValue] = useState<string | number>(
    value ?? defaultValue
  )

  // Asegúrate de que el tipo de value sea consistente con el estado
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value)
    }
  }, [value])

  // Igual con defaultValue
  useEffect(() => {
    if (shouldReset) {
      setInputValue(defaultValue ?? "")
    }
  }, [defaultValue, shouldReset])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Aquí debes asegurarte de convertir el valor a number si el tipo del input es 'number'
    const newValue = e.target.value
    const valueToEmit = type === "number" ? newValue.toString() : newValue
    setInputValue(newValue) // Actualiza el estado local
    onChange?.(valueToEmit, idInput) // Notifica al padre
  }

  return (
    <input
      type={type}
      value={inputValue.toString()} // Convierte el valor a string para el input
      onChange={handleInputChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${additionalStyles}`}
    />
  )
}

export default CustomTextInput
