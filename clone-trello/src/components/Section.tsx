import { useDrop } from "react-dnd"
import { Itask, ImapTaskAndColor } from "../interfaces/Itask"
import useTasksStore from "../store/tasksStore"
import Task from "./task"

function Section({ propStatus }: { propStatus: string }) {
  const { tasks, todos, inProgress, finished, setTasks,getTask } = useTasksStore()
  const stateTask: { [key: string]: ImapTaskAndColor } = {
    todos: { color: "bg-red-400", mapTask: todos },
    inProgress: { color: "bg-amber-300", mapTask: inProgress },
    finished: { color: "bg-lime-400", mapTask: finished }
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Itask) =>
      addItemToSection({ id: item.id, name: item.name, status: propStatus }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addItemToSection = (item: Itask) => {
  
      const updatedTasks = getTask().tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, status: item.status }
        }
        return task
      })
      setTasks(updatedTasks)
  }

  const className = `${stateTask[propStatus].color} p-3 rounded-md flex mb-2`

  return (
    <div ref={drop} className={`w-64 ${isOver ? "bg-slate-200" : ""}`}>
      <div className={className}>
        <h2>{propStatus}</h2>
        <div className="ml-2 bg-white w-5 h-5 rounded-full flex items-center justify-center">
          {stateTask[propStatus].mapTask.length}
        </div>
      </div>
      {stateTask[propStatus].mapTask.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}

export default Section
