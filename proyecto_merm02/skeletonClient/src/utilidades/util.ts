export const getDatosLocalStorage = (nameItem: string): any => {
  const result = localStorage.getItem(nameItem)
  return result ? JSON.parse(result) : null
}

export const setDatosLocalStorage = (nameItem: string, value: any): void => {
  const result = localStorage.setItem(nameItem, JSON.stringify(value))
  return result
}

export const getPropertyValue = <T>(obj: T, propName: string): any => {
  return (
    obj[propName as keyof T] || obj[propName.replace(/\s+/g, "") as keyof T]
  )
}

export enum TipoColor {
  Oscuro = 1,
  Claro = 2,
  Indistinto = 3
}

export const generadorClaveCompuesta = (
  objeto: any,
  propiedadesExcluidas: string[]
) => {
  const partesClave = Object.keys(objeto)
    .filter((key) => !propiedadesExcluidas.includes(key)) // Excluir las propiedades especificadas
    .map((key) => objeto[key] || "")
  return partesClave.join("-").slice(0,-1)
}

export const generateRandomColor = (tipo: TipoColor): string => {
  let r: number, g: number, b: number

  if (tipo === TipoColor.Oscuro) {
    // Genera componentes de color oscuros en el rango [0, 127]
    r = Math.floor(Math.random() * 128)
    g = Math.floor(Math.random() * 128)
    b = Math.floor(Math.random() * 128)
  } else if (tipo === TipoColor.Claro) {
    // Genera componentes de color claros en el rango [128, 255]
    r = Math.floor(Math.random() * 128) + 128
    g = Math.floor(Math.random() * 128) + 128
    b = Math.floor(Math.random() * 128) + 128
  } else {
    // Genera componentes de color indistintamente en el rango [0, 255]
    r = Math.floor(Math.random() * 256)
    g = Math.floor(Math.random() * 256)
    b = Math.floor(Math.random() * 256)
  }

  // Convierte componentes a formato hexadecimal
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}
