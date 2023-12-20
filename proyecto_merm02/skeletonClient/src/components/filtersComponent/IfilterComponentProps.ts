// interfaces/FilterTypes.ts
export interface TextFilterProps {
  id: string
  type: "text"
  // otras propiedades específicas para InputTextFilterComponent
}

export interface SelectFilterProps {
  id: string
  type: "select"
  value: string
  defaultValue: string
  selectClassName: string
  onSeleccion: 
  // otras propiedades específicas para SelectComponent
}

/*
SelectComponent
optionsSelect={listadoTitulosPropiedades}
value={selectPropiedades} // valor actual seleccionado
defaultValue={listadoTitulosPropiedades[0]} // valor por defecto mostrado
selectClassName={"mt-4 mb-4 w-1/4"}
idSelected={"selectPropiedades"} // identificador para el select, útil si manejas múltiples selects
onSeleccion={handleSelection} // callback para manejar la selección
onFilter={handleFilter} // opcional: callback para manejar el filtrado
*/

export interface DateFilterProps {
  id: string
  type: "date"
  // otras propiedades específicas para Datepicker
}

export interface ToggleFilterProps {
  id: string
  type: "toggle"
  // otras propiedades específicas para ToggleComponent
}

// Tipo unión para todos los tipos de filtro
export type FilterProps =
  | TextFilterProps
  | SelectFilterProps
  | DateFilterProps
  | ToggleFilterProps

// Definir interfaces similares para SelectFilterProps, DateRangeFilterProps, ToggleFilterProps, etc.
