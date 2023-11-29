import { useState } from "react"

// Tipos para las props del Datepicker
type DatepickerProps = {
  onSelectedDateChanged?: (date: Date) => void
}

const useCustomDatepicker = (initialDate: Date, props: DatepickerProps) => {

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)

  const changeSelectedDate = (newDate: Date) => {
    setSelectedDate(newDate)
    // Llamar a onSelectedDateChanged si está definido
    if (props.onSelectedDateChanged) {
      props.onSelectedDateChanged(newDate)
    }
  }

  return { selectedDate, changeSelectedDate }
}

export default useCustomDatepicker
