import React from "react"
import {
  IdataListComponentProps,
  IrenderColumnContentProps
} from "./IdataListComponentProp"

import IconComponent from "../IconComponent/IconComponent"
import IconEditSvg from "../IconComponent/IconEditSvg"
import IconDeleteSvg from "../IconComponent/IconDeleteSvg"

const RenderColumnContent: React.FC<IrenderColumnContentProps> = ({
  header,
  value,
  type,
  idInput,
  rowIndex,
  onButtonClick
}) => {
  // Función auxiliar para manejar diferentes tipos

  const renderContent = () => {
    switch (type) {
      case "noInput":
        return (
          <>
            <span className="font-bold p-2 bg-gray-500">{header}</span>
            <span className="p-2">{value}</span>
          </>
        )
      case "svg":
        if (idInput === "Editar") {
          return (
            <IconComponent
              onClick={(e) => {
                e.preventDefault()
               if (onButtonClick) {
                  onButtonClick(e, idInput, rowIndex)
                }
              
              }} // Asegúrate de que `props.value` sea el valor correcto
              iconType="svg"
              className="w-12"
              iconContent={<IconEditSvg />}
            />
          )
        } else if (idInput === "Borrar") {
          return (
            <IconComponent
              onClick={(e) => {
                if (onButtonClick) {
                  onButtonClick(e, idInput, rowIndex)
                }
              }} // Asegúrate de que `props.value` sea el valor correcto
              iconType="svg"
              className="w-12"
              iconContent={<IconDeleteSvg />}
            />
          )
        }
        return <></>
      // Añade más casos según sea necesario
      default:
        return null
    }
  }

  return <div className="flex flex-col text-xs">{renderContent()}</div>
}

const ListadoDataResponsive: React.FC<IdataListComponentProps> = ({
  data,
  columns,
  onClick
}) => {
  // Definición de handleClick
  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    idInput: string,
    rowIndex: number
  ) => {
    e.preventDefault()
    console.log(idInput,rowIndex)
    onClick && onClick(idInput, rowIndex) // Llama a onClick con idInput y rowIndex
  }

  return (
    <div className="text-gray-900 dark:text-white">
      {data.map((item, index) => (
        <div key={index} className="py-2">
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Renderizar solo elementos que no son SVG */}
              {columns.map((column, columnIndex) => {
                if (column.type === "svg") return null
                const value = item[column.idInput]
                return (
                  <div
                    key={column.idInput}
                    className={`flex flex-col p-1 ${
                      columnIndex % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <RenderColumnContent
                      header={column.title}
                      value={value}
                      type={column.type}
                      rowIndex={index}
                      idInput={column.idInput}
                    />
                  </div>
                )
              })}
            </div>
            <div className="flex justify-start mt-4">
              {/* Renderizar solo elementos SVG */}
              {columns.map((column) => {
                if (column.type !== "svg") return null
                const value = item[column.idInput]
                return (
                  <div key={column.idInput} className="p-1">
                    <RenderColumnContent
                      header={column.title}
                      value={value}
                      type={column.type}
                      rowIndex={index}
                      idInput={column.idInput}
                      onButtonClick={handleClick}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListadoDataResponsive
