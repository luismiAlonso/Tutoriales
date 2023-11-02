// authStore.ts
import {create} from "zustand"
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth"
import {User} from "../interfaces/User"
import {Token} from "../interfaces/Token"
import { AuthError } from "../interfaces/AuthError"
import Cookies from "js-cookie"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  errors: AuthError[]
  loading: boolean
  signUp: (user: User) => Promise<void>
  signIn: (user: { username: string; password: string }) => Promise<void>
  logout: () => void
  checkLogin: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  errors: [],
  loading: true,

  signUp: async (user) => {
    try {
      const response = await registerRequest(user)
      set({
        user: response.data,
        isAuthenticated: true
      })
    } catch (error) {
      set({ errors: error.response.data })
    }
  },
  signIn: async (user) => {
    try {
      const response = await loginRequest(user)
      set({
        user: response.data,
        isAuthenticated: true
      })
    } catch (error) {
      console.log(error)
      set({ errors: error.response.data })
    }
  },
  logout: () => {
    Cookies.remove("token")
    set({
      user: null,
      isAuthenticated: false
    })
  },
  checkLogin: async () => {
    const token = Cookies.get("token")
    
    if (!token) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false
      })
      return
    }

    try { 
      const response = await verifyTokenRequest(token as Token)
      set({
        user: response.data,
        isAuthenticated: true,
        loading: false
      })
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false
      })
    }
  }
}))
