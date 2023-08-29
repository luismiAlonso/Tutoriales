import axios from 'axios'
import { HOST, PORT } from '../config'
console.log(`http://${HOST}:${PORT}/api`)
const instance = axios.create({
  baseURL: `http://${HOST}:${PORT}/api`,
  withCredentials: true
})

export default instance