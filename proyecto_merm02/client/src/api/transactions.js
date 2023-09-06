import axios from "./axios"

export const getTransactionsRequest = () => axios.get("/transactions")
export const getTransactionRequest = (id) => axios.get(`/transactions/${id}`)
export const createTransactionRequest = (transaction) =>
  axios
    .post("/transactions", transaction)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      if (error.response) {
        console.error("Response Error:", error.response.data)
        console.error("Status Code:", error.response.status)
      } else if (error.request) {
        // The request was made but no response was received from the server
        console.error("No response from the server")
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request Configuration Error:", error.message)
      }
    })

export const updateTransactionRequest = (id, transaction) =>
  axios.put(`/transactions/${id}`, transaction)
export const deleteTransactionRequest = (id) =>
  axios.delete(`/transactions/${id}`)

//CRUD REDUCERS
export async function getTransactionsAPI(dispatch) {
  try {
    const res = await getTransactionsRequest()
    const transactionsData = Array.isArray(res.data) ? res.data : [] // Si no es un array, asignamos un array vacío
    dispatch({ type: "GET_TRANSACTIONS", payload: transactionsData })
  } catch (error) {
    console.error("Error fectching transactions:", error)
  }
}

export async function addTransactionAPI(transaction, dispatch) {
  try {
    await createTransactionRequest(transaction)
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    })
  } catch (error) {
    console.error("Error adding transaction:", error)
  }
}

export async function removeTransactionAPI(id, dispatch) {
  try {
    await deleteTransactionRequest(id)
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    })
  } catch (error) {
    console.error("Error removing transaction:", error)
  }
}
