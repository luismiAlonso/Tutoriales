export interface Itext {
  value: string
  defaultValue: string | number
  onChange: (value: string, id?: string | number) => void
  idInput?: string | number
  placeholder?: string
  readOnly?: boolean
  additionalStyles?: string // Nueva propiedad para estilos adicionales
  type?: "text" | "number" // Añadir prop de tipo
  // Puedes agregar más props aquí si lo deseas...
}
