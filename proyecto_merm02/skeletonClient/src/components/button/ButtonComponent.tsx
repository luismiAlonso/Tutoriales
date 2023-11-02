import { CustomButtonProps } from "./Ibuton"
import React,{FC} from "react"

const CustomButton: FC<CustomButtonProps> = ({
  buttonText = "Button",
  className = "",
  onClick
}) => {
  
  return (
    <div className="flex justify-center items-center">
      <button
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default CustomButton
