import { OrdenProduccion } from "../interfaces/OrdenProduccion"

export const fetchOrdenesProduccionDB = (): OrdenProduccion[] => {
  try {
    const ordenesProduccionStr = localStorage.getItem("ordenesProduccion")
    return ordenesProduccionStr ? JSON.parse(ordenesProduccionStr) : []
  } catch (error) {
    console.error("Error fetching ordenes de produccion:", error)
    return []
  }
}

export const saveOrdenesProduccionDB = (ordenes: OrdenProduccion[]) => {
  try {
    localStorage.setItem("ordenesProduccion", JSON.stringify(ordenes))
  } catch (error) {
    console.error("Error saving ordenes de produccion:", error)
  }
}

export const addOrdenProduccionDB = (orden: OrdenProduccion) => {
  try {
    const ordenes = fetchOrdenesProduccionDB()
    ordenes.push(orden)
    saveOrdenesProduccionDB(ordenes)
  } catch (error) {
    console.error("Error adding orden de produccion:", error)
  }
}

export const updateOrdenByIdDB = (
  idParte: number,
  updatedOrden: Partial<OrdenProduccion>
) => {
  
  try {
    const ordenes = fetchOrdenesProduccionDB()
    const index = ordenes.findIndex((orden) => orden.idParte === idParte)
    if (index !== -1) {
      ordenes[index] = { ...ordenes[index], ...updatedOrden }
      saveOrdenesProduccionDB(ordenes)
    }
  } catch (error) {
    console.error("Error updating orden by id:", error)
  }

}

// Aquí puedes agregar más funciones según lo necesites...
