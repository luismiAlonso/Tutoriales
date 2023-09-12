import { useEffect } from "react"
import Section from "./Section"
import { status } from "../modelos/status"

function ListTasks() {

  return (
    <div className="flex gap-16">
      {Object.entries(status).map(([clave, valor], index) => (
        <Section key={index} propStatus={valor} />
      ))}
    </div>
  )
}

export default ListTasks
