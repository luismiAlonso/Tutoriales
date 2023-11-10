import React, { useEffect, useState } from "react"
import { IoptionSelect } from "./IoptionsSelect"
import { IcustomSelectProp } from "./IcustomSelectProp"

const SelectComponent: React.FC<IcustomSelectProp> = ({
  optionsSelect,
  selectClassName,
  value,
  defaultValue,
  idSelected,
  onSeleccion,
  onFilter // Incluye onFilter en la desestructuración de props
}) => {
  //const {addSelect} = useSelectStore()
  const [mappedOptions, setMappedOptions] = useState<IoptionSelect[]>([])
  const [selectedValue, setSelectedValue] = useState<string>("")

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const newValue = e.target.value
    setSelectedValue(newValue) // Actualiza el estado local
    onSeleccion(newValue, idSelected)

    if (onFilter) {
      onFilter(newValue, idSelected)
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

  useEffect(() => {
    // Establecer el valor inicial
    const initialValue = defaultValue || optionsSelect?.[0]
    if (initialValue) {
      setSelectedValue(initialValue)
    }
  }, [])

  const clasName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   
  
  return (
    <div>
      <select
        className={clasName}
        value={selectedValue}
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
