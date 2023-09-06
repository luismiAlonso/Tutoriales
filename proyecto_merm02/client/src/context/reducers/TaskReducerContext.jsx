export const taskReducerContext = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload)
      }
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload
      }
    case "GET_TASK":
      return {
        ...state,
        tasks: action.payload
      }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks
      }
    // Agrega otros casos de acciones según tus necesidades
    default:
      return state
  }
}
