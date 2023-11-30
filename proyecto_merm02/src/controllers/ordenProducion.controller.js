import {OrdenProduccion,Producto} from "../models/ordenProduccion.model.js"

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
    if (!ordenGuardada)
      return res.status(404).json({ message: "Orden not found" })
    res.json(ordenGuardada)
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
  try {
    const ordenActualizada = await OrdenProduccion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!ordenActualizada)
      return res
        .status(404)
        .json({ message: "Orden de producción no encontrada" })
    res.json(ordenActualizada)
  } catch (error) {
    res.status(404).json({ message: "Orden de producción no encontrada" })
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
