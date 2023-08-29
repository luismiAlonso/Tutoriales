import { VictoryPie, VictoryLabel } from 'victory'
import { useGlobalState } from '../context/GlobalState'
import { calculatePercentIncomeAndExpense } from './logicComponents/IncomExpenseLogic'
import { useMemo } from 'react'

function ExpenseChart() {
  
  const { transactions } = useGlobalState()
  const { totalExpensesPercentage, totalIncomePercentage } = useMemo(
    () => calculatePercentIncomeAndExpense(transactions),
    [transactions]
  )

  return (
    <VictoryPie
      colorScale={['#FF5233', '#33C7FF']}
      data={[
        { x: 'Expenses', y: totalExpensesPercentage },
        { x: 'Incomes', y: totalIncomePercentage }
      ]}
      animate={{
        duration: 200
      }}
      labels={({ datum }) => `${datum.y}%`}
      labelComponent={<VictoryLabel angle={45} style={{ fill: 'white' }} />}
    />
  )
}

export default ExpenseChart
