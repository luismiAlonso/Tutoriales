import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"

export  const ParteLaminacion: ColumnDescriptor[] = [
    {
      title: "P",
      idInput: "P",
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
      idInput: "PASADA",
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
      idInput: "TIPO",
      value: "",
      content: "",
      type: "hybridSelect",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: ["R1", "BK-Fx", "BK-10"],
      placeHolder: ""
    },
    {
      title: "COLOR",
      idInput: "COLOR",
      value: "",
      content: "",
      type: "hybridSelect",
      editable: false,
      defaultValue: "",
      additionalStyles: "",
      options: ["NEGRO", "BEIG", "ANGORA"],
      placeHolder: ""
    },
    {
      title: "MOLDE",
      idInput: "MOLDE",
      content: "",
      value: "",
      type: "hybridSelect",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: ["BIRK", "R063/R063"],
      placeHolder: ""
    },
    {
      title: "PLANCH OB.",
      idInput: "PLANCH OB.",
      content: "",
      value: "",
      type: "hybridSelect",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: ["2x6", "2x7"],
      placeHolder: ""
    },
    {
      title: "PESO",
      idInput: "PESO",
      type: "number",
      content: "",
      value: "",
      editable: false,
      defaultValue: 6.0,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "FORMULAS",
      idInput: "FORMULAS",
      type: "number",
      content: "",
      value: "",
      editable: false,
      defaultValue: 1,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "PLANCHAS",
      idInput: "PLANCHAS",
      type: "number",
      content: "",
      value: "",
      editable: false,
      defaultValue: 1,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "ACELERANTES",
      idInput: "ACELERANTES",
      type: "hybridSelect",
      content: "",
      value: "",
      editable: false,
      defaultValue: 1,
      additionalStyles: "",
      options: ["1550-2970", "136-276", "1400-2500", "1380-2780"],
      placeHolder: ""
    },
    {
      title: "boton",
      idInput: "Agregar",
      content: "Agregar",
      value: "",
      type: "button",
      editable: false,
      additionalStyles: "",
      options: [],
      placeHolder: ""
      //agregarNuevoProductoOP(ordenReciente?.idParte,)
      // Aquí puedes implementar tu lógica para editar la fila
    }
  ]