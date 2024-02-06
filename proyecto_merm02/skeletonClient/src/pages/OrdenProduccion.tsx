import { useEffect } from "react"
import ListInputsCard from "../components/ListInputComponent/ListInputsCard"
import CustomTable from "../components/ListadosTablas/CustomTable"
import { parteProducto } from "../models/ParteProducto"
import useOrdenProduccionManager from "../customHook/useOrdenProduccionManager"
import { HeadersProducto } from "../models/HeadersProducto"
import InfiniteScroll from "react-infinite-scroll-component"
import ModalComponent from "../components/modal/ModalComponent"
import ListadoDataResponsive from "../components/listadoDataResponsiveComponent/ListadoDataResponsive"
import ButtonComponent from "../components/button/ButtonComponent"
import BackButton from "../components/backButtonComponent/BackButtonComponent"
import FilterComponent from "../components/filtersComponent/filtersComponent"
import { getDatosLocalStorage } from "../utilidades/util"

//import {Tabla} from "../components/ListadosTablas/Tabla"
function OrdenProduccion() {
  const {
    datosColumna,
    datosLineaMod,
    ordenProduccion,
    editMode,
    currentPage,
    itemsPerPage,
    loadedData,
    //listaProductosOrdenReciente,
    isOpen,
    ResumenProducto,
    resumeProduct,
    plantillaFiltersOrdenProduccion,
    visibleList,
    handleCloseModal,
    handleOpenModal,
    loadMoreData,
    actualizarDatos,
    handleInputChange,
    handleButtonClick,
    handleDeleteProducto
  } = useOrdenProduccionManager()

  const preOrden = getDatosLocalStorage("preOrden") //sustituir
  
  useEffect(() => {
    actualizarDatos()
    console.log("test",loadedData)
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
        <div className="ml-3">
          <BackButton />
        </div>
      </div>
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="flex-1">
          <span className="font-bold">
          OP nº {preOrden && preOrden.idParte ? preOrden.idParte : "1"}
          </span>
        </div>
        <div className="flex-1">
          <span className="font-bold">
            Tipo: {preOrden && preOrden.TipoGoma ? preOrden.TipoGoma : ""}
          </span>
        </div>
        <div className="flex-1">
          <span className="font-bold">
            Bamburi: {preOrden && preOrden.bamburi ? preOrden.bamburi : ""}
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
          <FilterComponent filters={plantillaFiltersOrdenProduccion} />
          <div className="mt-3">
            <ListInputsCard
              columns={datosColumna}
              rowIndex={0}
              onInputChange={handleInputChange}
              onButtonClick={handleButtonClick}
            />
          </div>             
        </>
      )}
      {!editMode /*&& loadedData && loadedData.length > 0*/ && (
        <div className="mb-10 mt-4">
          {ordenProduccion && visibleList && (
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
              <CustomTable
                columns={HeadersProducto}
                dataColumn={parteProducto}
                data={loadedData}
                onInputChange={handleInputChange}
                onButtonClick={handleButtonClick}
              />
            </InfiniteScroll>
          )}
        </div>
      )}

      <ModalComponent
        title="¿DESEA ELIMINAR?"
        body={
          <ListadoDataResponsive
            data={[resumeProduct]}
            columns={ResumenProducto}
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
    </form>
  )
}

export default OrdenProduccion
