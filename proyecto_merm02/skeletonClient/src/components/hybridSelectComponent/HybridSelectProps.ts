export interface HybridSelectProps {
    type: string
    idInput:string,
    editable:boolean,
    activeLabel:boolean,
    additionalStyles:string,
    options: string[]
    value: string
    defaultValue: string
    //onValueChange: (value: string) => void
    onChange?: (value: string) => void // Añadir este
}