import axios from './axios'

export const getTasksRequest = () => axios.get('/tasks')
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)
//export const createTaskRequest = (task) => axios.post('/tasks', task)
export const createTaskRequest = (task) =>
  axios
    .post('/tasks', task)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado diferente a 2xx
        console.error('Error de respuesta:', error.response.data)
        console.error('Código de estado:', error.response.status)
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta del servidor
        console.error('No hay respuesta del servidor')
      } else {
        // Algo sucedió en la configuración de la solicitud que activó un error
        console.error('Error de configuración de la solicitud:', error.message)
      }
    })

export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task)
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)
