import React, { useEffect, useState } from "react"
import { Datepicker } from "flowbite-react"
import { DateFilterProps } from "./DateFilterProps"
import { obtenerFechaActual } from "../../utilidades/dateUtil"
import { convertDateToFormatString } from "../../utilidades/dateUtil"

const CustomDatepicker: React.FC<DateFilterProps> = ({
  activeLabel,
  idInput,
  language,
  formTarget,
  labelClearButton,
  name,
  onSelectedDateChanged,
}) => {

  const [currentDate, setCurrentDate] = useState(formTarget || obtenerFechaActual() )

const updateDate = (date:Date) =>{
  setCurrentDate(convertDateToFormatString(date,"dd/MM/yyyy"))
  onSelectedDateChanged(date)
}

  return (
    <div className={`relative ${activeLabel ? "mb-4" : ""}`}>
      {activeLabel && (
        <label
          htmlFor={idInput}
          className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {name}
        </label>
      )}

      <Datepicker
        language={language}
        formTarget={currentDate}
        labelClearButton={labelClearButton}
        name={name}
        onSelectedDateChanged={updateDate}
      />
    </div>
  )
}

export default CustomDatepicker
