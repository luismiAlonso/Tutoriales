export interface HybridSelectProps {
    options: string[]
    value: string
    defaultValue: string
    //onValueChange: (value: string) => void
    onChange?: (value: string) => void // Añadir este
}