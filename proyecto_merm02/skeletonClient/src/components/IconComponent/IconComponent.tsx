// IconComponent.tsx
import React from "react"
import { IconComponentProps } from "./IconComponentProps"

const IconComponent: React.FC<IconComponentProps> = ({
  onClick,
  className,
  iconType,
  iconContent
}) => {
  let renderedIcon

  if (iconType === "svg") {
    // Asumiendo que iconContent es un componente React
    renderedIcon = iconContent
  } else if (iconType === "img") {
    // Asumiendo que iconContent es una URL de imagen
    renderedIcon = <img src={iconContent as string} alt="Icon" />
  }

  return (
    <div onClick={onClick} className={className}>
      {renderedIcon}
    </div>
  )
}

export default IconComponent
