import { useEffect } from "react"
import { useInventarioListadoManager } from "../customHook/useInventarioListadoManager"
import BackButton from "../components/backButtonComponent/BackButtonComponent"
import FilterComponent from "../components/filtersComponent/filtersComponent"
import ListInputsCard from "../components/ListInputComponent/ListInputsCard"
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
    handleCloseModal,
    handleOpenModal,
    handleDeleteProducto,
    handleBackEditMod,
    actualizaAllinventarios,
    datosModificacion,
    mappedStyleTable,
    mappeddProductosInventario,
    plantillaFiltersInventario,
    plantillaProductoInventarioListado,
    editMode,
    ResumenProductoInventario,
    resumeProduct,
    isOpen,
    currentPage,
    itemsPerPage,
    loadedData
  } = useInventarioListadoManager()

  useEffect(() => {
    
    actualizaAllinventarios()
    //console.log(plantillaProductoInventarioListado.length,loadedData)
  }, [])

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
      {
      editMode ? (
        <div className="mt-3">
        <ListInputsCard
          columns={datosModificacion}
          rowIndex={0}
          onInputChange={handleInputChange}
          onButtonClick={handleButtonClick}
        />
    </div>
      ):(
        <>
        <FilterComponent filters={plantillaFiltersInventario} />
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
            {/*<CustomTable
              columns={HeaderProductoInventario}
              dataColumn={PlantillaProductoInventario}
              data={loadedData}
              onInputChange={handleInputChange}
              onButtonClick={handleButtonClick}
            />*/}
            {mappeddProductosInventario && mappedStyleTable && (
              <CustomFlexibleTable
                tableStyle={mappedStyleTable}
                columns={plantillaProductoInventarioListado}
                dataColumn={mappeddProductosInventario}
                data={loadedData}
                onInputChange={handleInputChange}
                onButtonClick={handleButtonClick}
              />
            )}

          </InfiniteScroll>
        </div>
        </>
      )
      }
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
