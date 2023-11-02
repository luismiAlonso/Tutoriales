import React, { useEffect } from "react"
import { ColumnDescriptor } from "./Itabla"
import { Producto } from "../../interfaces/OrdenProduccion"
import { useOrdenProductionStore } from "../../contextStore/useOrdenProductionStore"
import { useOrdenProduccionData } from "../../customHook/useOrdenProduccionData"
import SelectComponent from "../selectComponent/SelectComponent"
import HybridSelect from "../hybridSelectComponent/hybridSelectComponent"
import CustomButton from "../button/ButtonComponent"
import InputTextComponent from "../inputTextComponent/InputTextComponent"
import { parteProducto } from "../../models/ParteProducto"

// Props para TableCellComponent
interface CustomTableProps {
  idInput: string
  type: string
  value: string | number | boolean
  defaultValue?: string | number
  placeHolder?: string
  editable?: boolean
  additionalStyles?: string
  options?: string[]
  content?: string | JSX.Element
  rowIndex: number
  onChange?: (
    value: string | number | boolean,
    idInput: string | number
  ) => void
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

// Props para CustomTable
interface TableProps {
  columns: ColumnDescriptor[]
  data: Producto[]
  onInputChange: (
    value: any,
    idInput: string | number,
    rowIndex: number
  ) => void
  onButtonClick: (idInput: string | number) => void
}

const TableCellComponent: React.FC<CustomTableProps> = (props) => {
  //console.log(props)
  const { setInputValue } = useOrdenProductionStore()
  const handleChange = (value: string | number | boolean) => {
    setInputValue(props.idInput, value)
    props.onChange && props.onChange(value, props.idInput)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.onClick && props.onClick(e)
  }

  switch (props.type) {
    case "text":
      return (
        <td>
          <InputTextComponent
            value={props.value as string}
            defaultValue={props.defaultValue as string}
            onChange={(value: string) => handleChange(value)}
            placeholder={props.placeHolder}
            readOnly={props.editable}
            additionalStyles={props.additionalStyles}
            type={props.type}
          />
        </td>
      )
    case "number":
      return (
        <td>
          <InputTextComponent
            value={props.value as string}
            defaultValue={props.defaultValue as string}
            onChange={(value: string) => handleChange(value)}
            placeholder={props.placeHolder}
            readOnly={props.editable}
            additionalStyles={props.additionalStyles}
            type={props.type}
          />
        </td>
      )
    case "dropdown":
      return (
        <td>
          <SelectComponent
            idSelected={props.idInput}
            value={props.value as string}
            defaultValue={props.defaultValue as string}
            selectedValueRef={props.defaultValue as string}
            optionsSelect={props.options as string[]}
            onSeleccion={() => {}}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange(e.target.value)
            }
          />
        </td>
      )
    case "hybridSelect":
      return (
        <td>
          <HybridSelect
            options={props.options || []}
            defaultValue={props.defaultValue as string}
            value={props.value as string}
            onChange={(value: string) => handleChange(value)}
          />
        </td>
      )
    case "checkbox":
      return (
        <td>
          <input
            type="checkbox"
            checked={props.value as boolean}
            onChange={(e) => handleChange(e.target.checked)}
          />
        </td>
      )
    case "button":
      return (
        <td>
          <CustomButton
            buttonText={props.content as string}
            onClick={handleClick}
          />
        </td>
      )
    default:
      return <td>{props.content}</td>
  }
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  onInputChange,
  onButtonClick,
  data
}) => {

  const { mapearProductoAColumnasRead } = useOrdenProduccionData()
  
  const columnsData: ColumnDescriptor[][]= []

  data.map((producto: Producto)=>{
     ///console.log(producto)
     const mapedProduct =  mapearProductoAColumnasRead(parteProducto,producto)
     columnsData.push(mapedProduct)
  })
  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columnsData.map((rowData, rowIndex) => (
            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} border-b dark:border-gray-700`}>
              {rowData.map((columnData, columnIndex) => (
                <TableCellComponent
                  key={columnIndex}
                  idInput={columnData.idInput}
                  type={columnData.type}
                  value={columnData.value}
                  defaultValue={columnData.defaultValue}
                  placeHolder={columnData.placeHolder}
                  editable={columnData.editable}
                  additionalStyles={columnData.additionalStyles}
                  options={columnData.options}
                  content={columnData.content}
                  rowIndex={rowIndex}
                  onChange={(value) =>
                    onInputChange(value, columnData.idInput, rowIndex)
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    onButtonClick(columnData.idInput);
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomTable;






