
export function calculateIncomeAndExpense(transactions) {
  const amounts = transactions.map((transaction) => transaction.amount)

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1

  return { income, expense }
}

export function calculatePercentIncomeAndExpense(transactions) {

  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0)

  const extotalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0) * -1

  const totalExpensesPercentage = Math.round((extotalExpenses / totalIncome) * 100)
  const totalIncomePercentage = 100 - totalExpensesPercentage
  return { totalExpensesPercentage, totalIncomePercentage }
}

export function getTotalBalace(transactions){
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc + item),0)
    return {total}
}
