import IncomExpenses from "../components/transaction/IncomExpenses"
import Balance from "../components/transaction/Balance"
import TransactionForm from "../components/transaction/TransactionForm"
import ExpenseChart from "../components/transaction/ExpenseChart"
import TransactionsList from "../components/transaction/TransactionsList"

function TransactionPage() {
  return (
    <div className="bg-zinc-950 text-white h-screen flex justify-center items-center">
        <div className="container mx-auto w-4/6">
          <div className="bg-zinc-800 p-10 rounded-lg flex gap-x-2">
            <div>
              <h1 className="text-4xl font-bold">Expense Tracker</h1>
              <IncomExpenses />
              <Balance />
              <TransactionForm />
            </div>
            <div className="flex flex-col flex-1">
              <ExpenseChart />
              <TransactionsList />
            </div>
          </div>
        </div>
      </div>
  )
}

export default TransactionPage