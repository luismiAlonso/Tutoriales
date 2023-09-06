import axios from "./axios"

export const getTasksRequest = () => axios.get("/tasks")
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)
//export const createTaskRequest = (task) => axios.post('/tasks', task)
export const createTaskRequest = (task) =>
  axios
    .post("/tasks", task)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado diferente a 2xx
        console.error("Error de respuesta:", error.response.data)
        console.error("Código de estado:", error.response.status)
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta del servidor
        console.error("No hay respuesta del servidor")
      } else {
        // Algo sucedió en la configuración de la solicitud que activó un error
        console.error("Error de configuración de la solicitud:", error.message)
      }
    })

export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task)
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)

//CRUD TASK API REDUCERS

export async function getTasksAPI(dispatch) {
  try {
    const res = await getTasksRequest()
    const tasks = Array.isArray(res.data) ? res.data : [] // Si no es un array, asignamos un array vacío
    console.log(tasks)
    dispatch({ type: "GET_TASKS", payload: tasks })
  } catch (error) {
    console.error("Error fectching tasks:", error)
  }
}
export async function getTaskAPI(id,dispatch) {
  try {
    const res = await getTaskRequest(id)
    dispatch({ type: "GET_TASK", payload: res.data })
  } catch (error) {
    console.error("Error fectching tasks:", error)
  }
}

export async function createTasksAPI(task, dispatch) {
  try {
    await createTaskRequest(task)
    dispatch({
      type: "ADD_TRANSACTION",
      payload: task
    })
  } catch (error) {
    console.error("Error adding task:", error)
  }
}

export async function deleteTaskAPI(id, dispatch) {
  try {
    await deleteTaskRequest(id)
    dispatch({
      type: "DELETE_TASK",
      payload: id
    })
  } catch (error) {
    console.error("Error removing task:", error)
  }
}

export async function updateTaskAPI(id,updateTask,dispatch) {
  try {
    await updateTaskRequest(id,updateTask)

    dispatch({
      type: "UPDATE_TASK",
      payload: {id,updateTask}
    })
  } catch (error) {
    console.log("Error updating task:",error)
  }
}
