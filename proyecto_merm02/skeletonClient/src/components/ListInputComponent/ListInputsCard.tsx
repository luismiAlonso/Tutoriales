import React, { useEffect } from "react"
import SelectComponent from "../selectComponent/SelectComponent"
import HybridSelect from "../hybridSelectComponent/hybridSelectComponent"
import CustomButton from "../button/ButtonComponent"
import InputTextComponent from "../inputTextComponent/InputTextComponent"
import { ColumnDescriptor } from "../../interfaces/ColumnDescriptor"
import { InputProps } from "./InputProps"
import { useOrdenProductionStore } from "../../contextStore/useOrdenProductionStore"
import IconComponent from "../IconComponent/IconComponent"
import IconEditSvg from "../IconComponent/IconEditSvg"


export interface CustomCardProps {
  columns: ColumnDescriptor[]
  rowIndex: number
  onInputChange: (id: string | number, value: any) => void
  onButtonClick: (id: string, rowIndex: number) => void
}

const InputComponent: React.FC<InputProps> = (props) => {
  const { setInputValue } = useOrdenProductionStore()

  const handleChange = (value: string | number) => {
    //console.log(props.idInput, value)
    setInputValue(props.idInput, value) // Actualizamos el valor en la tienda
    props.onChange && props.onChange(value, props.idInput)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>,idInput: string,rowIndex: number) => {
    //console.log(props.rowIndex)
    props.onClick && props.onClick(e,idInput,rowIndex)
  }

  switch (props.type) {

    case "text":
      return (
        <InputTextComponent
          value={props.value as string}
          defaultValue={props.defaultValue as string | number}
          onChange={(value) => handleChange(value)}
          placeholder={props.placeHolder}
          readOnly={props.editable}
          additionalStyles={props.additionalStyles}
          type="text"
          shouldReset={true}
        />
      )
    case "number":
      return (
        <InputTextComponent
          value={props.value as string}
          defaultValue={props.defaultValue as string | number}
          onChange={(value) => handleChange(value)}
          placeholder={props.placeHolder}
          readOnly={props.editable}
          additionalStyles={props.additionalStyles}
          type="number"
          shouldReset={true}
        />
      )
    case "dropdown":
      //console.log(options, idInput)
      return (
        <SelectComponent
          selectClassName=""
          idSelected={props.idInput}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          optionsSelect={props.options}
          onSeleccion={() => {}}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange(e.target.value)
          }
        />
      )
    case "hybridSelect":
      //console.log(props.value)
      return (
        <HybridSelect
          options={props.options || []}
          defaultValue={props.defaultValue as string}
          value={props.value as string} // Asegurarnos de que si no hay opciones, se pasa un array vacío
          onChange={(value) => handleChange(value)}
        />
      )
    case "checkbox":
      return <input type="checkbox" className="block mt-2" />
    case "button":
      return (
        <CustomButton
          buttonText={props.content} // Aquí puedes cambiar "Mi Botón" por el texto que desees
          className="clase-personalizada" // Aquí puedes cambiar o agregar más clases
          onClick={(e) =>{
            e.preventDefault()
            if(props.idInput && (props.rowIndex || props.rowIndex==0)){
              handleClick(e,props.idInput,props.rowIndex)
            }
          }}
        />
      )
    case "svg":
      if (props.idInput === "Editar") {
        return (
          <IconComponent
            onClick={(e) => {
              e.preventDefault()
              if(props.value && (props.rowIndex || props.rowIndex==0)){
                handleClick(e,props.idInput,props.rowIndex)
              }
            }} // Asegúrate de que `props.value` sea el valor correcto
            iconType="svg"
            iconContent={<IconEditSvg />}
          />
        )
      } else if (props.idInput === "Borrar") {
        return (
          <IconComponent
            onClick={(e) => {
              if(props.value && (props.rowIndex || props.rowIndex==0)){
                handleClick(e,props.idInput,props.rowIndex)
              }
            }} // Asegúrate de que `props.value` sea el valor correcto
            iconType="svg"
            iconContent={<IconEditSvg />}
          />
        )
      }
      return <></>
    default:
      return null
  }
}

const CustomCard: React.FC<CustomCardProps> = ({
  columns,
  rowIndex,
  onInputChange,
  onButtonClick
}) => {

  return (
    <div className="flex flex-col space-y-4 w-full md:flex-row md:space-x-4 md:space-y-0">
      {columns.map((column, index) => (
        <div key={index} className="flex-1 mb-6 md:mb-0">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-h-[20px]">
            {column.title}
          </label>
          <InputComponent
            idInput={column.idInput}
            titulo={column.title}
            value={column.value}
            content={column.content}
            type={column.type}
            rowIndex={rowIndex}
            editable={column.editable}
            options={column.options}
            defaultValue={column.defaultValue}
            placeHolder={column.placeHolder}
            additionalStyles={column.additionalStyles}
            onChange={(value) => onInputChange(value, column.idInput)}
            onClick={(e) => {
              e.preventDefault()
              onButtonClick(column.idInput,rowIndex)
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default CustomCard
