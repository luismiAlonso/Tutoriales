export const  TransactionReducerContext = (state, action) => {
    switch (action.type) {
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [...state.transactions, action.payload]
        }
      case 'DELETE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== action.payload
          )
        }
        case 'GET_TRANSACTIONS':
          return {
            ...state,
            transactions: action.payload
          }
       
      default:
        return state;
    }
  };
  