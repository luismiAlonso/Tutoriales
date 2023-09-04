import { createContext, useContext, useState, useEffect } from 'react'
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'

// Create an authentication context
export const AuthContext = createContext()

// Define a custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be within an AuthProvider')
  }
  return context
}

// Create the authentication context provider
export const AuthProvider = ({ children }) => {
  // Define states to manage authentication information
  const [user, setUser] = useState(null) // Authenticated user information
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Authentication state
  const [errors, setErrors] = useState([]) // Authentication errors
  const [loading, setLoading] = useState(true) // Initial loading state

  // Function to sign up a new user
  const signUp = async (user) => {
    try {
      const response = await registerRequest(user)
      setUser(response.data) // Set user information
      setIsAuthenticated(true) // Set authentication as true
      console.log(response.data)
    } catch (error) {
      console.error(error)
      setErrors(error.response.data) // Set authentication errors
    }
  }

  // Function to sign in
  const singIn = async (user) => {
    try {
      const response = await loginRequest(user)
      setIsAuthenticated(true) // Set authentication as true
      setUser(response.data) // Set user information
      console.log(response)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data])
    }
  }

  // Effect to clear errors after a certain time
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  // Effect to check authentication on app load
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get() // Get cookies from the browser
      console.log(cookies)
      if (!cookies.token) {
        setIsAuthenticated(false) // No token, user not authenticated
        setLoading(false) // Initial loading complete
        return setUser(null) // Clear user information
      }

      try {
        const res = await verityTokenRequest(cookies.token) // Verify token on the backend
        if (!res.data) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }
        setIsAuthenticated(true) // Set authentication as true
        setUser(res.data) // Set user information
        setLoading(false) // Initial loading complete
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    checkLogin()
  }, []) // This effect runs only on component mount

  // Function to log out the user
  const logout = () => {
    Cookies.remove('token') // Remove the 'token' cookie
    setIsAuthenticated(false) // Set authentication status to false
    setUser(null) // Clear user information
  }

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider
      value={{
        signUp,
        singIn,
        logout,
        user,
        isAuthenticated,
        loading,
        errors
      }}
    >
      {children} {/* Render child components */}
    </AuthContext.Provider>
  )
}
