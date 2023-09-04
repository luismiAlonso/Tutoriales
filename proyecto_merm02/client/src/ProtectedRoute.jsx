import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/authContext'

function ProtectedRoute() {
  const { loading ,isAuthenticated } = useAuth()
<<<<<<< HEAD

  //console.log(loading, isAuthenticated)
=======
  console.log(loading, isAuthenticated)
>>>>>>> b153964 (error cookies)
  if(loading) return (
    <h1>Loading...</h1>
  )
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default ProtectedRoute
