import { create } from "zustand"
import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion"
import { ColumnDescriptor } from "../components/ListadosTablas/Itabla"

type OrdenProduccionStore = {
  ordenesProduccion: OrdenProduccion[]
  ordenReciente: OrdenProduccion | null
  productoActual: Producto | null
  listaProductosOrdenReciente: Producto[]
  listaTotalProduccion: Producto []
  columnDescriptors: ColumnDescriptor[] // Nueva definición para los ColumnDescriptor

  addOrdenProduccion: (orden: OrdenProduccion) => void
  removeOrdenProduccion: (idParte: number) => void
  updateOrdenProduccion: (
    idParte: number,
    updatedOrden: Partial<OrdenProduccion>
  ) => void
  setListaProductosOrdenReciente: (productos: Producto[]) => void
  getListaProductosOrdenReciente: () => Producto[]
  setListaTotalProduccion: (productos:Producto[]) => void
  getListaTotalProduccion: () => Producto[]
  getOrdenProduccion: (idParte: number) => OrdenProduccion | undefined
  setOrdenReciente: (orden: OrdenProduccion) => void
  setOrdenesProduccion: (ordenes: OrdenProduccion[]) => void
  setProductoActual: (producto: Producto) => void
  setColumnDescriptors: (columns: ColumnDescriptor[]) => void
  setInputValue: (id: string, value: any) => void
  getInputValue: (id: string) => any | undefined
}

export const useOrdenProductionStore = create<OrdenProduccionStore>(
  (set, get) => ({
    ordenesProduccion: [],
    ordenReciente: null,
    listaProductosOrdenReciente: [],
    listaTotalProduccion: [],
    productoActual: null,
    columnDescriptors: [], // Inicialización del estado para los ColumnDescriptor

    addOrdenProduccion: (orden) =>
      set((state) => ({
        ordenesProduccion: [...state.ordenesProduccion, orden],
        ordenReciente: orden
      })),

    removeOrdenProduccion: (idParte) =>
      set((state) => ({
        ordenesProduccion: state.ordenesProduccion.filter(
          (orden) => orden.idParte !== idParte
        )
      })),

    updateOrdenProduccion: (idParte, updatedOrden) =>
      set((state) => ({
        ordenesProduccion: state.ordenesProduccion.map((orden) =>
          orden.idParte === idParte ? { ...orden, ...updatedOrden } : orden
        ),
        ordenReciente:
          state.ordenReciente && idParte === state.ordenReciente.idParte
            ? { ...state.ordenReciente, ...updatedOrden }
            : state.ordenReciente
      })),

    getOrdenProduccion: (idParte) => {
      const orden = get().ordenesProduccion.find(
        (orden) => orden.idParte === idParte
      )
      return orden
    },
    setListaTotalProduccion: (productos) => set(() => ({ listaTotalProduccion: productos })),
    getListaTotalProduccion: () => get().listaTotalProduccion,
    setOrdenReciente: (orden) => set(() => ({ ordenReciente: orden })),

    setOrdenesProduccion: (ordenes) =>
      set(() => ({ ordenesProduccion: ordenes })),

    setProductoActual: (producto) => set(() => ({ productoActual: producto })),

    setColumnDescriptors: (columns) =>
      set(() => ({ columnDescriptors: columns })),

    setInputValue: (id, value) => {
      set((state) => ({
        columnDescriptors: state.columnDescriptors.map((column) =>
          column.idInput === id ? { ...column, value: value } : column
        )
      }))
    },

    getInputValue: (id) => {
      const column = get().columnDescriptors.find(
        (column) => column.idInput === id
      )
      return column?.value
    },

    setListaProductosOrdenReciente: (productos) =>
      set(() => ({ listaProductosOrdenReciente: productos })),
    getListaProductosOrdenReciente: () => get().listaProductosOrdenReciente
  })
)
