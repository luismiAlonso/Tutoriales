import React, { useEffect, useState } from "react"
import { useInventarioManager } from "../customHook/useInventarioManager"
import SelectComponent from "../components/selectComponent/SelectComponent"
import HybridSelect from "../components/hybridSelectComponent/hybridSelectComponent"
import CustomButton from "../components/button/ButtonComponent"
import { useNavigate } from "react-router-dom" // Importa useNavigate
import BackButton from "../components/backButtonComponent/BackButtonComponent"

function EntradasInventarioConfiguracion() {
  const listadoSecciones = ["bamburi", "cortado01", "cortado02", "lacado"]
  const listadoNaves = ["Mok", "otra1"]

  const [seccion, setSeccion] = useState(listadoSecciones[0])
  const [naveSeleccionada, setNaveSeleccionada] = useState(listadoNaves[0])

  const { prepareDataInventarioEntradas } = useInventarioManager()

  const navigate =useNavigate()
  const handleChangeGestor = (seccion: string) => {
    //console.log(nuevoGestor)
    setSeccion(seccion)
  }

  const handleChangeNave = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setNaveSeleccionada(event.target.value)
  }

  const handleClick = () => {
    const url=`/EntradasInventarioPage/${seccion}/${naveSeleccionada}`
    prepareDataInventarioEntradas(url,seccion,naveSeleccionada)
    navigate(url)
  }

  const handleSelectNave = () => {}

  useEffect(() => {}, [listadoSecciones, naveSeleccionada])

  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>CONFIGURA INVENTARIO</h2>
        </div>
        <div>
          <BackButton />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-start">
        <div className="md:mr-4 mb-4 md:mb-0">
          <label>Seccion</label>
          <HybridSelect
            idInput="seccion"
            activeLabel={false}
            type="hybrid"
            options={listadoSecciones}
            defaultValue={seccion}
            value={seccion}
            onChange={handleChangeGestor}
          />
        </div>
        <div>
          <label>Almacen</label>
          <SelectComponent
            idInput="seccion"
            activeLabel={false}
            type="select"
            selectClassName=""
            idSelected={listadoNaves[0]}
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
