import {Router} from 'express'
import { login, register,logout,profile,verifyToken} from "../controllers/auth.controller.js"
import  authRequire  from '../middlewares/validateToken.js'
import  { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const authRoutes = Router()

authRoutes.post('/register',validateSchema(registerSchema),register)
authRoutes.post('/login',validateSchema(loginSchema),login)
authRoutes.post('/logout',logout)
authRoutes.get('/verify',verifyToken)
authRoutes.get('/profile',authRequire,profile)

export default authRoutes