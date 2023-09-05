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
