import React, { useEffect } from "react"
import { ColumnDescriptor } from "../../interfaces/ColumnDescriptor"
import SelectComponent from "../selectComponent/SelectComponent"
import HybridSelect from "../hybridSelectComponent/hybridSelectComponent"
import CustomButton from "../button/ButtonComponent"
import InputTextComponent from "../inputTextComponent/InputTextComponent"
import IconComponent from "../IconComponent/IconComponent"
import IconEditSvg from "../IconComponent/IconEditSvg.tsx"
import IconDeleteSvg from "../IconComponent/IconDeleteSvg.tsx"
import { getPropertyValue } from "../../utilidades/util.ts"

interface TableProps<T> {
  columns: ColumnDescriptor[]
  dataColumn: ColumnDescriptor[]
  data: T[]
  onInputChange: (
    value: any,
    idInput: string | number,
    rowIndex: number
  ) => void
  onButtonClick: (idInput: string | number, rowIndex: number) => void // Actualizado para aceptar rowIndex
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
  onButtonClick: (idInput: string | number, rowIndex: number) => void // Actualizado para aceptar rowIndex
}

const TableCellComponent: React.FC<CustomTableProps<any>> = ({
  data,
  column,
  rowIndex,
  dataColumn,
  onInputChange,
  onButtonClick
}) => {
  const handleChange = (value: string | number | boolean, rowIndex: number) => {
    onInputChange(value, column.idInput, rowIndex)
  }

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    columnId: string,
    rowIndex: number
  ) => {
    e.preventDefault()
    //console.log(columnId)
    onButtonClick(column.idInput, rowIndex)
  }
  console.log(data)
  switch (dataColumn.type) {
    case "text":
      return (
        <td className="text-center">
          <InputTextComponent
            value={data[dataColumn.idInput] as string}
            defaultValue={dataColumn.defaultValue as string}
            onChange={(value: string) => handleChange(value, rowIndex)}
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
            onChange={(value: string) => handleChange(value, rowIndex)}
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
            selectClassName=""
            idSelected={dataColumn.idInput}
            value={data[dataColumn.idInput] as string}
            defaultValue={dataColumn.defaultValue as string}
            optionsSelect={dataColumn.options}
            onSeleccion={() => {}}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange(e.target.value, rowIndex)
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
            onChange={(value: string) => handleChange(value, rowIndex)}
          />
        </td>
      )
    case "checkbox":
      return (
        <td className="text-center">
          <input
            type="checkbox"
            checked={data[dataColumn.idInput] as boolean}
            onChange={(e) => handleChange(e.target.checked, rowIndex)}
          />
        </td>
      )
    case "button":
      return (
        <td className="text-center">
          <CustomButton
            buttonText={dataColumn.content as string}
            onClick={(e) => {
              // Llama a handleClick solo si dataColumn.value está definido
              if (dataColumn.value !== undefined) {
                handleClick(e, dataColumn.idInput, rowIndex)
              }
            }}
          />
        </td>
      )
    case "svg":
      if (dataColumn.idInput === "Editar") {
        return (
          <td className="text-center">
            <IconComponent
              onClick={(e) => {
                if (dataColumn.value != undefined) {
                  handleClick(e, dataColumn.idInput, rowIndex)
                }
              }} // Asegúrate de que `props.value` sea el valor correcto
              iconType="svg"
              iconContent={<IconEditSvg />}
            />
          </td>
        )
      } else if (dataColumn.idInput === "Borrar") {
        {
          return (
            <td>
              <IconComponent
                onClick={(e) => {
                  if (dataColumn.value != undefined) {
                    handleClick(e, dataColumn.idInput, rowIndex)
                  }
                }}
                iconType="svg"
                iconContent={<IconDeleteSvg />}
              />
            </td>
          )
        }
      }
      return <td></td>
    case "noInput":
      return (
        <td className="text-center">{data[dataColumn.idInput] as string}</td>
      )
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
            {data.map((rowData, rowIndex) => {
              return (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } border-b dark:border-gray-700`}
                >
                  {dataColumn.map((column, columnIndex) => {
                    //const value = getPropertyValue(rowData, column.idInput);
                    return (
                      <TableCellComponent
                        key={columnIndex}
                        dataColumn={column}
                        data={rowData}
                        column={column}
                        rowIndex={rowIndex}
                        onInputChange={onInputChange}
                        onButtonClick={onButtonClick}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CustomTable
