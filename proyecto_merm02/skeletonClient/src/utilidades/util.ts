export const getDatosLocalStorage = (nameItem:string) => {
    const result = localStorage.getItem(nameItem)
    return result
}

export const setDatosLocalStorage = (nameItem:string,value:string) => {
    const result = localStorage.setItem(nameItem,value)
    return result
}

export const getPropertyValue = <T>(obj: T, propName: string): any => {
    return  obj[propName as keyof T] || obj[propName.replace(/\s+/g, '') as keyof T];

}
