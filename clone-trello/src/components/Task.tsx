import { useDrag } from "react-dnd"
import useTasksStore from "../store/tasksStore"
import { toast } from "react-hot-toast"
import { useEffect } from "react"
import { status } from "../modelos/status"
import { Itask } from "../interfaces/Itask"

function Task({ task }) {
  const { setTasks,tasks} = useTasksStore()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, name: task.name, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))


  const handleRemoveTask = (id) => {
    const dTasks = tasks.filter((t) => t.id !== id)
    setTasks(dTasks)
    localStorage.setItem("taskList", JSON.stringify(dTasks))
    toast.success("Task removed successlly")
  }

  return (
    <div
      ref={drag}
      className={`relative bg-slate-200 p-4 mt-8 mb-2 rounded-md shadow-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{task.name}</p>
      <div className="absolute inset-y-2 right-1">
        <button
          onClick={() => handleRemoveTask(task.id)}
          className="ml-2 bg-white w-5 h-5 rounded-full flex items-center justify-center cursor-del"
        >
          -
        </button>
      </div>
    </div>
  )
}

export default Task
