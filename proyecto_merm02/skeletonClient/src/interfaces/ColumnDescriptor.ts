export interface ColumnDescriptor {
    idInput:string,
    title: string,
    content: string,
    type: "text" | "number" | "dropdown" | "hybridSelect" | "checkbox" | "button" | "noInput" | "void"  | "svg"
    value?: string | number
    editable: boolean
    options: string[]
    defaultValue?: string | number,
    placeHolder: string,
    additionalStyles:string,
    onChange?: (value: string | number, idInput: string) => void
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

