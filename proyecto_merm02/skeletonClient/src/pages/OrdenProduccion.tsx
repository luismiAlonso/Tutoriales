import React, { useEffect } from "react"
import ListInputsCard from "../components/ListInputComponent/ListInputsCard"
import CustomTable from "../components/ListadosTablas/CustomTable"
import SelectComponent from "../components/selectComponent/SelectComponent"
import { parteProducto } from "../models/ParteProducto"
import { useOrdenProduccionData } from "../customHook/useOrdenProduccionData"
import useOrdenProduccionManager from "../customHook/useOrdenProduccionManager"
import { HeadersProducto } from "../models/HeadersProducto"
import ToggleComponent from "../components/toggle/ToggleComponent"
import InputTextFilterComponent from "../components/inputTextFilterComponent/InputTextFilterComponet"

//import {Tabla} from "../components/ListadosTablas/Tabla"
function OrdenProduccion() {

  const {
    datosColumna,
    datosLineaMod,
    ordenProduccion,
    ordenData,
    editMode,
    listaProductosOrdenReciente,
    listadoTitulosPropiedades,
    selectPropiedades,
    configurarOrdenProduccion,
    actualizarDatos,
    handleSelection,
    handleFilter,
    handleInputTextChange,
    handleInputTextClick,
    handleFilterChange,
    handleToggleChange,
    handleInputChange,
    handleButtonClick
  } = useOrdenProduccionManager()

  const { getCurrentOrderProduccion, recuperarDatosTemporales } =
    useOrdenProduccionData()

  useEffect(() => {

    if (!ordenProduccion) return
    const productoActual = recuperarDatosTemporales()
    if (productoActual) {
      actualizarDatos(productoActual, ordenProduccion)
    }

  }, [ordenProduccion])

  useEffect(() => {
    
    const currentOrder = getCurrentOrderProduccion()
    currentOrder.then((result)=>{
      if(result){
        configurarOrdenProduccion(result)
      }
    })

  }, [])

  /*useEffect(()=>{
    //console.log(datosColumna)
  },[handleInputChange])*/

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
        <div className="flex-1">
          <span className="font-bold">
            Tipo {ordenProduccion ? ordenProduccion.TipoGoma : ""}
          </span>
        </div>
      </div>
      {editMode ? (
        <ListInputsCard
          columns={datosLineaMod}
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
                    optionsSelect={listadoTitulosPropiedades}
                    value={selectPropiedades} // valor actual seleccionado
                    defaultValue={listadoTitulosPropiedades[0]} // valor por defecto mostrado
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

export default OrdenProduccion
