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

export const generateRandomColor = (): string => {
  // Generar un número aleatorio y convertirlo a hexadecimal
  const color = Math.floor(Math.random() * 16777215).toString(16)
  return `#${color}`
}
