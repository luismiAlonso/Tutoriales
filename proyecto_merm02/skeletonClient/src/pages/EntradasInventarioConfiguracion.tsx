import React, { useEffect, useState } from "react"
import { useInventarioData } from "../customHook/useInventarioData"
import SelectComponent from "../components/selectComponent/SelectComponent"
import HybridSelect from "../components/hybridSelectComponent/hybridSelectComponent"
import CustomButton from "../components/button/ButtonComponent"
import { useNavigate } from "react-router-dom" // Importa useNavigate


function EntradasInventarioConfiguracion() {


  const listadoGestor = ["Paco", "David", "Luismi"]
  const listadoNaves = ["Mok", "otra1"]


  const [gestorSeleccionado, setGestorSeleccionado] = useState(listadoGestor[0])
  const [naveSeleccionada, setNaveSeleccionada] = useState(listadoNaves[0])
  const navigate = useNavigate() // Obtén la función navigate

  const { cargarDatosNuevoInventario } = useInventarioData()

  const handleChangeGestor = (nuevoGestor: string) => {
    console.log(nuevoGestor)
    setGestorSeleccionado(nuevoGestor)
  }

  const handleChangeNave = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setNaveSeleccionada(event.target.value)
  }

  const handleClick = () => {
    cargarDatosNuevoInventario(gestorSeleccionado, naveSeleccionada)
    navigate("/EntradasInventarioPage")
  }

  const handleSelectNave = () => {}

  useEffect(() => {}, [gestorSeleccionado, naveSeleccionada])

  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>CONFIGURA INVENTARIO</h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-start">
        <div className="md:mr-4 mb-4 md:mb-0">
          <label>Personal</label>
          <HybridSelect
            options={listadoGestor}
            defaultValue={gestorSeleccionado}
            value={gestorSeleccionado}
            onChange={handleChangeGestor}
          />
        </div>
        <div>
          <label>Nave</label>
          <SelectComponent
            selectClassName=""
            idSelected={"Nave"}
            value={naveSeleccionada}
            defaultValue={naveSeleccionada}
            optionsSelect={listadoNaves}
            onChange={handleChangeNave}
            onSeleccion={handleSelectNave}
          />
        </div>
        <div className="m-4">
          <label className="invisible">confirmar</label>
          <CustomButton
            buttonText={"Confirmar"}
            className="mt-4 md:mt-0 clase-personalizada"
            onClick={(e) => {
              e.preventDefault()
              handleClick()
            }}
          />
        </div>
      </div>
    </form>
  )
}

export default EntradasInventarioConfiguracion
