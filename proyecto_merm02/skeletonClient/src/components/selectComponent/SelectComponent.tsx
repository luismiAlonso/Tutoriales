import React, { useEffect, useState } from "react"
import { IoptionSelect } from "./IoptionsSelect"
import { IcustomSelectProp } from "./IcustomSelectProp"

const SelectComponent: React.FC<IcustomSelectProp> = ({
  optionsSelect,
  selectedValueRef,
  value,
  defaultValue,
  idSelected,
  onSeleccion,
  onFilter // Incluye onFilter en la desestructuración de props
}) => {
  //const {addSelect} = useSelectStore()
  const [mappedOptions, setMappedOptions] = useState<IoptionSelect[]>([])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onSeleccion(value, idSelected) // Pasa el 'id' junto con el valor

    if (onFilter) {
      onFilter(value, idSelected) // Pasa el 'id' junto con el valor si 'onFilter' está definido
    }
  }

  const mapOptionData = (optionsData: string[]): IoptionSelect[] => {
    return optionsData.map((option, index) => ({
      key: index.toString(),
      value: option
    }))
  }

  useEffect(() => {
    if (optionsSelect && optionsSelect.length > 0) {
      setMappedOptions(mapOptionData(optionsSelect))
    }
  }, [optionsSelect])

  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        defaultValue={
          defaultValue ||
          (selectedValueRef ? selectedValueRef : mappedOptions[0]?.value)
        }
        onChange={handleSelectChange}
      >
        {mappedOptions.map((opcion) => (
          <option key={opcion.key} value={opcion.value}>
            {opcion.value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectComponent
