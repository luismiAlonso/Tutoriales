
export  interface InputProps {
    type: string
    idInput: string,
    content:string,
    titulo:string,
    editable: boolean
    defaultValue?: string | number | boolean,
    value?:string | number | boolean,
    visible: boolean,
    rowIndex?: number,
    options: string[]
    placeHolder: string
    additionalStyles: string
    onChange?: (value: string | number, idInput: string) => void
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, idInput: string, rowIndex?: number) => void,
}