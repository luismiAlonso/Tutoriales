
//dayjs.extend(utc)
function TaskFormPage() {
  /*const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TaskFormData>()
  const { createTask, getTask, updateTask } = useTaskStore()
  const navigate = useNavigate()
  const params = useParams<{ id?: string }>()

  const { date, handleDateChange } = useDate(dayjs().format("YYYY-MM-DD"))

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = (await getTask(params.id)) as Task
        console.log(task.title)
        setValue("title", task.title)
        setValue("description", task.description)
        handleDateChange(dayjs.utc(task.date).format("YYYY-MM-DD"))
      }
    }
    loadTask()
  }, [params.id, getTask, setValue, handleDateChange])

  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }

    if (params.id) {
      updateTask(params.id, dateValid)
    } else {
      createTask(dateValid)
    }
    navigate("/tasks")
  })*/

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Add Task</h1>
        <form >{/* Resto del formulario */}</form>
      </div>
    </div>
  )
}

export default TaskFormPage
