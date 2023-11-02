import { ColumnDescriptor } from "../components/ListadosTablas/Itabla"

export const HeadersProducto: ColumnDescriptor[] = [

    {
      title: "P",
      idInput: "1",
      value: "1",
      content: "",
      type: "number",
      editable: false,
      defaultValue: "1",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "Index Producto",
      idInput: "2",
      value: "0",
      content: "",
      type: "text",
      editable: false,
      defaultValue: "0",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "OP",
      idInput: "3",
      value: "1",
      content: "",
      type: "number",
      editable: false,
      defaultValue: "1",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "PASADA",
      idInput: "4",
      value: "1",
      content: "",
      type: "number",
      editable: false,
      defaultValue: "1",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "TIPO",
      idInput: "5",
      value: "",
      content: "",
      type: "text",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "COLOR",
      idInput: "6",
      value: "",
      content: "",
      type: "text",
      editable: false,
      defaultValue: "",
      additionalStyles: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "MOLDE",
      idInput: "7",
      content: "",
      value: "",
      type: "text",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "PLANCH OB.",
      idInput: "8",
      content: "",
      value: "",
      type: "text",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "PESO",
      idInput: "9",
      type: "text",
      content: "",
      value: "",
      editable: false,
      defaultValue: "",
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "FORMULAS",
      idInput: "10",
      type: "text",
      content: "",
      value: "",
      editable: false,
      defaultValue: "",
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "PLANCHAS",
      idInput: "11",
      type: "text",
      content: "",
      value: "",
      editable: false,
      defaultValue: "",
      options: [""],
      additionalStyles: "",
      placeHolder: ""
    },
    {
      title: "ACELERANTES",
      idInput: "12",
      type: "text",
      content: "",
      value: "",
      editable: false,
      defaultValue: "",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "Editar",
      idInput: "12",
      content: "editar",
      value: "",
      type: "button",
      editable: false,
      additionalStyles: "",
      options: [],
      placeHolder: ""
      //agregarNuevoProductoOP(ordenReciente?.idParte,)
      // Aquí puedes implementar tu lógica para editar la fila
    },
    {
        title: "Borrar",
        idInput: "13",
        content: "borrar",
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