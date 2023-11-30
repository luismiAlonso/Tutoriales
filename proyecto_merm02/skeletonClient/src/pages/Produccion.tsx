import React, { useEffect, useState, useCallback } from "react"
import SelectComponent from "../components/selectComponent/SelectComponent"
import { useOrdenProduccionData } from "../customHook/useOrdenProduccionData"
import { obtenerFechaActual } from "../utilidades/dateUtil"
import { useNavigate } from "react-router-dom" // Importa useNavigate

function Produccion() {

  const opcionesProduccion = ["EVA", "GOMA"]
  const { cargarDatosOrdenProduccion } = useOrdenProduccionData()
  const [gomaSeleccionada, setGoma] = useState<string>("")
  const navigate = useNavigate() // Obtén la función navigate

  const handleSeleccion = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // Acciones a realizar cuando el usuario selecciona una opción
      const selectedGoma = e.target.value

      if (selectedGoma) {
        setGoma(selectedGoma)
      }

    },
    []
  )

  const handleFilter = (filterValue: string) => {
    // Acciones a realizar para filtrar basado en el valor seleccionado
    console.log("Filtro:", filterValue)
    if(filterValue){
      setGoma(filterValue)
    }
  }

  const crearOrdenProducion = (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const fecha = obtenerFechaActual()
    if (gomaSeleccionada) {
      cargarDatosOrdenProduccion(fecha, gomaSeleccionada)
    } else {
      cargarDatosOrdenProduccion(fecha, "GOMA")
    }

    navigate("/ordenProduccion")
  }

  const consultarOrdenesProducion = () => {
    navigate("/ListarParteProduccion")
  }

  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>CREAR PARTE DE LAMINACION</h2>
        </div>
      </div>

      <div className="flex flex-col h-screen items-center">
        <div className="flex-screem justify-center items-start">
          <div className="flex items-center space-x-4 p-3">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={crearOrdenProducion}
            >
              CREAR ORDEN DE PRODUCCION
            </button>
            <SelectComponent
              optionsSelect={opcionesProduccion}
              value={"GOMA"}
              selectClassName=""
              defaultValue={"GOMA"}
              idSelected={"filtroGoma"}
              onSeleccion={() => {
                handleSeleccion
              }}
              onFilter={handleFilter} // Prop opcional
            />
          </div>
          {/*<div className="p-3">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          EDITAR ORDEN EXISTENTE
        </button>
      </div>*/}
          <div className="p-3">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={consultarOrdenesProducion}
            >
              CONSULTAR ORDEN EXISTE
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Produccion
