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
    const { idParte, TipoGoma, ordenesProduccion, fecha } = req.body
    const nuevaOrden = new OrdenProduccion({
      idParte,
      TipoGoma,
      ordenesProduccion,
      fecha
    })

    const ordenGuardada = await nuevaOrden.save()
    res.json(ordenGuardada)

    if (!ordenGuardada)
      return res.status(404).json({ message: "Orden not found" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

// Obtener una orden de producción por ID
export const getOrdenProduccionById = async (req, res) => {
  try {
    const orden = await OrdenProduccion.findById(req.params.id).populate(
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

// Actualizar una orden de producción por ID
export const updateOrdenProduccionById = async (req, res) => {

  const idParte = req.params.id // Asumiendo que idParte es lo que se pasa en la URL
  const body = req.body
  let indexError

  try {

    //pre cast
    /*body.ordenesProduccion.forEach((producto) => {
      try{

        producto.idParte = Number(producto.idParte)
        producto.fecha = String(producto.fecha)
        producto.indiceProducto  = Number(producto.indiceProducto)
        producto.operario =  Number(producto.operario)
        producto.pasada = Number(producto.pasada)
        producto.tipoGoma = String(producto.tipoGoma)
        producto.color = String(producto.color)
        producto.molde = String(producto.molde)
        producto.planchaobtenidas = Number(producto.planchaobtenidas)
        producto.peso = Number(producto.peso)
        producto.formulas = Number(producto.formulas)
        producto.planchas = Number(producto.planchas)
        producto.acelerantes = Number(producto.acelerantes)

      }catch (error) {

        console.error(`Error procesando el producto en la posición ${idParte}:`, error);
        // Opcional: manejar el error, como omitir este producto o detener el proceso
      }
      // Repite para otros campos según sea necesario
    })*/

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
    
    res.json(ordenActualizada)
    

  } catch (error) {
    console.error("Error al actualizar la orden de producción:", error)
    res.status(500).json({
      message: `Error interno del servidor al intentar actualizar la orden de producción con idParte ${JSON.stringify(
        body.ordenesProduccion,)}`,
      error: error.message
    })
  }
}

// Eliminar una orden de producción por ID
export const deleteOrdenProduccionById = async (req, res) => {
  try {
    const orden = await OrdenProduccion.findByIdAndDelete(req.params.id)
    if (!orden)
      return res
        .status(404)
        .json({ message: "Orden de producción no encontrada" })
    res.sendStatus(204)
  } catch (error) {
    res.status(404).json({ message: "Orden de producción no encontrada" })
  }
}

// Puedes agregar aquí más controladores para manejar operaciones específicas en productos, etc.
