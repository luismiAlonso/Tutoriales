import axios from './axios'
import {User} from '../interfaces/User'
//import {Token} from '../interfaces/Token'

//import { PORT } from '../config.js'

export const registerRequest = (user:User) => axios.post('/register',user)

export const loginRequest = (user:User) => axios.post('/login',user)

export const verifyTokenRequest = () => axios.get('/verify')

export const logoutRequest = () =>axios.get('/logout')
