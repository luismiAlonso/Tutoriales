import axios from "axios"

const PORT = import.meta.env.VITE_PORT
const HOST = import.meta.env.VITE_HOST

console.log(`http://${HOST}:${PORT}/api`)
const instance = axios.create({
  baseURL: `http://${HOST}:${PORT}/api`,
  withCredentials: true
})

export default instance
