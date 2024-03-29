export interface IcustomSelectProp {
  idInput:string
  type:string
  activeLabel:boolean
  optionsSelect: string[]
  idSelected: string
  selectClassName: string
  value: string
  defaultValue: string
  onSeleccion: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void // Incluye 'id' como segundo parámetro
  onFilter?: (filterValue: string, id: string) => void // Incluye 'id' como segundo parámetro
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void // Incluye 'id' como segundo parámetro si es necesario
}
