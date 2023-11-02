export  interface InputProps {
    type: string
    idInput: string,
    content:string,
    titulo:string,
    editable: boolean
    defaultValue?: string | number
    value?:string | number,
    options: string[]
    placeHolder: string
    additionalStyles: string
    onChange?: (value: string | number, idInput: string) => void
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}