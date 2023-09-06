import { useTransactionState } from '../../context/TransactionContext'
import TransactionItem from './TransactionItem'

function TransactionsList() {
  const { transactions } = useTransactionState()
  
  return (
    <>
    <h3 className='text-slate-300 text-xl font-bold block'>History</h3>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction._id} />
        ))}
      </ul>
    </>
  )
}
export default TransactionsList
