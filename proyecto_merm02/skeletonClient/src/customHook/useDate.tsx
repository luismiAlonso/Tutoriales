import { useState, useEffect } from "react"

export function useDate(initialDate: string) {
  const [date, setDate] = useState(initialDate)

  useEffect(() => {
    setDate(initialDate)
  }, [initialDate])

  const handleDateChange = (newDate:string) => {
    setDate(newDate)
  }

  return { date, handleDateChange }
}
