import { createContext, useContext, useReducer } from "react"
import { TransactionReducerContext } from "../context/reducers/TransactionReducerContext"
import {
  getTransactionsAPI,
  addTransactionAPI,
  removeTransactionAPI,
} from "../api/transactions"

const initialState = {
  transactions: []
}

export const TransactionContext = createContext()

export const useTransactionState = () => {
  const context = useContext(TransactionContext)
  return context
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducerContext, initialState)
  /*useEffect(() => {
    //localStorage.setItem("transactions", JSON.stringify(state))
    setTransactionAPI(dispatch)
  }, [state])*/
  
  const getTransaction = () => {
    getTransactionsAPI(dispatch)
  }
  const addTransaction = (transaction) => {
    
    addTransactionAPI(transaction,dispatch)
  }
  const deleteTransaction = (id) => {
    
    removeTransactionAPI(id,dispatch)
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        getTransaction,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
