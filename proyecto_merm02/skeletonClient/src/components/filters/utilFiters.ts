
import {
  convertStringDateToDate,
  compararFechasAscendente,
  compararFechasDescendente,
  getIntervalDate
} from "../../utilidades/dateUtil"

export function sortData(
  data: any[],
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  // Llamar al método de ordenación correspondiente según el tipo de dato
  let copiaOrdenada: string[] = []
  try {
    if (!data || data.length === 0) {
      return copiaOrdenada
    }
    // Verificar el tipo de dato de la propiedad
    const primerElemento = data[0]
    let tipoDato: "string" | "number" | "date" | "especial" = "string"

    if (isNumber(primerElemento[propiedad])) {
      tipoDato = "number"
    } else if (isDate(primerElemento[propiedad])) {
      tipoDato = "date"
    } else {
      const resultParse = parseSpecialNumber(primerElemento[propiedad])
      if (
        resultParse &&
        typeof resultParse === "object" &&
        resultParse.numeric !== null
      ) {
        tipoDato = "especial"
      }
    }

    switch (tipoDato) {
      case "number":
        copiaOrdenada = ordenarNumeros(data, propiedad, orden)
        break
      case "date":
        copiaOrdenada = ordenarFechas(data, propiedad, orden)
        break
      case "especial":
        copiaOrdenada = ordenarNumerosSpeciales(data, propiedad, orden)
        break
      default:
        copiaOrdenada = ordenarCadenas(data, propiedad, orden)
    }
  } catch (error) {
    console.error(error)
    return data
  }

  return copiaOrdenada
}

export const filterDataInRange = (
  data: any[],
  from: any,
  to: any,
  property: string
): any[] => {
  // Determinar el tipo de datos
  let dataType: "string" | "number" | "date" | "especial" = "string"
  const primerElemento = data[0]
  if (isNumber(primerElemento[property])) {
    dataType = "number"
  } else if (isDate(primerElemento[property])) {
    dataType = "date"
  } else {
    const resultParse = parseSpecialNumber(primerElemento[property])
    if (
      resultParse &&
      typeof resultParse === "object" &&
      resultParse.numeric !== null
    ) {
      dataType = "especial"
    }
  }
  // Aplicar el filtro adecuado basado en el tipo de datos
  return data.filter((item: any) => {
    const value = item[property]

    switch (dataType) {
      case "string":
        return filterStringRange(value, from, to)
      case "number":
        return filterNumberRange(value, from, to)
      case "date":
        return filterDateRange(new Date(value), new Date(from), new Date(to))
      case "especial":
        // Aplicar lógica de filtrado para tipo de datos especial
        break
      default:
        return false
    }
  })
}

export function sortDataByInputFill(
  data: any[],
  palabra: string,
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  // Llamar al método de ordenación correspondiente según el tipo de dato
  let copiaOrdenada: string[] = []

  try {

    console.log("palabra a buscar: ",palabra)
    if (data === undefined || data.length === 0) {
      return copiaOrdenada
    }
    // Verificar el tipo de dato de la propiedad
    const primerElemento = data[0]

    let tipoDato: "string" | "number" | "date"

    if (isNumber(primerElemento[propiedad])) {
      tipoDato = "number"
    } else if (isDate(primerElemento[propiedad])) {
      console.log(primerElemento[propiedad])
      tipoDato = "date"
    } else {
      tipoDato = "string"
    }

    switch (tipoDato) {
      case "number":
        copiaOrdenada = filtrarYOrdenarNumeros(data, palabra, propiedad, orden)
        break
      case "date":
        //copiaOrdenada = filtrarYOrdenarFechas(data, palabra, propiedad, orden)
        copiaOrdenada = filtrarYOrdenarCadenas(data, palabra, propiedad, orden)
        break
      default:
        // console.log(propiedad)
        copiaOrdenada = filtrarYOrdenarCadenas(data, palabra, propiedad, orden)
    }
  } catch (error) {
    console.log(error)
    return data
  }

  return copiaOrdenada
}

function ordenarNumerosSpeciales(
  data: any[],
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  try {
    const sortedData = [...data]
    sortedData.sort((a, b) => {
      const parsedA = parseSpecialNumber(a[propiedad])
      const parsedB = parseSpecialNumber(b[propiedad])

      // Trata null como 0, o decide cómo manejar este caso.
      const numA = parsedA.numeric ?? 0
      const numB = parsedB.numeric ?? 0

      if (isNaN(numA) && isNaN(numB)) {
        return 0
      } else if (isNaN(numA)) {
        return orden === "asc" ? -1 : 1
      } else if (isNaN(numB)) {
        return orden === "asc" ? 1 : -1
      } else {
        return orden === "asc" ? numA - numB : numB - numA
      }
    })

    return sortedData.map((item) => {
      const parsed = parseSpecialNumber(item[propiedad])
      item[propiedad] = `${parsed.numeric ?? "N/A"} ${parsed.grammatical}`
      return item
    })
  } catch (error) {
    console.error(error)
    return data
  }
}

function ordenarCadenas(
  data: any[],
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  try {
    const sortedData = [...data]
    sortedData.sort((a, b) => {
      const valorA = a[propiedad]
      const valorB = b[propiedad]

      // Verificar si los valores son strings válidos
      if (typeof valorA === "string" && typeof valorB === "string") {
        if (orden === "asc") {
          return valorA.localeCompare(valorB)
        } else {
          return valorB.localeCompare(valorA)
        }
      } else if (typeof valorA === "string") {
        // Si valorB no es un string válido, se considera valorA "mayor"
        return orden === "asc" ? 1 : -1
      } else if (typeof valorB === "string") {
        // Si valorA no es un string válido, se considera valorB "mayor"
        return orden === "asc" ? -1 : 1
      } else {
        // Ambos valores no son strings válidos, se consideran iguales
        return 0
      }
    })

    return sortedData
  } catch (error) {
    console.error(error)
    return data
  }
}

function ordenarNumeros(
  data: any[],
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  try {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
      const numA = parseFloat(a[propiedad])
      const numB = parseFloat(b[propiedad])

      if (isNaN(numA) && isNaN(numB)) {
        return 0
      } else if (isNaN(numA)) {
        return orden === "asc" ? -1 : 1
      } else if (isNaN(numB)) {
        return orden === "asc" ? 1 : -1
      } else {
        return orden === "asc" ? numA - numB : numB - numA
      }
    })

    return sortedData
  } catch (error) {
    console.error(error)
    return data
  }
}

function ordenarFechas(
  data: any[],
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  try {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
      const dateA = new Date(a[propiedad])
      const dateB = new Date(b[propiedad])

      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
        return 0
      } else if (isNaN(dateA.getTime())) {
        return orden === "asc" ? -1 : 1
      } else if (isNaN(dateB.getTime())) {
        return orden === "asc" ? 1 : -1
      } else {
        return orden === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      }
    })

    return sortedData
  } catch (error) {
    console.error(error)
    return data
  }
}



/*
Posible Opcion para ordenar fechas con formato especial
function ordenarFechas(
  data: any[],
  propiedad: string,
  orden: "asc" | "desc"
): any[] {
  try {
    const sortedData = [...data]
    const formatoFecha = "dd/MM/yyyy HH:mm:ss"

    sortedData.sort((a, b) => {
      const dateA = parse(a[propiedad], formatoFecha, new Date())
      const dateB = parse(b[propiedad], formatoFecha, new Date())

      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
        return 0
      } else if (isNaN(dateA.getTime())) {
        return orden === "asc" ? -1 : 1
      } else if (isNaN(dateB.getTime())) {
        return orden === "asc" ? 1 : -1
      } else {
        return orden === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      }
    })

    return sortedData
  } catch (error) {
    console.error(error)
    return data
  }
}
*/

function filtrarYOrdenarCadenas(
  data: any[],
  palabra: string,
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  try {
    const filteredData = data
      .filter((item) => {
        console.log(item[propiedad], propiedad)
        const itemProperty = String(item[propiedad]).toLowerCase()
        const containsWord = itemProperty.includes(palabra.toLowerCase())
        return item[propiedad] != null && containsWord
      })
      .sort((a, b) =>
        orden === "asc"
          ? String(a[propiedad] || "").localeCompare(String(b[propiedad] || ""))
          : String(b[propiedad] || "").localeCompare(String(a[propiedad] || ""))
      )

    return filteredData
  } catch (error) {
    console.log(error)
    return data
  }
}

function filtrarYOrdenarNumeros(
  data: any[],
  palabra: string,
  propiedad: string,
  orden: "asc" | "desc"
): string[] {
  try {
    return data
      .filter((item) => {
        if (item[propiedad] == null) {
          return false
        }

        const itemStr = item[propiedad].toString()

        // Si la palabra comienza con "0", busca una coincidencia exacta
        if (palabra.startsWith("0")) {
          return itemStr === palabra.substring(1)
        }

        // Si no, busca si la cadena contiene esos dígitos en ese orden
        return itemStr.includes(palabra)
      })
      .sort((a, b) =>
        orden === "asc"
          ? (parseFloat(a[propiedad]) || 0) - (parseFloat(b[propiedad]) || 0)
          : (parseFloat(b[propiedad]) || 0) - (parseFloat(a[propiedad]) || 0)
      )
  } catch (error) {
    //console.log("error???",error)
    return data
  }
}

export const sortDateRange = (
  data: any[],
  from: Date,
  to: Date,
  nameProperty:string,
  orden: "asc" | "desc"
): any[] => {

  const filteredDataDates = data.filter((objeto) => {
    // Asegúrate de que el objeto tiene una propiedad 'fecha' y es una cadena válida
    const fecha = objeto[nameProperty]

    if (!fecha) {
      return false
    }
    // Convertir la cadena de fecha del objeto en un objeto Date
    const fechaObjeto = convertStringDateToDate(fecha)

    if(fechaObjeto){
      const filterDates = getIntervalDate(fechaObjeto, to, from)
      return filterDates
    }
    //Verificar si la fecha del objeto está dentro del intervalo
    
    return null
  })
  
 /* console.log(
    convertDateToFormatString(from, "dd/MM/yyyy"),
    convertDateToFormatString(to, "dd/MM/yyyy")
  )*/

  return filteredDataDates.sort((a, b) => {
    const dateA = convertStringDateToDate(a[nameProperty])
    const dateB = convertStringDateToDate(b[nameProperty])
    
    /*if (dateA && dateB) {
      return dateA.getTime() - dateB.getTime()
    } else {
      return 0 // En caso de que alguna fecha sea nula, no altera el orden
    }*/

    return orden === "asc"
      ? compararFechasAscendente(dateA, dateB)
      : compararFechasDescendente(dateA, dateB)
    
  })
}

export const sortDataByDateRange = (
  data: any[],
  propiedad: string,
  from: Date,
  to: Date,
  orden: "asc" | "desc"
): any[] => {
  
  try {
    // Filtrar primero por rango de fechas
    const filteredData = filterDataInRange(data, from, to, propiedad)
    //Luego, ordenar los datos filtrados
    return filteredData.sort((a, b) => {
      const dateA = new Date(a[propiedad])
      const dateB = new Date(b[propiedad])

      return orden === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error("Error al ordenar los datos: ", error)
    return data
  }
}

/*
export const sortDateRange = (
  data: any[],
  from: Date,
  to: Date,
  orden: "asc" | "desc"
): any[] => {
  if (!(from instanceof Date && to instanceof Date)) {
    console.error("Los parámetros 'from' y 'to' deben ser fechas válidas")
    return data
  }
  
  const filteredData = data.filter((objeto) => {
    if (!objeto.fecha) {
      return false
    }

    const fechaObjeto = convertStringDateToDate(objeto.fecha)
    //console.log("fechaObjeto: "+fechaObjeto,"from: "+from,"to: "+fechaObjeto)
    // Verifica si la fecha del objeto está dentro del intervalo
    if (fechaObjeto) return fechaObjeto >= from && fechaObjeto <= to
  })

  // Ordenar los datos filtrados
  return filteredData.sort((a, b) => {
    const dateA = convertStringDateToDate(a.fecha)
    const dateB = convertStringDateToDate(b.fecha)

    if (dateA !== null && dateB !== null) {
   
      const timeA = dateA.getTime()
      const timeB = dateB.getTime()

      return orden === "asc" ? timeA - timeB : timeB - timeA
      //return orden === "asc" ? dateA - dateB : dateB - dateA
    }else{
      return 0
    }
  })
}*/

/*
function filtrarYOrdenarFechas(
  data: any[],
  palabra: string,
  propiedad: string,
  orden: 'asc' | 'desc'
): string[] {
  try {
    const filteredData = data
      .filter((item) => {
        if (item[propiedad]) {
          const formattedDate = new Date(item[propiedad])
            .toLocaleDateString('en-GB')
            .trim()
          return formattedDate.includes(palabra)
        }
        return false
      })
      .sort((a, b) => {
        const dateA = new Date(a[propiedad] || 0)
        const dateB = new Date(b[propiedad] || 0)
        return orden === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      })
    return filteredData
  } catch (error) {
    console.log(error)
    return []
  }
}*/

type ParsedValue = {
  numeric: number | null
  grammatical: string | null
}

export function parseSpecialNumber(input: string): ParsedValue {
  if (typeof input !== "string") {
    return { numeric: null, grammatical: input ?? "N/A" }
  }

  const regex = /(\d+\.?\d*)\s*([a-zA-Z]+)/
  const match = input.match(regex)

  if (match) {
    const [, numericPart, grammatical] = match
    return {
      numeric: parseFloat(numericPart),
      grammatical
    }
  } else {
    return { numeric: null, grammatical: input }
  }
}

export function isDate(dateStr: string) {
  const regex = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/
  return regex.test(dateStr)
}

export function isNumber(numberStr: string) {
  const regex = /^-?\d*\.?\d+$/
  if (regex.test(numberStr)) return true
  return false
}

//RANGOS DESDE HASTA PARA DIFRERENTES TIPOS DE DATOS
const filterStringRange = (
  value: string,
  from: string,
  to: string
): boolean => {
  return value.localeCompare(from) >= 0 && value.localeCompare(to) <= 0
}

const filterNumberRange = (
  value: number,
  from: number,
  to: number
): boolean => {
  return value >= from && value <= to
}

const filterDateRange = (value: Date, from: Date, to: Date): boolean => {
  return value >= from && value <= to
}

/*
const isDateInRange = (date: Date, from: Date, to: Date) => {
  console.log(
    convertDateToFormatString(date, "dd/MM/yyyy"),
    convertDateToFormatString(from, "dd/MM/yyyy"),
    convertDateToFormatString(to, "dd/MM/yyyy")
  )
  return (
    compararFechasAscendente(date, from) >= 0 &&
    compararFechasDescendente(date, to) >= 0
  )
}
*/
