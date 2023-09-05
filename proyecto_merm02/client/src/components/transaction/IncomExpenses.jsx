import { useTransactionState } from "../../context/TransactionContext"
import { calculateIncomeAndExpense } from "../logiComponents/IncomExpenseLogic"
import { useMemo } from "react"

function IncomExpenses() {
  const { transactions } = useTransactionState()
  const { income, expense } = useMemo(
    () => calculateIncomeAndExpense(transactions),
    [transactions]
  )
  return (
    <>
      <div className="flex justify-between my-2">
        <h4>Income</h4>
        <p>{income}</p>
      </div>
      <div className="flex justify-between my-2">
        <h4>Expense</h4>
        <p>{expense}</p>
      </div>
    </>
  )
}

export default IncomExpenses
