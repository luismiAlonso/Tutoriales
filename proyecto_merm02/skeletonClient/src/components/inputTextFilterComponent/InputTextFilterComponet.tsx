import React, { useState } from "react"
import { ItextInputFilter } from "./ItextInputFilter"

function InputTextFilterComponent({
  idInput,
  style,
  activeButton,
  activeLabel,
  activeSearchIcon,
  typeFill,
  placeHolder,
  readonly,
  onChange,
  onClick,
  onFilter
}: ItextInputFilter) {
  const [valueInput, setValueInput] = useState("")

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValueInput(newValue) // Actualiza el estado con el nuevo valor
    onChange(idInput, newValue) // Llama a la función onChange proporcionada con el 'id' y el nuevo valor

    // Si onFilter está definido, llámalo con el 'id' y el nuevo valor
    if (onFilter) {
      onFilter(idInput, newValue)
    }
  }

  const handleOnClick = () => {
    // Aquí tu lógica para manejar el clic
    onClick(idInput, valueInput)
  }

 // console.log(readonly)
  return (
    <div>
      <label
        htmlFor="default-search"
        className={`mb-2 text-sm font-medium text-gray-900 dark:text-white ${
          activeLabel ? "" : "sr-only"
        }`}
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {activeSearchIcon && (
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
        </div>
        <input
          type={typeFill}
          onChange={handleOnChange} // Asocia la función de manejo de cambios
          value={valueInput}
          id={idInput}
          className={style}
          placeholder={placeHolder}
          readOnly={readonly}
        />
        {activeButton && (
          <button
            onClick={handleOnClick} // Asocia la función de manejo del click
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        )}
      </div>
    </div>
  )
}

export default InputTextFilterComponent
