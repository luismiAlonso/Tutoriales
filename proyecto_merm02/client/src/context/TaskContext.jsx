import { createContext, useContext, useState, useReducer } from "react"
import {
  getTasksAPI,
  deleteTaskAPI,
  createTasksAPI,
  getTaskRequest,
  updateTaskAPI
} from "../api/tasks"
import { taskReducerContext } from "./reducers/TaskReducerContext"

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error("useTask meust be used within a taskProvider")
  }

  return context
}
const initialState = {
  tasks: []
}

export function TaskProvider({ children }) {
  // const [tasks, setTasks] = useState([])
  const [state, dispatch] = useReducer(taskReducerContext, initialState)
  
  const getTasks = () => {
    getTasksAPI(dispatch)
  }

  const createTask = async (task) => {
    createTasksAPI(task,dispatch)
  }

  const deleteTask = (id) => {
    deleteTaskAPI(id,dispatch)
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id,task) => {
    try {
      await updateTaskAPI(id,task,dispatch)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks:state.tasks,
        createTask,
        getTasks,
        getTask,
        deleteTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
