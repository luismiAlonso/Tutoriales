import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be within an AuthProvider")
    }
    return context
}


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [ errors, setErrors ] = useState([])

    useEffect(() => {
        if(errors.lenght > 0){
          const timer =  setTimeout(() =>{
                setErrors([])
            },3000)
            return () => clearTimeout(timer)
        }
    },[errors]) 

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

    const singIn = async (user) =>{
        try {
            const response = await loginRequest(user)
            console.log(response)
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    return (
        <AuthContext.Provider value={{
            singUp,
            singIn,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}