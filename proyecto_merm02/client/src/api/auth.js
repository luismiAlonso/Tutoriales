import axios from './axios'
//import { PORT } from '../config.js'

export const registerRequest = (user) => axios.post('/register',user)

export const loginRequest = (user) => axios.post('/login',user)

export const verityTokenRequest = () => axios.get('/verify')

//export const logoutRequest = () =axios.get('/logout')
