import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"

export  const ProductoModificacion: ColumnDescriptor[] = [
    {
      title: "IDPARTE",
      idInput: "idParte",
      value: 1,
      content: "",
      type: "number",
      editable: true,
      defaultValue: 1,
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "INDICE PRODUCTO",
      idInput: "indiceProducto",
      value: 1,
      content: "",
      type: "number",
      editable: true,
      defaultValue: 1,
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "OPERARIO",
      idInput: "operario",
      value: 1,
      content: "",
      type: "number",
      editable: false,
      defaultValue: 1,
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "PASADA",
      idInput: "pasada",
      value: 1,
      content: "",
      type: "number",
      editable: false,
      defaultValue: 1,
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "TIPO",
      idInput: "tipo",
      value: "R1",
      content: "",
      type: "hybridSelect",
      editable: false,
      additionalStyles: "",
      defaultValue: "R1",
      options: ["R1", "BK-Fx", "BK-10"],
      placeHolder: ""
    },
    {
      title: "COLOR",
      idInput: "color",
      value: "NEGRO",
      content: "",
      type: "hybridSelect",
      editable: false,
      defaultValue: "NEGRO",
      additionalStyles: "",
      options: ["NEGRO", "BEIG", "ANGORA"],
      placeHolder: ""
    },
    {
      title: "MOLDE",
      idInput: "molde",
      content: "",
      value: "BIRK",
      type: "hybridSelect",
      editable: false,
      additionalStyles: "",
      defaultValue: "BIRK",
      options: ["BIRK", "R063/R063"],
      placeHolder: ""
    },
    {
      title: "PLANCH OB.",
      idInput: "planchaobtenidas",
      content: "",
      value: "2x6",
      type: "hybridSelect",
      editable: false,
      additionalStyles: "",
      defaultValue: "2x6",
      options: ["2x6", "2x7"],
      placeHolder: ""
    },
    {
      title: "PESO",
      idInput: "peso",
      type: "number",
      content: "",
      value:  6.0,
      editable: false,
      defaultValue: 6.0,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "FORMULAS",
      idInput: "formulas",
      type: "number",
      content: "",
      value: 1,
      editable: false,
      defaultValue: 1,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "PLANCHAS",
      idInput: "planchas",
      type: "number",
      content: "",
      value: 1,
      editable: false,
      defaultValue: 1,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "ACELERANTES",
      idInput: "acelerantes",
      type: "hybridSelect",
      content: "",
      value: "1550-2970",
      editable: false,
      defaultValue: "1550-2970",
      additionalStyles: "",
      options: ["1550-2970", "136-276", "1400-2500", "1380-2780"],
      placeHolder: ""
    },
    {
      title: "boton",
      idInput: "aceptarEdicion",
      content: "aceptarEdicion",
      value: "",
      type: "button",
      editable: false,
      additionalStyles: "",
      options: [],
      placeHolder: ""
      //agregarNuevoProductoOP(ordenReciente?.idParte,)
    }
  ]