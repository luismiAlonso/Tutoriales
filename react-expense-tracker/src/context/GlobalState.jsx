import { createContext, useContext, useReducer,useEffect } from 'react'
import AppReducer from '../context/AppReducer'

const initialState = {
  transactions: []
}

export const Context = createContext()

export const useGlobalState = () => {
  const context = useContext(Context)
  return context
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState,() => {
    const localData = localStorage.getItem('transactions')
    return localData ? JSON.parse(localData) : initialState
  })
  
  useEffect(()=>{
    localStorage.setItem('transactions', JSON.stringify(state))
  },[state])

  const addTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    })
  }

  const deleteTransaction = (id) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    })
  }

  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </Context.Provider>
  )
}
