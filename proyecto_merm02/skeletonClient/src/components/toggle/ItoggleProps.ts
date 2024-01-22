export interface ItoggleProps {
  idInput: string
  activeLabel: boolean
  type: string
  valueProp:boolean// Cambiado de boolean a "asc" | "desc"
  onChange: (
    idToggle: string,
    toggleState: { value: boolean; sortDirection: "asc" | "desc" }
  ) => void
  trueText: string
  falseText: string
}
