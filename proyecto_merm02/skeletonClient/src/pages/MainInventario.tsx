import React from "react"
import CustomButton from "../components/button/ButtonComponent"
import { useNavigate } from "react-router-dom" // Importa useNavigate
import BackButton from "../components/backButtonComponent/BackButtonComponent" 

function MainInventario() {

  const navigate = useNavigate() // Obtén la función navigate

  const handleButtonEntradas = () => {
    navigate("/EntradasInventarioConfiguracion")
  }

  const handleButtonListarInventario = () =>{
    navigate("/ListadoInventario")
  }

  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>GESTION INVENTARIO ENTRADAS Y SALIDAS</h2>
        </div>
        <div>
          <BackButton />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-zinc-700 shadow-lg rounded-lg p-6 w-full">
          <div className="text-center text-gray-900 text-xl mb-4"></div>
          <div className="flex flex-col space-y-4 items-center">
            <CustomButton
              buttonText={"ENTRADAS"} // Aquí puedes cambiar "Mi Botón" por el texto que desees
              className="clase-personalizada" // Aquí puedes cambiar o agregar más clases
              onClick={(e) => {
                e.preventDefault()
                handleButtonEntradas()
              }}
            />
            <CustomButton
              buttonText={"VER INVENTARIO"} // Aquí puedes cambiar "Mi Botón" por el texto que desees
              className="clase-personalizada" // Aquí puedes cambiar o agregar más clases
              onClick={(e) => {
                e.preventDefault()
                handleButtonListarInventario()
              }}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default MainInventario
