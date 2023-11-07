import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"

export const parteProducto: ColumnDescriptor[] = [

    {
      title: "P",
      idInput: "idParte",
      value: "1",
      content: "",
      type: "noInput",
      editable: true,
      defaultValue: "1",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "Index Producto",
      idInput: "indiceProducto",
      value: "1",
      content: "",
      type: "noInput",
      editable: false,
      defaultValue: "1",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "OPERARIO",
      idInput: "operario",
      value: "1",
      content: "",
      type: "noInput",
      editable: false,
      defaultValue: "1",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "PASADA",
      idInput: "Pasada",
      value: "1",
      content: "",
      type: "noInput",
      editable: false,
      defaultValue: "1",
      additionalStyles: "",
      options: [""],
      placeHolder: ""
    },
    {
      title: "TIPO",
      idInput: "Tipo",
      value: "",
      content: "",
      type: "noInput",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "COLOR",
      idInput: "Color",
      value: "",
      content: "",
      type: "noInput",
      editable: false,
      defaultValue: "",
      additionalStyles: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "MOLDE",
      idInput: "Molde",
      content: "",
      value: "",
      type: "noInput",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "PLANCH OB.",
      idInput: "PlanchaObtenidas",
      content: "",
      value: "",
      type: "noInput",
      editable: false,
      additionalStyles: "",
      defaultValue: "",
      options: [],
      placeHolder: ""
    },
    {
      title: "PESO",
      idInput: "Peso",
      type: "noInput",
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
      idInput: "Formulas",
      type: "noInput",
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
      idInput: "Planchas",
      type: "noInput",
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
      idInput: "Acelerantes",
      type: "noInput",
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
      idInput: "Editar",
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
        idInput: "Borrar",
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