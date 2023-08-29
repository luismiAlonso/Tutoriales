import { useGlobalState } from '../context/GlobalState'
import { getTotalBalace } from './logicComponents/IncomExpenseLogic'
import { useMemo } from 'react' 

function Balance() {
  const { transactions } = useGlobalState()
  const {total} = useMemo(() => getTotalBalace(transactions),[transactions])
 
  return (
    <div className='flex justify-between'>
      <h3>Balance</h3>
      <h1 className='text-2xl font-bold'> ${total}</h1>
    </div>
  )
}

export default Balance
