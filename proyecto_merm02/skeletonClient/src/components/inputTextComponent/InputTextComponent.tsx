import { Itext } from "./Itext"
import { useEffect, useState } from "react"

const CustomTextInput: React.FC<Itext> = ({
  value,
  defaultValue,
  onChange,
  idInput,
  type,
  placeholder = "",
  readOnly,
  additionalStyles = "" // Inicializar con un valor por defecto vacío
  // ...otros props que desees incluir
}) => {
  const isControlled = value !== undefined

  const [inputValue, setInputValue] = useState(
    isControlled ? value : defaultValue
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const newValue = e.target.value
      if (!isControlled) {
        // Solo actualizar el estado si es un componente no controlado
        setInputValue(newValue)
      }
      onChange(newValue, idInput)
    }
  }

  useEffect(() => {
    if (isControlled && value !== inputValue) {
      // Si es un componente controlado y el valor de la prop ha cambiado,
      // actualizar el estado
      setInputValue(value)
    }
  }, [value, isControlled, inputValue])

  return (
    <input
      type={type}
      value={isControlled ? inputValue : undefined}
      defaultValue={!isControlled ? inputValue : undefined}
      onChange={handleInputChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${additionalStyles}`}
    />
  )
}

export default CustomTextInput
