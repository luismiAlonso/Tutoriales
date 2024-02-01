import { string } from "zod"
import { OrdenProduccion, Producto } from "../models/ordenProduccion.model.js"

// Obtener todas las ordenes de producción
export const getOrdenesProduccion = async (req, res) => {
  try {
    const ordenesProduccion = await OrdenProduccion.find().populate(
      "ordenesProduccion"
    )
    if (!ordenesProduccion)
      return res.status(404).json({ message: "Orden not found" })
    res.json(ordenesProduccion)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

// Crear una nueva orden de producción
export const createOrdenProduccion = async (req, res) => {
  try {
    const { idParte, TipoGoma, bamburi, ordenesProduccion, fecha } = req.body
    const nuevaOrden = new OrdenProduccion({
      idParte,
      TipoGoma,
      bamburi,
      ordenesProduccion,
      fecha
    })

    const ordenGuardada = await nuevaOrden.save()
    res.json(ordenGuardada)

    if (!ordenGuardada)
      return res.status(404).json({ message: "Orden not found" })
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      stack: error.stack
    })
  }
}

// Obtener una orden de producción por ID
export const getOrdenProduccionById = async (req, res) => {
  try {
    const orden = await OrdenProduccion.findById(req.params.idParte).populate(
      "ordenesProduccion"
    )
    if (!orden)
      return res
        .status(404)
        .json({ message: "Orden de producción no encontrada" })
    res.json(orden)
  } catch (error) {
    res.status(404).json({ message: "Orden de producción no encontrada" })
  }
}

export const updateProductoEnOrdenProduccion = async (req, res) => {
  const { idParte, indiceProducto } = req.params
  const productoActualizado = req.body

  try {
    // Intento de actualización del producto específico
    const resultado = await OrdenProduccion.findOneAndUpdate(
      {
        idParte: idParte,
        "ordenesProduccion.indiceProducto": indiceProducto
      },
      { $set: { "ordenesProduccion.$[elem]": productoActualizado } },
      {
        arrayFilters: [{ "elem.indiceProducto": indiceProducto }],
        new: true
      }
    )

    // Verificación de resultado
    if (!resultado) {
      return res.status(404).json({
        message: `No se encontró la orden de producción con idParte ${idParte} o el producto con indiceProducto ${indiceProducto}.`
      })
    }

    // Respuesta con el documento actualizado
    return res.status(200).json(resultado)
    
  } catch (error) {
    console.error(
      "Error al actualizar el producto en la orden de producción:",
      error
    )
    return res.status(500).json({
      message:
        "Error interno del servidor al actualizar el producto en la orden de producción.",
      error: error.message
    })
  }
}

// Actualizar una orden de producción por ID
export const updateOrdenProduccionById = async (req, res) => {
  const idParte = req.params.idParte // Asumiendo que idParte es lo que se pasa en la URL
  const body = req.body

  try {
    const ordenActualizada = await OrdenProduccion.findOneAndUpdate(
      { idParte: idParte }, // Busca por idParte en lugar de _id
      { $set: { ordenesProduccion: body.ordenesProduccion } },
      { new: true }
    )

    if (!ordenActualizada) {
      return res.status(404).json({
        message: `Orden de producción con idParte ${idParte} no encontrada.`
      })
    }

    res.json({
      message: "mensaje actualizacion: " + body.ordenesProduccion,
      ordenActualizada
    })
  } catch (error) {
    console.error("Error al actualizar la orden de producción:", error)
    res.status(500).json({
      message: `Error interno del servidor al intentar actualizar la orden de producción con idParte ${JSON.stringify(
        body.ordenesProduccion
      )}`,
      error: error.message
    })
  }
}

// Eliminar una orden de producción por ID
export const deleteOrdenProduccionById = async (req, res) => {
  try {
    const orden = await OrdenProduccion.findByIdAndDelete(req.params.idParte)
    if (!orden)
      return res
        .status(404)
        .json({ message: "Orden de producción no encontrada" })
    res.sendStatus(204)
  } catch (error) {
    res.status(404).json({ message: "Orden de producción no encontrada" })
  }
}

// DELETE: Eliminar un producto dentro de una orden de producción
export const deleteOrdenProductoInOrdenById = async (req, res) => {
  try {
    const { idParte, indiceProducto } = req.params

    // Buscar la orden de producción por ID
    const orden = await OrdenProduccion.findOne({ idParte: idParte })

    if (!orden) {
      return res
        .status(404)
        .json({ message: "Orden de producción no encontrada " + idParte })
    }

    // Eliminar el producto de la orden
    orden.ordenesProduccion = orden.ordenesProduccion.filter(
      (producto) => producto.indiceProducto !== Number(indiceProducto)
    )

    // Guardar la orden de producción actualizada
    const ordenActualizada = await orden.save()

    // Enviar la orden de producción actualizada
    res.status(200).json(
      ordenActualizada // Esto devuelve la orden de producción con el inventario actualizado
    )
  } catch (error) {
    console.error(
      "Error al eliminar el producto de la orden de producción:",
      error
    )
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message, // Mensaje de error detallado
      stack: error.stack // Pila de errores (opcional, considera eliminar en producción)
    })
  }
}

// Puedes agregar aquí más controladores para manejar operaciones específicas en productos, etc.
