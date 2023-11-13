export interface CustomButtonProps {
  buttonText?: string
  className?: string
  idInput?: string | number
  rowIndex?: number
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    idInput?: string | number,
    rowIndex?: number
  ) => void
}
