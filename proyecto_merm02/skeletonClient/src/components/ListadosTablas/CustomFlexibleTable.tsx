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
import { TableStyle } from "../../interfaces/TableStyles.ts"

interface TableProps<T> {
  columns: ColumnDescriptor[]
  dataColumn: ColumnDescriptor[][]
  tableStyle: TableStyle[]
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
  tableStyle: TableStyle
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
  tableStyle,
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

    onButtonClick(column.idInput, rowIndex)
  }

  const hiddenClass = dataColumn.visible ? "" : "invisible"

  /*if(!dataColumn.visible){
    return null
  }*/

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
            idInput={dataColumn.idInput}
            type="select"
            activeLabel={true}
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
            type="hybrid"
            idInput={dataColumn.idInput}
            activeLabel={true}
            editable={dataColumn.editable}
            additionalStyles=""
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
          <div className={hiddenClass}>
            <CustomButton
              buttonText={dataColumn.content as string}
              onClick={(e) => {
                // Llama a handleClick solo si dataColumn.value está definido
                if (dataColumn.value !== undefined) {
                  handleClick(e, dataColumn.idInput, rowIndex)
                }
              }}
            />
          </div>
        </td>
      )
    case "svg":
      if (dataColumn.idInput === "Editar") {
        return (
          <td className="text-center">
            <div className={hiddenClass}>
              <IconComponent
                onClick={(e) => {
                  if (dataColumn.value != undefined) {
                    handleClick(e, dataColumn.idInput, rowIndex)
                  }
                }} // Asegúrate de que `props.value` sea el valor correcto
                iconType="svg"
                iconContent={<IconEditSvg />}
              />
            </div>
          </td>
        )
      } else if (dataColumn.idInput === "Borrar") {
        {
          return (
            <td>
              <div className={hiddenClass}>
                <IconComponent
                  onClick={(e) => {
                    if (dataColumn.value != undefined) {
                      handleClick(e, dataColumn.idInput, rowIndex)
                    }
                  }}
                  iconType="svg"
                  iconContent={<IconDeleteSvg />}
                />
              </div>
            </td>
          )
        }
      }
      return <td></td>
    case "noInput":
      //console.log("fields",dataColumn.idInput,dataColumn.visible)
      return (
        <td className="text-center">
          <div className={hiddenClass}>
            {data[dataColumn.idInput] as string}
          </div>
        </td>
      )
    default:
      return (
        <td className={`text-center ${hiddenClass}`}>{dataColumn.content}</td>
      )
  }
}

const CustomFlexibleTable: React.FC<TableProps<any>> = ({
  columns,
  dataColumn,
  tableStyle = [],
  onInputChange,
  onButtonClick,
  data
}) => {
  
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xxs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* Renderizar los encabezados de las columnas */}
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, rowIndex) => (
              /*<tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700`}
              >*/

              <tr
                key={rowIndex}
                className={`${tableStyle[rowIndex].trContent} border-b dark:border-gray-700`}
              >
                {dataColumn[rowIndex].map(
                  (columnDescriptor, descriptorIndex) => {
                    //console.log(rowData)
                    return (
                      <TableCellComponent
                        key={descriptorIndex}
                        tableStyle={tableStyle[rowIndex]}
                        dataColumn={columnDescriptor}
                        data={rowData}
                        column={columnDescriptor}
                        rowIndex={rowIndex}
                        onInputChange={onInputChange}
                        onButtonClick={onButtonClick}
                      />
                    )
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CustomFlexibleTable
