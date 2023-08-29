import { createContext, useContext, useState, useEffect } from 'react'
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'
export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [ loading, setLoading ] = useState(true)

  const singUp = async (user) => {
    try {
      const response = await registerRequest(user)
      setUser(response.data)
      setIsAuthenticated(true)
      console.log(response.data)
    } catch (error) {
      console.error(error)
      setErrors(error.response.data)
    }
  }

  const singIn = async (user) => {
    try {
      const response = await loginRequest(user)
      setIsAuthenticated(true)
      setUser(response.data)
      console.log(response)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data])
      // console.error(error)
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }

      try {
        const res = await verityTokenRequest(cookies.token)
        if (!res.data){
          setIsAuthenticated(false)
          setLoading(false)
          return 
        } 
        
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        singUp,
        singIn,
        user,
        isAuthenticated,
        loading,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
