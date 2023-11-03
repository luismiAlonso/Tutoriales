export interface TablaProps<T> {
  datos: T[]
  columnas: (keyof T)[]
  fontStyleSize: string
}


