import { VictoryPie, VictoryLabel } from "victory"
import { useTransactionState } from "../../context/TransactionContext"
import { calculatePercentIncomeAndExpense } from "../logiComponents/IncomExpenseLogic"
import { useMemo } from "react"

function ExpenseChart() {
  const { transactions } = useTransactionState()
  const { totalExpensesPercentage, totalIncomePercentage } = useMemo(
    () => calculatePercentIncomeAndExpense(transactions),
    [transactions]
  )
  return (
    <VictoryPie
      colorScale={["#FF5233", "#33C7FF"]}
      data={[
        { x: "Expenses", y: totalExpensesPercentage },
        { x: "Incomes", y: totalIncomePercentage }
      ]}
      animate={{
        duration: 200
      }}
      labels={({ datum }) => `${datum.y}%`}
      labelComponent={<VictoryLabel angle={45} style={{ fill: "white" }} />}
    />
  )
}

export default ExpenseChart
