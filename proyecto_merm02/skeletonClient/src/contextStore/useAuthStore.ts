// authStore.ts
import { create } from "zustand"
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth"
import { User } from "../interfaces/User"
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
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        error.response
      ) {
        const data = (error as { response: { data: AuthError[] } }).response
          .data
        set({ errors: data })
      }
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
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        error.response
      ) {
        const data = (error as { response: { data: AuthError[] } }).response
          .data
        set({ errors: data })
      }
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

    const tokenString = Cookies.get("token")
    
    if (!tokenString) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false
      })
      return
    }

    try {

     // const token: Token = { token: tokenString }
      const response = await verifyTokenRequest()

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
