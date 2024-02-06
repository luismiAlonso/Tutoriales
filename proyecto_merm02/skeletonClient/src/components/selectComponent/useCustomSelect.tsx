import  { useState, ChangeEvent, useEffect } from 'react'

export function useCustomSelect(optionDefault: string, opcionsInit: string[]) {
  const [options, setOptions] = useState(opcionsInit)
  const [selectedValue, setSelectedValue] = useState(optionDefault)
  const [defaultOption, setDefaultOption] = useState(optionDefault)

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedValue(value)
  }

  const updateOptions = (nuevasOpciones: string[]) => {
    setOptions(nuevasOpciones)
  }

  useEffect(() => {
    setDefaultOption(optionDefault)
  }, [optionDefault])

  return {
    options,
    selectedValue,
    defaultOption,
    setDefaultOption, 
    setSelectedValue,
    handleSelectChange,
    updateOptions
  }
}

export default useCustomSelect
