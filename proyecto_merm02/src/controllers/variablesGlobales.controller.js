// controllers/indiceInventarioController.js
import indiceInventario from "../models/variablesGlobales.model.js"

export const getIndice = async (req, res) => {
  const { seccion, almacen } = req.params

  try {

    let indice = await indiceInventario.findOne({ seccion, almacen })

    if (indice) {
      // Incrementar el índice y guardarlo
      indice.indice += 1
      await indice.save()
      res.json(indice.indice)
      
    } else {
      // Devolver 0 si no se encuentra el índice
      res.json(0)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Crear o actualizar un índice
export const createOrUpdateIndice = async (req, res) => {
  const { seccion, almacen } = req.params
  // Establecer un valor predeterminado para 'indice' si no se proporciona
  const indice = req.body.indice || 1

  try {
    const nuevoIndice = await indiceInventario.findOneAndUpdate(
      { seccion, almacen },
      { seccion, almacen, indice },
      { new: true, upsert: true } // Crea un nuevo documento si no existe
    )
    res.status(201).json(nuevoIndice)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Continúa agregando o modificando otros controladores según sea necesario
