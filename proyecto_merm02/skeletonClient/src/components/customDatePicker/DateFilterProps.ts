export interface DateFilterProps {
  activeLabel: boolean
  idInput: string
  type: "date"
  language: string
  formTarget: string
  labelClearButton: string
  name: string
  onSelectedDateChanged: (date: Date) => void
  // otras propiedades específicas para Datepicker, si son necesarias
}
