import  { Router } from 'express'
import { authRequire } from '../middlewares/validateToken.js'
import { 
    createTask,
    getTask,
    getTasks,
    deleteTask,
    updateTask} from '../controllers/tasks.controller.js'

const taskRouter = Router()

taskRouter.get('/tasks',authRequire,getTasks)
taskRouter.get('/tasks/:id',authRequire,getTask)
taskRouter.post('/tasks',authRequire,createTask)
taskRouter.delete('/tasks/:id',authRequire,deleteTask)
taskRouter.put('/tasks/:id',authRequire,updateTask)


export default taskRouter