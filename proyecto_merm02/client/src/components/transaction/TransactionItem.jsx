import { useTransactionState } from "../../context/TransactionContext"

function TransactionItem({ transaction }) {
  const { deleteTransaction } = useTransactionState()
  return (
    <li className="bg-zinc-600 text-white px-3 py-1 rounded-lg mb-2 w-full flex justify-between items-center">
      <p className="text-sm">{transaction.description}</p>
      <div>
        <span>${transaction.amount}</span>
        <button
          className="w-6 h-6 ml-3 rounded-full bg-slate-500 hover:bg-slate-600 text-white"
          onClick={() => {
            deleteTransaction(transaction._id)
          }}
        >
          <label className="text-orange-800 ">x</label>
          
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
