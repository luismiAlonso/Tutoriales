import { OrdenProduccion, Producto } from "../interfaces/OrdenProduccion"

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
      //console.log(ordenes[index])
      ordenes[index] = { ...ordenes[index], ...updatedOrden }
      saveOrdenesProduccionDB(ordenes)
    }
  } catch (error) {
    console.error("Error updating orden by id:", error)
  }
}

export const updateProductInOrdenProduccionDB = (
  idParte: number,
  idProducto: number,
  updatedProductData: Partial<Producto>
) => {
  try {
    const ordenes = fetchOrdenesProduccionDB()

    // Encontrar la orden por idParte
    const orden = ordenes.find((orden) => orden.idParte === idParte)
        
    if (orden) {
      // Encontrar el producto por idProducto
      const producto = orden.ordenesProduccion.find(
        (producto) => producto.indiceProducto === idProducto
      )

      console.log(orden,idProducto)

      if (producto) {
        // Actualizar el producto
        const updatedProducto = { ...producto, ...updatedProductData }
        // Reemplazar el producto en la orden
        const productoIndex = orden.ordenesProduccion.findIndex(
          (producto) => producto.indiceProducto === idProducto
        )

        if (productoIndex !== -1) {
          orden.ordenesProduccion[productoIndex] = updatedProducto
          saveOrdenesProduccionDB(ordenes)
          console.log("anterior",producto)
          console.log("actualizado",updatedProducto)
        }

      } else {
        console.error("Producto no encontrado en la orden de producción")
      }
    } else {
      console.error("Orden de producción no encontrada")
    }
  } catch (error) {
    console.error("Error updating producto in orden de producción:", error)
  }
}

// Aquí puedes agregar más funciones según lo necesites...
