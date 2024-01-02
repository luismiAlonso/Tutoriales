export interface HybridSelectProps {
    type: string
    idInput:string
    activeLabel:boolean,
    options: string[]
    value: string
    defaultValue: string
    //onValueChange: (value: string) => void
    onChange?: (value: string) => void // Añadir este
}