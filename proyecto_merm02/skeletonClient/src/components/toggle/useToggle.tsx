import { useState } from 'react'

function useToggle(
  initialState = false,
  options = { trueText: 'asc', falseText: 'desc' }
) {
  const [value, setValue] = useState(initialState)

  const toggle = () => {
    setValue((prevValue) => !prevValue)
  }

  const getToggleState = () => {
    const sortDirection = value ? options.trueText : options.falseText
    return {
      value,
      sortDirection: sortDirection as 'asc' | 'desc' // Asegura que sortDirection es tratado como 'asc' | 'desc'
    }
  }

  return {
    value,
    toggle,
    getToggleState
  }
}

export default useToggle
