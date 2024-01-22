import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"

export const productoInventarioInicial: ColumnDescriptor[] = [
  {
    title: "IDPRODUCTO",
    idInput: "idProducto",
    value: 1,
    content: "",
    type: "number",
    editable: true,
    visible: false,
    defaultValue: 1,
    additionalStyles: "",
    options: [""],
    placeHolder: ""
  },
  {
    title: "FECHAENTRADA",
    idInput: "fechaEntrada",
    value: "",
    content: "",
    type: "noInput",
    editable: false,
    visible: false,
    defaultValue: "",
    additionalStyles: "",
    options: [],
    placeHolder: ""
  },
  {
    title: "FECHASALIDA",
    idInput: "fechaSalida",
    value: "",
    content: "",
    type: "noInput",
    editable: false,
    visible: false,
    defaultValue: "",
    additionalStyles: "",
    options: [],
    placeHolder: ""
  },
  {
    title: "PLANCHA",
    idInput: "plancha",
    value: "PL.B CREPELINA OSB 75",
    content: "",
    type: "hybridSelect",
    editable: true,
    visible: true,
    defaultValue: "PL.B CREPELINA OSB 75",
    additionalStyles: "",
    options: [ "PL.B CREPELINA OSB 75",
    "PL.B CREPELINA OSB 90",
    "PL. EVA F-25 114x216",
    "PL.B GOMFLEX",
    "PL. ECOFLEX 2 100x100",
    "PL.Z CUEROLITE",
    "PL PAVIGOM EX. 100x100",
    "PL.B CREPELINA OSB 70"],
    placeHolder: ""
  },
  {
    title: "COLOR",
    idInput: "color",
    content: "",
    value: "NEGRO",
    type: "hybridSelect",
    editable: true,
    visible: true,
    additionalStyles: "",
    defaultValue: "NEGRO",
    options: ["NEGRO", "BEIGE", "ANGORA"],
    placeHolder: ""
  },
  {
    title: "DIBUJO",
    idInput: "dibujo",
    content: "",
    value: "RAYADO 1",
    type: "hybridSelect",
    editable: true,
    visible: true,
    additionalStyles: "",
    defaultValue: "RAYADO 1",
    options: [ "RAYADO 1",
    "LISO",
    "TRAMA",
    "LISO",
    "LOGO"],
    placeHolder: ""
  },
  {
    title: "MOLDE",
    idInput: "molde",
    content: "",
    value: "molde01",
    type: "hybridSelect",
    editable: true,
    visible: true,
    additionalStyles: "",
    defaultValue: "molde01",
    options: [ "molde02",
    "molde03",
    "molde04",
    "molde05",
    "molde06"],
    placeHolder: ""
  },
  {
    title: "CALIBRE",
    idInput: "calibre",
    content: "",
    value: "3 m/m",
    type: "hybridSelect",
    editable: true,
    visible: true,
    additionalStyles: "",
    defaultValue: "3 m/m",
    options: [ "3 m/m",
    "3.5 m/m",
    "4 m/m",
    "4.5 m/m",
    "25 m/m"],
    placeHolder: ""
  },
  {
    title: "ACABADO01",
    idInput: "acabado01",
    content: "",
    value: "acabado_01",
    type: "hybridSelect",
    editable: true,
    visible: true,
    additionalStyles: "",
    defaultValue: "acabado_01",
    options: [ "acabado_01",
    "acabado_02",
    "acabado_03",
    "acabado_04",
    "acabado_05"],
    placeHolder: ""
  },
  {
    title: "ACABADO02",
    idInput: "acabado02",
    content: "",
    value: "acabado_01",
    type: "hybridSelect",
    editable: true,
    visible: true,
    additionalStyles: "",
    defaultValue: "acabado_01",
    options: [ "acabado_01",
    "acabado_02",
    "acabado_03",
    "acabado_04",
    "acabado_05"],
    placeHolder: ""
  },
  {
    title: "STOCK",
    idInput: "stock",
    content: "",
    value: 1,
    type: "text",
    editable: false,
    visible: false,
    additionalStyles: "",
    defaultValue: 1,
    options:[],
    placeHolder: ""
  },
  {
    title: "cantidadEntrante",
    idInput: "cantidadEntrante",
    value: 1,
    content: "",
    type: "text",
    editable: false,
    visible: true,
    defaultValue: 1,
    additionalStyles: "",
    options: [""],
    placeHolder: ""
  },
  {
    title: "cantidadSalida",
    idInput: "cantidadSalida",
    value: 0,
    content: "",
    type: "text",
    editable: false,
    visible: false,
    defaultValue: 1,
    additionalStyles: "",
    options: [""],
    placeHolder: ""
  },
  {
    title: "boton",
    idInput: "agregarEntrada",
    content: "Agregar",
    value: "",
    type: "button",
    editable: false,
    visible: true,
    additionalStyles: "",
    options: [],
    placeHolder: ""
    //agregarNuevoProductoOP(ordenReciente?.idParte,)
  }
  
]
