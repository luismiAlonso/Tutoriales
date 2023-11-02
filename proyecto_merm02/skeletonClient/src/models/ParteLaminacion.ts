import { ColumnDescriptor } from "../components/ListadosTablas/Itabla"

export  const ParteLaminacion: ColumnDescriptor[] = [
    {
      title: "P",
      idInput: "1",
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
      title: "OP",
      idInput: "2",
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
      title: "PASADA",
      idInput: "3",
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
      title: "TIPO",
      idInput: "4",
      value: "",
      content: "",
      type: "hybridSelect",
      editable: true,
      additionalStyles: "",
      defaultValue: "",
      options: ["R1", "BK-Fx", "BK-10"],
      placeHolder: ""
    },
    {
      title: "COLOR",
      idInput: "5",
      value: "",
      content: "",
      type: "hybridSelect",
      editable: true,
      defaultValue: "",
      additionalStyles: "",
      options: ["NEGRO", "BEIG", "ANGORA"],
      placeHolder: ""
    },
    {
      title: "MOLDE",
      idInput: "6",
      content: "",
      value: "",
      type: "hybridSelect",
      editable: true,
      additionalStyles: "",
      defaultValue: "",
      options: ["BIRK", "R063/R063"],
      placeHolder: ""
    },
    {
      title: "PLANCH OB.",
      idInput: "7",
      content: "",
      value: "",
      type: "hybridSelect",
      editable: true,
      additionalStyles: "",
      defaultValue: "",
      options: ["2x6", "2x7"],
      placeHolder: ""
    },
    {
      title: "PESO",
      idInput: "8",
      type: "number",
      content: "",
      value: "",
      editable: true,
      defaultValue: 6.0,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "FORMULAS",
      idInput: "9",
      type: "number",
      content: "",
      value: "",
      editable: true,
      defaultValue: 1,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "PLANCHAS",
      idInput: "10",
      type: "number",
      content: "",
      value: "",
      editable: true,
      defaultValue: 1,
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "ACELERANTES",
      idInput: "11",
      type: "hybridSelect",
      content: "",
      value: "",
      editable: true,
      defaultValue: 1,
      additionalStyles: "",
      options: ["1550-2970", "136-276", "1400-2500", "1380-2780"],
      placeHolder: ""
    },
    {
      title: "boton",
      idInput: "12",
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