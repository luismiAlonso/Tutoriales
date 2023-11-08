export const obtenerFechaActual = () => {
    
  const date = new Date()
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Enero es 0!
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function isDate(dateStr: string) {
  const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)?\d{2}$/
  if (regex.test(dateStr)) return true
  return false
}