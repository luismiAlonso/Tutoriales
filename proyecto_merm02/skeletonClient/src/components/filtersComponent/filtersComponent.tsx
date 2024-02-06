import React from "react"
import InputTextFilterComponent from "../inputTextFilterComponent/InputTextFilterComponet"
import SelectComponent from "../selectComponent/SelectComponent"
import DateRangeComponent from "../customDatePicker/CustomDatePicker"
import ToggleComponent from "../toggle/ToggleComponent"
import HybridSelect from "../hybridSelectComponent/hybridSelectComponent"
import { FilterConfig } from "./filterConfig"
import { ItextInputFilter } from "../inputTextFilterComponent/ItextInputFilter"
import { IcustomSelectProp } from "../selectComponent/IcustomSelectProp"
import { DateFilterProps } from "../customDatePicker/DateFilterProps"
import { ItoggleProps } from "../toggle/ItoggleProps"
import { HybridSelectProps } from "../hybridSelectComponent/HybridSelectProps"

interface FilterComponentProps {
  filters: FilterConfig[]
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filters }) => {
  
  return (

    <div className="flex flex-wrap gap-4 mb-5">

      {filters.map((filter) => {
        
        switch (filter.type) {
          case "text":
           //console.log(filter)
            return (
              <div key={filter.idInput} className="flex-1 min-w-[150px]">
                <InputTextFilterComponent
                 {...filter as ItextInputFilter}
                 // Pasa todas las props del filtro
                />
              </div>
            )
          case "select":
            return (
              <div key={filter.idInput} className="flex-1 min-w-[150px]">
                <SelectComponent
                  {...filter as IcustomSelectProp} // Pasa todas las props del filtro
                />
              </div>
            )
          case "date":
            return (
              <div key={filter.idInput} className="flex-1 min-w-[150px]">
                <DateRangeComponent
                  {...filter as DateFilterProps} // Pasa todas las props del filtro
                />
              </div>
            )
          case "toggle":
            return (
              <div key={filter.idInput} className="flex-1 min-w-[150px]">
                <ToggleComponent
                  {...filter as ItoggleProps} // Pasa todas las props del filtro
                />
              </div>
            )
          case "hybrid":
              return (
                <div key={filter.idInput} className="flex-1 min-w-[150px]">
                  <HybridSelect
                    {...filter as HybridSelectProps} // Pasa todas las props del filtro
                  />
                </div>
              )
          default:
            return null
        }
      })}
    </div>
  )
}

export default FilterComponent
