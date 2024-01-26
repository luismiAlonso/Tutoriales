// axios.ts
import axios, { AxiosInstance } from "axios"

// Define una interfaz para tus variables de entorno si lo deseas
interface EnvVariables {
  VITE_HOST: string
  VITE_PORT: string
}

// Utiliza 'import.meta.env' y asegúrate de que las variables de entorno estén definidas
const env: EnvVariables = import.meta.env as unknown as EnvVariables

// Construye la URL base utilizando variables de entorno
const baseURL: string = `http://${env.VITE_HOST}:${env.VITE_PORT}/api`

// Crea una instancia de Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL
  // Aquí puedes añadir más configuraciones si lo necesitas
})

export default axiosInstance
