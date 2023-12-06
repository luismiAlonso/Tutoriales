import  { Router } from 'express'
import  authRequire  from '../middlewares/validateToken.js'
import { 
    createTask,
    getTask,
    getTasks,
    deleteTask,
    updateTask} from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { taskSchema } from '../schemas/task.schema.js'

const taskRouter = Router()

taskRouter.get('/tasks',authRequire,getTasks)
taskRouter.get('/tasks/:id',authRequire,getTask)
taskRouter.post('/tasks',authRequire,validateSchema(taskSchema),createTask)
taskRouter.delete('/tasks/:id',authRequire,deleteTask)
taskRouter.put('/tasks/:id',authRequire,validateSchema(taskSchema),updateTask)


export default taskRouter