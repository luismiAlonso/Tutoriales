import {
  format,
  parse,
  isWithinInterval,
  compareAsc,
  endOfDay,
  compareDesc
} from "date-fns"

export const obtenerFechaActual = (formato: string = "dd/MM/yyyy") => {
  const fechaActual = new Date()
  return format(fechaActual, formato)
}

export const convertDateToFormatString = (date: Date, formato: string) => {
  return format(date, formato)
}

export const convertStringDateToDate = (dateStr: string) => {
  const hasTime = dateStr.includes(":") // Verifica si la cadena contiene una hora
  const formatString = hasTime ? "dd/MM/yyyy HH:mm:ss" : "dd/MM/yyyy"
  return parse(dateStr, formatString, new Date())
}

export const obtenerHoraActual = () => {
  const ahora = new Date()
  /*
  // Formatear horas, minutos y segundos con cero a la izquierda si es necesario
  const horas = ahora.getHours().toString().padStart(2, "0")
  const minutos = ahora.getMinutes().toString().padStart(2, "0")
  const segundos = ahora.getSeconds().toString().padStart(2, "0")
  return `${horas}:${minutos}:${segundos}`
  */
  return format(ahora, "HH:mm:ss")
}

export function isDate(dateStr: string) {
  const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)?\d{2}$/
  if (regex.test(dateStr)) return true
  return false
}

export const compararFechasAscendente = (
  fecha1: Date,
  fecha2: Date
): number => {
  return compareAsc(fecha1, fecha2)
}

export const compararFechasDescendente = (
  fecha1: Date,
  fecha2: Date
): number => {
  return compareDesc(fecha1, fecha2)
}

export const getIntervalDate = (
  date: Date,
  fechaInicio: Date,
  fechaFin: Date
) => {
  try {
    // console.log(fechaInicio,fechaFin)
    const adjustedFechaFin = endOfDay(fechaFin) // Ajusta fechaFin para el final del 15 de enero de 2024
    
    const resultInterval = isWithinInterval(date, {
      start: fechaInicio,
      end: adjustedFechaFin
    })

    //console.log(resultInterval)
    return resultInterval

  } catch (error) {
    console.log(error)
    return false
  }
}
