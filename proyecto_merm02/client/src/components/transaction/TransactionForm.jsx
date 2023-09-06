import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTransactionState } from "../../context/TransactionContext"

function TransactionForm() {
  const { addTransaction } = useTransactionState()
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit(() => {
    addTransaction({
      id: window.crypto.randomUUID(),
      description,
      amount: +amount
    })
    setDescription("");
    setAmount(0);
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="enter a Description"
          name="description"
          {...register("description", { required: true })}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={description}
        />
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}

        <input
          type="number"
          step="0.1"
          placeholder="00.00"
          {...register("amount", { required: true })}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={amount}
        />
        {errors.amount && (
          <span className="text-red-500">Amount must be greater than 0</span>
        )}

        <button className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2">
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm
