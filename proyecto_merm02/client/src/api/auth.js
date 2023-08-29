import axios from './axios'
//import { PORT } from '../config.js'

//const API = `http://localhost:${PORT}/api`

export const registerRequest = (user) => axios.post('/register',user)

export const loginRequest = (user) => axios.post('/login',user)

export const verityTokenRequest = () => axios.get('/verify')