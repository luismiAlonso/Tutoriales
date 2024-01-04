import React, { useEffect } from "react"
import { obtenerFechaActual, obtenerHoraActual } from "../utilidades/dateUtil"
import BackButton from "../components/backButtonComponent/BackButtonComponent"
import { useInventarioManager } from "../customHook/useInventarioManager"
import FilterComponent from "../components/filtersComponent/filtersComponent"
import ListInputsCard from "../components/ListInputComponent/ListInputsCard"

function EntradasInventarioPage() {
  // cargarDatosNuevoInventario("/EntradasInventarioPage",seccion,naveSeleccionada)
  const { handleInputChange, handleButtonClick, crearNuevoInventario,productoInicial} = useInventarioManager()

  useEffect(() => {
  }, [])

  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>ENTRADA PRODUCTO</h2>
        </div>
        <div className="flex-grow text-right">
         {/*<span>{obtenerFechaActual() + " - " + obtenerHoraActual()}</span>*/}
        </div>
        <div className="ml-3">
          <BackButton />
        </div>
      </div>
      <div className="p-4 rounded mb-6 flex justify-between items-center">
        {<ListInputsCard
          columns={productoInicial}
          rowIndex={0}
          onInputChange={handleInputChange}
          onButtonClick={handleButtonClick}
      />}
      {/*<FilterComponent filters={plantillaFiltersOrdenProduccion} />*/}
      </div>
    </form>
  )
}

export default EntradasInventarioPage
