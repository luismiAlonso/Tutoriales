export interface TablaProps<T> {
  datos: T[]
  columnas: (keyof T)[]
  fontStyleSize: string
}

export interface ColumnDescriptor<> {
  idInput:string,
  title: string,
  content: string,
  type: "text" | "number" | "dropdown" | "hybridSelect" | "checkbox" | "button"
  value?: string | number
  editable: boolean
  options: string[]
  defaultValue?: string | number
  placeHolder: string,
  additionalStyles:string,
  onChange?: (value: string | number, idInput: string) => void
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}