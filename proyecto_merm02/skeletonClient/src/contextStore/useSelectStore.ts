import {create} from "zustand"

// Definición de la interfaz para un Select individual
export interface Select {
  id: string
  list: string[]
  defaultElement: string
  selectedValue: string | null
}

// Definición de la interfaz para el estado de la tienda
export interface SelectStore {
  selects: Select[]
  addSelect: (select: Select) => void
  setPropertySelect: (id: string, value: string) => void
}

// Creación de la tienda
export const useSelectStore = create<SelectStore>((set) => ({
  // Inicialización del array de selects como un array vacío
  selects: [],

  // Función para agregar un nuevo select al array
  addSelect: (select) =>
    set((state) => ({ selects: [...state.selects, select] })),

  // Función para actualizar el valor seleccionado de un select específico basándose en un ID
  setPropertySelect: (id, value) =>
    set((state) => ({
      selects: state.selects.map((select) =>
        select.id === id ? { ...select, selectedValue: value } : select
      )
    }))
}))
