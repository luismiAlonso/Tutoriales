import axios from "./axios";

export const getTransactionsRequest = (): Promise<any> => axios.get("/transactions");

export const getTransactionRequest = (id: string): Promise<any> => axios.get(`/transactions/${id}`);

export const createTransactionRequest = (transaction: string): Promise<void> => {
  return axios
    .post("/transactions", transaction)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      if (error.response) {
        console.error("Response Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("No response from the server");
      } else {
        console.error("Request Configuration Error:", error.message);
      }
    });
};

export const updateTransactionRequest = (id: string, transaction: string): Promise<any> => {
  return axios.put(`/transactions/${id}`, transaction);
};

export const deleteTransactionRequest = (id: string): Promise<any> => axios.delete(`/transactions/${id}`);

// CRUD REDUCERS
export async function getTransactionsAPI(dispatch:any): Promise<void> {
  try {
    const res = await getTransactionsRequest();
    const transactionsData: string[] = Array.isArray(res.data) ? res.data : [];
    dispatch({ type: "GET_TRANSACTIONS", payload: transactionsData });
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

export async function addTransactionAPI(transaction: string, dispatch: any): Promise<void> {
  try {
    await createTransactionRequest(transaction);
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}

export async function removeTransactionAPI(id: string, dispatch: any): Promise<void> {
  try {
    await deleteTransactionRequest(id);
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  } catch (error) {
    console.error("Error removing transaction:", error);
  }
}
