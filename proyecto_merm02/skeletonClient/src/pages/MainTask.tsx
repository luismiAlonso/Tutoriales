import React from "react"
import Card from "../interfaces/Card"
import CardTask from "../components/CardTask"

function MainTask() {
  const listTaskCards = [
    { titulo: "dhdhdf", descripcion: "hdhdhdhdhd", link: "/" },
    { titulo: "PRODUCION", descripcion: "creamos lineas de producto y agregamos al parte de produccion", link: "/Produccion" },
    { titulo: "oiidd", descripcion: "jdjdkd", link: "/produccion_plancha" }
  ]

  return (
    <div>
      <h1>MAIN TASK</h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
        {listTaskCards.map((card,index) => (
          <CardTask key ={index}
            titulo={card.titulo}
            descripcion={card.descripcion}
            link={card.link}
          />
        ))}
      </div>
    </div>
  )
}

export default MainTask
