import { createContext, useContext, useReducer, useEffect } from "react"
import { TransactionReducerContext } from "../context/reducers/TransactionReducerContext"

const initialState = {
  transactions: []
}

export const TransactionContext = createContext()

export const useTransactionState = () => {
  const context = useContext(TransactionContext)
  return context
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    TransactionReducerContext,
    initialState,
    () => {
      const localData = localStorage.getItem("transactions")
      return localData ? JSON.parse(localData) : initialState
    }
  )

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state))
  }, [state])

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    })
  }

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    })
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
