import { v4 as uuidv4 } from "uuid"
import { Itask } from "../interfaces/Itask"
import { status } from "../modelos/status"
import toast from "react-hot-toast"
import useTasksStore from "../store/tasksStore.ts"
import { useTestStore } from "../store/testStore.ts"
import React from "react"
import { FormEventHandler, FormEvent, ChangeEvent } from "react"

function CreateTask() {
  const { taskName, tasks, setTasks, testTask, setTaskName } = useTasksStore()
  const { getTest,setTest } = useTestStore()

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (tasks.find((task) => task.name === taskName)) return
    const task: Itask = { id: uuidv4(), name: taskName, status: status.todos }

    const list = [...tasks, task]
    setTasks(list)
    console.log(getTest())
    localStorage.setItem("taskList", JSON.stringify(list))
    toast.success("Task Created")
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 w-64 px-1"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-cyan-500 rounded-md px-4 h-12 text-white"
      >
        Create
      </button>
    </form>
  )
}

export default CreateTask
