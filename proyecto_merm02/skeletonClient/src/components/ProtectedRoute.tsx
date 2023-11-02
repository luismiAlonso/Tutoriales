import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../contextStore/useAuthStore"
import { useEffect } from "react"

function ProtectedRoute() {

  const { loading, isAuthenticated, checkLogin } = useAuthStore()
  
  useEffect(() => {
    checkLogin()
   }, []) // Agrega checkLogin como dependencia para evitar warnings*/
   
  if (loading) return <h1>Loading...</h1>

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute
