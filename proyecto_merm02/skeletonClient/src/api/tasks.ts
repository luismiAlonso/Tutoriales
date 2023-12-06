// taskAPI.ts
import axios from "./axios"
import { Task } from "../interfaces/Task" // Asegúrate de importar la interfaz Task desde el archivo correcto

export const getTasksRequest = () => axios.get("/tasks")

export const getTaskRequest = (id: string) => axios.get(`/tasks/${id}`)

export const createTaskRequest = async (task: Task) => {

  try {
    const response = await axios.post("/tasks", task)
    return response
  } catch (error) {
    handleError(error)
  }

}

export const updateTaskRequest = (id: string, task: Task) =>
  axios.put(`/tasks/${id}`, task)

export const deleteTaskRequest = (id: string) => axios.delete(`/tasks/${id}`)

const handleError = (error: any) => {
  if (error.response) {
    console.error("Error de respuesta:", error.response.data)
    console.error("Código de estado:", error.response.status)
  } else if (error.request) {
    console.error("No hay respuesta del servidor")
  } else {
    console.error("Error de configuración de la solicitud:", error.message)
  }
}
