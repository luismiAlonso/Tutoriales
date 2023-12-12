import React from "react"
import {
  IdataListComponentProps,
  IrenderColumnContentProps
} from "./IdataListComponentProp"

const DataListComponent: React.FC<IdataListComponentProps> = ({
  data,
  columns
}) => {
  return (
    <div className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col py-2">
          {columns.map((column, columnIndex) => {
            const value = item[column.idInput]
            const isEvenColumn = columnIndex % 2 === 0
            return (
              <div
                key={column.idInput}
                className={`flex-1 w-full ${
                  isEvenColumn ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
                } p-1`}
              >
                {renderColumnContent({ header: column.title, value: value })}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

const renderColumnContent = ({ header, value }: IrenderColumnContentProps) => {
  return (
    <div className="flex flex-col text-sm">
      {" "}
      {/* Reduciendo el tamaño de la fuente */}
      <span className="font-bold">{header}</span>
      <span>{value}</span>
    </div>
  )
}

export default DataListComponent
