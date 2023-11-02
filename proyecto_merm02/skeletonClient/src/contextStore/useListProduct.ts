import { create } from "zustand"
import { ColumnDescriptor } from "../components/ListadosTablas/Itabla"

type ColumnStore = {
  columns: ColumnDescriptor[]
  setColumns: (columns: ColumnDescriptor[]) => void
  addColumn: (column: ColumnDescriptor) => void
  updateColumn: (idInput: string, updatedColumn: ColumnDescriptor) => void
  removeColumn: (idInput: string) => void
  getOnChangeForInput: (
    idInput: string
  ) => ((value: string | number, idInput: string) => void) | undefined
  getOnClickForInput: (
    idInput: string
  ) => ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined
}

export const useListProducts = create<ColumnStore>((set, get) => ({
  columns: [],

  setColumns: (columns) => set({ columns }),

  addColumn: (column) =>
    set((state) => ({
      columns: [...state.columns, column]
    })),

  updateColumn: (idInput, updatedColumn) =>
    set((state) => ({
      columns: state.columns.map((column) =>
        column.idInput === idInput ? updatedColumn : column
      )
    })),

  removeColumn: (idInput) =>
    set((state) => ({
      columns: state.columns.filter((column) => column.idInput !== idInput)
    })),

  getOnChangeForInput: (idInput) => {
    const column = get().columns.find((col) => col.idInput === idInput) 

    if (!column) {
      console.warn(`Column not found for idInput: ${idInput}`)
    } else if (!column.onChange) {
      console.warn(`onChange not defined for column with idInput: ${idInput}`)
    }

    return column?.onChange
  },
  getOnClickForInput: (idInput) => {
    const column = get().columns.find((col) => col.idInput === idInput)
    if (!column) {
      console.warn(`Column not found for idInput: ${idInput}`)
    } else if (!column.onClick) {
      console.warn(`onClick not defined for column with idInput: ${idInput}`)
    }

    return column?.onClick
  }
}))
