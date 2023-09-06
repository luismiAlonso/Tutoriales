import { createContext, useContext, useReducer, useEffect } from "react"
import { TransactionReducerContext } from "../context/reducers/TransactionReducerContext"
import {
  createTransactionRequest,
  deleteTransactionRequest,
  getTransactionsRequest,
  getTransactionRequest,
  updateTransactionRequest
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

  useEffect(() => {
    //localStorage.setItem("transactions", JSON.stringify(state))
    async function fetchTransactions() {
      try {
        const res = await getTransactionsRequest()
        const transactionsData = Array.isArray(res.data) ? res.data : [] // Si no es un array, asignamos un array vacío
        dispatch({ type: "SET_TRANSACTIONS", payload: transactionsData })
      } catch (error) {
        console.error("Error fectching transactions:", error)
      }
    }
    fetchTransactions()
  }, [state])

  const addTransaction = (transaction) => {
    async function addTransaction(transaction) {
      try {
        console.log(transaction)
        await createTransactionRequest(transaction)
        dispatch({
          type: "ADD_TRANSACTION",
          payload: transaction
        })
      } catch (error) {
        console.error("Error adding transactions:", error)
      }
    }
    addTransaction(transaction)
  }

  const deleteTransaction = (id) => {
    async function deleteTransaction(id) {
      try {

        await deleteTransactionRequest(id)

        dispatch({
          type: "DELETE_TRANSACTION",
          payload: id
        })
      } catch (error) {
        console.error("Error adding transactions:", error)
      }
    }

    deleteTransaction(id)
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
