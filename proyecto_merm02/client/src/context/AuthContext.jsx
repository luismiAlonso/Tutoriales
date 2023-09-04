import { createContext, useContext, useState, useEffect } from 'react'
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'
<<<<<<< HEAD

// Create an authentication context
=======
>>>>>>> b153964 (error cookies)
export const AuthContext = createContext()

// Define a custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be within an AuthProvider')
  }
  return context
}

<<<<<<< HEAD
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
=======
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
>>>>>>> b153964 (error cookies)
      console.log(response)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data])
<<<<<<< HEAD
    }
  }

  // Effect to clear errors after a certain time
=======
      // console.error(error)
    }
  }

>>>>>>> b153964 (error cookies)
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errors])

<<<<<<< HEAD
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
=======
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
>>>>>>> b153964 (error cookies)
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    checkLogin()
<<<<<<< HEAD
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
=======
  }, [])

  return (
    <AuthContext.Provider
      value={{
        singUp,
        singIn,
>>>>>>> b153964 (error cookies)
        user,
        isAuthenticated,
        loading,
        errors
      }}
    >
<<<<<<< HEAD
      {children} {/* Render child components */}
=======
      {children}
>>>>>>> b153964 (error cookies)
    </AuthContext.Provider>
  )
}
