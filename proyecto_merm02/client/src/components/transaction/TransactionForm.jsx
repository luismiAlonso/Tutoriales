import { useState } from 'react'
import { useTransactionState } from '../../context/TransactionContext'

function TransactionForm() {
  const { addTransaction } = useTransactionState()
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState(0)

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({
      id: window.crypto.randomUUID(),
      description,
      amount: +amount
    })
    setAmount(0)
    setDescription('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="enter a Description"
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={description}
        />
        <input
          type="number"
          step="0.1"
          placeholder="00.00"
          onChange={(e) => setAmount(e.target.value)}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={amount}
        />
        <button className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2">
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm