import { ColumnDescriptor } from "../../interfaces/ColumnDescriptor"

export interface IdataListComponentProps {
  data: any[] // Array de objetos con datos
  columns: ColumnDescriptor[]
}

export interface IrenderColumnContentProps {
  header: string
  value: string
}
