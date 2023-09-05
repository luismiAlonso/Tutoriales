import { createContext, useContext, useState } from 'react'
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest
} from '../api/tasks'

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTask meust be used within a taskProvider')
  }

  return context
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <TaskContext.Provider
      value={{ tasks, createTask, getTasks, getTask, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}
