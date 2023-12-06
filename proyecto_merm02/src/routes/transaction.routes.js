import  { Router } from 'express'
import  authRequire  from '../middlewares/validateToken.js'
import { 
    createTranction,
    getTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction} from '../controllers/transaction.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { taskSchema } from '../schemas/task.schema.js'
import { transactionSchema } from '../schemas/transaction.schema.js'


const transactionRouter = Router()

transactionRouter.get('/transactions',authRequire,getTransactions)
transactionRouter.get('/transactions/:id',authRequire,getTransaction)
transactionRouter.post('/transactions',authRequire,validateSchema(transactionSchema),createTranction)
transactionRouter.delete('/transactions/:id',authRequire,deleteTransaction)
transactionRouter.put('/transactions/:id',authRequire,validateSchema(transactionSchema),updateTransaction)


export default transactionRouter