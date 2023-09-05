import { useTransactionState } from "../../context/TransactionContext"
import { getTotalBalace } from "../logiComponents/IncomExpenseLogic"
import { useMemo } from "react"

function Balance() {
  const { transactions } = useTransactionState()
  const { total } = useMemo(() => getTotalBalace(transactions), [transactions])

  return (
    <div className="flex justify-between">
      <h3>Balance</h3>
      <h1 className="text-2xl font-bold"> ${total}</h1>
    </div>
  )
}

export default Balance
