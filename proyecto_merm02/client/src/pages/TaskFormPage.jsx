import { useForm } from "react-hook-form"
import { useTasks } from "../context/TaskContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDate } from "../customHooks/useDate"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()

  const { date, handleDateChange } = useDate(dayjs().format("YYYY-MM-DD"))

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)
        console.log(task.title)
        setValue("title", task.title)
        setValue("description", task.description)
        handleDateChange(dayjs.utc(task.date).format("YYYY-MM-DD"))
      }
    }
    loadTask()
  }, [])

  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }
    if (data.date) dateValid.date = dayjs.utc(data.date).format()
    if (params.id) {
      updateTask(params.id, dateValid)
    } else {
      createTask(dateValid)
    }
    navigate("/tasks")
  })

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 reounded-md">
        <h1 className="text-2xl font-bold">Add Task</h1>
        <label htmlFor="title">Title</label>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.title && (
            <p>
              <span className="text-red-500">Title is required</span>
            </p>
          )}
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder="Descripcion"
            {...register("description", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
          ></textarea>
          {errors.description && (
            <p>
              <span className="text-red-500">Descripcion is required</span>
            </p>
          )}
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("date")}
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
          <button className="bg-indigo-500 px-4 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage
