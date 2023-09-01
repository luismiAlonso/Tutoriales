import { createContext, useContext, useReducer } from 'react'
import AppReducer from '../context/AppReducer'

const initialState = {
  transations: []
}

export const Context = createContext()
export const useGlobalState = () => {
  const context = useContext(Context)
  return context
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const addTransaction = (transaction) => {
    dispatch: ({
      type: "ADD_TRANSACTION",
      payload: transaction
    })
  }

  return (
    <Context.Provider
      value={{
        transations: state.transations,
        addTransaction
      }}
    >
      {children}
    </Context.Provider>
  )
}
