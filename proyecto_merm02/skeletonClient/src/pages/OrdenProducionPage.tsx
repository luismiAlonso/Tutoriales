import React, { useEffect, useState } from "react"
import ListInputsCard from "../components/ListInputComponent/ListInputsCard"
import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import CustomTable from "../components/ListadosTablas/CustomTable"
import SelectComponent from "../components/selectComponent/SelectComponent"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import { parteProducto } from "../models/ParteProducto"
import { useOrdenProduccionData } from "../customHook/useOrdenProduccionData"
import { Producto, OrdenProduccion } from "../interfaces/OrdenProduccion"
import { ParteLaminacion } from "../models/ParteLaminacion"
import { HeadersProducto } from "../models/HeadersProducto"
import { ProductoModificacion } from "../models/ProductoModificacion"

import ToggleComponent from "../components/toggle/ToggleComponent"
import InputTextFilterComponent from "../components/inputTextFilterComponent/InputTextFilterComponet"
import useFilterData from "../components/filters/useFilterData"

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
    updateOrdenProduccion,
    mapearPropiedadesProductoLaminacion,
    mapearProductoAColumnas,
    incrementarIndiceProductos
  } = useOrdenProduccionData() // Usar el hook personalizado

  const [datosColumna, setDatosColumna] = useState<ColumnDescriptor[]>([])
  const [ordenProduccion, setOrdenProduccion] = useState<
    OrdenProduccion | null | undefined
  >()

  const [ordenData, setOrdenData] = useState<boolean>()
  const [editMode, setEditMode] = useState<boolean>(false)

  //console.log(listadoTitulosProducto)
  const { setListaProductosOrdenReciente, listaProductosOrdenReciente } =
    useOrdenProductionStore()

  const { filterByWords, filterData } = useFilterData()

  const getAtributeList = (listado: any[]) => {
    const mappedList = mapearPropiedadesProductoLaminacion(listado)
    return mappedList
  }

  const listadoTitulosProducto: string[] = getAtributeList(HeadersProducto)

  const [selectPropiedades, setSelectedPropiedades] = useState(
    listadoTitulosProducto[0]
  )

  const handleInputChange = (value: string | number, id: any) => {
    updateColumnProduct(id, value, ParteLaminacion)
  }

  const handleButtonClick = (idInput: string | number, rowIndex: number) => {
    const id = typeof idInput === "number" ? idInput.toString() : idInput

    if (id.toLowerCase() === "agregar") {
      //este ide corresponde al boton de añadir
      const productoActual = recuperarDatosTemporales()
      if (ordenProduccion && ordenProduccion !== null) {
        if (productoActual) {
          const mappedProduct = mapColumnDescriptorsToProducto(
            productoActual,
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
        } else {
          const mappedProduct = mapColumnDescriptorsToProducto(
            ParteLaminacion,
            1
          )

          const nuevoOrdenProduccion = { ...ordenProduccion }

          nuevoOrdenProduccion.ordenesProduccion = [
            ...nuevoOrdenProduccion.ordenesProduccion,
            mappedProduct
          ]

          setOrdenProduccion(nuevoOrdenProduccion)
          // Suponiendo que agregarNuevoProductoOP actualiza alguna fuente de datos o realiza alguna otra función
          agregarNuevoProductoOP(ordenProduccion.idParte, mappedProduct)
        }
      } else {
        //console.log("entro sin orden")
      }
    } else if (id.toLowerCase() === "editar") {
     // console.log("Editar", rowIndex)
      setEditMode(true)
      const productoEditar = mapearProductoAColumnas(
        ProductoModificacion,
        listaProductosOrdenReciente[rowIndex].idParte,
        listaProductosOrdenReciente[rowIndex]
      )
      
    console.log(productoEditar)
    } else if (id.toLowerCase() === "aceptarEdicion") {
      
      setEditMode(false)
    }
  }

  // Maneja la selección del usuario
  const handleSelection = (value: string) => {
    //console.log("Valor seleccionado:", value)
    setSelectedPropiedades(value) // Actualiza el estado con el valor seleccionado
  }

  // Opcional: Maneja el filtro si es necesario
  const handleFilter = (filterValue: string) => {
    console.log("Filtrar valores por:", filterValue)
    // Implementar lógica de filtrado aquí si es necesario
    if (ordenProduccion?.ordenesProduccion) {
      filterData(ordenProduccion?.ordenesProduccion, filterValue, "asc").then(
        (result) => {
          setListaProductosOrdenReciente(result)
        }
      )
    }
  }

  const handleInputTextChange = () => {}

  const handleInputTextClick = (valueInput: string) => {
    console.log("inputText", valueInput)
  }

  const handleFilterChange = (id: string, value: string) => {
    if (id === "byWords") {
      if (ordenProduccion?.ordenesProduccion) {
        filterByWords(
          ordenProduccion?.ordenesProduccion,
          value,
          selectPropiedades,
          "asc"
        ).then((result) => {
          setListaProductosOrdenReciente(result)
        })
      }
    }
  }

  //manejador del toogle
  const handleToggleChange = (
    idToggle: string,
    toggleState: {
      value: boolean
      sortDirection: "asc" | "desc"
    }
  ) => {
    if (idToggle === "orden01") {
      setOrdenData(toggleState.value)

      if (listaProductosOrdenReciente) {
        filterData(
          listaProductosOrdenReciente,
          selectPropiedades,
          toggleState.sortDirection
        ).then((result) => {
          console.log(result)
          setListaProductosOrdenReciente(result)
        })
      }
      // Puedes realizar acciones adicionales basadas en el estado del toggle
    }
  }

  useEffect(() => {
    if (ordenProduccion) {
      const productoActual = recuperarDatosTemporales()
      //console.log(productoActual)

      if (productoActual) {
        productoActual[0].value = ordenProduccion.idParte
        productoActual[0].defaultValue = ordenProduccion.idParte
        const mappedProductoActual = mapColumnDescriptors(
          ParteLaminacion,
          productoActual,
          ["value", "defaultValue"]
        )

        const indexedProduct = incrementarIndiceProductos(
          ordenProduccion.ordenesProduccion
        )
        setDatosColumna(mappedProductoActual)
        updateOrdenProduccion(ordenProduccion)
        setListaProductosOrdenReciente(indexedProduct)
      } else {
        ParteLaminacion[0].value = ordenProduccion.idParte
        ParteLaminacion[0].defaultValue = ordenProduccion.idParte
        const mappedProductoActual = mapColumnDescriptors(
          ParteLaminacion,
          ParteLaminacion,
          ["value", "defaultValue"]
        )

        const indexedProduct = incrementarIndiceProductos(
          ordenProduccion.ordenesProduccion
        )
        setDatosColumna(mappedProductoActual)
        updateOrdenProduccion(ordenProduccion)
        setListaProductosOrdenReciente(indexedProduct)
      }
    }
    
  }, [ordenProduccion])

  useEffect(() => {
    const currentOrder = getCurrentOrderProduccion()

    if (currentOrder !== null) {
      setOrdenProduccion(currentOrder)
      ParteLaminacion[0].value = currentOrder.idParte
      ParteLaminacion[0].defaultValue = currentOrder.idParte
      setDatosColumna(ParteLaminacion)
      updateOrdenProduccion(currentOrder)
    }
  }, [])

  useEffect(() => {
    //console.log(listaProductosOrdenReciente)
  }, [listaProductosOrdenReciente])

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
      {editMode ? (
        <ListInputsCard
          columns={datosColumna}
          rowIndex={0}
          onInputChange={handleInputChange}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <>
          <div className="mt-3">
            <ListInputsCard
              columns={datosColumna}
              rowIndex={0}
              onInputChange={handleInputChange}
              onButtonClick={handleButtonClick}
            />
          </div>
          <div className="flex mt-4 items-center gap-4">
            <div className="w-1/7">
              {
                <InputTextFilterComponent
                  idInput={"byWords"}
                  activeButton={false}
                  activeSearchIcon={true}
                  isLabelVisible={true}
                  typeFill={"search"}
                  style={
                    "block w-32 p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  placeHolder={"write to search..."}
                  onChange={handleInputTextChange}
                  onClick={handleInputTextClick}
                  onFilter={handleFilterChange}
                />
              }
            </div>
            <div className="w-1/7">
              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Propiedad
                </label>
                <div className="relative">
                  <SelectComponent
                    optionsSelect={listadoTitulosProducto}
                    value={selectPropiedades} // valor actual seleccionado
                    defaultValue={listadoTitulosProducto[0]} // valor por defecto mostrado
                    selectClassName={"mt-4 mb-4 w-1/4"}
                    idSelected={"selectPropiedades"} // identificador para el select, útil si manejas múltiples selects
                    onSeleccion={handleSelection} // callback para manejar la selección
                    onFilter={handleFilter} // opcional: callback para manejar el filtrado
                  />
                </div>
              </div>
            </div>
            <div className="w-1/7">
              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Propiedad
                </label>
                <div className="relative">
                  <ToggleComponent
                    idToggle={"orden01"}
                    valueProp={ordenData ? ordenData : true}
                    onChange={handleToggleChange}
                    trueText="asc"
                    falseText="desc"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!editMode &&
        listaProductosOrdenReciente &&
        listaProductosOrdenReciente.length > 0 && (
          <div className="mb-10 mt-4">
            {ordenProduccion && (
              <CustomTable
                columns={HeadersProducto}
                dataColumn={parteProducto}
                data={listaProductosOrdenReciente}
                onInputChange={handleInputChange}
                onButtonClick={handleButtonClick}
              />
            )}
          </div>
        )}
    </form>
  )
}

export default OrdenProducionPage
