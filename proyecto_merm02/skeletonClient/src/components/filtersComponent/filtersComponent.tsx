import InputTextFilterComponent from "../inputTextFilterComponent/InputTextFilterComponet"
import SelectComponent from "../selectComponent/SelectComponent"
import ToggleComponent from "../toggle/ToggleComponent"
 
import { IfilterComponentProps } from "./IfilterComponentProps"

const FilterComponent: React.FC<IfilterComponentProps> = ({
  textFilters,
  selectFilters,
  dateRangeFilters,
  toggleFilters,
  onFilterChange
}) => {

  return (
    <div className="flex flex-wrap gap-4 mb-5">
      {textFilters?.map((filter) => (
        <div key={filter.id} className="flex-1 min-w-[150px]">
          <InputTextFilterComponent
            // otras props
            onChange={(value) => {
              /* manejar el cambio */
            }}
          />
        </div>
      ))}

      {selectFilters?.map((filter) => (
        <div key={filter.id} className="flex-1 min-w-[150px]">
          <SelectComponent
            // otras props
            onSeleccion={(value) => {
              /* manejar el cambio */
            }}
          />
        </div>
      ))}

      {dateRangeFilters?.map((filter) => (
        <div key={filter.id} className="flex-1 min-w-[150px]">
          // Componente para el rango de fechas
        </div>
      ))}

      {toggleFilters?.map((filter) => (
        <div key={filter.id} className="flex-1 min-w-[150px]">
          <ToggleComponent
            // otras props
            onChange={(value) => {
              /* manejar el cambio */
            }}
          />
        </div>
      ))}
    </div>
  )
}
