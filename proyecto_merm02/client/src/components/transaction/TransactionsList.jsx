import { useTransactionState } from '../../context/TransactionContext'
import TransactionItem from './TransactionItem'

function TransactionsList() {
  const { transactions } = useTransactionState()
  console.log(transactions)
  return (
    <>
    <h3 className='text-slate-300 text-xl font-bold block'>History</h3>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ))}
      </ul>
    </>
  )
}
export default TransactionsList
