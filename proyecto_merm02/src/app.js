import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routhes.js'
import transactionRoutes from './routes/transaction.routes.js'
import ordenProduccionRouter from './routes/ordenProduccion.routes.js';

const app = express()
app.use(cors({
    origin:  'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api',authRoutes)
app.use('/api',taskRoutes)
app.use('/api',transactionRoutes)
app.use('/api',ordenProduccionRouter)


export default app;