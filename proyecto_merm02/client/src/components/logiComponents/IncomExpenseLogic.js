
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
  
    const totalExpenses = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => (acc += transaction.amount), 0) * -1
  
    let totalExpensesPercentage, totalIncomePercentage;

    if (totalIncome !== 0) {
      totalExpensesPercentage = Math.round((totalExpenses / totalIncome) * 100);
      totalIncomePercentage = 100 - totalExpensesPercentage;
    } else {
      // En este caso, totalIncome es 0, por lo que asignamos 0 a ambos porcentajes.
      totalExpensesPercentage = 0;
      totalIncomePercentage = 100;
    }
    return { totalExpensesPercentage, totalIncomePercentage }
  }
  
  export function getTotalBalace(transactions){
      const amounts = transactions.map(transaction => transaction.amount)
      const total = amounts.reduce((acc, item) => (acc + item),0)
      return {total}
  }
  