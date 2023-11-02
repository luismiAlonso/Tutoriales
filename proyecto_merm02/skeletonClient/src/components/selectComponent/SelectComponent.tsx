import React, { useEffect, useState } from 'react'
import { IoptionSelect } from './IoptionsSelect'
import {useSelectStore,Select} from "../../contextStore/useSelectStore"

interface CustomSelectProps {
  optionsSelect: string[]
  selectedValueRef: string,
  idSelected:string,
  value:string,
  defaultValue:string,
  onSeleccion: (value: string) => void
  onFilter?: (filterValue: string) => void // Prop opcional para la función de filtrado
  onChange?: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectComponent: React.FC<CustomSelectProps> = ({
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

  const handleSelectChange = (value:string,id?:string) => {
    //const value = e.target.value
   // console.log(value,id)
   if(id!=""){
    const select = {id:id,list:optionsSelect, defaultElement:selectedValueRef,selectedValue:value}
    console.log(select)
   }
    //addSelect(select as Select)
    if (onFilter) {
      onFilter(value) // Llama a onFilter si está definido
    } else {
      onSeleccion(value) // Llama a onSeleccion si onFilter no está definido
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
         defaultValue || (selectedValueRef ? selectedValueRef : mappedOptions[0]?.value)
        }
        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{handleSelectChange(e.target.value,idSelected)}}
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
