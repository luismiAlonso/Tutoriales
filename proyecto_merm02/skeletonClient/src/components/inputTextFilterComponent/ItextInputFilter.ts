export interface ItextInputFilter {
    idInput: string, // Asegúrate de que el nombre de la propiedad sea consistente con lo que usas en el componente
    activeButton: boolean,
    activeSearchIcon: boolean,
    placeHolder: string,
    isLabelVisible: boolean,
    style: string,
    typeFill: "search" | "text" | "number",
    // Actualiza las funciones para recibir el 'id' y el 'value'
    onChange: (id: string, value: string) => void,
    onClick: (id: string, value: string) => void,
    onFilter?: (id: string, filterValue: string) => void // Hace que onFilter también acepte el 'id'
  }
  