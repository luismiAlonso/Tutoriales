import React, { useEffect, useState } from "react"
import ListInputsCard from "../components/ListInputsCard"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import CustomTable from "../components/ListadosTablas/CustomTable"
import { useListProducts } from "../contextStore/useListProduct"
import { parteProducto } from "../models/ParteProducto"
import { useOrdenProduccionData } from "../customHook/useOrdenProduccionData"
import { Producto, OrdenProduccion } from "../interfaces/OrdenProduccion"
import { ParteLaminacion } from "../models/ParteLaminacion"
import { HeadersProducto } from "../models/HeadersProducto"

//import {Tabla} from "../components/ListadosTablas/Tabla"

function OrdenProducionPage() {
  const {
    // mapearProductoAColumnas,
    // obtenerUltimoProducto,
    getCurrentOrderProduccion,
    mapColumnDescriptorsToProducto,
    agregarNuevoProductoOP,
    recuperarDatosTemporales,
    mapColumnDescriptors,
    updateColumnProduct,
    updateOrdenProduccion
  } = useOrdenProduccionData() // Usar el hook personalizado

  const [datosColumna, setDatosColumna] = useState<ColumnDescriptor[]>([])
  const [ordenProduccion, setOrdenProduccion] = useState<
    OrdenProduccion | null | undefined
  >()

  const { setColumns, columns } = useListProducts()

  const handleInputChange = (value: string | number, id: any) => {
    updateColumnProduct(id, value, ParteLaminacion)
  }

  const handleButtonClick = (idInput: string | number) => {
    const id = typeof idInput === "number" ? idInput.toString() : idInput

    if (id.toLowerCase() === "agregar") {
      //este ide corresponde al boton de añadir
      const productoActual = recuperarDatosTemporales()
      if (ordenProduccion && productoActual) {
        const mappedProduct = mapColumnDescriptorsToProducto(
          productoActual,
          ordenProduccion?.idParte
        )
        console.log(mappedProduct)
        // Agregar el producto mapeado a ordenProduccion y establecer el nuevo estado
        const nuevoOrdenProduccion = { ...ordenProduccion }
        nuevoOrdenProduccion.ordenesProduccion = [
          ...nuevoOrdenProduccion.ordenesProduccion,
          mappedProduct
        ]
        setOrdenProduccion(nuevoOrdenProduccion)
        // Suponiendo que agregarNuevoProductoOP actualiza alguna fuente de datos o realiza alguna otra función
        agregarNuevoProductoOP(ordenProduccion.idParte, mappedProduct)
      }
    }
  }

  useEffect(() => {

    if (ordenProduccion) {
      
      const productoActual = recuperarDatosTemporales()

      if (productoActual) {
        productoActual[0].value = ordenProduccion.idParte
        productoActual[0].defaultValue = ordenProduccion.idParte
        //console.log(productoActual)
        const mappedProductoActual = mapColumnDescriptors(
          ParteLaminacion,
          productoActual,
          ["value", "defaultValue"]
        )
        setDatosColumna(mappedProductoActual)
        setColumns(mappedProductoActual)
        updateOrdenProduccion(ordenProduccion)
      }
    } else {

      setDatosColumna(ParteLaminacion)
      setColumns(ParteLaminacion)

    }


  }, [ordenProduccion])

  useEffect(() => {

    const currentOrder = getCurrentOrderProduccion()
    if (currentOrder !== null) {
      setOrdenProduccion(currentOrder)
    }

  }, [])

  return (
   
    <form className="text-white">
        <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
          <div className="flex-grow text-left">
            <h2>PARTE DE LAMINACION</h2>
          </div>
          <div className="flex-grow text-right">
            <span>{ordenProduccion?.fecha}</span>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="flex-1">
            <span className="font-bold">
              OP nº {ordenProduccion ? ordenProduccion.idParte : "1"}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <ListInputsCard
            columns={datosColumna}
            onInputChange={handleInputChange}
            onButtonClick={handleButtonClick}
          />
        </div>
        {ordenProduccion?.ordenesProduccion &&
          ordenProduccion?.ordenesProduccion.length > 0 && (
            <div className="mb-10 mt-4">
              {
              ordenProduccion && (
                <CustomTable
                  columns={HeadersProducto}
                  dataColumn={parteProducto}
                  data={ordenProduccion?.ordenesProduccion}
                  onInputChange={handleInputChange}
                  onButtonClick={handleButtonClick}
                />
              )
              }
            </div>
              )}
        </form>
    )
}

export default OrdenProducionPage
