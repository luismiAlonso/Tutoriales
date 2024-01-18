import React, { useEffect } from "react"
import { obtenerFechaActual, obtenerHoraActual } from "../utilidades/dateUtil"
import BackButton from "../components/backButtonComponent/BackButtonComponent"
import { useInventarioManager } from "../customHook/useInventarioManager"
import FilterComponent from "../components/filtersComponent/filtersComponent"
import { HeaderProductoInventario } from "../models/HeaderProductoInventario"
import { PlantillaProductoInventario } from "../models/PlantillaProductoInventario"
import ListInputsCard from "../components/ListInputComponent/ListInputsCard"
import CustomTable from "../components/ListadosTablas/CustomTable"
import CustomFlexibleTable from "../components/ListadosTablas/CustomFlexibleTable"
import ModalComponent from "../components/modal/ModalComponent"
import InfiniteScroll from "react-infinite-scroll-component"
import ListadoDataResponsive from "../components/listadoDataResponsiveComponent/ListadoDataResponsive"
import ButtonComponent from "../components/button/ButtonComponent"

function ListadoInventario() {
  // cargarDatosNuevoInventario("/EntradasInventarioPage",seccion,naveSeleccionada)
  const {
    handleInputChange,
    handleButtonClick,
    loadMoreData,
    actualizaInvinterario,
    handleCloseModal,
    handleOpenModal,
    handleDeleteProducto,
    handleBackEditMod,
    mappeddProductosInventario,
    plantillaFiltersInventario,
    editMode,
    ResumenProductoInventario,
    resumeProduct,
    isOpen,
    currentPage,
    itemsPerPage,
    loadedData
  } = useInventarioManager()

  useEffect(() => {
    actualizaInvinterario()
  }, [loadedData])


  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>PRODUCTOS INVENTARIO</h2>
        </div>
        <div className="flex-grow text-right">
          {/*<span>{obtenerFechaActual() + " - " + obtenerHoraActual()}</span>*/}
        </div>
        <div className="ml-3">
          {!editMode ? (
            <BackButton />
          ) : (
            <BackButton onClick={handleBackEditMod} useCustomOnClick={true} />
          )}
        </div>
      </div>
        <div>
          {/*<div className="mt-3">
            <ListInputsCard
              columns={datosEntrada}
              rowIndex={0}
              onInputChange={handleInputChange}
              onButtonClick={handleButtonClick}
            />
          </div>*/}
          {<FilterComponent filters={plantillaFiltersInventario} />}
          <div className="mb-10 mt-4">
            <InfiniteScroll
              dataLength={currentPage * itemsPerPage} //This is important field to render the next data
              next={loadMoreData}
              hasMore={true}
              loader={<h4></h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {
              /*<CustomTable
              columns={HeaderProductoInventario}
              dataColumn={PlantillaProductoInventario}
              data={loadedData}
              onInputChange={handleInputChange}
              onButtonClick={handleButtonClick}
            />*/}
              {mappeddProductosInventario && (
                <CustomFlexibleTable
                  columns={HeaderProductoInventario}
                  dataColumn={mappeddProductosInventario}
                  data={loadedData}
                  onInputChange={handleInputChange}
                  onButtonClick={handleButtonClick}
                />
              )}
            </InfiniteScroll>
          </div>
        </div>
      
      {
        <ModalComponent
          title="¿DESEA ELIMINAR?"
          body={
            <ListadoDataResponsive
              data={[resumeProduct]}
              columns={ResumenProductoInventario}
            />
          }
          isOpen={isOpen}
          closeModal={handleCloseModal}
          openModal={handleOpenModal}
          footer={
            <ButtonComponent
              buttonText="Aceptar"
              idInput="btDelete"
              rowIndex={1}
              onClick={handleDeleteProducto}
            />
          }
        />
      }
    </form>
  )
}

export default ListadoInventario
