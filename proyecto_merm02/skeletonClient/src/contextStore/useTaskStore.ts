// useTaskStore.ts
import {create} from "zustand"

import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest
} from "../api/tasks"
import { Task } from "../interfaces/Task" // Asegúrate de importar la interfaz Task desde el archivo correcto

type TaskState = {
  tasks: Task[]
  getTasks: () => void
  createTask: (task: Task) => void
  deleteTask: (id: string) => void
  getTask: (id: string) => Promise<Task | undefined>
  updateTask: (id: string, task: Task) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  getTasks: async () => {
    try {
      const response = await getTasksRequest()
      const tasks = response.data ?? [] // Asume un array vacío si la respuesta no contiene datos
      set({ tasks })
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  },
  createTask: async (task) => {
    try {
      await createTaskRequest(task)
      set((state) => ({ tasks: [...state.tasks, task] }))
    } catch (error) {
      console.error("Error creating task:", error)
    }
  },
  deleteTask: async (id) => {
    try {
      await deleteTaskRequest(id)
      set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  },
  getTask: async (id) => {
    try {
      const response = await getTaskRequest(id)
      return response.data
    } catch (error) {
      console.error("Error fetching task:", error)
    }
  },
  updateTask: async (id, updatedTask) => {
    try {
      await updateTaskRequest(id, updatedTask as Task)
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task))
      }))
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }
}))
