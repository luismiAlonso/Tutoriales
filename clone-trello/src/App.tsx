import CreateTask from "./components/CreateTask"
import ListTasks from "./components/ListTasks"
import { Toaster ,toast} from "react-hot-toast"
import useTasksStore from "./store/tasksStore"
import { useTestStore } from "./store/testStore"
import { useEffect, useState } from "react"
import { status } from "./modelos/status"
import { Itask } from "./interfaces/Itask"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Task from "./components/task"

function App() {
  const {tasks, setTasks,testTask,setTasksInProgress,setTasksFinished,setTasksTodos} = useTasksStore()
  const {test,setTest} =useTestStore()
 //const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  const updateTasks = () => {

      const storedTaskList = localStorage.getItem("taskList")
      if (storedTaskList !== null) {
        const parseList = JSON.parse(storedTaskList) as Itask[]
        setTasks(parseList)
        setTest(["kdskd","llsk"])
      } else {
        toast.success("No hay datos en localStorage")
      }
  }
  
  useEffect(() => {
    updateTasks()
  }, [setTasks])

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-32 gap-16">
        <CreateTask />
        <ListTasks />
      </div>
    </DndProvider>
  )
}

export default App
