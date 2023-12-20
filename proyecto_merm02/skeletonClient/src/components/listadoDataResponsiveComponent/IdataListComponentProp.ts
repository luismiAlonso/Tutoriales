import { ColumnDescriptor } from "../../interfaces/ColumnDescriptor"

export interface IdataListComponentProps {
  data: any[] // Array de objetos con datos
  columns: ColumnDescriptor[]
  onClick?: (iidInput: string | number, rowIndex: number) => void,
}

export interface IrenderColumnContentProps {
  header: string
  value: string
  type: string
  idInput: string
  rowIndex: number
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>, idInput: string, rowIndex: number) => void
}
