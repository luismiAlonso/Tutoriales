export const getDatosLocalStorage = (nameItem:string) => {
    const result = localStorage.getItem(nameItem)
    return result
}

export const setDatosLocalStorage = (nameItem:string,value:string) => {
    const result = localStorage.setItem(nameItem,value)
    return result
}