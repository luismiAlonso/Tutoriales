import { ColumnDescriptor } from "../interfaces/ColumnDescriptor"

export const parteProducto: ColumnDescriptor[] = [

    {
      title: "IDPARTE",
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
      title: "INDICE PRODUCTO",
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
      idInput: "pasada",
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
      idInput: "tipo",
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
      idInput: "color",
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
      idInput: "molde",
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
      idInput: "planchaObtenidas",
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
      idInput: "peso",
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
      idInput: "formulas",
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
      idInput: "planchas",
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
      idInput: "acelerantes",
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