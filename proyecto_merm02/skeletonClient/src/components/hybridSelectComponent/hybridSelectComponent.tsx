import React, { useState, useEffect, ChangeEvent, FC } from "react";
import { HybridSelectProps } from "./HybridSelectProps";

const HybridSelect: FC<HybridSelectProps> = ({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange
}) => {
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    } else if (defaultValue) {
      setInternalValue(defaultValue);
    }
  }, [controlledValue, defaultValue]);

  const handleInputChange = (value: string): void => {
    setInternalValue(value);
    filterOptions(value);
    if (onChange) {
      onChange(value);
    }
  };

  const filterOptions = (value: string): void => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsListVisible(true);
  };

  const handleOptionClick = (option: string): void => {
    setIsListVisible(false);
    setInternalValue(option);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={internalValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleInputChange(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onFocus={() => setIsListVisible(true)}
      />

      {isListVisible && (
        <ul
          className="absolute w-full mt-2 text-white bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 z-50"  // Aquí se ha añadido la clase z-50
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer hover:bg-gray-500 p-2"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HybridSelect;

