import React, { useEffect } from "react"
import { ColumnDescriptor } from "../../interfaces/ColumnDescriptor"
import SelectComponent from "../selectComponent/SelectComponent"
import HybridSelect from "../hybridSelectComponent/hybridSelectComponent"
import CustomButton from "../button/ButtonComponent"
import InputTextComponent from "../inputTextComponent/InputTextComponent"
import { useOrdenProduccionData } from "../../customHook/useOrdenProduccionData"

// Props para CustomTable
interface TableProps<T> {
  columns: ColumnDescriptor[]
  dataColumn: ColumnDescriptor[]
  data: T[]
  onInputChange: (
    value: any,
    idInput: string | number,
    rowIndex: number
  ) => void
  onButtonClick: (idInput: string | number) => void
}

interface CustomTableProps<T> {
  data: T
  column: ColumnDescriptor
  dataColumn: ColumnDescriptor
  rowIndex: number
  onInputChange: (
    value: any,
    idInput: string | number,
    rowIndex: number
  ) => void
  onButtonClick: (idInput: string | number) => void
}

const TableCellComponent: React.FC<CustomTableProps<any>> = ({
  data,
  column,
  dataColumn,
  rowIndex,
  onInputChange,
  onButtonClick
}) => {
  //console.log(props)
  //const { setInputValue } = useOrdenProductionStore()
  const handleChange = (value: string | number | boolean) => {
    //setInputValue(props.idInput, value)
    // props.onChange && props.onChange(value, props.idInput)
    onInputChange(value, column.idInput, rowIndex)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onButtonClick(column.idInput)
    //props.onClick && props.onClick(e)
  }

  /*console.log("Data Object:", data)
  console.log("Column Object:", column)
  console.log(column.idInput, data[column.idInput])*/

  switch (dataColumn.type) {
    case "text":
      return (
        <td className="text-center">
          <InputTextComponent
            value={data[dataColumn.idInput] as string}
            defaultValue={dataColumn.defaultValue as string}
            onChange={(value: string) => handleChange(value)}
            placeholder={dataColumn.placeHolder}
            readOnly={!dataColumn.editable}
            additionalStyles={dataColumn.additionalStyles}
            type={dataColumn.type}
            shouldReset={true}
          />
        </td>
      )
    case "number":
      return (
        <td className="text-center">
          <InputTextComponent
            value={data[dataColumn.idInput] as string}
            defaultValue={dataColumn.defaultValue as string}
            onChange={(value: string) => handleChange(value)}
            placeholder={dataColumn.placeHolder}
            readOnly={!dataColumn.editable}
            additionalStyles={dataColumn.additionalStyles}
            type={dataColumn.type}
            shouldReset={true}
          />
        </td>
      )
    case "dropdown":
      return (
        <td className="text-center">
          <SelectComponent
            idSelected={dataColumn.idInput}
            value={data[dataColumn.idInput] as string}
            defaultValue={dataColumn.defaultValue as string}
            selectedValueRef={dataColumn.defaultValue as string}
            optionsSelect={dataColumn.options}
            onSeleccion={() => {}}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange(e.target.value)
            }
          />
        </td>
      )
    case "hybridSelect":
      return (
        <td className="text-center">
          <HybridSelect
            options={dataColumn.options || []}
            defaultValue={dataColumn.defaultValue as string}
            value={data[dataColumn.idInput] as string}
            onChange={(value: string) => handleChange(value)}
          />
        </td>
      )
    case "checkbox":
      return (
        <td className="text-center">
          <input
            type="checkbox"
            checked={data[dataColumn.idInput] as boolean}
            onChange={(e) => handleChange(e.target.checked)}
          />
        </td>
      )
    case "button":
      return (
        <td className="text-center">
          <CustomButton
            buttonText={dataColumn.content as string}
            onClick={handleClick}
          />
        </td>
      )
    case "noInput":
      return <td className="text-center">{data[dataColumn.idInput]}</td>
    default:
      return <td className="text-center">{dataColumn.content}</td>
  }
}

const CustomTable: React.FC<TableProps<any>> = ({
  columns,
  dataColumn,
  onInputChange,
  onButtonClick,
  data
}) => {
  const { incrementarIndiceProductos } = useOrdenProduccionData()
  const productosIndexados = incrementarIndiceProductos(data)

  return (
    <>
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
            {productosIndexados.map((rowData, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700`}
              >
                {dataColumn.map((column, columnIndex) => (
                  <TableCellComponent
                    key={columnIndex}
                    dataColumn={column}
                    data={rowData}
                    column={column}
                    rowIndex={rowIndex}
                    onInputChange={onInputChange}
                    onButtonClick={onButtonClick}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CustomTable
