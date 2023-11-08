export interface IcustomSelectProp {
    optionsSelect: string[];
    selectedValueRef: string;
    idSelected: string;
    value: string;
    defaultValue: string;
    onSeleccion: (value: string, id: string) => void; // Incluye 'id' como segundo parámetro
    onFilter?: (filterValue: string, id: string) => void; // Incluye 'id' como segundo parámetro
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void; // Incluye 'id' como segundo parámetro si es necesario
  }
  