import {
  InventarioAlmacen,
  ProductoInventario
} from "../models/inventario.model.js"

import { generadorClaveCompuesta } from "../utilidades/util.js"

/*
// Obtener todos los inventarios de almacén
export const getAllInventarioAlmacen = async (req, res) => {
  try {
    const inventarios = await InventarioAlmacen.find()
    res.json(inventarios)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los inventarios" })
  }
}

// Crear un nuevo inventario de almacén
export const createInventarioAlmacen = async (req, res) => {
  try {
    // Verificar si ya existe un inventario con el mismo ID
    const existingInventario = await InventarioAlmacen.findOne({
      idInventarioAlmacen: req.body.idInventarioAlmacen
    })

    if (existingInventario) {
      return res
        .status(400)
        .json({ message: "Ya existe un inventario con el mismo ID" })
    }

    // Si no existe, crear un nuevo inventario
    const nuevoInventario = new InventarioAlmacen(req.body)
    const inventarioGuardado = await nuevoInventario.save()
    res.status(201).json(inventarioGuardado)
  } catch (error) {
    res.status(500).json({ message: "Error al crear el inventario" })
  }
}

// Obtener un inventario de almacén por ID
export const getInventarioAlmacenById = async (req, res) => {
  try {
    const inventario = await InventarioAlmacen.findById(
      req.params.idInventarioAlmacen
    )
    if (!inventario)
      return res.status(404).json({ message: "Inventario no encontrado" })
    res.json(inventario)
  } catch (error) {
    res.status(404).json({ message: "Inventario no encontrado" })
  }
}

// Actualizar un inventario de almacén por ID
export const updateInventarioAlmacenById = async (req, res) => {
  try {
    const inventarioActualizado = await InventarioAlmacen.findByIdAndUpdate(
      req.params.idInventarioAlmacen,
      req.body,
      { new: true }
    )
    if (!inventarioActualizado)
      return res.status(404).json({ message: "Inventario no encontrado" })
    res.json(inventarioActualizado)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el inventario" })
  }
}

// Eliminar un inventario de almacén por ID
export const deleteInventarioAlmacenById = async (req, res) => {
  try {
    const inventarioEliminado = await InventarioAlmacen.findByIdAndDelete(
      req.params.idInventarioAlmacen
    )
    if (!inventarioEliminado)
      return res.status(404).json({ message: "Inventario no encontrado" })
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el inventario" })
  }
}

export const updateProductoInInventarioById = async (req, res) => {
  const idInventario = req.params.idInventarioAlmacen
  const idProducto = req.params.idProducto

  try {
    // Encuentra el inventario por ID
    const inventario = await InventarioAlmacen.findById(idInventario)
    if (!inventario) {
      return res.status(404).json({ message: "Inventario no encontrado" })
    }

    // Encuentra y actualiza el producto en el inventario
    const productoIndex = inventario.inventario.findIndex(
      (p) => p.idProducto === idProducto
    )
    if (productoIndex === -1) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el inventario" })
    }
    inventario.inventario[productoIndex] = {
      ...inventario.inventario[productoIndex],
      ...req.body
    }

    // Guarda los cambios en el inventario
    await inventario.save()
    res.json({ message: "Producto actualizado en el inventario", inventario })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el producto en el inventario" })
  }
}

export const addProductoInventarioToInventario = async (req, res) => {
  const idInventario = req.params.idInventarioAlmacen

  try {
    // Encuentra el inventario por ID
    const inventario = await InventarioAlmacen.findById(idInventario)
    if (!inventario) {
      return res.status(404).json({ message: "Inventario no encontrado" })
    }

    // Agrega el nuevo producto al inventario
    inventario.inventario.push(req.body)

    // Guarda los cambios en el inventario
    await inventario.save()
    res.json({ message: "Producto agregado al inventario", inventario })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar el producto al inventario" })
  }
}
*/

// Obtener todos los inventarios de almacén
export const getAllInventarioAlmacen = async (req, res) => {
  try {
    const inventarios = await InventarioAlmacen.find()
    res.json(inventarios)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los inventarios" })
  }
}

// GET: Obtener un inventario de almacén por sección y almacén
export const getInventarioAlmacenBySeccionAlmacen = async (req, res) => {
  try {
    const { seccion, almacen } = req.params
    const inventario = await InventarioAlmacen.findOne({ seccion, almacen })
    if (!inventario) {
      return res.status(404).json({ message: "Inventario no encontrado" })
    }
    res.json(inventario)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el inventario" })
  }
}

// POST: Crear un nuevo inventario de almacén
export const createInventarioAlmacen = async (req, res) => {
  try {
    const { seccion, almacen } = req.body
    const existingInventario = await InventarioAlmacen.findOne({
      seccion,
      almacen
    })

    if (existingInventario) {
      return res.status(400).json({
        message: "El inventario ya existe para esta sección y almacén"
      })
    }

    const nuevoInventario = new InventarioAlmacen(req.body)
    const inventarioGuardado = await nuevoInventario.save()
    res.status(201).json(inventarioGuardado)
  } catch (error) {
    res.status(500).json({ message: "Error al crear el inventario" })
  }
}

export const updateInventarioAlmacenProduct = async (req, res) => {
  try {
    const { seccion, almacen } = req.params

    /*
    // Suponiendo que 'req.body' contiene los datos del producto a añadir
    const claveCompuesta = generadorClaveCompuesta(req.body)

    // Buscar si ya existe un producto con la misma clave compuesta
    const inventarioExistente = await InventarioAlmacen.findOne({
      seccion,
      almacen,
      inventario: { $elemMatch: { claveComp: claveCompuesta } }
    })

    if (inventarioExistente) {
      return res.status(409).json({
        message: "Producto ya existente en el inventario",
        productoRecibido: req.body // Incluir los datos recibidos para diagnóstico
      })
    }*/

    // Actualizar el inventario si el producto no existe
    const inventarioActualizado = await InventarioAlmacen.findOneAndUpdate(
      { seccion, almacen },
      { $set: { inventario: req.body.inventario } },
      { new: true }
    )

    if (!inventarioActualizado) {
      return res.status(404).json({
        message: "Inventario no encontrado",
        error: error.message,
        productoRecibido: req.body
      })
    }

    res.json({
      message: "Inventario actualizado correctamente",
      inventarioActualizado, // Incluir el inventario actualizado
      productoAgregado: req.body // Incluir los datos del producto agregado
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      // Captura errores de validación y devuelve un 400
      return res.status(400).json({
        message: "Datos de solicitud inválidos",
        error: error.message,
        productoRecibido: req.body
      })
    }

    res.status(500).json({
      message: "Error al actualizar el inventario",
      error: error.message, // Incluir detalles del error
      productoRecibido: req.body // Incluir los datos recibidos para diagnóstico
    })
  }
}

export const getUltimosProductosPorUltimoRegistro = async (req, res) => {
  const { seccion, almacen } = req.params

  try {
    const productosConUltimoRegistro = await InventarioAlmacen.aggregate([
      { $unwind: "$inventario" },
      { $match: { "inventario.ultimoRegistro": true, seccion, almacen } },
      { $project: { producto: "$inventario" } } // Proyectar solo los datos necesarios
    ])

    // Extraer los productos del resultado de la agregación
    const productosFinales = productosConUltimoRegistro.map(
      (item) => item.producto
    )

    if (productosFinales.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos con último registro" })
    }

    res.json(productosFinales)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos con último registro",
      error: error.message
    })
  }
}

export const getTodosUltimosPorClave = async (req, res) => {
  try {
    const ultimosRegistros = await InventarioAlmacen.aggregate([
      { $unwind: "$inventario" },
      { $match: { "inventario.ultimoRegistro": true } }, // Buscar documentos donde inventario.ultimoRegistro es true
      { $group: { _id: "$_id", productos: { $push: "$inventario" } } }, // Agrupar por ID de InventarioAlmacen y agrupar los productos
      { $project: { productos: 1, _id: 0 } } // Proyectar solo los productos
    ])

    // Aplanar los resultados para obtener una lista única de productos
    const productosFinales = ultimosRegistros.flatMap((item) => item.productos)

    if (productosFinales.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos con último registro" })
    }

    res.json(productosFinales)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos con último registro",
      error: error.message
    })
  }
}

export const getUltimosProductosPorClave = async (req, res) => {
  const { seccion, almacen, tipoFecha } = req.params
  const campoFecha =
    tipoFecha === "fechaEntrada" ? "fechaEntrada" : "fechaSalida"

  try {
    const ultimosProductos = await InventarioAlmacen.aggregate([
      { $unwind: "$inventario" },
      {
        $sort: { "inventario.claveComp": 1, [`inventario.${campoFecha}`]: -1 }
      },
      {
        $group: {
          _id: "$inventario.claveComp",
          productos: { $push: "$inventario" }
        }
      }
    ])

    // Extrae solo el primer producto de cada grupo
    const productosFinales = ultimosProductos.map((group) => group.productos[0])

    if (productosFinales.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos" })
    }

    res.json(productosFinales)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los últimos productos",
      error: error.message
    })
  }
}

export const updateInventarioAlmacenBySeccionAlmacen = async (req, res) => {
  try {
    const { seccion, almacen } = req.params
    // Suponiendo que 'req.body' contiene los datos del producto a añadir
    const claveCompuesta = generadorClaveCompuesta(
      req.body.inventario[req.body.inventario.length - 1]
    )

    // Buscar si ya existe un producto con la misma clave compuesta
    const inventarioExistente = await InventarioAlmacen.findOne({
      seccion,
      almacen,
      inventario: { $elemMatch: { claveComp: claveCompuesta } }
    })

    if (inventarioExistente) {
      return res.status(409).json({
        message: "Producto ya existente en el inventario",
        productoRecibido: req.body // Incluir los datos recibidos para diagnóstico
      })
    }

    // Actualizar el inventario si el producto no existe
    const inventarioActualizado = await InventarioAlmacen.findOneAndUpdate(
      { seccion, almacen },
      { $set: { inventario: req.body.inventario } },
      { new: true }
    )

    if (!inventarioActualizado) {
      return res.status(404).json({
        message: "Inventario no encontrado",
        productoEnviado: req.body
      })
    }

    res.json({
      message: "Inventario actualizado correctamente",
      inventarioActualizado, // Incluir el inventario actualizado
      productoAgregado: req.body // Incluir los datos del producto agregado
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      // Captura errores de validación y devuelve un 400
      return res.status(400).json({
        message: "Datos de solicitud inválidos",
        error: error.message,
        productoRecibido: req.body
      })
    }
    res.status(500).json({
      message: "Error al actualizar el inventario",
      error: error.message, // Incluir detalles del error
      productoRecibido: req.body // Incluir los datos recibidos para diagnóstico
    })
  }
}

// DELETE: Eliminar un inventario de almacén por sección y almacén
export const deleteInventarioAlmacenBySeccionAlmacen = async (req, res) => {
  try {
    const { seccion, almacen } = req.params
    const inventarioEliminado = await InventarioAlmacen.findOneAndDelete({
      seccion,
      almacen
    })

    if (!inventarioEliminado) {
      return res.status(404).json({ message: "Inventario no encontrado" })
    }
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el inventario" })
  }
}

// DELETE: Eliminar productos de inventario por claveComp en una sección y almacén específicos
export const deleteProductosInventarioPorClaveComp = async (req, res) => {
  const { seccion, almacen, claveComp } = req.params

  try {
    const formatClave = decodeURIComponent(claveComp)

    if (formatClave) {
      const documentos = await InventarioAlmacen.find({ seccion, almacen })
      // Apuntar al campo 'claveComp' dentro de los objetos en el array 'inventario'
      const resultado = await InventarioAlmacen.updateMany(
        { seccion, almacen },
        { $pull: { inventario: { claveComp: formatClave } } }
      )

      if (resultado.nModified === 0) {
        return res.status(404).json({
          message:
            "No se encontraron productos para eliminar o InventarioAlmacen no encontrado"
        })
      }

      res.status(200).json({
        message: "Productos eliminados con éxito",
        eliminados: resultado.nModified,
        resultado: resultado,
        params: req.params
      })
    } else {
      // Si claveComp no está presente en los parámetros
      return res.status(400).json({
        message:
          "La clave compuesta 'claveComp' es requerida para la eliminación",
        params: claveComp
      })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar productos de inventario" })
  }
}

export const deleteProductoInventarioById = async (req, res) => {
  const { seccion, almacen } = req.params
  const idProducto = parseInt(req.params.idProducto)

  if (isNaN(idProducto)) {
    return res.status(400).json({ message: "ID del producto no válido" })
  }

  try {
    const inventarioAlmacen = await InventarioAlmacen.findOne({
      seccion,
      almacen
    })

    if (!inventarioAlmacen) {
      return res.status(404).json({ message: "Inventario no encontrado" })
    }

    // Filtra para eliminar el producto específico
    inventarioAlmacen.inventario = inventarioAlmacen.inventario.filter(
      (producto) => producto.idProducto !== idProducto
    )

    // Guarda el inventario actualizado
    await inventarioAlmacen.save()

    res.sendStatus(204)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto del inventario" })
  }
}

// ...otros controladores como manejar ProductoInventario
