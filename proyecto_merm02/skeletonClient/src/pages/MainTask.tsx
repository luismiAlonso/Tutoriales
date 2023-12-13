import React from "react"
import CardTask from "../components/CardTask"
import BackButton from "../components/backButtonComponent/BackButtonComponent"

function MainTask() {
  const listTaskCards = [
    {
      titulo: "INVENTARIO",
      descripcion: "Gestion de inventario",
      link: "/MainInventario"
    },
    {
      titulo: "PRODUCION",
      descripcion:
        "creamos lineas de producto y agregamos al parte de produccion",
      link: "/Produccion"
    },
    { titulo: "oiidd", descripcion: "jdjdkd", link: "/produccion_plancha" }
  ]

  return (
    <form className="text-white">
      <div className="bg-zinc-700 p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex-grow text-left">
          <h2>GESTION DE TAREAS</h2>
        </div>
       
      </div>

      <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {
          listTaskCards.map((card, index) => (
            <CardTask
              key={index}
              titulo={card.titulo}
              descripcion={card.descripcion}
              link={card.link}
            />
          ))
          }
        </div>
      </div>
    </form>
  )
}

export default MainTask
