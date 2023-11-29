import React, { useEffect, useState } from "react"
import CustomTable from "../components/ListadosTablas/CustomTable"
import { HeadersParteLaminacion } from "../models/HeadersParteLaminacion"
import { ParteLaminacionProducto } from "../models/ParteLaminacionProducto"
import ToggleComponent from "../components/toggle/ToggleComponent"
import InputTextFilterComponent from "../components/inputTextFilterComponent/InputTextFilterComponet"
import SelectComponent from "../components/selectComponent/SelectComponent"
import useListadosPartesManager from "../customHook/useListadosPartesManager"
import { useOrdenProductionStore } from "../contextStore/useOrdenProductionStore"
import ListInputsCard from "../components/ListInputComponent/ListInputsCard"
import InfiniteScroll from "react-infinite-scroll-component"
import useInfiniteLoader from "../components/InfiniteLoaderComponent/useInfiniteLoader"
import { Datepicker } from "flowbite-react"

// Ejemplo en un archivo principal de React

function ListarParteProduccion() {
  const {
    listadoTitulosPropiedades,
    selectPropiedades,
    ordenData,
    listaPartesLaminacion,
    selectedStartDate,
    selectedEndDate,
    currentPage, 
    itemsPerPage,
    loadedData,
    editMode,
    datosLineaMod,
    setDatosLineaMod,
    setEditMode,
    setLoadedData,
    loadMoreData,
    calculateItemToDisplay,
    setListaPartesLaminacion,
    changeSelectedEndDate,
    changeSelectedStartDate,
    handleToggleChange,
    cargarDatosListaPartesProduccion,
    handleFilter,
    handleSelection,
    handleInputChange,
    handleButtonClick,
    handleFilterChange,
    handleInputTextClick,
    handleInputTextChange
  } = useListadosPartesManager()

  const { listaTotalProduccion, setListaTotalProduccion } =
    useOrdenProductionStore()

  useEffect(() => {
    cargarDatosListaPartesProduccion()
    //console.log(listaTotalProduccion)
  }, [])

  return (
    <div>
      <div className="flex mt-4 items-center gap-4 mb-5">
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
        <div date-rangepicker className="flex items-center">
          <div className="relative">
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Desde
            </label>
            <Datepicker
              language="ES"
              formTarget="dd/MM/yyyy"
              labelClearButton="Limpar"
              name="selectedStartDate"
              onSelectedDateChanged={changeSelectedStartDate}
            />
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Hasta
            </label>
            <Datepicker
              language="ES"
              formTarget="dd/MM/yyyy"
              labelClearButton="Limpar"
              name="selectedEndDate"
              onSelectedDateChanged={changeSelectedEndDate}
            />
          </div>
        </div>
        <div className="w-1/7">
          <div>
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Orden
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
      {
      editMode && (
        <ListInputsCard
          columns={datosLineaMod}
          rowIndex={0}
          onInputChange={handleInputChange}
          onButtonClick={handleButtonClick}
        />)
      }
      {!editMode && loadedData && loadedData.length > 0 && (
        <InfiniteScroll
          dataLength={currentPage * itemsPerPage} //This is important field to render the next data
          next={loadMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <CustomTable
            columns={HeadersParteLaminacion}
            dataColumn={ParteLaminacionProducto}
            data={loadedData}
            onInputChange={handleInputChange}
            onButtonClick={handleButtonClick}
          />
        </InfiniteScroll>
      )}
    </div>
  )
}

export default ListarParteProduccion
