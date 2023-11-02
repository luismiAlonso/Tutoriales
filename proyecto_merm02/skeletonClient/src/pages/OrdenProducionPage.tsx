import React, { useEffect, useState } from "react"
import ListInputsCard from "../components/ListInputsCard"
import { ColumnDescriptor } from "../components/ListadosTablas/Itabla"
import CustomTable from "../components/ListadosTablas/CustomTable"
import { useListProducts } from "../contextStore/useListProduct"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
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
    updateColumnProduct
  } = useOrdenProduccionData() // Usar el hook personalizado

  const [datosColumna, setDatosColumna] = useState<ColumnDescriptor[]>([])
  const [ordenProduccion, setOrdenProduccion] = useState<
    OrdenProduccion | null | undefined
  >()

  const { setColumns, columns, getOnChangeForInput, getOnClickForInput } =
    useListProducts()

  //const { setColumnDescriptors, columnDescriptors } = useOrdenProductionStore()

  // 1. Manejadores
  const handleInputChange = (value: string | number, id: any) => {
    console.log(`Input con id ${id} ha cambiado su valor a ${value}`)
    updateColumnProduct(id, value)
  }

  const handleButtonClick = (idInput: string | number) => {
    const id = typeof idInput === "number" ? idInput.toString() : idInput

    if (id === "12") {
      //este ide corresponde al boton de añadir
      console.log(columns)
      if (ordenProduccion) {
        const mappedProduct = mapColumnDescriptorsToProducto(
          columns,
          ordenProduccion?.idParte
        )

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
    if (getCurrentOrderProduccion() !== null) {
      setOrdenProduccion(getCurrentOrderProduccion())
    }

    if (ordenProduccion) {
      const productoActual = recuperarDatosTemporales()

      if (productoActual) {
        productoActual[0].value = ordenProduccion.idParte
        setDatosColumna(productoActual)
        setColumns(productoActual)
       // setColumnDescriptors(productoActual)
      }
    } else {
      setDatosColumna(ParteLaminacion)
      setColumns(ParteLaminacion)
     // setColumnDescriptors(columns)
    }
  }, [ordenProduccion])

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
          {/* Ajustado para referenciar ordenReciente.idParte */}
          <span className="font-bold">
            OP nº {ordenProduccion ? ordenProduccion.idParte : "1"}
          </span>
        </div>
        <span className="font-bold text-xl mr-2">PASADA</span>{" "}
        {/* Aumenta el tamaño de la fuente */}
        <input
          type="number"
          defaultValue={1}
          className="w-24 p-1 h-10 text-black text-lg"
        />
      </div>
      <div className="mt-3">
        <ListInputsCard
          columns={datosColumna}
          onInputChange={handleInputChange}
          onButtonClick={handleButtonClick}
        />
      </div>{" "}
      <div className="mb-10 mt-4">
        {ordenProduccion && (
          <CustomTable
            columns={HeadersProducto}
            data={ordenProduccion?.ordenesProduccion}
            onInputChange={handleInputChange}
            onButtonClick={handleButtonClick}
          />
        )}
      </div>
    </form>
  )
}

export default OrdenProducionPage
