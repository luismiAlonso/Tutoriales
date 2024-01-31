import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"
import { useState, useCallback } from "react"

const useColumnDescriptor = () => {
  const [columnDescriptors, setColumnDescriptors] = useState<
    ColumnDescriptor[]
  >([])

  const updateColumnDescriptor = (
    datosActuales: ColumnDescriptor[],
    id: string | number,
    valor: string | number,
    plantilla: ColumnDescriptor[]
  ) => {
    if (datosActuales !== null) {
      // Si los datos existen, busca el descriptor de columna específico por idInput
      const index = datosActuales.findIndex((columna) => columna.idInput === id)

      if (index !== -1) {
        // Si se encontró el descriptor de columna, actualiza su valor
        datosActuales[index] = {
          ...datosActuales[index],
          value: valor
        }
        // Luego guarda los datos actualizados de vuelta en localStorage
        //guardarDatosTemporales(datosActuales)
        return datosActuales
      } else {
        console.error(
          `No se encontró el descriptor de columna con idInput: ${id}`
        )
      }
    } else {
      // console.log(plantilla)
      // Si no hay datos en localStorage, busca en la plantilla
      const index = plantilla.findIndex((columna) => columna.idInput === id)

      if (index !== -1) {
        // Si se encontró el descriptor de columna en la plantilla, actualiza su valor
        plantilla[index] = {
          ...plantilla[index],
          value: valor
        }

        // Guarda los datos actualizados de vuelta en localStorage
        // guardarDatosTemporales(plantilla)
        return plantilla
      } else {
        console.error(
          `No se encontró el descriptor de columna con idInput: ${id}`
        )
        // Puedes descomentar la siguiente línea si deseas mostrar este mensaje
        // console.error("No hay datos en localStorage para actualizar.");
      }
    }
  }

  const setAttributesInColumnDescriptor = <T extends keyof ColumnDescriptor>(
    columnDescriptorRef: ColumnDescriptor[],
    targetIdInput: string,
    attributeNames: T[],
    newValues: ColumnDescriptor[T][]
  ): ColumnDescriptor[] => {
    
    if (attributeNames.length !== newValues.length) {
      throw new Error(
        "Los vectores attributeNames y newValues deben tener la misma longitud"
      )
    }

    return columnDescriptorRef.map((columnDescriptor) => {
      if (columnDescriptor.idInput === targetIdInput) {
        const updatedDescriptor = { ...columnDescriptor }

        attributeNames.forEach((attributeName, index) => {
          if (attributeName in columnDescriptor) {
            updatedDescriptor[attributeName] = newValues[index]
          }
        })

        return updatedDescriptor
      }
      return columnDescriptor
    })
  }

  const getValueOfAttributeFromColumnDescriptor = (
    attributeName: keyof ColumnDescriptor,
    descriptor: ColumnDescriptor
  ) => {
    return descriptor[attributeName]
  }

  return {
    columnDescriptors,
    updateColumnDescriptor,
    setAttributesInColumnDescriptor,
    getValueOfAttributeFromColumnDescriptor
  }
}

export default useColumnDescriptor
