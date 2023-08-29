import { GlobalProvider } from './context/GlobalState'

import Balance from './components/Balance'
import Header from './components/Header'
import TransactionsList from './components/transactions/TransactionsList'
import TransactionForm from './components/transactions/TransactionForm'
import IncomExpenses from './components/IncomExpenses'
import ExpenseChart from './components/ExpenseChart'

function App() {
  return (
    <GlobalProvider>
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
    </GlobalProvider>
  )
}

export default App
