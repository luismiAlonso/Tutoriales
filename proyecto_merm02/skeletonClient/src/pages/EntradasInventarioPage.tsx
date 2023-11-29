import React from "react"
import { obtenerFechaActual, obtenerHoraActual } from "../utilidades/dateUtil"


function EntradasInventarioPage() {
  
  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>ENTRADA PRODUCTO</h2>
        </div>
        <div className="flex-grow text-right">
          <span>{obtenerFechaActual()+" - "+obtenerHoraActual()}</span>
        </div>
      </div>

      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">

      </div>
    </form>
  )
}

export default EntradasInventarioPage
